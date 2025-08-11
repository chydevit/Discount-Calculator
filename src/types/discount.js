// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} DiscountResult
 * @property {number} originalPrice
 * @property {number} discountAmount
 * @property {number} finalPrice
 * @property {number} taxAmount
 * @property {number} totalWithTax
 * @property {number} savingsPercentage
 */

/**
 * @typedef {'percentage' | 'fixed'} DiscountType
 */

/**
 * @typedef {Object} DiscountCalculatorState
 * @property {string} originalPrice
 * @property {DiscountType} discountType
 * @property {string} discountValue
 * @property {string} quantity
 * @property {string} taxRate
 * @property {boolean} includeTax
 */

export {};