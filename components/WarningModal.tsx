import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface WarningModalProps {
    isOpen: boolean;
    message: string;
    duration?: number;
    onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, message, duration, onClose }) => {
    
    useEffect(() => {
        if (isOpen && duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose, message]); // Include message to reset timer on content change

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } }
    };

    const isCountdownNumber = !isNaN(parseInt(message, 10)) && message.length <= 2;
    const textSizeClass = isCountdownNumber
        ? 'text-9xl md:text-[16rem] lg:text-[20rem]'
        : 'text-4xl md:text-6xl lg:text-8xl';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="warning-modal"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="bg-black/30 backdrop-blur-2xl border-2 border-red-500/50 p-8 md:p-12 rounded-xl shadow-2xl shadow-red-900/80 text-center max-w-4xl mx-4">
                        <h2 className={`${textSizeClass} font-black text-red-500 text-shadow-glow whitespace-pre-wrap`}>
                            {message}
                        </h2>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WarningModal;