// hooks/useDiscountCalculator.js
import { useState, useEffect } from "react";
import { calculateDiscount } from "../utils/calculations";

/**
 * Custom hook for discount calculator logic with currency support
 * @returns {Object} Calculator state and setters
 */
export const useDiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("20");
  const [quantity, setQuantity] = useState("1");
  const [taxRate, setTaxRate] = useState("8.5");
  const [includeTax, setIncludeTax] = useState(false);
  const [currency, setCurrency] = useState("USD"); // 👈 NEW: currency state
  const [result, setResult] = useState(null);

  useEffect(() => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountValue);
    const qty = parseInt(quantity, 10);
    const tax = parseFloat(taxRate);

    if (isNaN(price) || isNaN(discount) || isNaN(qty) || isNaN(tax)) {
      setResult(null);
      return;
    }

    const calculationResult = calculateDiscount(
      price,
      discountType,
      discount,
      qty,
      tax,
      includeTax
    );

    setResult(calculationResult);
  }, [
    originalPrice,
    discountType,
    discountValue,
    quantity,
    taxRate,
    includeTax,
  ]);

  return {
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
    currency, // 👈 exposed
    setCurrency, // 👈 exposed
    result,
  };
};
