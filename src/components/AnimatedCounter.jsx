import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

const AnimatedCounter = ({ value, formatter }) => {
    const prevValue = useRef(value);
    const count = useSpring(value, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        count.set(value);
    }, [value, count]);

    const display = useTransform(count, (latest) => formatter(latest));

    return (
        <motion.div
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="tabular-nums"
        >
            <motion.span>{display}</motion.span>
        </motion.div>
    );
};

export default AnimatedCounter;
