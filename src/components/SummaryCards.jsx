import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';

export default function SummaryCards() {
  const { insights } = useApp();

  const cards = [
    {
      title: 'Total Balance',
      value: insights.totalBalance,
      icon: DollarSign,
      color: 'from-blue-500 to-indigo-600',
      shadowColor: 'shadow-blue-200 dark:shadow-blue-900/30',
      isCurrency: true,
    },
    {
      title: 'Total Income',
      value: insights.totalIncome,
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-600',
      shadowColor: 'shadow-emerald-200 dark:shadow-emerald-900/30',
      isCurrency: true,
    },
    {
      title: 'Total Expenses',
      value: insights.totalExpenses,
      icon: TrendingDown,
      color: 'from-rose-500 to-pink-600',
      shadowColor: 'shadow-rose-200 dark:shadow-rose-900/30',
      isCurrency: true,
    },
    {
      title: 'Savings Rate',
      value: insights.savingsRate,
      icon: PiggyBank,
      color: 'from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-200 dark:shadow-amber-900/30',
      isPercentage: true,
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {card.title}
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {card.isCurrency && formatCurrency(card.value)}
                {card.isPercentage && `${card.value}%`}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} ${card.shadowColor} shadow-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          {card.title === 'Total Balance' && insights.monthlyComparison && (
            <div className="mt-4 flex items-center gap-1">
              <span className={`text-sm font-medium ${
                parseFloat(insights.monthlyComparison.incomeChange) >= 0 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-rose-600 dark:text-rose-400'
              }`}>
                {parseFloat(insights.monthlyComparison.incomeChange) >= 0 ? '+' : ''}{insights.monthlyComparison.incomeChange}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
