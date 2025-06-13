<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Statistiche di Lettura</h2>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status" aria-label="Caricamento..."></div>
    </div>
    <div v-else>
      <ul class="list-group mb-4">
        <li class="list-group-item">Totale libri: {{ books.length }}</li>
        <li class="list-group-item">Libri letti: {{ readCount }}</li>
        <li class="list-group-item">Da leggere: {{ toReadCount }}</li>
        <li class="list-group-item">Media voto (letti): {{ avgRating.toFixed(2) }}</li>
        <li class="list-group-item">Categoria più letta: {{ mostReadCategory || 'Nessuna' }}</li>
      </ul>

      <div class="row">
        <div class="col-12 col-md-6 mb-4 text-center">
          <h4 class="mb-3">Libri per categoria</h4>
          <div class="chart-wrapper">
            <StatsChart :type="'pie'" :data="categoryChartData" />
          </div>
        </div>

        <div class="col-12 col-md-6 mb-4 text-center">
          <h4 class="mb-3">Libri da leggere per categoria</h4>
          <div class="chart-wrapper">
            <StatsChart :type="'bar'" :data="toReadCategoryChartData" />
          </div>
        </div>
      </div>
    </div>

    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Toast from '../components/Toast.vue';
import StatsChart from '../components/StatsChart.vue';

export default {
  components: { Toast, StatsChart },
  data() {
    return {
      books: [],
      loading: false,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  async mounted() {
    this.loading = true;
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.books = res.data;
    } catch (err) {
      this.showToast('Errore nel recupero delle statistiche', 'danger');
    } finally {
      this.loading = false;
    }
  },
  computed: {
    readCount() {
      return this.books.filter(b => b.status === 'letto').length;
    },
    toReadCount() {
      return this.books.filter(b => b.status === 'da leggere').length;
    },
    avgRating() {
      const read = this.books.filter(b => b.status === 'letto' && b.rating);
      if (!read.length) return 0;
      return read.reduce((sum, b) => sum + b.rating, 0) / read.length;
    },
    categoryCount() {
      const count = {};
      this.books.forEach(b => {
        const cat = b.category || 'Sconosciuta';
        count[cat] = (count[cat] || 0) + 1;
      });
      return count;
    },
    mostReadCategory() {
      const count = {};
      this.books
        .filter(b => b.status === 'letto')
        .forEach(b => {
          const cat = b.category || 'Sconosciuta';
          count[cat] = (count[cat] || 0) + 1;
        });

      let max = 0;
      let topCat = null;
      for (const cat in count) {
        if (count[cat] > max) {
          max = count[cat];
          topCat = cat;
        }
      }
      return topCat;
    },
    categoryChartData() {
      const labels = Object.keys(this.categoryCount);
      const data = Object.values(this.categoryCount);
      return {
        labels,
        datasets: [{
          label: 'Libri per categoria',
          data,
          backgroundColor: [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
            '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
          ]
        }]
      };
    },
    toReadCategoryChartData() {
      const count = {};
      this.books
        .filter(b => b.status === 'da leggere')
        .forEach(b => {
          const cat = b.category || 'Sconosciuta';
          count[cat] = (count[cat] || 0) + 1;
        });
      const labels = Object.keys(count);
      const data = Object.values(count);
      return {
        labels,
        datasets: [{
          label: 'Libri da leggere per categoria',
          data,
          backgroundColor: [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
            '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
          ]
        }]
      };
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
    }
  }
};
</script>
