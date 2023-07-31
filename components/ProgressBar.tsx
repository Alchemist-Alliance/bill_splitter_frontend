"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Avatar from "boring-avatars";
import { avatarColors } from "@/data";

const ProgressBar = ({
  name,
  money,
  total,
  expenses,
}: {
  name: string;
  money: number;
  total: number;
  expenses: number;
}) => {
  const width = total === 0 ? 0 : Number(money / total);
  const previousBill = useRef<number>(money);
  const previousExpense = useRef<number>(expenses);
  const moneySpendRef = useRef<HTMLSpanElement | null>(null);
  const expensesRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = moneySpendRef.current;
    const controls = animate(previousBill.current, money, {
      duration: 0.5,
      onUpdate(value) {
        if (node) {
          node.textContent = value.toFixed(0);
        }
      },
    });
    previousBill.current = money;
    return () => controls.stop();
  }, [money]);

  useEffect(() => {
    const node = expensesRef.current;
    const controls = animate(previousExpense.current, expenses, {
      duration: 0.5,
      onUpdate(value) {
        if (node) {
          node.textContent = value.toFixed(2);
        }
      },
    });
    previousExpense.current = expenses;
    return () => controls.stop();
  }, [expenses]);

  return (
    <div className="flex flex-row flex-grow py-4">
      <Avatar size={50} name={name} variant="beam" colors={avatarColors} />
      <div className="flex flex-col ml-4 flex-grow">
        <div className="flex flex-row justify-between mb-1">
          <p className="font-bold text-md">
            {name}
            {expenses !== 0 ? (
              <span className={expenses >= 0 ? "text-[#09C184]" : "text-red "}>
                <span className="ml-1">(</span>
                <span ref={expensesRef}>{expenses.toFixed(2)}</span>
                <span>)</span>
              </span>
            ) : null}
          </p>
          <p className="font-bold text-md">
            ₹<span ref={moneySpendRef}>{money}</span>
          </p>
        </div>
        <div className="flex flex-col h-[0.65rem] bg-secondary rounded-lg rounded-l-sm">
          <motion.div
            animate={{
              opacity: 1,
              width: `${width * 100}%`,
              transition: { duration: 0.3 },
            }}
            initial={{ opacity: 0, width: 0 }}
            className="flex h-[0.65rem] justify-center bg-gradient-to-r from-stroke-gradient to-stroke rounded-lg rounded-l-sm items-center"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
