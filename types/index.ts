import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface event {
  __expires: number;
  bills: Bills;
  key: string;
  name: string;
  owner: string;
  totalBill: number;
  status: Status;
  users: Users[];
}

export interface AppState extends event {
  addUser: (user: Users) => void;
  addBill: (bill: billState) => void;
  restoreUsers: (users: Users[]) => void;
}

export interface Users {
  bills: { [key: string]: number };
  expenses: number;
  key: string;
  name: string;
  status: Status;
}

interface Bills {
  [key: string]: {
    amount: number;
    name: string;
    shared_amount: number;
  };
}

enum Status {
  INACTIVE = 0,
  TEMPORARY = 1,
  PERMANENT = 2,
}
export interface memberExpense {
  [key: string]: { item: string; amount: string }[];
}

export interface summaryState {
  memberNames: string[];
  memberExpenses: memberExpense;
  totalBill: number;
}

export interface ReducerAction {
  type: string;
  payload?: any;
  payload2?: any;
}

export const snackBarIconType = {
  FaCheckCircle,
  FaTimesCircle,
};

export interface snackBarState {
  message: string;
  iconType: IconType;
  classname: string;
}

export type AppProviderProps = {
  children: React.ReactNode;
  event: event;
};

export type billInputState = {
  billName: string;
  updateBillName: (billName: string) => void;
};

export type userInputState = {
  userName: string;
  updateUserName: (userName: string) => void;
};

export type draweeType = {
  [key: number]: string;
};

export type draweeState = {
  openState: boolean;
  drawees: draweeType;
  addDrawee: (draweeIndex: number, draweeName: string) => void;
  deleteDrawee: (index: number) => void;
  resetDrawees: () => void;
  setOpenState: () => void;
};

export type payeeType = {
  [key: string]: string;
};

export type payeeState = {
  openState: boolean;
  payees: payeeType;
  contributions: string;
  selectedPayee: string;
  setSelectedPayee: (payeeIndex: string) => void;
  setPayeeContribution: (payeeContribution: string) => void;
  resetPayeeContribution: () => void;
  resetPayees: () => void;
  setOpenState: () => void;
};

export type billState = {
  billId: string;
  billName: string;
  billAmount: number;
  usersWithBillAdded: Users[];
};
