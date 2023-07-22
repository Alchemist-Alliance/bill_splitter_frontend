import { Variants } from "framer-motion";
import { BiRupee, BiShoppingBag } from "react-icons/bi";

export const items = [
  { Icon: BiShoppingBag, label: "Enter Item" },
  { Icon: BiRupee, label: "Enter Amount" },
];

export const friends = [
  { icon: "https://i.pravatar.cc/300", name: "Keshav" },
  { icon: "https://i.pravatar.cc/300", name: "Satyam" },
  { icon: "https://i.pravatar.cc/300", name: "Raunit" },
  { icon: "https://i.pravatar.cc/300", name: "Shaan" },
];

export const currentExpense = [
  { money: 800, name: "Me" },
  { money: 400, name: "Keshav" },
  { money: 500, name: "Satyam" },
  { money: 300, name: "Shaan" },
  { money: 0, name: "Raunit" },
];

export const colors = [
  { background: { r: 239, g: 92, b: 92 }, text: { r: 255, g: 244, b: 247 } },
  { background: { r: 253, g: 54, b: 78 }, text: { r: 255, g: 235, b: 235 } },
  { background: { r: 198, g: 34, b: 63 }, text: { r: 255, g: 241, b: 242 } },
  { background: { r: 250, g: 169, b: 202 }, text: { r: 107, g: 37, b: 66 } },
  { background: { r: 227, g: 79, b: 133 }, text: { r: 255, g: 226, b: 237 } },
  { background: { r: 205, g: 185, b: 241 }, text: { r: 60, g: 17, b: 121 } },
  { background: { r: 146, g: 98, b: 233 }, text: { r: 235, g: 222, b: 254 } },
  { background: { r: 118, g: 0, b: 204 }, text: { r: 224, g: 207, b: 255 } },
  { background: { r: 157, g: 185, b: 255 }, text: { r: 40, g: 42, b: 123 } },
  { background: { r: 78, g: 96, b: 182 }, text: { r: 222, g: 227, b: 255 } },
  { background: { r: 47, g: 54, b: 139 }, text: { r: 217, g: 228, b: 255 } },
  { background: { r: 190, g: 227, b: 249 }, text: { r: 39, g: 58, b: 75 } },
  { background: { r: 109, g: 200, b: 241 }, text: { r: 28, g: 74, b: 117 } },
  { background: { r: 54, g: 130, b: 234 }, text: { r: 242, g: 249, b: 253 } },
  { background: { r: 20, g: 64, b: 157 }, text: { r: 222, g: 240, b: 255 } },
  { background: { r: 118, g: 243, b: 233 }, text: { r: 27, g: 96, b: 109 } },
  { background: { r: 1, g: 196, b: 215 }, text: { r: 239, g: 253, b: 255 } },
  { background: { r: 25, g: 77, b: 113 }, text: { r: 211, g: 237, b: 252 } },
  { background: { r: 148, g: 255, b: 169 }, text: { r: 37, g: 100, b: 46 } },
  { background: { r: 155, g: 229, b: 61 }, text: { r: 37, g: 84, b: 20 } },
  { background: { r: 38, g: 127, b: 25 }, text: { r: 240, g: 248, b: 232 } },
  { background: { r: 255, g: 242, b: 126 }, text: { r: 174, g: 78, b: 24 } },
  { background: { r: 236, g: 182, b: 44 }, text: { r: 136, g: 43, b: 15 } },
  { background: { r: 136, g: 43, b: 15 }, text: { r: 254, g: 244, b: 196 } },
  { background: { r: 225, g: 214, b: 160 }, text: { r: 76, g: 64, b: 35 } },
  { background: { r: 242, g: 135, b: 13 }, text: { r: 94, g: 43, b: 12 } },
  { background: { r: 243, g: 84, b: 40 }, text: { r: 255, g: 232, b: 224 } },
];

export const listVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
