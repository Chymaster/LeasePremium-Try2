<script setup>
import { ref, reactive, computed } from 'vue'
import { useLeasePremiumCalculator } from './composables/useLeasePremiumCalculator'
import DisclaimerModal from './components/DisclaimerModal.vue'

const showModal = ref(true)


const form = reactive({
  propertyValue: 500000,
  groundRent: 100,
  leaseStartYear: new Date().getFullYear() - 20,
  leaseLength: 150,
  rentIncrease: 'percentage',
  doublingYears: 10,
  rentIncreasePercentage: 3,
  rentIncreaseAmount: 100,
  rentIncreaseYears: 10,
  renewYear: new Date().getFullYear(),
  capitalisationRate: 6,
  defermentRate: 5,
})

const { calculatePremium, calculateGroundRentPaid, calculatePropertyValuePremium } = useLeasePremiumCalculator(form)

const calculation = computed(() => {
  return calculatePremium(form.renewYear)
})

const premium = computed(() => {
  return calculation.value.totalCost
})

const propertyValuePremium = computed(() => {
  const leaseEndYear = form.leaseStartYear + form.leaseLength;
  return calculatePropertyValuePremium(form.propertyValue, form.defermentRate, leaseEndYear, form.renewYear);
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

const propertyValuePremiumIfRenewedToday = computed(() => {
  const leaseEndYear = form.leaseStartYear + form.leaseLength;
  return calculatePropertyValuePremium(form.propertyValue, form.defermentRate, leaseEndYear, new Date().getFullYear());
})

const increaseInPropertyValuePremium = computed(() => {
  return propertyValuePremium.value - propertyValuePremiumIfRenewedToday.value;
})

const totalLeaseRenewingPremium = computed(() => {
  return premium.value + propertyValuePremium.value;
})
</script>

<template>
  <DisclaimerModal v-if="showModal" @accept="showModal = false" />
  <main v-else>
    <h1>Lease Extension Premium Calculator</h1>
    <p class="description">This free front-end only tool is created by a hobbyist, all calculations are performed in your browser, the data inputted is not collected or stored online.</p>
    <form @submit.prevent>
      
      <div class="form-group">
        <label for="propertyValue">Property Value (&pound;)</label>
        <input type="number" id="propertyValue" v-model.number="form.propertyValue" />
      </div>
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
          <input type="radio" id="doubling" value="doubling" v-model="form.rentIncrease" />
          <label for="doubling">Doubling every</label>
          <input type="number" id="doublingYears" v-model.number="form.doublingYears" :disabled="form.rentIncrease !== 'doubling'" />
          <label for="doubling">years</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="percentage" value="percentage" v-model="form.rentIncrease" />
          <input type="number" id="rentIncreasePercentage" v-model.number="form.rentIncreasePercentage" :disabled="form.rentIncrease !== 'percentage'" />
          <label for="percentage">% per Year</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="amount" value="amount" v-model="form.rentIncrease" />
          <label for="amount">Increase by &pound;</label>
          <input type="number" id="rentIncreaseAmount" v-model.number="form.rentIncreaseAmount" :disabled="form.rentIncrease !== 'amount'" />
          <label for="amount">every</label>
          <input type="number" id="rentIncreaseYears" v-model.number="form.rentIncreaseYears" :disabled="form.rentIncrease !== 'amount'" />
          <label for="amount">years</label>
        </div>
      </div>
      <div class="form-group">
        <details>
          <summary>Advance Parameters</summary>
          <div class="form-group">
            <label for="capitalisationRate">Capitalisation Rate (%)</label>
            <input type="number" id="capitalisationRate" v-model.number="form.capitalisationRate" />
          </div>
          <div class="form-group">
            <label for="defermentRate">Deferment Rate (%)</label>
            <input type="number" id="defermentRate" v-model.number="form.defermentRate" />
          </div>
        </details>
      </div>
      <div class="form-group">
        <label>Total Lease Renewing Premium Estimate</label>
        <div class="result">{{ totalLeaseRenewingPremium.toFixed(2) }}</div>
      </div>
      <div class="premium-outputs">
        <div class="form-group">
          <label>Ground Rent Premium Estimate</label>
          <div class="result">{{ premium.toFixed(2) }}</div>
        </div>
        <div class="form-group">
          <label>Property Value Premium Estimate</label>
          <div class="result">{{ propertyValuePremium.toFixed(2) }}</div>
        </div>
      </div>
      <div class="form-group">
        <details>
          <summary>Estimated Additional Cost (compared to renewing today): {{ additionalCost.toFixed(2) }}</summary>
          <div class="form-group">
            <label>Estimated Increase in Lease Premium</label>
            <div class="result">{{ increaseInLeasePremium.toFixed(2) }}</div>
          </div>
          <div class="form-group">
            <label>Estimated Additional Ground Rent Paid</label>
            <div class="result">{{ additionalGroundRentPaid.toFixed(2) }}</div>
          </div>
          <div class="form-group">
            <label>Estimated Increase in Property Value Premium</label>
            <div class="result">{{ increaseInPropertyValuePremium.toFixed(2) }}</div>
          </div>
        </details>
      </div>
    </form>

    <div class="table-container">
      <details>
        <summary><h2>Estimated Yearly Ground Rent Contribution</h2></summary>
        <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Ground Rent</th>
            <th>Estimated Premium Contribution</th>
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
      </details>
    </div>
    <p class="description">If you're interested in the code, take a look at GitHub and give me a Star <a href="https://github.com/Chymaster/LeasePremium-Try2" target="_blank">GitHub</a>.</p>

  </main>
  <footer>
    <p>&copy; {{ new Date().getFullYear() }} Chymaster. All rights reserved.</p>
  </footer>
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
