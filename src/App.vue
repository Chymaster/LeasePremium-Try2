<script setup>
import { ref, reactive, computed } from 'vue'
import { useLeasePremiumCalculator } from './composables/useLeasePremiumCalculator'

const form = reactive({
  groundRent: 300,
  leaseStartYear: new Date().getFullYear() - 20,
  leaseLength: 150,
  rentIncrease: 'doubling25',
  rentIncreasePercentage: 3,
  renewYear: new Date().getFullYear(),
  capitalisationRate: 6,
})

const { calculatePremium, calculateGroundRentPaid } = useLeasePremiumCalculator(form)

const calculation = computed(() => {
  return calculatePremium(form.renewYear)
})

const premium = computed(() => {
  return calculation.value.totalCost
})

const yearlyBreakdown = computed(() => {
  return calculation.value.yearlyBreakdown
})

const premiumIfRenewedToday = computed(() => {
  return calculatePremium(new Date().getFullYear()).totalCost
})

const groundRentPaidUntilRenewYear = computed(() => {
  return calculateGroundRentPaid(new Date().getFullYear(), form.renewYear)
})

const increaseInLeasePremium = computed(() => {
  return premium.value - premiumIfRenewedToday.value
})

const additionalGroundRentPaid = computed(() => {
  return groundRentPaidUntilRenewYear.value
})

const additionalCost = computed(() => {
  return increaseInLeasePremium.value + additionalGroundRentPaid.value
})
</script>

<template>
  <main>
    <h1>Lease Extension Premium Calculator</h1>
    <p class="description">This is a front-end only application, all calculations are performed in your browser and no data is collected or stored. This calculation only accounts for the loss of ground rent, other costs, such as reversionary interest and solicitor fees, are not included. This tool is only to be used for reference, please consult your solicitor for more details. If you're interested in the code, take a look at GitHub and give me a Star <a href="https://github.com/Chymaster/LeasePremium-Try2" target="_blank">GitHub</a>.</p>
    <form @submit.prevent>
      
      <div class="form-group">
        <label for="groundRent">Ground Rent (&pound; per year)</label>
        <input type="number" id="groundRent" v-model.number="form.groundRent" />
      </div>
      <div class="form-group">
        <label for="leaseStartYear">Lease Start Year</label>
        <input type="number" id="leaseStartYear" v-model.number="form.leaseStartYear" />
      </div>
      <div class="form-group">
        <label for="leaseLength">Lease Length (years)</label>
        <input type="number" id="leaseLength" v-model.number="form.leaseLength" />
      </div>
      <div class="form-group">
        <label for="renewYear">Renew Year</label>
        <input type="number" id="renewYear" v-model.number="form.renewYear" />
      </div>
      <div class="form-group">
        <label>Ground Rent Increase By</label>
        <div class="radio-group">
          <input type="radio" id="doubling10" value="doubling10" v-model="form.rentIncrease" />
          <label for="doubling10">Doubling every 10 years</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="doubling25" value="doubling25" v-model="form.rentIncrease" />
          <label for="doubling25">Doubling every 25 years</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="percentage" value="percentage" v-model="form.rentIncrease" />
          <input type="number" id="rentIncreasePercentage" v-model.number="form.rentIncreasePercentage" :disabled="form.rentIncrease !== 'percentage'" />
          <label for="percentage">% per Year</label>
        </div>
      </div>
      <div class="form-group">
        <details>
          <summary>Advance Parameters</summary>
          <div class="form-group">
            <label for="capitalisationRate">Capitalisation Rate (%)</label>
            <input type="number" id="capitalisationRate" v-model.number="form.capitalisationRate" />
          </div>
        </details>
      </div>
      <div class="form-group">
        <label>Lease Premium</label>
        <div class="result">{{ premium.toFixed(2) }}</div>
      </div>
      <div class="form-group">
        <details>
          <summary>Additional Cost (compared to renewing today): {{ additionalCost.toFixed(2) }}</summary>
          <div class="form-group">
            <label>Increase in Lease Premium</label>
            <div class="result">{{ increaseInLeasePremium.toFixed(2) }}</div>
          </div>
          <div class="form-group">
            <label>Additional Ground Rent Paid</label>
            <div class="result">{{ additionalGroundRentPaid.toFixed(2) }}</div>
          </div>
        </details>
      </div>
    </form>

    <div class="table-container">
      <h2>Yearly Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Ground Rent</th>
            <th>Premium Contribution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="year in yearlyBreakdown" :key="year.year">
            <td>{{ year.year }}</td>
            <td>{{ year.groundRent.toFixed(2) }}</td>
            <td>{{ year.premiumContribution.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.radio-group input[type="radio"] {
  margin-right: 0.5rem;
}

.result {
  font-size: 1.2rem;
  font-weight: bold;
}

.table-container {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

thead {
  background-color: #f5f5f5;
}
</style>
