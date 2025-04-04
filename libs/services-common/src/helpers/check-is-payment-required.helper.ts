export const isPaymentRequiredForMedicationAndPlan = (price: number): boolean => {
  // payment not required for medication only when price is 0
  return price !== 0
}
