import { useApp } from '../context/AppContext';
import { categoryColors } from '../data/mockData';
import { TrendingUp, TrendingDown, Award, Calendar, Target, Receipt } from 'lucide-react';

export default function Insights() {
  const { insights } = useApp();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestSpendingCategory?.name || 'No data',
      subtitle: insights.highestSpendingCategory 
        ? formatCurrency(insights.highestSpendingCategory.amount) 
        : '',
      icon: Award,
      color: categoryColors[insights.highestSpendingCategory?.name] || '#6b7280',
      bgColor: `${categoryColors[insights.highestSpendingCategory?.name] || '#6b7280'}15`,
    },
    {
      title: 'Monthly Income Change',
      value: insights.monthlyComparison 
        ? `${parseFloat(insights.monthlyComparison.incomeChange) >= 0 ? '+' : ''}${insights.monthlyComparison.incomeChange}%`
        : 'No data',
      subtitle: insights.monthlyComparison 
        ? `Current: ${formatCurrency(insights.monthlyComparison.current.income)}`
        : '',
      icon: parseFloat(insights.monthlyComparison?.incomeChange) >= 0 ? TrendingUp : TrendingDown,
      color: parseFloat(insights.monthlyComparison?.incomeChange) >= 0 ? '#10b981' : '#ef4444',
      bgColor: parseFloat(insights.monthlyComparison?.incomeChange) >= 0 ? '#10b98115' : '#ef444415',
    },
    {
      title: 'Monthly Expense Change',
      value: insights.monthlyComparison 
        ? `${parseFloat(insights.monthlyComparison.expenseChange) >= 0 ? '+' : ''}${insights.monthlyComparison.expenseChange}%`
        : 'No data',
      subtitle: insights.monthlyComparison 
        ? `Current: ${formatCurrency(insights.monthlyComparison.current.expenses)}`
        : '',
      icon: parseFloat(insights.monthlyComparison?.expenseChange) <= 0 ? TrendingDown : TrendingUp,
      color: parseFloat(insights.monthlyComparison?.expenseChange) <= 0 ? '#10b981' : '#f59e0b',
      bgColor: parseFloat(insights.monthlyComparison?.expenseChange) <= 0 ? '#10b98115' : '#f59e0b15',
    },
    {
      title: 'Total Transactions',
      value: insights.transactionCount,
      subtitle: `${insights.thisMonthTransactions} this month`,
      icon: Receipt,
      color: '#6366f1',
      bgColor: '#6366f115',
    },
  ];

  // Additional insights
  const additionalInsights = [];

  if (insights.savingsRate > 20) {
    additionalInsights.push({
      type: 'success',
      message: `Great job! You're saving ${insights.savingsRate}% of your income. Financial experts recommend at least 20%.`,
    });
  } else if (insights.savingsRate > 0) {
    additionalInsights.push({
      type: 'warning',
      message: `Your savings rate is ${insights.savingsRate}%. Consider increasing it to at least 20% for better financial health.`,
    });
  }

  if (insights.monthlyComparison && parseFloat(insights.monthlyComparison.expenseChange) > 10) {
    additionalInsights.push({
      type: 'alert',
      message: `Your expenses increased by ${insights.monthlyComparison.expenseChange}% compared to last month. Review your spending habits.`,
    });
  }

  if (insights.monthlyComparison && parseFloat(insights.monthlyComparison.incomeChange) > 10) {
    additionalInsights.push({
      type: 'success',
      message: `Your income increased by ${insights.monthlyComparison.incomeChange}% compared to last month. Keep it up!`,
    });
  }

  // Top 3 spending categories
  const topSpendingCategories = Object.entries(insights.spendingByCategory || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon className="h-6 w-6" style={{ color: card.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {card.value}
                </p>
                {card.subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights / Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Financial Insights
          </h3>
          {additionalInsights.length > 0 ? (
            <div className="space-y-3">
              {additionalInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    insight.type === 'success' 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
                      : insight.type === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                      : 'bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <p className={`text-sm ${
                    insight.type === 'success' 
                      ? 'text-emerald-700 dark:text-emerald-300' 
                      : insight.type === 'warning'
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-rose-700 dark:text-rose-300'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Add more transactions to see personalized insights.
            </p>
          )}
        </div>

        {/* Top Spending Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Top Spending Categories
          </h3>
          {topSpendingCategories.length > 0 ? (
            <div className="space-y-4">
              {topSpendingCategories.map(([category, amount], index) => {
                const percentage = (amount / insights.totalExpenses * 100).toFixed(1);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {index + 1}. {category}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: categoryColors[category] || '#6b7280',
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {percentage}% of total expenses
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No expense data available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
