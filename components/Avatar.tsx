import { firstWordPicker, randomColorPicker } from "@/utils";
import Image from "next/image";
import React from "react";

export default function Avatar({ width, height, src, className }: {
    width?: number,
    height?: number,
    src: string,
    className?: string
}) {
    return (
        <Image
            className={`rounded-full border-4 ${className}`}
            width={width ?? 50}
            height={height ?? 50}
            src={src}
            alt="daddy"
        />
    )
}

export function NamedAvatar({ name, className }: {
    name: string,
    className?: string
}) {

    const [backgroundColor, textColor] = randomColorPicker()
    return (
        <div className={`flex items-center justify-center rounded-full border-4 ${className}`} style={{ backgroundColor: backgroundColor, borderColor: textColor }}>
            <p className="font-bold text-xl" style={{ color: textColor }}>
                {firstWordPicker(name)}
            </p>
        </div>
    )
}