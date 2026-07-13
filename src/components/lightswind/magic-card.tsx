"use client";

import Image from "next/image";
import React, { useRef, MouseEvent, useId } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLElement> {
    imageUrl?: string;
    imageAlt?: string;
    title?: string;
    icon?: React.ReactNode;
}

export const MagicCard = ({
    imageUrl,
    imageAlt,
    title,
    icon,
    children,
    className,
    ...props
}: MagicCardProps) => {
    const cardRef = useRef<HTMLElement>(null);
    const id = useId();
    // Sanitize ID for use in URL
    const filterId = `magic-card-blur-${id.replace(/:/g, '')}`;

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const relativeX = e.clientX - centerX;
        const relativeY = e.clientY - centerY;

        // Normalize to -1 to 1 range
        const x = (relativeX / (rect.width / 2)).toFixed(3);
        const y = (relativeY / (rect.height / 2)).toFixed(3);

        card.style.setProperty('--pointer-x', x);
        card.style.setProperty('--pointer-y', y);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        // Reset to default "off-screen" position, matching the default fallback
        card.style.setProperty('--pointer-x', '-10');
        card.style.setProperty('--pointer-y', '-10');
    };

    const effectLayer = imageUrl ? (
        <>
            <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] grid place-items-center opacity-20 transition-opacity duration-300 group-hover/magic-card:opacity-80"
                style={{
                    transform: "translateZ(0)",
                    filter: `url(#${filterId}) saturate(5) brightness(1.3) contrast(1.4)`,
                    translate: "calc(var(--pointer-x, -10) * 50cqi) calc(var(--pointer-y, -10) * 50cqh)",
                    scale: "3.4",
                    willChange: "transform, filter",
                }}
            >
                <Image src={imageUrl} alt="" width={100} height={100} className="select-none" />
            </div>

            <div
                className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] border-[3px] border-transparent backdrop-blur-sm backdrop-saturate-[4.2] backdrop-brightness-[2.5] backdrop-contrast-[2.5]"
                style={{
                    mask: "linear-gradient(#fff 0 100%) border-box, linear-gradient(#fff 0 100%) padding-box",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                }}
            />

            <svg className="pointer-events-none absolute h-0 w-0 overflow-visible opacity-0">
                <defs>
                    <filter id={filterId} width="500%" height="500%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
                    </filter>
                </defs>
            </svg>
        </>
    ) : null;

    return (
        <article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group/magic-card relative overflow-hidden rounded-xl transition-all duration-300 [container-type:size]",
                className
            )}
            {...props}
        >
            {effectLayer}
            {children ? (
                <div className="relative z-[4] flex h-full flex-col justify-between">{children}</div>
            ) : (
                <div className="relative z-[4] grid h-full place-items-center gap-2">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt ?? title ?? ""}
                            width={100}
                            height={100}
                            className="select-none"
                        />
                    ) : null}
                    {icon}
                    {title ? (
                        <h2 className="m-0 select-none text-base font-medium text-neutral-900 dark:text-neutral-100">
                            {title}
                        </h2>
                    ) : null}
                </div>
            )}
        </article>
    );
};
