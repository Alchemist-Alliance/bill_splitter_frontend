import {
  useBackdrop,
  useDrawee,
  useModal,
  usePayee,
  useRecentEvents,
} from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { shallow } from "zustand/shallow";

const BackDrop = () => {
  const [caller, showBackdrop, closeBackdrop] = useBackdrop(
    (backdrop) => [backdrop.caller, backdrop.openState, backdrop.closeBackdrop],
    shallow
  );
  const closeDraweeDropDown = useDrawee((drawee) => drawee.setOpenState);
  const closePayeeDropDown = usePayee((payee) => payee.setOpenState);
  const closeModal = useModal((modal) => modal.closeModal);
  const closeRecentEvents = useRecentEvents(
    (recentEventTab) => recentEventTab.closeRecentEvents
  );
  const fadeIn = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const handleOnClick = () => {
    if (caller === "drawee") {
      closeDraweeDropDown();
    } else if (caller === "payee") {
      closePayeeDropDown();
    } else if (caller === "modal") {
      closeModal();
    } else if (caller === "createEvent") {
      closeRecentEvents();
    }

    closeBackdrop();
  };

  return (
    <AnimatePresence initial={false}>
      {showBackdrop && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          exit="hidden"
          animate={showBackdrop ? "visible" : "hidden"}
          onClick={handleOnClick}
          className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackDrop;
