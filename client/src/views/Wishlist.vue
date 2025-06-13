<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Wishlist</h2>
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status" aria-label="Caricamento..."></div>
    </div>
    <div v-if="!loading && wishlist.length === 0" class="alert alert-info text-center">
      Nessun libro nella wishlist.
    </div>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-lg-4 mb-3"
        v-for="book in paginatedWishlist"
        :key="book._id"
      >
        <BookCard
          :book="book"
          :hideAddToList="true"
          @edit="goToDashboard(book)"
          @delete="remove(book._id)"
        />
      </div>
    </div>
    <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-3">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Precedente</button>
        </li>
        <li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: currentPage === n }">
          <button class="page-link" @click="currentPage = n">{{ n }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Successiva</button>
        </li>
      </ul>
    </nav>
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
import BookCard from '../components/BookCard.vue';
import Toast from '../components/Toast.vue';

export default {
  components: { BookCard, Toast },
  data() {
    return {
      books: [],
      loading: false,
      toast: { show: false, message: '', type: 'success' },
      currentPage: 1,
      pageSize: 9 // libri per pagina
    };
  },
  computed: {
    wishlist() {
      return this.books.filter(book => book.status === 'da leggere');
    },
    paginatedWishlist() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.wishlist.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.wishlist.length / this.pageSize);
    }
  },
  async mounted() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }
      this.loading = true;
      try {
        const res = await axios.get('http://localhost:5000/api/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books = res.data;
      } catch (err) {
        this.showToast('Errore nel recupero dei libri', 'danger');
      } finally {
        this.loading = false;
      }
    },
    goToDashboard(book) {
      this.$router.push({ path: '/', query: { edit: book._id } });
    },
    async remove(id) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books = this.books.filter(b => b._id !== id);
        this.showToast('Libro rimosso dalla wishlist!');
      } catch (err) {
        this.showToast('Errore nella rimozione del libro', 'danger');
      }
    },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
    }
  }
};
</script>
