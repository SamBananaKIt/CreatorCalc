import React from 'react';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { TrendingUp, Calendar, Clock, Briefcase, Info, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const StatCard = ({ title, numericValue, subtitle, icon: Icon, delay = 0, currency }) => (
    // ... (StatCard code remains same as previous edit)
    <motion.div
        key={numericValue} // Trigger animation on value change
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
            delay: delay * 0.5,
            duration: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
        className="glass-card p-8 flex flex-col justify-between border-none luxury-shadow min-h-[200px] relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-500 shadow-inner group-hover:scale-110 transition-transform">
                <Icon size={22} />
            </div>
            <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                {title}
            </div>
        </div>

        <div className="relative z-10">
            <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter truncate">
                <AnimatedCounter
                    value={numericValue}
                    formatter={(val) => formatCurrency(val, currency)}
                />
            </div>
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 flex items-center gap-2">
                <div className="flex items-center gap-1 text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                    <TrendingUp size={12} />
                    <span>GROWTH</span>
                </div>
                {subtitle}
            </div>
        </div>
    </motion.div>
);

const ResultsDisplay = ({ results, currency = 'THB' }) => {
    if (!results) return null;

    const stats = [
        { title: 'Daily Revenue', numericValue: results.dailyRevenue, subtitle: 'Avg. per day', icon: Clock },
        { title: 'Monthly Revenue', numericValue: results.monthlyRevenue, subtitle: 'Est. per month', icon: Calendar },
        { title: 'Annual Revenue', numericValue: results.annualRevenue, subtitle: 'Yearly projection', icon: TrendingUp },
        { title: 'Channel Value', numericValue: results.totalChannelValue, subtitle: 'Based on 2.5x annual', icon: Briefcase },
    ];

    const breakdownRows = [
        { label: 'Total Monthly Views', value: formatNumber(results.totalViews), icon: Eye },
        { label: 'Estimated Impressions', value: formatNumber(results.impressions), icon: Zap },
        { label: 'Revenue per 1k Views', value: formatCurrency(results.revenuePer1K, currency), icon: Zap },
        { label: 'Effective RPM', value: formatCurrency(results.effectiveRPM, currency), icon: TrendingUp },
    ];

    return (
        <div className="space-y-12 animate-fade-in text-gray-900 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <StatCard key={stat.title} {...stat} delay={idx * 0.1} currency={currency} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card overflow-hidden luxury-shadow border-none"
            >
                <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800/50 flex items-center justify-between bg-white/50 dark:bg-gray-800/30">
                    <h3 className="font-black tracking-tight text-xl flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                        Analytics Deep-Dive
                    </h3>
                    <Info size={18} className="text-gray-400" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-900/30 text-[10px] uppercase text-gray-400 dark:text-gray-500 font-black tracking-widest">
                                <th className="px-8 py-4">Metric Category</th>
                                <th className="px-8 py-4 text-right">Optimized Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                            {breakdownRows.map((row) => (
                                <tr key={row.label} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all font-sans">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-all">
                                                <row.icon size={16} />
                                            </div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{row.label}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right font-black text-gray-900 dark:text-white text-base tracking-tighter">
                                        {row.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultsDisplay;
