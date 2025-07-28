<script setup>
import { ref, reactive, computed } from 'vue'
import { useLeasePremiumCalculator } from './composables/useLeasePremiumCalculator'

const form = reactive({
  propertyValue: 500000,
  groundRent: 100,
  leaseStartYear: new Date().getFullYear() - 20,
  leaseLength: 150,
  rentIncrease: 'doubling25',
  rentIncreasePercentage: 3,
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
  <main>
    <h1>Lease Extension Premium Calculator</h1>
    <p class="description">I made this lease extension premium calculator specifically for raising ground rents. This is very common in city center flats, however, there doesn't seems to be any premium calculator that works with raising ground rents. So there we are.</p>
    <p class="description">This is a front-end only application, all calculations are performed in your browser and no data is collected or stored.</p>
    <p class="description">Disclaimer: This calculation only accounts for the loss of ground rent and property value, other costs, such as solicitor fees and srveyor fees, are not included. The cost estimated by this tool is only an estimate and not a fixed quote, guarantee or legal advice </p>
    <p class="description">While I try my best to provide accurate information, I am not a legal professional and the estimate provided by this site should not be treated as legal advice, and cannot take any responsibility on loss or damage arising from the use of the information provided</p>
    <p class="description">Please consult legal professionals before making any decisions</p>
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
          <div class="form-group">
            <label for="defermentRate">Deferment Rate (%)</label>
            <input type="number" id="defermentRate" v-model.number="form.defermentRate" />
          </div>
        </details>
      </div>
      <div class="form-group">
        <label>Total Lease Renewing Premium</label>
        <div class="result">{{ totalLeaseRenewingPremium.toFixed(2) }}</div>
      </div>
      <div class="premium-outputs">
        <div class="form-group">
          <label>Ground Rent Premium</label>
          <div class="result">{{ premium.toFixed(2) }}</div>
        </div>
        <div class="form-group">
          <label>Property Value Premium</label>
          <div class="result">{{ propertyValuePremium.toFixed(2) }}</div>
        </div>
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
          <div class="form-group">
            <label>Increase in Property Value Premium</label>
            <div class="result">{{ increaseInPropertyValuePremium.toFixed(2) }}</div>
          </div>
        </details>
      </div>
    </form>

    <div class="table-container">
      <details>
        <summary><h2>Yearly Ground Rent Contribution</h2></summary>
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
