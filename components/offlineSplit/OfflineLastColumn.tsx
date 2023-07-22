"use client";

import { userBillPaid, userItems } from "@/utils";
import DetailProgressBar from "./DetailProgressBar";
import { AnimatePresence } from "framer-motion";
import useAppContext from "@/hooks";
import { shallow } from "zustand/shallow";

const OfflineLastColumn = () => {
  const [users, totalBill, bills] = useAppContext(
    (event) => [event.users, event.totalBill, event.bills],
    shallow
  );

  return (
    <div className="lg:row-span-2 flex flex-col shadow-custom bg-primary text-stroke rounded-lg overflow-y-auto overflow-x-hidden no-scrollbar p-5 md:rounded-xl lg:p-7 md:p-7 lg:max-h-[672px] md:max-h-[550px]">
      <p className="text-2xl font-bold mb-5">Paid Till Now</p>
      <AnimatePresence initial={false}>
        {users.map((user, index) => (
          <DetailProgressBar
            key={index}
            expenses={user.expenses}
            name={user.name}
            money={userBillPaid(user.bills)}
            total={totalBill}
            memberExpense={userItems(bills, user.bills)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OfflineLastColumn;
