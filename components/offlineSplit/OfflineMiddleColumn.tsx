"use client";

import { Dropdown } from "@/components";
import { FaPlus, FaRupeeSign, FaShoppingBag } from "react-icons/fa";
import { payeeType } from "@/types";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import DropdownSelector from "./DropdownSelector";
import { calculateContributions, showSnackBar } from "@/utils";
import {
  useDrawee,
  useBillInput,
  usePayee,
  useModal,
  useBackdrop,
} from "@/store";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import BillModal from "../BillModal";

export default function OfflineMiddleColumn({
  snackbar,
}: {
  snackbar: MutableRefObject<any>;
}) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);

  const drawees = useDrawee((draweeState) => draweeState.drawees);
  const [billName, updateBillName] = useBillInput(
    (input) => [input.billName, input.updateBillName],
    shallow
  );

  const [itemBill, setItemBill] = useState<number>(0);
  const toggleModal = useModal((modal) => modal.toggleModal);
  const [setCaller, toggleBackdrop] = useBackdrop((backdrop) => [
    backdrop.setCaller,
    backdrop.toggleBackdrop,
  ]);
  const [payees, selectedPayee, setPayeeContribution, resetPayeeContribution] =
    usePayee(
      (payeeState) => [
        payeeState.payees,
        payeeState.selectedPayee,
        payeeState.setPayeeContribution,
        payeeState.resetPayeeContribution,
      ],
      shallow
    );
  const previousItemBill = useRef<number>(itemBill);
  const previousPayeeState = useRef<payeeType>({});

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(previousItemBill.current, itemBill, {
      duration: 0.5,
      onUpdate(value) {
        if (node) {
          node.textContent = value.toFixed(0);
        }
      },
    });
    previousItemBill.current = itemBill;
    return () => controls.stop();
  }, [itemBill]);

  const addContributions = () => {
    if (selectedPayee == "") {
      return showSnackBar(snackbar, "Payee not Selected", "error");
    }
    if (!payees[selectedPayee]) {
      return showSnackBar(snackbar, "Contribution not added", "error");
    }
    if (!Number(payees[selectedPayee])) {
      showSnackBar(snackbar, "Invalid Amount", "error");
      return resetPayeeContribution();
    }

    const previousPayeeContribution: number = previousPayeeState["current"][
      selectedPayee
    ]
      ? Number(previousPayeeState["current"][selectedPayee])
      : 0;
    setItemBill(
      (prev) => prev + Number(payees[selectedPayee]) - previousPayeeContribution
    );
    previousPayeeState.current = payees;
  };

  const showBillModal = () => {
    if (Object.keys(drawees).length <= 0) {
      return showSnackBar(snackbar, "Select atleast 1 Drawee", "error");
    }
    if (billName === "") {
      return showSnackBar(snackbar, "Bill name is empty", "error");
    }
    if (itemBill === 0) {
      return showSnackBar(snackbar, "Add atleast 1 Contribution", "error");
    }
    if (itemBill !== calculateContributions(payees)) {
      return showSnackBar(snackbar, "Contributions not equal to Bill", "error");
    }
    setCaller("modal");
    toggleBackdrop();
    toggleModal();
  };

  const handleContributionKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      addContributions();
    }
  };

  const handleBillKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      showBillModal();
    }
  };

  return (
    <div className="relative bg-primary text-stroke text-md flex flex-col gap-y-4 rounded-lg shadow-custom p-5 lg:p-7 md:p-7 md:rounded-xl">
      <DropdownSelector />
      <div className="flex flex-row p-1 justify-start items-center bg-secondary rounded-lg">
        <Image
          src="/nekoHypeWithoutText.svg"
          alt="nekoHypeWithoutText"
          width={40}
          height={40}
          className="ml-2"
        />
        <input
          onKeyDown={handleBillKeyPress}
          className="font-bold w-full rounded-lg p-3 text-stroke bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
          placeholder="Enter Bill Name"
          name="billName"
          value={billName}
          onChange={(e) => updateBillName(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown />
        <div className="grid grid-cols-4">
          <input
            type="text"
            pattern="\d*"
            inputMode="numeric"
            onKeyDown={handleContributionKeyPress}
            className="col-span-3 font-bold px-3 py-4 text-stroke rounded-lg rounded-r-none bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
            placeholder="Contribution"
            name="contribution"
            value={payees[selectedPayee] || ""}
            onChange={(e) => {
              if (selectedPayee) {
                return setPayeeContribution(e.target.value as string);
              } else {
                return showSnackBar(snackbar, "Select Payee First", "error");
              }
            }}
          />
          <div
            onClick={addContributions}
            className="flex bg-stroke text-secondary items-center justify-center rounded-r-lg cursor-pointer"
          >
            <div className="hidden md:block">
              <FaPlus />
            </div>
            <div className="block md:hidden">Add</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-secondary rounded-lg items-center py-[0.6rem] px-4 font-bold">
        <div className="flex items-center">
          <Image src="/nekoTasty.svg" alt="nekoTasty" width={40} height={40} />
          <p className="ml-2 text-lg">Item Bill</p>
        </div>
        <p className="text-3xl font-bold">
          <span className="text-lg font-bold pr-2">₹</span>
          <span ref={nodeRef}>{itemBill}</span>
        </p>
      </div>
      <div className="relative">
        <motion.button
          onClick={showBillModal}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center text-xl font-bold bg-secondary text-stroke rounded-lg w-full h-full py-3 cursor-pointer"
        >
          Add Bill
        </motion.button>
        <BillModal
          itemBill={itemBill}
          snackbar={snackbar}
          previousPayeeState={previousPayeeState}
          setItemBill={setItemBill}
        />
      </div>
    </div>
  );
}
