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
  // Input validation
  if (
    typeof originalPrice !== 'number' ||
    typeof discountValue !== 'number' ||
    typeof quantity !== 'number' ||
    typeof taxRate !== 'number' ||
    originalPrice <= 0 ||
    quantity <= 0 ||
    discountValue < 0 ||
    taxRate < 0
  ) {
    return null;
  }

  const totalOriginalPrice = originalPrice * quantity;
  let discountAmount;

  if (discountType === 'percentage') {
    if (discountValue > 100) return null;
    discountAmount = (totalOriginalPrice * discountValue) / 100;
  } else if (discountType === 'fixed') {
    if (discountValue > totalOriginalPrice) return null;
    discountAmount = discountValue;
  } else {
    return null; // invalid discountType
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
    savingsPercentage,
  };
};

/**
 * Format number as currency (USD or KHR)
 * @param {number} amount 
 * @param {'USD' | 'KHR'} [currency='USD'] 
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || !isFinite(amount)) {
    return '—';
  }

  const curr = currency.toUpperCase();
  let locale;
  const options = {
    style: 'currency',
    currency: curr,
    minimumFractionDigits: curr === 'KHR' ? 0 : 2,
    maximumFractionDigits: curr === 'KHR' ? 0 : 2,
  };

  // Choose locale: Khmer for KHR, English (US) for USD
  if (curr === 'KHR') {
    locale = 'km-KH';
  } else if (curr === 'USD') {
    locale = 'en-US';
  } else {
    // Fallback: try generic English
    locale = 'en-US';
    options.currency = 'USD';
  }

  try {
    // Try to format using Intl
    const formatter = new Intl.NumberFormat(locale, options);
    return formatter.format(amount);
  } catch (error) {
    // Fallback in case `Intl` is not supported or locale/currency invalid
    const symbol = curr === 'KHR' ? '៛' : '$';
    const fixedAmount = curr === 'KHR'
      ? Math.round(amount).toLocaleString('km-KH') // Khmer digits if possible
      : amount.toFixed(2);
    return `${symbol}${fixedAmount}`;
  }
};

/**
 * Format all numeric fields in a discount result with currency symbols
 * @param {Object|null} result - Output from `calculateDiscount`
 * @param {'USD' | 'KHR'} [currency='USD']
 * @returns {Object|null}
 */
export const formatDiscountResult = (result, currency = 'USD') => {
  if (!result || typeof result !== 'object') return null;

  return {
    ...result,
    originalPriceFormatted: formatCurrency(result.originalPrice, currency),
    discountAmountFormatted: formatCurrency(result.discountAmount, currency),
    finalPriceFormatted: formatCurrency(result.finalPrice, currency),
    taxAmountFormatted: formatCurrency(result.taxAmount, currency),
    totalWithTaxFormatted: formatCurrency(result.totalWithTax, currency),
    savingsPercentageFormatted: `${result.savingsPercentage.toFixed(2)}%`,
  };
};