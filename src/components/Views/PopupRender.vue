<template>
  <div id="popup-viewport"></div>
</template>

<script>
import popupGenerator from "@/mixins/popupGenerator.js";
export default {
  mixins: [popupGenerator],
  watch: {
    popupStyle: {
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.renderPopup();
      },
      deep: true,
    },
    popupContent: {
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.renderPopup();
      },
      deep: true,
    },
    popupItems: {
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.renderPopup();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderPopup();
  },
  methods: {
    renderPopup() {
      const data = {
        popupStyle: this.popupStyle,
        popupContent: this.popupContent,
        popupItems: this.popupItems,
      };
      this.generatePopup(data).init();
    },
  },
};
</script>

<style scoped>
#popup-viewport {
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
