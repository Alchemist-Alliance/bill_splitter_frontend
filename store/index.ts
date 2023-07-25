import {
  AppState,
  Users,
  billInputState,
  billState,
  draweeState,
  event,
  payeeState,
  userInputState,
} from "@/types";

import { create, createStore } from "zustand";
import { createContext } from "react";
import { produce } from "immer";

export type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initProps: event) => {
  return createStore<AppState>()((set) => ({
    ...initProps,
    addUser: (user: Users) =>
      set(
        produce((state) => {
          state.users.push(user);
        })
      ),
    restoreUsers: (users: Users[]) =>
      set(
        produce((state) => {
          state.users = users;
        })
      ),
    addBill: (bill: billState) =>
      set(
        produce((state) => {
          state.users = bill.usersWithBillAdded;
          state.totalBill += bill.billAmount;
          state.bills[bill.billId] = {
            amount: bill.billAmount,
            name: bill.billName,
            shared_amount: bill.sharedAmount,
          };
        })
      ),
  }));
};

export const AppContext = createContext<AppStore | null>(null);

const useBillInput = create<billInputState>((set) => ({
  billName: "",
  updateBillName: (billName: string) => set(() => ({ billName: billName })),
}));

const useUserInput = create<userInputState>((set) => ({
  userName: "",
  updateUserName: (userName: string) => set(() => ({ userName: userName })),
}));

const useDrawee = create<draweeState>((set) => ({
  openState: false,
  drawees: {},
  addDrawee: (draweeIndex: number, draweeName: string) =>
    set(
      produce((state: draweeState) => {
        state.drawees[draweeIndex] = draweeName;
      })
    ),
  deleteDrawee: (index: number) =>
    set(
      produce((state: draweeState) => {
        delete state.drawees[index];
      })
    ),
  resetDrawees: () => set(() => ({ drawees: {} })),
  setOpenState: () => set((state) => ({ openState: !state.openState })),
}));

const usePayee = create<payeeState>((set) => ({
  openState: false,
  payees: {},
  contributions: "",
  selectedPayee: "",
  setSelectedPayee: (payeeIndex: string) =>
    set(() => ({ selectedPayee: payeeIndex })),
  setPayeeContribution: (payeeContribution: string) =>
    set(
      produce((state) => {
        state.payees[state.selectedPayee] = payeeContribution;
      })
    ),
  resetPayeeContribution: () =>
    set(
      produce((state) => {
        state.payees[state.selectedPayee] = "";
      })
    ),
  resetPayees: () => set(() => ({ payees: {}, selectedPayee: "" })),
  setOpenState: () => set((state) => ({ openState: !state.openState })),
}));

export { useBillInput, useUserInput, useDrawee, usePayee };
