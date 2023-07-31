"use client";
import { motion } from "framer-motion";

const Loader = ({
  classname,
  color,
}: {
  classname?: string;
  color: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center ${classname}`}
    >
      <svg
        width="27.5"
        height="auto"
        viewBox="0 0 12 12"
        fill="none"
        stroke={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6"
          cy="6"
          r="5"
          strokeLinecap="round"
          strokeDasharray="31.416"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="360 6 6"
            to="0 6 6"
            dur="1s"
            additive="sum"
            repeatCount="indefinite"
          ></animateTransform>
          <animate
            attributeName="stroke-dashoffset"
            attributeType="xml"
            from="31.416"
            to="12.566"
            dur="0.9s"
            fill="freeze"
          ></animate>
          <animate
            attributeName="stroke-width"
            attributeType="xml"
            from="0"
            to="1"
            dur="0.5s"
            fill="freeze"
          ></animate>
        </circle>
        <circle
          cx="6"
          cy="6"
          r="3"
          strokeLinecap="round"
          strokeDasharray="11.31"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 6 6"
            to="360 6 6"
            dur="1s"
            additive="sum"
            repeatCount="indefinite"
          ></animateTransform>
          <animate
            attributeName="stroke-dashoffset"
            attributeType="xml"
            from="31.416"
            to="12.566"
            dur="0.9s"
            fill="freeze"
          ></animate>
          <animate
            attributeName="stroke-width"
            attributeType="xml"
            from="0"
            to="1"
            dur="0.5s"
            fill="freeze"
          ></animate>
        </circle>
      </svg>
    </motion.div>
  );
};

export default Loader;
