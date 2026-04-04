import { useApp } from '../context/AppContext';
import { balanceHistory, monthlySpending, categoryColors } from '../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

export default function Charts() {
  const { insights, darkMode } = useApp();

  const textColor = darkMode ? '#9ca3af' : '#6b7280';
  const gridColor = darkMode ? '#374151' : '#e5e7eb';

  // Prepare pie chart data from insights
  const pieData = Object.entries(insights.spendingByCategory || {})
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: categoryColors[name] || '#6b7280',
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Balance Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Balance Trend
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceHistory}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#balanceGradient)"
                name="Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Spending by Category
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend 
                formatter={(value) => (
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Income vs Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Income vs Expenses
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => (
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{value}</span>
                )}
              />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
