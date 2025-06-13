<template>
  <div v-if="show"
       class="toast align-items-center border-0 show position-fixed bottom-0 end-0 m-4"
       :class="type === 'danger' ? 'text-bg-danger' : 'text-bg-success'"
       role="alert" aria-live="assertive" aria-atomic="true"
       style="z-index: 2000; min-width: 220px;">
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="close" aria-label="Chiudi"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 2500
    }
  },
  watch: {
    show(val) {
      if (val) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  beforeUnmount() {
    clearTimeout(this._timer);
  }
};
</script>