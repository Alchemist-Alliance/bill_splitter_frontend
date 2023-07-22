"use client";

import { useRef } from "react";
import OfflineFirstColumn from "./OfflineFirstColumn";
import OfflineMiddleColumn from "./OfflineMiddleColumn";
import OfflineLastColumn from "./OfflineLastColumn";
import OfflineBottomColumn from "./OfflineBottomColumn";
import SnackBar from "./SnackBar";
import AppProvider from "../AppProvider";
import { totalBillPaid } from "@/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Dashboard = ({ eventData }: any) => {
  const initialState = {
    totalBill: totalBillPaid(eventData.bills),
    ...eventData,
  };
  const queryClient = new QueryClient();
  const snackbarRef = useRef<any>(null);
  return (
    <AppProvider event={initialState}>
      <QueryClientProvider client={queryClient}>
        <div className="grid grid-cols-1 gap-3 px-3 pb-3 md:grid-cols-2 md:gap-5 md:px-8 md:pb-5 lg:grid-cols-3 lg:px-8 lg:pb-5">
          <SnackBar ref={snackbarRef} />
          <OfflineFirstColumn />
          <OfflineMiddleColumn snackbar={snackbarRef} />
          <OfflineLastColumn />
          <OfflineBottomColumn snackbar={snackbarRef} />
        </div>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AppProvider>
  );
};

export default Dashboard;
