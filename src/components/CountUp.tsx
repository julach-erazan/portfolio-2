import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

interface CountUpProps {
    from?: number;
    to: number;
    separator?: string;
    direction?: "up" | "down";
    duration?: number;
    className?: string;
    startCounting?: boolean;
}

export default function CountUp({
    from = 0,
    to,
    separator = ",",
    direction = "up",
    duration = 2,
    className = "",
    startCounting = true,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (!isInView && !startCounting) return;

        const node = ref.current;
        if (!node) return;

        const controls = animate(direction === "down" ? to : from, direction === "down" ? from : to, {
            duration: duration,
            onUpdate(value) {
                node.textContent = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            },
        });

        return () => controls.stop();
    }, [isInView, startCounting, to, from, direction, duration, separator]);

    return <span ref={ref} className={className}>{from}</span>;
}
