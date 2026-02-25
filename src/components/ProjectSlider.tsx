import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
}

interface ProjectSliderProps {
    projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse move values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Glare position
    const glareX = useSpring(useMotionValue(50), { damping: 20, stiffness: 150 });
    const glareY = useSpring(useMotionValue(50), { damping: 20, stiffness: 150 });

    // Smooth rotation values
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate normalized mouse position (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseX.set(x - 0.5);
        mouseY.set(y - 0.5);

        // Update glare position (0 to 100)
        glareX.set(x * 100);
        glareY.set(y * 100);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        glareX.set(50);
        glareY.set(50);
    };

    const glareBackground = useTransform(
        [glareX, glareY],
        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.15) 0%, transparent 80%)`
    );

    return (
        <div className="perspective-[1000px] py-4 h-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full p-8 glass rounded-3xl border-white/5 hover:border-white/20 transition-colors duration-500 group relative overflow-hidden cursor-pointer flex flex-col"
            >
                {/* Content with translateZ for depth */}
                <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors uppercase tracking-tight">
                            {project.title}
                        </h3>
                        {project.link.startsWith('http') ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={20} className="text-white/20 group-hover:text-white transition-colors" />
                            </a>
                        ) : (
                            <Link to={project.link} target="_blank">
                                <ExternalLink size={20} className="text-white/20 group-hover:text-white transition-colors" />
                            </Link>
                        )}
                    </div>
                    <p className="text-white/50 mb-6 font-light leading-relaxed flex-grow">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded-md text-white/40 uppercase tracking-tighter"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Glare/Shine Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: glareBackground }}
                />

                {/* Subtle border glow that follows mouse */}
                <motion.div
                    className="absolute inset-0 border border-white/10 rounded-3xl z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: useTransform(
                            glareBackground,
                            (v) => `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)) padding-box, ${v} border-box`
                        )
                    }}
                />
            </motion.div>
        </div>
    );
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
    return (
        <div className="relative w-full container mx-auto px-6">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 pt-4"
            >
                {projects.map((project, index) => (
                    <div key={index} className="flex justify-center h-full">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}
