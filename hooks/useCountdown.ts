
import { useState, useEffect, useRef, useCallback } from 'react';

interface TimeLeft {
    total: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const calculateTimeLeft = (totalSeconds: number): TimeLeft => {
    if (totalSeconds <= 0) {
        return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { total: totalSeconds, hours, minutes, seconds };
};

export const useCountdown = (initialSeconds: number) => {
    const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setSecondsRemaining(prev => {
                    if (prev <= 1) {
                        clearTimer();
                        setIsActive(false); // Timer finishes
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearTimer();
        }
        return () => clearTimer();
    }, [isActive, isPaused, clearTimer]);

    const start = useCallback(() => {
        if (secondsRemaining > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    }, [secondsRemaining]);

    const pause = useCallback(() => {
        if (isActive && !isPaused) {
            setIsPaused(true);
        }
    }, [isActive, isPaused]);

    const resume = useCallback(() => {
        if (isActive && isPaused) {
            setIsPaused(false);
        }
    }, [isActive, isPaused]);

    const reset = useCallback((newSeconds?: number) => {
        clearTimer();
        setIsActive(false);
        setIsPaused(false);
        setSecondsRemaining(newSeconds !== undefined ? newSeconds : initialSeconds);
    }, [clearTimer, initialSeconds]);
    
    useEffect(() => {
      setSecondsRemaining(initialSeconds);
    }, [initialSeconds])

    return { time: calculateTimeLeft(secondsRemaining), isActive, isPaused, start, pause, resume, reset };
};
