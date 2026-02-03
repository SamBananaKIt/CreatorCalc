import React, { useState, useEffect } from 'react';
import { calculateRevenue, USD_TO_THB } from '../utils/calculations';
import { Calculator as CalcIcon, Video, Eye, DollarSign, AlertCircle, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const InputField = ({ label, icon: Icon, value, onChange, min, max, step, error, type = "number" }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Icon size={16} className="text-red-500" />
            {label}
        </label>
        <div className="relative group">
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                min={min}
                max={max}
                step={step}
                className={cn(
                    "w-full px-4 py-4 bg-white dark:bg-gray-800/50 border rounded-2xl outline-none transition-all duration-300",
                    "focus:ring-4 focus:ring-red-500/10 focus:border-red-500 shadow-sm",
                    "input-glass",
                    error ? "border-red-500" : "border-gray-100 dark:border-gray-700/50 group-hover:border-red-200 dark:group-hover:border-red-500/30"
                )}
            />
            {error && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                    <AlertCircle size={18} />
                </div>
            )}
        </div>
        <AnimatePresence>
            {error && (
                <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-500 mt-1 font-medium pl-1"
                >
                    {error}
                </motion.span>
            )}
        </AnimatePresence>
    </div>
);

const Calculator = ({ onCalculate, currency, onCurrencyChange }) => {
    const [inputs, setInputs] = useState({
        videosPerDay: 1,
        averageViews: 10000,
        rpm: 5.7,
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = "";
        const val = parseFloat(value);

        if (name === "videosPerDay") {
            if (val < 0) error = "Negative videos? Interesting!";
            if (val > 100) error = "Take some rest, creator!";
        } else if (name === "averageViews") {
            if (val < 0) error = "Views cannot be negative";
        } else if (name === "rpm") {
            if (val < 0) error = "RPM cannot be negative";
            if (val > 1000) error = "RPM limit exceeded";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleChange = (name, value) => {
        setInputs(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleCurrencyToggle = (newCurr) => {
        if (newCurr === currency) return;

        // Perform conversion for RPM
        const currentRpm = parseFloat(inputs.rpm) || 0;
        let newRpm = currentRpm;

        if (newCurr === 'THB' && currency === 'USD') {
            newRpm = currentRpm * USD_TO_THB;
        } else if (newCurr === 'USD' && currency === 'THB') {
            newRpm = currentRpm / USD_TO_THB;
        }

        setInputs(prev => ({ ...prev, rpm: Number(newRpm.toFixed(2)) }));
        onCurrencyChange(newCurr);
    };

    useEffect(() => {
        const isValid = Object.values(errors).every(e => !e) &&
            inputs.videosPerDay >= 0 &&
            inputs.averageViews >= 0 &&
            inputs.rpm >= 0;

        if (isValid) {
            // Calculate using 30 days for monthly
            const monthlyVideos = inputs.videosPerDay * 30;
            const results = calculateRevenue(
                monthlyVideos,
                inputs.averageViews,
                inputs.rpm
            );
            onCalculate(results);
        }
    }, [inputs, errors, onCalculate]);

    return (
        <motion.div
            layout
            className="glass-card p-8 md:p-10 space-y-8 luxury-shadow border-none relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 -mr-32 -mt-32 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl text-white shadow-xl shadow-red-500/30">
                        <CalcIcon size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Revenue Estimator</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Fine-tune your growth engine</p>
                    </div>
                </div>

                <div className="flex bg-gray-100/50 dark:bg-gray-800/80 p-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    {['THB', 'USD'].map((curr) => (
                        <button
                            key={curr}
                            onClick={() => handleCurrencyToggle(curr)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 transform",
                                currency === curr
                                    ? "bg-white dark:bg-gray-700 shadow-lg text-red-500 scale-105"
                                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            {curr}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <InputField
                    label="Videos per Day"
                    icon={Video}
                    value={inputs.videosPerDay}
                    onChange={(val) => handleChange('videosPerDay', val)}
                    min={0}
                    error={errors.videosPerDay}
                />
                <InputField
                    label="Avg Views per Video"
                    icon={Eye}
                    value={inputs.averageViews}
                    onChange={(val) => handleChange('averageViews', val)}
                    min={0}
                    error={errors.averageViews}
                />
                <InputField
                    label={`RPM (${currency})`}
                    icon={DollarSign}
                    value={inputs.rpm}
                    onChange={(val) => handleChange('rpm', val)}
                    min={0}
                    max={1000}
                    step={0.01}
                    error={errors.rpm}
                />
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    <RefreshCw size={12} className="animate-spin-slow" />
                    Real-time Projection
                </div>
                <button
                    className="text-gray-400 hover:text-red-500 font-bold text-sm transition-all flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl"
                    onClick={() => setInputs({ videosPerDay: 1, averageViews: 10000, rpm: 5.7 })}
                >
                    Reset Defaults
                </button>
            </div>
        </motion.div>
    );
};

export default Calculator;
