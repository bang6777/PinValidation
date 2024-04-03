<template>
  <div>
    <div class="flex justify-center space-x-2">
      <input
        v-for="(box, index) in numBoxes"
        :key="index"
        ref="inputBoxes"
        v-model="pin[index]"
        v-mask="regex"
        @input="handleInput(index)"
        @paste="handlePaste($event, index)"
        @keydown="handleKeyDown($event, index)"
        @focus="handleFocus(index)"
        @blur="handleBlur(index)"
        :class="{
          'bg-white': pin[index],
          'bg-green-500': isFilled(),
          'bg-gray-200': !pin[index],
        }"
        class="text-2xl w-12 h-12 text-center rounded focus:outline-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        :type="secretMode ? 'password' : 'text'"
        :maxlength="1"
        :autofocus="index === 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    numBoxes: {
      type: Number,
      default: 5,
    },
    secretMode: {
      type: Boolean,
      default: false,
    },
    regex: {
      type: RegExp,
      default: () => /\d/g,
    },
    defaultValue: {
      type: String,
      default: "",
    },
  },
  setup(props: any) {
    const pin = ref(
      props.defaultValue
        .split("")
        .filter((char: string) => char.match(props.regex))
    );

    const handleInput = (index: number) => {
      if (pin.value[index]?.match(props.regex)) {
        inputBoxes.value[index + 1].focus();
      } else {
        pin.value[index] = "";
      }
    };

    const handleKeyDown = (event: KeyboardEvent, index: number) => {
      if (event.key === "Backspace" && !pin.value[index]) {
        inputBoxes.value[index - 1].focus();
      }
    };

    const handlePaste = (event: ClipboardEvent, index: number) => {
      event.preventDefault();
      const pastedData = event.clipboardData?.getData("text") || "";
      const digits = pastedData
        .split("")
        .filter((char) => char.match(props.regex));
      if (digits.length > 0) {
        digits.forEach((digit, i) => {
          const nextIndex = index + i;
          if (nextIndex < props.numBoxes) {
            pin.value[nextIndex] = digit;
          }
        });
        inputBoxes.value[index + digits.length].focus();
      }
    };

    const handleFocus = (index: number) => {
      if (pin.value[index]?.match(props.regex)) {
        inputBoxes.value[index].select();
      }
    };

    const handleBlur = (index: number) => {
      if (!pin.value[index]?.match(props.regex)) {
        pin.value[index] = "";
      }
    };

    const inputBoxes = ref([]);

    onMounted(() => {
      if (pin.value.length > 0) {
        inputBoxes.value[pin.value.length]?.focus();
      }
    });

    // const notify = (message: string) => {
    //   toast(message, {
    //     autoClose: 1000,
    //   });
    // };
    const isFilled = () => {
      return (
        pin.value.length === props.numBoxes &&
        pin.value.every((char: string) => char.match(props.regex))
      );
    };

    return {
      pin,
      handleInput,
      handleKeyDown,
      handlePaste,
      handleFocus,
      handleBlur,
      inputBoxes,
      isFilled,
    };
  },
};
</script>

<style scoped>
input[type="password"] {
  font-family: "circle";
  letter-spacing: 0.5rem;
}
</style>
