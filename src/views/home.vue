<template>
  <div class="home">
    <h3 class="animate__animated animate__zoomInUp">CPaaS Sample App</h3>
    <div>
      <div class="d-flex flex-row">
        <router-link to="/1on1" type="button">
          <button
            type="button"
            class="animate__animated animate__zoomIn btn btn-mav--color-1 mx-2"
          >1-on-1 call</button>
        </router-link>
        <button
          type="button"
          class="animate__animated animate__zoomIn btn btn-mav--color-2 mx-2"
        >New meeting</button>
        <button
          type="button"
          class="animate__animated animate__zoomIn btn btn-mav--color-3 mx-2"
        >Join</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="scss">
.home {
  height: 100vh !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>