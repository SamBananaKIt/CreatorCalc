import React, { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import ResultsDisplay from './components/ResultsDisplay'
import RevenueAllocation from './components/RevenueAllocation'
import { Sun, Moon, Zap, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [results, setResults] = useState(null)
  const [currency, setCurrency] = useState('THB')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-700 text-gray-900 dark:text-gray-100 font-sans selection:bg-red-500/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl text-white shadow-lg shadow-red-500/20">
              <Zap size={24} fill="white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">Creator<span className="text-red-500">Calc</span></h1>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-700/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Live Rates: {currency}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border border-gray-100 dark:border-gray-700/50 group"
              aria-label="Toggle dark mode"
            >
              {darkMode ?
                <Sun size={20} className="text-yellow-500 group-hover:rotate-45 transition-transform" /> :
                <Moon size={20} className="text-red-500 group-hover:-rotate-12 transition-transform" />
              }
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-20">
        {/* Modern Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest mb-4 border border-red-100 dark:border-red-500/20"
          >
            <Sparkles size={14} />
            AI-Powered Forecasting
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
            Visualize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-400">Financial Future</span>
          </h2>

          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
            The elite wealth management suite for world-class creators. Precision metrics, automated allocation, and long-term growth.
          </p>
        </section>

        {/* Dynamic Content */}
        <div className="max-w-5xl mx-auto space-y-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent blur-3xl -z-10 rounded-full h-[500px]"></div>

          <Calculator
            onCalculate={setResults}
            currency={currency}
            onCurrencyChange={setCurrency}
          />

          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-800"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                    <Zap size={14} className="text-red-500" />
                    Insight Intelligence
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-800"></div>
                </div>

                <ResultsDisplay results={results} currency={currency} />
                <RevenueAllocation monthlyRevenue={results.monthlyRevenue} currency={currency} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900/30 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 dark:bg-gray-800 p-1.5 rounded-lg">
              <Zap size={18} className="text-gray-400" />
            </div>
            <h3 className="font-black tracking-tighter text-lg text-gray-900 dark:text-white">Creator<span className="text-gray-400">Calc</span></h3>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-sm font-bold text-gray-400 dark:text-gray-500 italic">© {new Date().getFullYear()} Precision Built by Antigravity</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-gray-400/60 max-w-xs ml-auto">
              Data driven snapshots based on global YouTube averages. Always consult a financial advisor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
