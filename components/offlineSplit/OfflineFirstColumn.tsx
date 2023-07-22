"use client";

import useAppContext from "@/hooks";
import Avatar from "boring-avatars";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { shallow } from "zustand/shallow";

const OfflineFirstColumn = () => {
  const [totalBill, users, eventName] = useAppContext(
    (event) => [event.totalBill, event.users, event.name],
    shallow
  );
  const previousBill = useRef<number>(totalBill);
  const billRef = useRef<HTMLSpanElement | null>(null);
  const userRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = billRef.current;
    const controls = animate(previousBill.current, totalBill, {
      duration: 0.5,
      onUpdate(value) {
        if (node) {
          node.textContent = value.toFixed(0);
        }
      },
    });
    previousBill.current = totalBill;
    return () => controls.stop();
  }, [totalBill]);

  useEffect(() => {
    userRef.current!.textContent = String(users.length - 6);
  }, []);
  const split = () => {};

  return (
    <div className="relative flex flex-col bg-primary rounded-lg text-stroke shadow-custom p-5 lg:p-7 md:p-7 md:rounded-xl">
      <p className="text-2xl font-bold">{eventName}</p>
      <p className="text-lg font-bold mb-20 pt-3">Splitting with</p>
      <div className="flex flex-row relative -top-16">
        <AnimatePresence initial={false}>
          {users.map((user, index) =>
            index <= 6 ? (
              <motion.div
                key={index}
                style={{
                  zIndex: index,
                  left: `${index * 2}rem`,
                  position: "absolute",
                }}
                initial={{ opacity: 0, translateX: -50, scale: 0.5 }}
                animate={{ opacity: 1, translateX: 0, scale: 1 }}
                exit={{ opacity: 0, translateX: -50, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="border-primary border-[3px] rounded-full"
              >
                {index < 6 ? (
                  <Avatar
                    size={40}
                    name={user.name}
                    variant="beam"
                    colors={[
                      "#45EBA5",
                      "#21ABA5",
                      "#1D566E",
                      "#163A5F",
                      "#073042",
                    ]}
                  />
                ) : (
                  <div className="bg-stroke text-secondary rounded-full w-[40px] h-[40px] flex items-center justify-center">
                    <FaPlus size={10} className="mr-[1px]" />
                    <span ref={userRef}></span>
                  </div>
                )}
              </motion.div>
            ) : userRef.current ? (
              (userRef.current!.textContent = String(index - 5))
            ) : null
          )}
        </AnimatePresence>
      </div>
      <div className="bg-secondary rounded-lg text-stroke p-5">
        <p className="text-lg font-bold pb-4">Your total bill till now</p>
        <p className="text-3xl font-bold">
          <span className="text-lg font-bold pr-2">₹</span>
          <span ref={billRef}>{totalBill}</span>
        </p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={split}
        className="text-xl font-bold bg-secondary text-stroke rounded-lg py-3 mt-4"
      >
        Split
      </motion.button>
    </div>
  );
};

export default OfflineFirstColumn;
