import React from 'react';
import { Calculator, Percent, DollarSign, ShoppingCart, Receipt } from 'lucide-react';
import { useDiscountCalculator } from '../hooks/useDiscountCalculator';
import PriceDisplay from './PriceDisplay';

/**
 * Main Discount Calculator component
 */
const DiscountCalculator = () => {
  const {
    originalPrice,
    setOriginalPrice,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    quantity,
    setQuantity,
    taxRate,
    setTaxRate,
    includeTax,
    setIncludeTax,
    result
  } = useDiscountCalculator();

  const isValidInput = result !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Discount Calculator</h1>
          </div>
          <p className="text-lg text-gray-600">Calculate discounts, savings, and final prices instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
              Product Details
            </h2>

            <div className="space-y-6">
              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (per item)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter original price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter quantity"
                  min="1"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDiscountType('percentage')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                      discountType === 'percentage'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Percent className="w-4 h-4 mr-2" />
                    Percentage
                  </button>
                  <button
                    onClick={() => setDiscountType('fixed')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                      discountType === 'fixed'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Fixed Amount
                  </button>
                </div>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount {discountType === 'percentage' ? 'Percentage' : 'Amount'}
                </label>
                <div className="relative">
                  {discountType === 'percentage' ? (
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Enter discount ${discountType === 'percentage' ? 'percentage' : 'amount'}`}
                    min="0"
                    max={discountType === 'percentage' ? '100' : undefined}
                    step={discountType === 'percentage' ? '0.1' : '0.01'}
                  />
                </div>
              </div>

              {/* Tax Settings */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">Include Tax</label>
                  <button
                    onClick={() => setIncludeTax(!includeTax)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      includeTax ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeTax ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {includeTax && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter tax rate"
                      min="0"
                      max="50"
                      step="0.1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Receipt className="w-6 h-6 mr-2 text-green-600" />
              Calculation Results
            </h2>

            {isValidInput && result ? (
              <div className="space-y-4">
                <PriceDisplay result={result} includeTax={includeTax} taxRate={taxRate} />

                {/* Quick Actions */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">Quick discount presets:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 75].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setDiscountType('percentage');
                          setDiscountValue(preset.toString());
                        }}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Enter valid values to see calculation results</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Perfect for shopping, business calculations, and quick discount estimates</p>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;