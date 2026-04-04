import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import TransactionModal from './TransactionModal';
import { Search, Filter, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Transactions() {
  const { filteredTransactions, filters, setFilters, isAdmin, deleteTransaction } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    if (sortConfig.key === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortConfig.key === 'amount') {
      comparison = Math.abs(a.amount) - Math.abs(b.amount);
    } else if (sortConfig.key === 'description') {
      comparison = a.description.localeCompare(b.description);
    } else if (sortConfig.key === 'category') {
      comparison = a.category.localeCompare(b.category);
    }
    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(value));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transactions
          </h2>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="pl-10 pr-8 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          >
            <option value="all">All Time</option>
            <option value="1">Last Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="overflow-x-auto">
        {paginatedTransactions.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th 
                  onClick={() => handleSort('date')}
                  className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                >
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('description')}
                  className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                >
                  Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white hidden sm:table-cell"
                >
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('amount')}
                  className="text-right py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                >
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                {isAdmin && (
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-4 px-6 text-right font-medium ${
                    transaction.type === 'income' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                  {isAdmin && (
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-2 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No transactions found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
