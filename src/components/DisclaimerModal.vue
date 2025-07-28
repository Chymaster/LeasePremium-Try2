<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Disclaimer</h2>
      <p>This calculation is ESTIMATE ONLY, actual fees can vary depending on many different factors, including but not limited to specific lease terms, location or policy changes.</p>
      <p>This web tool is created by a hobbyist, not a legal professional, the estimate provided by this site cannot be treated as legal advice, and cannot take any responsibility on loss or damage arising from the use of the information provided</p>
      <p>The estimation only accounts for the loss of ground rent and property value, other costs, including but not limited to, solicitor fees and surveyor fees, are not included. The estimation provided is not a fixed quote, guarantee or legal advice </p>
      <p>This tool does not create any professional relationship between you and the site owner. We do not assume any duty of care or responsibility for any reliance placed on the information or estimates provided by this tool</p>
      <p>By using this site, you acknowledge that any reliance you place on the information or estimates on this tool is strictly at your own risk. Before making any decisions you MUST seek independent, qualified professional advice from a solicitor</p>
      <button @click="$emit('accept')">I accept</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  max-width: 500px;
}
</style>
