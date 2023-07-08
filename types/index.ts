import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { IconType } from "react-icons";

export interface appState {
  memberNames: string[];
  memberExpenses: memberExpense;
  tripName: string;
  creationDate: number;
  loading: boolean;
  selectedUser: string;
  totalBill: number;
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
