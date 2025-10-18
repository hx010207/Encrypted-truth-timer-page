import React from 'react';
import { motion } from 'framer-motion';

const title = "ENCRYPTED TRUTH";
const chars = title.split('');

const Title: React.FC = () => {
    return (
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.3em] uppercase" aria-label={title}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    animate={{
                        opacity: 1,
                        textShadow: [
                            `0 0 15px rgba(239, 68, 68, 0.7)`,
                            `0 0 22px rgba(239, 68, 68, 0.9)`,
                            `0 0 15px rgba(239, 68, 68, 0.7)`,
                        ],
                    }}
                    transition={{
                        textShadow: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="inline-block text-red-500"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </h1>
    );
};

export default Title;
