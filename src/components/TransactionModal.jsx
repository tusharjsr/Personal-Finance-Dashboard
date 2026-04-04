import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import { X } from 'lucide-react';

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useApp();
  const isEditing = !!transaction;

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        amount: Math.abs(transaction.amount).toString(),
        category: transaction.category,
        type: transaction.type,
      });
    }
  }, [transaction]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const transactionData = {
      date: formData.date,
      description: formData.description.trim(),
      amount: formData.type === 'expense' 
        ? -Math.abs(parseFloat(formData.amount))
        : Math.abs(parseFloat(formData.amount)),
      category: formData.category,
      type: formData.type,
    };

    if (isEditing) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Filter categories based on transaction type
  const filteredCategories = categories.filter(cat => {
    if (cat === 'All Categories') return false;
    if (formData.type === 'income') {
      return ['Salary', 'Freelance', 'Investment'].includes(cat);
    }
    return !['Salary', 'Freelance', 'Investment'].includes(cat);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {isEditing ? 'Edit Transaction' : 'Add Transaction'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'expense'
                    ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-2 border-rose-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'income'
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-2 border-transparent'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
                errors.date ? 'border-rose-500' : 'border-gray-200 dark:border-gray-600'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-rose-500">{errors.date}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
                errors.description ? 'border-rose-500' : 'border-gray-200 dark:border-gray-600'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
                  errors.amount ? 'border-rose-500' : 'border-gray-200 dark:border-gray-600'
                }`}
              />
            </div>
            {errors.amount && <p className="mt-1 text-sm text-rose-500">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            >
              {filteredCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
