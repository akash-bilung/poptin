<template>
  <div class="color-picker">
    <span
      class="color-picker-box"
      @click="trigerClick"
      :style="{ backgroundColor: modelValue }"
    >
    </span>
    <input
      type="color"
      :id="id"
      :value="modelValue"
      @input="changeColor($event)"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      required: false,
      default: "Background Color",
    },
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    trigerClick() {
      document.getElementById(this.id).click();
    },
    changeColor(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style></style>
