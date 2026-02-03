Product Specification Document (PRD) - CreatorCalc
1. Project Overview
CreatorCalc is a specialized financial planning tool for YouTube content creators. It helps creators estimate their revenue based on channel metrics and provides a structured wealth management roadmap using the 10-5-85 Revenue Allocation Rule.

Objectives:
Provide accurate revenue projections (Daily, Monthly, Annual).
Automated personal finance budgeting for creators.
Long-term wealth visualization through S&P 500 investment projections.
2. Core Features
2.1 Revenue Calculator
Inputs:
Videos per Month: Frequency of content creation.
Avg Views per Video: Content performance metric.
RPM ($): Revenue Per Mille (standard YouTube metric).
Validation: Real-time error handling (e.g., RPM limit of $50, positive integers only).
Calculations: Total views, daily/monthly/annual income, and estimated channel valuation.
2.2 Revenue Allocation (10-5-85 Rule)
Automatically splits monthly revenue into three buckets:

Salary (10%): For monthly living expenses.
System Development (5%): For equipment (cameras, mics), software, and courses.
S&P 500 Investment (85%): Dedicated to long-term wealth building.
Visuals: Color-coded cards with monthly and annual breakdowns.
2.3 S&P 500 Wealth Projection
Logic: Future Value of Annuity formula.
Parameters:
Monthly Contribution: derived from 85% allocation.
Duration: 1 to 30 years (adjustable via slider).
Interest Rate: Assumed 10% annual historic market return.
Output: Interactive Area Chart comparing Total Value vs. Principal Invested.
2.4 Technical Features
Theming: System-aware Dark/Light mode support.
Responsive Design: Mobile-first layout (Single column on mobile, 3-column cards on desktop).
Offline First: All calculations and data persist locally (LocalStorage).
3. Technical Stack
Framework: React 18 (with Hooks)
Scaffolding: Vite 7
Styling: Tailwind CSS 4 (using new @theme variable system)
Icons: Lucide React
Animations: Framer Motion
Visualization: Recharts (High-performance SVG charts)
4. Business Logic & Formulas
Revenue Calculation:
TotalViews = MonthlyVideos * AvgViews
MonthlyRevenue = (TotalViews / 1000) * RPM
AnnualRevenue = MonthlyRevenue * 12
ChannelValuation = AnnualRevenue * 2.5
Investment Projection:
MonthlyInvestment = MonthlyRevenue * 0.85
MonthlyRate = 0.10 / 12
Months = Years * 12
FutureValue = MonthlyInvestment * (( (1 + MonthlyRate)^Months - 1 ) / MonthlyRate)
5. UI/UX Design Standards
Aesthetics: Glassmorphism (Background blur, subtle borders).
Color Palette:
Primary: YouTube Red (#FF0000).
Dark Background: Deep Navy (#111827).
Success/Growth: Emerald Green (#22c55e).
Typography: Inter / System UI stack for high readability.
6. Future Roadmap
 Multi-Scenario Comparison: Compare "Conservative" vs "Aggressive" growth plans.
 Sponsorship Calculator: Estimate brand deal rates based on views/niche.
 Export to PDF: Generate professional financial reports.
 Global Currencies: Support for THB, EUR, GBP, etc.
