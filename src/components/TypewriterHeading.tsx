import { useState, useEffect } from 'react';

const TypewriterHeading = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const texts = [
        "I'm Julach Earzan.",
        "I'm Software Engineer."
    ];

    useEffect(() => {
        let timer = setTimeout(() => {
            handleTyping();
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    const handleTyping = () => {
        const i = loopNum % texts.length;
        const fullText = texts[i];

        setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

        if (!isDeleting && text === fullText) {
            setTimeout(() => setIsDeleting(true), 1500);
            setTypingSpeed(100);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150);
        } else {
            setTypingSpeed(isDeleting ? 50 : 150);
        }
    };

    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 font-mono">
            <span className="text-slate-400">&gt; </span>
            {loopNum % texts.length === 0 ? (
                <>
                    <span className="text-rose-400/90">{text.slice(0, 3)}</span>
                    <span className="text-sky-300">{text.slice(3)}</span>
                </>
            ) : (
                <>
                    <span className="text-rose-400/90">{text.slice(0, 3)}</span>
                    <span className="text-cyan-300">{text.slice(3)}</span>
                </>
            )}
            <span className="animate-pulse inline-block w-2 sm:w-3 h-[1em] bg-primary/80 ml-1 sm:ml-2 align-middle -translate-y-[0.1em]" />
        </h1>
    );
};

export default TypewriterHeading;
