/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

import './BlurText.css';

const BlurText = ({ text, delay = 200, className = '' }: { text: string; delay?: number; className?: string; }) => {
    const words = text.split(' ');
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const springs = useSprings(
        words.length,
        words.map((_, i) => ({
            from: { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' },
            to: inView
                ? async (next: any) => {
                    await next({ filter: 'blur(5px)', opacity: 0.5, transform: 'translate3d(0,5px,0)' });
                    await next({ filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' });
                }
                : { filter: 'blur(10px)', opacity: 0 },
            delay: i * delay,
        }))
    );

    return (
        <p ref={ref} className={className}>
            {springs.map((props: any, index: number) => (
            <animated.span key={index} style={props} className="word">
                {words[index]}&nbsp;
            </animated.span>
            ))}
        </p>
    );
};

export default BlurText;