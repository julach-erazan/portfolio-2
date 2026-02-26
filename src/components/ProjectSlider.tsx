import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink } from "lucide-react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string;
}

interface ProjectSliderProps {
    projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLAnchorElement>(null);

    // Mouse move values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Glare position
    const glareX = useSpring(useMotionValue(50), { damping: 20, stiffness: 150 });
    const glareY = useSpring(useMotionValue(50), { damping: 20, stiffness: 150 });

    // Smooth rotation values
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

    const cardContent = (
        <>
            {/* Project image background */}
            {project.image && (
                <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
                    <img
                        src={project.image.startsWith('/') ? project.image : `/${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Hover overlay: transparent blur + title, description, tags */}
            <div
                className="absolute inset-0 z-10 rounded-3xl bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                style={{ transform: "translateZ(20px)" }}
            >
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                    {project.title}
                    <ExternalLink size={16} className="text-white/80" />
                </h3>
                {project.description && (
                    <p className="text-white/90 text-sm font-light leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                    </p>
                )}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-mono bg-white/20 px-2 py-1 rounded-md text-white uppercase tracking-tighter"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Glare/Shine Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: glareBackground }}
            />
        </>
    );

    return (
        <div className="perspective-[1000px] py-4 h-full min-h-[260px]">
            <motion.a
                ref={cardRef}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full min-h-[240px] block rounded-3xl border border-white/5 hover:border-white/20 transition-colors duration-500 group relative overflow-hidden cursor-pointer aspect-[4/3]"
            >
                {project.image ? cardContent : (
                    <>
                        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 p-8 flex flex-col h-full glass rounded-3xl">
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors uppercase tracking-tight mb-4">
                                {project.title}
                            </h3>
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
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: glareBackground }}
                        />
                    </>
                )}
            </motion.a>
        </div>
    );
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
    return (
        <div className="relative w-full container mx-auto px-6">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 pt-4"
            >
                {projects.map((project, index) => (
                    <div key={index} className="flex justify-center min-h-[260px]">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}
