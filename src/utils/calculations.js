/**
 * Calculate discount based on type and values
 * @param {number} originalPrice 
 * @param {'percentage' | 'fixed'} discountType 
 * @param {number} discountValue 
 * @param {number} quantity 
 * @param {number} taxRate 
 * @param {boolean} includeTax 
 * @returns {Object|null} DiscountResult or null if invalid
 */
export const calculateDiscount = (
  originalPrice,
  discountType,
  discountValue,
  quantity,
  taxRate,
  includeTax
) => {
  if (originalPrice <= 0 || quantity <= 0 || discountValue < 0) {
    return null;
  }

  const totalOriginalPrice = originalPrice * quantity;
  let discountAmount;

  if (discountType === 'percentage') {
    if (discountValue > 100) return null;
    discountAmount = (totalOriginalPrice * discountValue) / 100;
  } else {
    if (discountValue > totalOriginalPrice) return null;
    discountAmount = discountValue;
  }

  const finalPrice = totalOriginalPrice - discountAmount;
  const taxAmount = includeTax ? (finalPrice * taxRate) / 100 : 0;
  const totalWithTax = finalPrice + taxAmount;
  const savingsPercentage = (discountAmount / totalOriginalPrice) * 100;

  return {
    originalPrice: totalOriginalPrice,
    discountAmount,
    finalPrice,
    taxAmount,
    totalWithTax,
    savingsPercentage
  };
};

/**
 * Format number as currency
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};