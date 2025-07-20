import React, { useState } from 'react';
import Modal from './Modal';

const AddIncomeModal = ({ showAddIncomeModal, setShowAddIncomeModal, addIncome }) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.source && formData.amount && formData.date) {
      addIncome(formData);
      setFormData({ source: '', amount: '', date: '' });
    }
  };

  return (
    <Modal isOpen={showAddIncomeModal} onClose={() => setShowAddIncomeModal(false)} title="Add New Income">
      <div onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div data-aos="fade-up" data-aos-delay="100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Income Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({...formData, source: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select source</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Interest from Savings">Interest from Savings</option>
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
              onClick={() => setShowAddIncomeModal(false)}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Income
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddIncomeModal;