import { computed } from 'vue'

export function useLeasePremiumCalculator(form) {
  const calculatePremium = (renewYear) => {
    const leaseEndDateYear = form.leaseStartYear + form.leaseLength
    let totalCost = 0
    const yearlyBreakdown = []

    for (let year = renewYear; year <= leaseEndDateYear; year++) {
      const yearsFromLeaseStart = year - form.leaseStartYear
      const yearsFromRenew = year - renewYear
      let groundRent = form.groundRent

      if (form.rentIncrease === 'doubling10') {
        groundRent *= Math.pow(2, Math.floor(yearsFromLeaseStart / 10))
      } else if (form.rentIncrease === 'doubling25') {
        groundRent *= Math.pow(2, Math.floor(yearsFromLeaseStart / 25))
      } else if (form.rentIncrease === 'percentage') {
        groundRent *= Math.pow(1 + form.rentIncreasePercentage / 100, yearsFromLeaseStart)
      }

      const premiumContribution = groundRent / Math.pow(1.05, yearsFromRenew)
      totalCost += premiumContribution

      yearlyBreakdown.push({
        year,
        groundRent,
        premiumContribution,
      })
    }

    return {
      totalCost,
      yearlyBreakdown,
    }
  }

  const calculateGroundRentPaid = (startYear, endYear) => {
    let totalGroundRentPaid = 0
    for (let year = startYear; year < endYear; year++) {
      const yearsFromLeaseStart = year - form.leaseStartYear
      let groundRent = form.groundRent

      if (form.rentIncrease === 'doubling10') {
        groundRent *= Math.pow(2, Math.floor(yearsFromLeaseStart / 10))
      } else if (form.rentIncrease === 'doubling25') {
        groundRent *= Math.pow(2, Math.floor(yearsFromLeaseStart / 25))
      } else if (form.rentIncrease === 'percentage') {
        groundRent *= Math.pow(1 + form.rentIncreasePercentage / 100, yearsFromLeaseStart)
      }
      totalGroundRentPaid += groundRent
    }
    return totalGroundRentPaid
  }

  return {
    calculatePremium,
    calculateGroundRentPaid,
  }
}
