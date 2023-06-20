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