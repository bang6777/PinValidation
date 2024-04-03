<script setup lang="ts">
const secretMode = ref<boolean>(true);

const handleSecretMode = (): void => {
  secretMode.value = !secretMode.value;
};
</script>

<template>
  <div class="flex flex-col h-screen justify-center items-center bg-blue-600">
    <div class="flex items-center">
      <h1
        class="flex flex-col text-white text-2xl font-bold mb-4 pr-10 border-l-4 border-solid border-white pl-3"
      >
        <span>PIN</span><span>VALIDATION</span><span>EXAMPLE</span>
      </h1>
      <div class="flex">
        <PinValidation
          :num-boxes="5"
          :secret-mode="secretMode"
          :default-value="'12345'"
        />
        <button @click="handleSecretMode" class="ml-2 text-white">
          <span v-if="secretMode" class="material-symbols-outlined">
            visibility_off
          </span>
          <span v-else class="material-symbols-outlined"> visibility </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>
