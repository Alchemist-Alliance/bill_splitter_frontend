import { itemVariants, listVariants } from "@/data";
import useAppContext from "@/hooks";
import { useBackdrop, useDrawee, usePayee } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { shallow } from "zustand/shallow";

const DropdownSelector = () => {
  const [openState, drawees, setOpenState, addDrawee, deleteDrawee] = useDrawee(
    (drawee) => [
      drawee.openState,
      drawee.drawees,
      drawee.setOpenState,
      drawee.addDrawee,
      drawee.deleteDrawee,
    ],
    shallow
  );
  const [payeeOpenState, setPayeeOpenState] = usePayee(
    (payee) => [payee.openState, payee.setOpenState],
    shallow
  );

  const [setCaller, toggleBackdrop] = useBackdrop(
    (backdrop) => [backdrop.setCaller, backdrop.toggleBackdrop],
    shallow
  );

  const users = useAppContext((event) => event.users);

  const handleCheckBox = (e: HTMLInputElement) => {
    if (e.checked) {
      if (!Object.keys(drawees).includes(e.value)) {
        addDrawee(Number(e.value), users[Number(e.value)]["name"]);
      }
    } else {
      deleteDrawee(Number(e.value));
    }
  };

  const handleDraweeDropdown = () => {
    if (payeeOpenState) {
      setPayeeOpenState();
    }
    setCaller("drawee");
    toggleBackdrop();
    setOpenState();
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center rounded-lg select-none ${
        openState ? "z-[20]" : "z-[2]"
      }`}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDraweeDropdown}
        className="bg-secondary p-2 w-full flex items-center justify-between font-bold rounded-lg border-4 border-transparent "
      >
        Select Drawees
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
            className="bg-stroke text-secondary z-20 absolute top-20 flex flex-col items-start rounded-lg px-6 py-4 w-full custom-scrollbar divide-y divide-secondary max-h-[300px] overflow-y-auto"
          >
            {users.map((user, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="flex w-full py-2 first:pt-0 last:pb-0"
              >
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
                  <span className="label-text text-primary opacity-70">
                    {user.name}
                  </span>
                </label>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DropdownSelector;
