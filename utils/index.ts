"use client";

import { colors } from "@/data";
import { Users, draweeType, payeeType, snackBarIconType } from "@/types";
import { MutableRefObject } from "react";

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

export const userBillPaid = (totalUserBills: {
  [key: string]: number;
}): number => {
  let total = 0;
  for (let i of Object.keys(totalUserBills)) {
    total += totalUserBills[i];
  }
  return total;
};

export const userItems = (
  totalBills: {
    [key: string]: { amount: number; name: string; shared_amount: number };
  },
  userBills: { [key: string]: number }
): { item: string; amount: number }[] => {
  const items = [];
  for (let i of Object.keys(userBills)) {
    if (userBills[i] !== 0) {
      items.push({ item: totalBills[i]["name"], amount: userBills[i] });
    }
  }
  return items;
};

export const showSnackBar = (
  snackbar: MutableRefObject<any>,
  message: string,
  type: "success" | "error"
) => {
  const style = {
    success: {
      backgroundColor: "#073042",
      color: "#6DD58C",
      borderColor: "#6DD58C",
    },
    error: {
      backgroundColor: "#FED0D0",
      color: "#F56C6C",
      borderColor: "#F56C6C",
    },
  };

  const snackBarIcons = {
    success: snackBarIconType.FaCheckCircle,
    error: snackBarIconType.FaTimesCircle,
  };

  return snackbar?.current?.show(message, snackBarIcons[type], style[type]);
};

export const initialDraweeState = (users: Users[]) => {
  const draweeState: { [key: number]: string } = {};
  for (let i = 0; i < users.length; i++) {
    draweeState[i] = users[i].name;
  }
  return draweeState;
};

export function titleCase(str: string) {
  return str
    .split(" ")
    .map(function (word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const totalBillPaid = (totalBills: {
  [key: string]: { amount: number; name: string; shared_amount: number };
}) => {
  let total: number = 0;
  for (let i of Object.keys(totalBills)) {
    total += totalBills[i].amount;
  }
  return total;
};

export const sendBillToBackend = async (billObj: {
  event_key: string;
  name: string;
  amount: string;
  drawees: number[];
  payees: { [key: string]: string };
  notes: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create_bill`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(billObj),
    }
  );
  return response.json();
};

export const sendUserToBackend = async (userObj: {
  event_key: string;
  user_names: string[];
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/add_new_user`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userObj),
    }
  );
  return response.json();
};

export const formatDrawees = (drawees: draweeType) => {
  const formattedDrawees: number[] = [];
  for (let i of Object.keys(drawees)) {
    formattedDrawees.push(Number(i));
  }
  return formattedDrawees;
};

export const calculateContributions = (payees: payeeType) => {
  let contributions: number = 0;
  for (let i of Object.keys(payees)) {
    contributions += Number(payees[i]);
  }
  return contributions;
};
