"use client";

import { itemVariants, listVariants } from "@/data";
import useAppContext from "@/hooks";
import { useBackdrop, useDrawee, usePayee } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { shallow } from "zustand/shallow";

const Dropdown = () => {
  const [openState, selectedPayee, setOpenState, setSelectedPayee] = usePayee(
    (payeeState) => [
      payeeState.openState,
      payeeState.selectedPayee,
      payeeState.setOpenState,
      payeeState.setSelectedPayee,
    ],
    shallow
  );
  const users = useAppContext((event) => event.users);

  const [draweeOpenState, setDraweeOpenState] = useDrawee(
    (drawee) => [drawee.openState, drawee.setOpenState],
    shallow
  );

  const [setCaller, toggleBackdrop] = useBackdrop(
    (backdrop) => [backdrop.setCaller, backdrop.toggleBackdrop],
    shallow
  );

  const handleOnClick = (element: Element) => {
    if (draweeOpenState) {
      setDraweeOpenState();
    }
    const userIndex =
      element?.nodeName === "P"
        ? element?.parentElement?.getAttribute("data-value")
        : element?.getAttribute("data-value");
    setSelectedPayee(userIndex as string);
    toggleBackdrop();
    setOpenState();
  };

  const handlePayeeDropdown = () => {
    if (draweeOpenState) {
      setDraweeOpenState();
    }
    setCaller("payee");
    toggleBackdrop();
    setOpenState();
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center rounded-lg select-none ${
        openState ? "z-20" : "z-[1]"
      }`}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handlePayeeDropdown}
        className="bg-secondary p-2 w-full flex items-center justify-between font-bold rounded-lg border-4 border-transparent "
      >
        {selectedPayee ? (
          <p className="text-stroke truncate">
            {users[Number(selectedPayee)].name}
          </p>
        ) : (
          <p className="opacity-40 text-stroke">Payee</p>
        )}
        <motion.div
          variants={{
            open: { rotate: 180, transition: { duration: 0.3 } },
            closed: { rotate: 0, transition: { duration: 0.3 } },
          }}
          animate={openState ? "open" : "closed"}
          initial="closed"
        >
          <FaChevronDown className="h-8" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {openState && (
          <motion.div
            variants={listVariants}
            animate="open"
            initial="closed"
            exit="closed"
            className="bg-stroke text-secondary z-10 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full custom-scrollbar max-h-[250px] overflow-y-auto"
          >
            {users.map((user, index) => (
              <motion.div
                variants={itemVariants}
                onClick={(e) => handleOnClick(e.target as Element)}
                key={index}
                data-value={index}
                className="flex w-full font-bold p-4 hover:bg-background cursor-pointer rounded-r-lg border-l-transparent hover:border-l-secondary border-l-4"
              >
                <p className="truncate">{user.name}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
