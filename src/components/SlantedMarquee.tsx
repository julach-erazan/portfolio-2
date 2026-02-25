import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue
} from "motion/react";
import { wrap } from "motion/react";
import Icon from "tech-stack-icons";

interface SlantedMarqueeProps {
    techStacks: string[][]; // Array of icon name arrays
    baseVelocity?: number;
    className?: string;
    angle?: number;
}

function MarqueeRow({ icons, baseVelocity = 100 }: { icons: string[], baseVelocity: number }) {
    const baseX = useMotionValue<number>(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-10, -35, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="flex whitespace-nowrap flex-nowrap py-4">
            <motion.div className="flex whitespace-nowrap flex-nowrap items-center gap-20" style={{ x }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-20">
                        {icons.map((name) => (
                            <div key={name} className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-125">
                                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 group">
                                    <Icon name={name === 'reactjs' ? 'react' : name === 'nextjs' ? 'nextjs2' : name} className="w-full h-full" />
                                </div>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{name}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function SlantedMarquee({ techStacks, baseVelocity = 5, className = "", angle = -3 }: SlantedMarqueeProps) {
    return (
        <section className={`relative overflow-hidden z-20 ${className}`} style={{ transform: `rotate(${angle}deg)` }}>
            <div className="flex flex-col gap-16">
                {techStacks.map((row, index) => (
                    <MarqueeRow key={index} icons={row} baseVelocity={index % 2 === 0 ? baseVelocity : -baseVelocity} />
                ))}
            </div>
        </section>
    );
}
