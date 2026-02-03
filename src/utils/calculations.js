export const USD_TO_THB = 31.59;

/**
 * Formats a number as currency
 * @param {number} value
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (value, currency = 'THB') => {
    const locale = currency === 'THB' ? 'th-TH' : 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

/**
 * Formats a number with commas
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Calculates YouTube revenue metrics
 * @param {number} numberOfVideos
 * @param {number} averageViews
 * @param {number} rpm
 * @returns {object}
 */
export const calculateRevenue = (numberOfVideos, averageViews, rpm) => {
    const numVideos = parseFloat(numberOfVideos) || 0;
    const avgViews = parseFloat(averageViews) || 0;
    const ratePerMille = parseFloat(rpm) || 0;

    const totalViews = numVideos * avgViews;
    const monthlyRevenue = (totalViews / 1000) * ratePerMille;
    const dailyRevenue = monthlyRevenue / 30;
    const annualRevenue = monthlyRevenue * 12;

    return {
        totalViews,
        dailyRevenue,
        monthlyRevenue,
        annualRevenue,
        impressions: totalViews * 8.5, // Estimated impression rate
        revenuePer1K: ratePerMille,
        effectiveRPM: ratePerMille,
        totalChannelValue: annualRevenue * 2.5, // 2.5x multiple
    };
};

/**
 * Calculates the 10-5-85 revenue allocation
 * @param {number} monthlyRevenue
 * @returns {object}
 */
export const calculateAllocation = (monthlyRevenue) => {
    return {
        salary: monthlyRevenue * 0.10,
        development: monthlyRevenue * 0.05,
        investment: monthlyRevenue * 0.85,
    };
};

/**
 * Projects S&P 500 future value with the 4% Rule
 * @param {number} monthlyInvestment
 * @param {number} years
 * @param {number} annualReturn (default 0.07)
 * @returns {Array} List of year-by-year projections
 */
export const projectInvestment = (monthlyInvestment, years, annualReturn = 0.07) => {
    const monthlyRate = annualReturn / 12;
    const totalMonths = years * 12;
    const projections = [];

    let currentValue = 0;
    let currentPrincipal = 0;

    for (let m = 1; m <= totalMonths; m++) {
        currentPrincipal += monthlyInvestment;
        // Compounding monthly
        currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);

        if (m % 12 === 0) {
            const year = m / 12;
            const annualPassiveIncome = currentValue * 0.04;
            projections.push({
                year,
                principal: currentPrincipal,
                value: currentValue,
                returns: currentValue - currentPrincipal,
                monthlyPassiveIncome: annualPassiveIncome / 12, // 4% Rule
            });
        }
    }

    return projections;
};
