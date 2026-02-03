import React, { useState, useMemo } from 'react';
import { formatCurrency, calculateAllocation, projectInvestment } from '../utils/calculations';
import { Wallet, Wrench, LineChart, TrendingUp, Info, ArrowRight, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const AllocationCard = ({ title, percentage, amount, annualAmount, icon: Icon, colorClass, description, currency }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`glass-card p-8 border-none luxury-shadow relative overflow-hidden group`}
    >
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl -mr-16 -mt-16 rounded-full group-hover:opacity-20 transition-opacity ${colorClass.replace('text-', 'bg-')}`}></div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`p-4 rounded-2xl ${colorClass.replace('text-', 'bg-').replace('500', '500/10')} ${colorClass}`}>
                <Icon size={28} />
            </div>
            <span className={`text-3xl font-black opacity-10 group-hover:opacity-30 transition-opacity ${colorClass}`}>{percentage}%</span>
        </div>

        <h3 className="text-xl font-black mb-2 relative z-10 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium relative z-10 leading-relaxed">{description}</p>

        <div className="space-y-2 relative z-10">
            <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                {formatCurrency(amount, currency)}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">/mo</span>
            </div>
            <div className="text-sm font-bold text-gray-400 flex items-center gap-2">
                <div className="w-4 h-px bg-gray-200 dark:bg-gray-700"></div>
                {formatCurrency(annualAmount, currency)} <span className="text-[10px] opacity-60">ANNUAL</span>
            </div>
        </div>
    </motion.div>
);

const RevenueAllocation = ({ monthlyRevenue, currency = 'THB' }) => {
    const [projectionYears, setProjectionYears] = useState(10);
    const allocation = useMemo(() => calculateAllocation(monthlyRevenue), [monthlyRevenue]);

    const projections = useMemo(() =>
        projectInvestment(allocation.investment, projectionYears),
        [allocation.investment, projectionYears]
    );

    const latestProjection = projections[projections.length - 1] || {
        principal: 0,
        value: 0,
        returns: 0,
        monthlyPassiveIncome: 0
    };

    const returnPercentage = latestProjection.principal > 0
        ? ((latestProjection.returns / latestProjection.principal) * 100).toFixed(0)
        : 0;

    return (
        <div className="space-y-20 py-12">
            {/* 10-5-85 Cards */}
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-[0.3em]">
                            <PieChart size={14} />
                            Strategic Distribution
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">Equity Allocation</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-lg">The gold standard for sustainable creator wealth: The 10-5-85 Governance Rule.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AllocationCard
                        title="Executive Salary"
                        percentage={10}
                        amount={allocation.salary}
                        annualAmount={allocation.salary * 12}
                        icon={Wallet}
                        colorClass="text-blue-500"
                        description="Personal living expenses, lifestyle maintenance, and immediate rewards."
                        currency={currency}
                    />
                    <AllocationCard
                        title="System Growth"
                        percentage={5}
                        amount={allocation.development}
                        annualAmount={allocation.development * 12}
                        icon={Wrench}
                        colorClass="text-orange-500"
                        description="Infrastructure, equipment upgrades, production software, and skill acquisition."
                        currency={currency}
                    />
                    <AllocationCard
                        title="Wealth Engine"
                        percentage={85}
                        amount={allocation.investment}
                        annualAmount={allocation.investment * 12}
                        icon={TrendingUp}
                        colorClass="text-green-500"
                        description="Maximum compounding in diversified S&P 500 funds for generational wealth."
                        currency={currency}
                    />
                </div>
            </div>

            {/* S&P 500 Projection */}
            <div className="glass-card p-8 md:p-12 space-y-10 overflow-hidden luxury-shadow border-none">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-500 font-black text-xs uppercase tracking-[0.3em]">
                            <LineChart size={14} />
                            Compounding Engine
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">
                            S&P 500 Fortune Projection
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projected 7% annual market yield with 4% perpetual withdrawal rule.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 min-w-[280px]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Time Horizon</span>
                            <span className="text-sm font-black text-red-500 px-3 py-1 bg-red-50 dark:bg-red-500/10 rounded-full">{projectionYears} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={projectionYears}
                            onChange={(e) => setProjectionYears(parseInt(e.target.value))}
                            className="w-full accent-red-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 h-[400px] w-full bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl p-6 border border-gray-100/50 dark:border-gray-700/30">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb22" />
                                <XAxis
                                    dataKey="year"
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tickFormatter={(val) => `${currency === 'THB' ? '฿' : '$'}${val / 1000}k`}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: '#fff',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                                        padding: '12px 16px'
                                    }}
                                    itemStyle={{ color: '#fff', fontWeight: 700 }}
                                    formatter={(value, name) => [formatCurrency(value, currency), name === "value" ? "Total Wealth" : "Passive Income (4%)"]}
                                    labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}
                                    labelFormatter={(year) => `Year ${year} Projection`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    name="value"
                                    stroke="#22c55e"
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    strokeWidth={4}
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="monthlyPassiveIncome"
                                    name="passive"
                                    stroke="#ec4899"
                                    fill="transparent"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="principal"
                                    stroke="#3b82f6"
                                    fill="transparent"
                                    strokeWidth={2}
                                    strokeDasharray="8 8"
                                    opacity={0.5}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between gap-8">
                        <div className="space-y-6">
                            <div className="p-8 bg-gray-50 dark:bg-gray-800/80 rounded-3xl border border-gray-100 dark:border-gray-700/50 space-y-6 luxury-shadow">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Passive Income (4% Rule)</span>
                                    <div className="text-2xl font-black text-pink-500">{formatCurrency(latestProjection.monthlyPassiveIncome, currency)}<span className="text-xs ml-1 opacity-50">/mo</span></div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] m font-black uppercase tracking-[0.2em] text-green-500">Market Performance (7% Yield)</span>
                                    <div className="text-xl font-black text-green-500">+{formatCurrency(latestProjection.returns, currency)}</div>
                                </div>

                                <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Capital Value</span>
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-black">
                                            +{returnPercentage}% GROWTH
                                        </div>
                                    </div>
                                    <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{formatCurrency(latestProjection.value, currency)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-red-50/50 dark:bg-red-500/5 rounded-2xl border border-red-100 dark:border-red-500/10 flex gap-4">
                            <Info size={20} className="text-red-500 shrink-0" />
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 leading-relaxed italic">
                                Wealth engine assumes a consistent 7% annual yield. The 4% rule ensures your principal remains intact while providing perpetual monthly income.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueAllocation;
