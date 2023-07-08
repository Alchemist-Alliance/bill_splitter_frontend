"use client";

import { colors } from "@/data";
import { ReducerAction, appState } from "@/types";
import { Reducer } from "react";

export const randomColorPicker = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const backgroundColor =
    "#" +
    colorToHex(color.background.r) +
    colorToHex(color.background.g) +
    colorToHex(color.background.b);

  const textColor =
    "#" +
    colorToHex(color.text.r) +
    colorToHex(color.text.g) +
    colorToHex(color.text.b);

  return [backgroundColor, textColor];
};

const colorToHex = (color: number) => {
  const hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
};

export const firstWordPicker = (name: string) => {
  const [firstName, secName] = name.split(" ");
  return secName
    ? firstName.slice(0, 1).toUpperCase() + secName.slice(0, 1).toUpperCase()
    : firstName.slice(0, 1).toUpperCase();
};

export const userBillPaid = (
  totalUserItems: { item: string; amount: string }[]
): number => {
  let total = 0;
  if (totalUserItems) {
    for (let i of totalUserItems) {
      total += Number(i.amount);
    }
    return total;
  } else {
    return 0;
  }
};

const updateLocalStorage = (state: appState) => {
  const trip = localStorage.getItem("trip");
  const tripId = localStorage.getItem("currentTripId");
  if (!trip) {
    const newTrip = {
      [tripId as string]: state,
    };
    localStorage.trip = JSON.stringify(newTrip);
  } else {
    const tripDetail = JSON.parse(trip);
    tripDetail[tripId as string] = state;
    localStorage.trip = JSON.stringify(tripDetail);
  }
};

export const reducer: Reducer<appState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case "setInitData":
      updateLocalStorage({
        ...state,
        ...action.payload.data,
        loading: action.payload.loading,
      });

      return {
        ...state,
        ...action.payload.data,
        loading: action.payload.loading,
      };

    case "setSelectedUser":
      updateLocalStorage({
        ...state,
        selectedUser: action.payload,
      });
      return {
        ...state,
        selectedUser: action.payload,
      };

    case "addItems":
      const prevMemberExpense =
        state["memberExpenses"][state.selectedUser] || [];

      updateLocalStorage({
        ...state,
        memberExpenses: {
          ...state.memberExpenses,
          [state.selectedUser]: [...prevMemberExpense, ...action.payload],
        },
        totalBill: action.payload2,
      });
      return {
        ...state,
        memberExpenses: {
          ...state.memberExpenses,
          [state.selectedUser]: [...prevMemberExpense, ...action.payload],
        },
        totalBill: action.payload2,
      };

    case "removeItems":
      const removedExpense = state["memberExpenses"][
        action.payload.user
      ].splice(action.payload.index, 1);

      const newBill = state.totalBill - Number(removedExpense[0]["amount"]);

      updateLocalStorage({
        ...state,
        totalBill: newBill,
      });
      return {
        ...state,
        totalBill: newBill,
      };

    case "addMembers":
      updateLocalStorage({
        ...state,
        memberNames: [...state.memberNames, ...action.payload],
      });
      return {
        ...state,
        memberNames: [...state.memberNames, ...action.payload],
      };

    case "removeMembers":
      let newAmount = state.totalBill;
      if (state["memberExpenses"][action.payload2]) {
        newAmount -= userBillPaid(state["memberExpenses"][action.payload2]);
        delete state["memberExpenses"][action.payload2];
      }

      updateLocalStorage({
        ...state,
        memberNames: [...action.payload],
        totalBill: newAmount,
        selectedUser:
          state.selectedUser === action.payload2 ? "" : state.selectedUser,
      });
      return {
        ...state,
        memberNames: [...action.payload],
        totalBill: newAmount,
        selectedUser:
          state.selectedUser === action.payload2 ? "" : state.selectedUser,
      };

    default:
      return state;
  }
};
