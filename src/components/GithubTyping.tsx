import { useState, useEffect } from 'react';

const GithubTyping = () => {
    const [text, setText] = useState('');
    const [phase, setPhase] = useState<'typing1' | 'typing2' | 'done'>('typing1');

    const line1 = "I'm Julach Earzan.";
    const line2 = "I'm Software Engineer";

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (phase === 'typing1') {
            if (text.length < line1.length) {
                timeout = setTimeout(() => {
                    setText(line1.slice(0, text.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => setPhase('typing2'), 500);
            }
        } else if (phase === 'typing2') {
            const currentLine2Length = text.length - line1.length;
            if (currentLine2Length < line2.length) {
                timeout = setTimeout(() => {
                    setText(line1 + '\n' + line2.slice(0, currentLine2Length + 1));
                }, 100);
            } else {
                setPhase('done');
            }
        }

        return () => clearTimeout(timeout);
    }, [text, phase, line1, line2]);

    const renderText = () => {
        const lines = text.split('\n');
        return (
            <div className="font-mono text-left bg-[#0d1117] p-6 rounded-xl border border-[#30363d] shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="ml-2 text-xs text-[#8b949e]">developer.ts</span>
                </div>
                <div className="pt-6">
                    {lines.map((l, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="text-[#6e7681] select-none">{i + 1}</span>
                            <span className="text-[#c9d1d9] whitespace-pre">
                                {i === 0 && l.length > 0 ? (
                                    <>
                                        <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">developer</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#a5d6ff]">"{l.replace("I'm ", "")}"</span><span className="text-[#c9d1d9]">;</span>
                                    </>
                                ) : i === 1 && l.length > 0 ? (
                                    <>
                                        <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">role</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#a5d6ff]">"{l.replace("I'm ", "")}"</span><span className="text-[#c9d1d9]">;</span>
                                    </>
                                ) : null}
                                {i === lines.length - 1 && phase !== 'done' && (
                                    <span className="animate-pulse inline-block w-2 bg-[#c9d1d9] h-5 ml-1 align-middle"></span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return renderText();
};

export default GithubTyping;
