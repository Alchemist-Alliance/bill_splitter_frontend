"use client";

import { snackBarState } from "@/types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

const SnackBar = forwardRef(({}, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBar, setSnackBar] = useState<snackBarState>({
    message: "",
    iconType: FaTimesCircle,
    style: {
      backgroundColor: "#FED0D0",
      color: "#F56C6C",
      borderColor: "#F56C6C",
    },
  });

  const dropIn = {
    hidden: { top: 0, opacity: 0 },
    visible: {
      top: "10%",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 18,
        stiffness: 500,
      },
    },
    exit: { top: 0, opacity: 0 },
  };

  useImperativeHandle(
    ref,
    () => ({
      show(
        snackMessage: string,
        iconType: IconType,
        style: {
          backgroundColor: string;
          color: string;
          borderColor: string;
        }
      ) {
        setShowSnackbar(true);
        setSnackBar({
          message: snackMessage,
          iconType: iconType,
          style: style,
        });
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      },
    }),
    []
  );

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate={showSnackbar ? "visible" : "hidden"}
      style={snackBar.style}
      className="border-l-4 z-[100] fixed left-[50%] top-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center px-5 py-3 rounded-lg rounded-l-none"
    >
      <snackBar.iconType className="cursor-pointer" size={20} />
      <div className="ml-3 font-semibold flex">{snackBar.message}</div>
    </motion.div>
  );
});

export default SnackBar;
