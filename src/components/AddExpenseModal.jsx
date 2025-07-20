import React, { useState } from 'react';
import Modal from './Modal';

const AddExpenseModal = ({ showAddExpenseModal, setShowAddExpenseModal, addExpense }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.amount && formData.date) {
      addExpense(formData);
      setFormData({ category: '', amount: '', date: '' });
    }
  };

  return (
    <Modal isOpen={showAddExpenseModal} onClose={() => setShowAddExpenseModal(false)} title="Add New Expense">
      <div onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div data-aos="fade-up" data-aos-delay="100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3 pt-4" data-aos="fade-up" data-aos-delay="400">
            <button
              onClick={() => setShowAddExpenseModal(false)}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;