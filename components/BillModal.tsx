import { dropIn, listVariants } from "@/data";
import useAppContext from "@/hooks";
import {
  useBackdrop,
  useBillInput,
  useDrawee,
  useModal,
  usePayee,
} from "@/store";
import { Users, payeeType } from "@/types";
import { formatDrawees, sendBillToBackend, showSnackBar } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { shallow } from "zustand/shallow";
import Loader from "./Loader";

const BillModal = ({
  itemBill,
  snackbar,
  previousPayeeState,
  setItemBill,
}: {
  itemBill: number;
  snackbar: MutableRefObject<any>;
  previousPayeeState: MutableRefObject<payeeType>;
  setItemBill: Dispatch<SetStateAction<number>>;
}) => {
  const eventKey = useAppContext((event) => event.key);
  const addBillToStore = useAppContext((event) => event.addBill);
  const [billName, updateBillName] = useBillInput(
    (input) => [input.billName, input.updateBillName],
    shallow
  );
  const [showModal, closeModal] = useModal(
    (modal) => [modal.openState, modal.closeModal],
    shallow
  );
  const closeBackdrop = useBackdrop((backdrop) => backdrop.closeBackdrop);
  const users = useAppContext((event) => event.users);
  const [drawees, addDrawee, deleteDrawee, resetDrawees] = useDrawee(
    (drawee) => [
      drawee.drawees,
      drawee.addDrawee,
      drawee.deleteDrawee,
      drawee.resetDrawees,
    ],
    shallow
  );
  const [payees, resetPayees] = usePayee(
    (payee) => [payee.payees, payee.resetPayees],
    shallow
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: sendBillToBackend,
    onSuccess: (billObj: any) => {
      const usersCopy: Users[] = JSON.parse(JSON.stringify(users));
      const newUsers = usersCopy.map((user, index) => {
        user.expenses = billObj.expenses[index];
        if (Object.keys(drawees).includes(user.key)) {
          user.bills[billObj.bill_key] = 0;
        }
        if (Object.keys(payees).includes(user.key)) {
          user.bills[billObj.bill_key] = Number(payees[user.key]);
        }
        return user;
      });

      previousPayeeState.current = {};
      addBillToStore({
        billId: billObj.bill_key,
        billName: billName,
        billAmount: itemBill,
        usersWithBillAdded: newUsers,
        sharedAmount: billObj.shared_amount,
      });
      setItemBill(0);
      resetDrawees();
      resetPayees();
      updateBillName("");
    },
    onError: (err: any, errObj) => {
      console.log(errObj);
      return showSnackBar(snackbar, "API Error", "error");
    },
    onSettled: () => {
      closeBackdrop();
      closeModal();
    },
  });

  const handleCloseModal = () => {
    closeModal();
    closeBackdrop();
  };

  const handleCheckBox = (e: HTMLInputElement) => {
    if (e.checked) {
      if (!Object.keys(drawees).includes(e.value)) {
        addDrawee(Number(e.value), users[Number(e.value)]["name"]);
      }
    } else {
      deleteDrawee(Number(e.value));
    }
  };

  const addBill = () => {
    if (Object.keys(drawees).length <= 0) {
      return showSnackBar(snackbar, "Select atleast 1 Drawee", "error");
    }
    if (isLoading) {
      return;
    }
    mutate({
      event_key: eventKey,
      name: billName,
      amount: itemBill.toFixed(1),
      drawees: formatDrawees(drawees),
      payees: payees,
      notes: "",
    });
  };

  return (
    <AnimatePresence initial={false}>
      {showModal && (
        <motion.div
          className={`absolute w-full -top-[450%] md:-left-[60%] md:-top-[200%] lg:-top-[450%] lg:-left-[0] max-h-[400px] no-scrollbar bg-stroke text-secondary text-md flex flex-col gap-y-4 rounded-lg md:rounded-xl overflow-y-auto ${
            showModal ? "z-30" : "z-0"
          }`}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="sticky top-0 bg-stroke bg-opacity-50 backdrop-blur-sm flex flex-row items-center justify-between px-3 py-4 md:px-5 md:py-5">
            <p className="text-xl font-bold">{billName}</p>
            <motion.div
              onClick={handleCloseModal}
              whileTap={{ scale: 0.9 }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              <FaTimes size={25} />
            </motion.div>
          </div>
          <div data-name="contribution-tab" className="px-5 md:px-7">
            <div className="flex flex-row items-center mb-4">
              <p>Contributions</p>
              <div className="h-[2px] w-full bg-secondary ml-2 rounded-md"></div>
            </div>
            <p className="text-3xl font-bold">
              <span className="text-lg font-bold pr-2">₹</span>
              <span className="text-primary">{itemBill}</span>
            </p>
          </div>
          <div data-name="drawee-tab" className="px-5 md:px-7">
            <div className="flex flex-row items-center mb-4">
              <p>Drawees</p>
              <div className="h-[2px] w-full bg-secondary ml-2 rounded-md"></div>
            </div>
            <div className="flex flex-wrap">
              {users.map((user, index) => (
                <div key={index} className="flex pr-2">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      value={index}
                      defaultChecked={
                        Object.keys(drawees).includes(String(index))
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        handleCheckBox(e.target as HTMLInputElement)
                      }
                      className="checkbox checkbox-secondary mr-3"
                    />
                    <span className="label-text text-primary">{user.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div data-name="payee-tab" className="px-5 md:px-7">
            <div className="flex flex-row items-center mb-4">
              <p>Payees</p>
              <div className="h-[2px] w-full bg-secondary ml-2 rounded-md"></div>
            </div>
            <div className="flex flex-wrap">
              {Object.keys(payees).map((userIndex, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 px-3 bg-primary text-stroke m-1 rounded font-bold"
                >
                  <span className="mr-2">{users[Number(userIndex)].name}</span>
                  <span className="h-full w-[2px] bg-stroke rounded"></span>
                  <span className="ml-2">
                    <span className="mr-[0.15rem]">₹</span>
                    {payees[userIndex]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <motion.button
            onClick={addBill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full py-4 md:py-5 cursor-pointer sticky bottom-0 flex items-center justify-center text-xl font-bold border-0 bg-secondary text-stroke backdrop-blur-sm bg-opacity-80"
          >
            {isLoading ? <Loader color="#073042" /> : "Confirm Bill"}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BillModal;
