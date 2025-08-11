import React from 'react';
import { DollarSign, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

/**
 * PriceDisplay component for showing calculation results
 * @param {Object} props
 * @param {Object} props.result - Calculation result object
 * @param {boolean} props.includeTax - Whether tax is included
 * @param {string} props.taxRate - Tax rate percentage
 */
const PriceDisplay = ({ result, includeTax, taxRate }) => {
  return (
    <div className="space-y-4">
      {/* Savings Highlight */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
        <div className="text-center">
          <p className="text-sm opacity-90">You Save</p>
          <p className="text-3xl font-bold">{formatCurrency(result.discountAmount)}</p>
          <p className="text-sm opacity-90">({result.savingsPercentage.toFixed(1)}% off)</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Original Price</span>
          <span className="font-semibold">{formatCurrency(result.originalPrice)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-red-600">Discount</span>
          <span className="font-semibold text-red-600">-{formatCurrency(result.discountAmount)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Price After Discount</span>
          <span className="font-semibold text-green-600">{formatCurrency(result.finalPrice)}</span>
        </div>
        
        {includeTax && (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax ({taxRate}%)</span>
              <span className="font-semibold">+{formatCurrency(result.taxAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
              <span className="font-semibold text-lg">Final Total</span>
              <span className="font-bold text-xl text-blue-600">{formatCurrency(result.totalWithTax)}</span>
            </div>
          </>
        )}
        
        {!includeTax && (
          <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
            <span className="font-semibold text-lg">Final Price</span>
            <span className="font-bold text-xl text-blue-600">{formatCurrency(result.finalPrice)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;