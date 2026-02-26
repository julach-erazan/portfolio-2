import type { ReactNode } from "react";

interface AngledSectionProps {
    children: ReactNode;
    angle?: number;
    className?: string;
    backgroundColor?: string;
}

export default function AngledSection({
    children,
    angle = -2,
    className = "",
    backgroundColor = "transparent"
}: AngledSectionProps) {
    // We apply the rotation to the main container and then rotate the children back
    // to keep the content straight while the "edges" are angled.
    return (
        <section className={`relative py-32 overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor,
                    transform: `skewY(${angle}deg)`,
                    width: '120%',
                    left: '-10%'
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
}
