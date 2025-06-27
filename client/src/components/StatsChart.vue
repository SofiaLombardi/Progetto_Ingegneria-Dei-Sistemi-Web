<template>
  <div class="chart-outer d-flex flex-column align-items-center justify-content-center">
    <div class="chart-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, PieController, ArcElement, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';

Chart.register(
  BarController, BarElement,
  PieController, ArcElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Title
);

export default {
  props: {
    type: { type: String, required: true },
    data: { type: Object, required: true },
    options: { type: Object, default: () => ({}) }
  },
  mounted() {
    this.$refs.canvas.width = 400;
    this.$refs.canvas.height = 400;
    this.chart = new Chart(this.$refs.canvas, {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        ...this.options
      }
    });
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  }
};
</script>

<style scoped>
.chart-outer {
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.chart-wrapper {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-wrapper canvas {
  width: 100% !important;
  height: auto !important;
  display: block;
  aspect-ratio: 1/1;
  margin: 0 auto;
}
@media (max-width: 992px) {
  .chart-wrapper {
    max-width: 220px;
  }
}
@media (max-width: 576px) {
  .chart-wrapper {
    max-width: 100%;
  }
}
</style>