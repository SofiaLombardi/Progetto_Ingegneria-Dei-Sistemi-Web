<template>
  <div class="container mt-4">
    <h2 class="mb-4">La tua Libreria</h2>

    <input
      v-model="searchQuery"
      placeholder="Cerca libro o autore..."
      class="form-control mb-3"
      aria-label="Cerca libro o autore"
    />

    <select
      v-model="selectedCategory"
      class="form-select mb-4"
      aria-label="Filtra per categoria"
    >
      <option value="">Tutte le categorie</option>
      <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <select
      v-model="sortOrder"
      class="form-select mb-4"
      aria-label="Ordina libri"
    >
      <option value="recent">Più recenti prima</option>
      <option value="oldest">Più vecchi prima</option>
      <option value="title">Titolo (A-Z)</option>
      <option value="author">Autore (A-Z)</option>
    </select>

    <select
      v-model="statusFilter"
      class="form-select mb-4"
      aria-label="Filtra per stato"
    >
      <option value="">Tutti gli stati</option>
      <option value="letto">Solo letti</option>
      <option value="da leggere">Solo da leggere</option>
    </select>

    <BookForm
      v-if="editingBook"
      ref="bookForm"
      :book="editingBook"
      @submit="updateBook"
      @cancel="editingBook = null"
    />
    <BookForm v-else ref="bookForm" @submit="addBook" />

    <div class="row">
      <div
        class="col-12 col-sm-6 col-lg-4 mb-3"
        v-for="book in paginatedBooks"
        :key="book._id"
      >
        <BookCard
          :book="book"
          :lists="getBookLists(book._id)"
          @edit="startEdit"
          @delete="deleteBook"
          @add-to-list="addToList"
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

    <div v-if="showListSelect" class="modal fade show" tabindex="-1" style="display:block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow">
          <div class="modal-header">
            <h5 class="modal-title">Scegli la lista</h5>
            <button type="button" class="btn-close" @click="cancelAddToList" aria-label="Chiudi"></button>
          </div>
          <div class="modal-body">
            <label for="select-list" class="visually-hidden">Seleziona una lista</label>
            <select
              id="select-list"
              v-model="selectedListId"
              class="form-select mb-3 w-100"
              ref="selectList"
            >
              <option disabled value="">Seleziona una lista</option>
              <option v-for="list in lists" :key="list._id" :value="list._id">{{ list.name }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="cancelAddToList">Annulla</button>
            <button class="btn btn-success" @click="confirmAddToList" :disabled="!selectedListId">Aggiungi</button>
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
import BookCard from '../components/BookCard.vue';
import BookForm from '../components/BookForm.vue';
import Toast from '../components/Toast.vue';

export default {
  components: { BookCard, BookForm, Toast },
  data() {
    return {
      books: [],
      lists: [],
      editingBook: null,
      searchQuery: '',
      selectedCategory: '',
      sortOrder: 'recent',
      selectedBookToAdd: null,
      selectedListId: '',
      showListSelect: false,
      selectListRef: null,
      toast: {
        show: false,
        message: '',
        type: 'success' // o 'danger' per errore
      },
      currentPage: 1,
      pageSize: 9, // libri per pagina
      statusFilter: '',
    };
  },
  async mounted() {
    await this.fetchBooks();
    await this.fetchLists();

    const editId = this.$route.query.edit;
    if (editId) {
      const book = this.books.find(b => b._id === editId);
      if (book) {
        this.startEdit(book);
      }
    }
  },
  methods: {
    async fetchBooks() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.books = res.data;
    },
    async fetchLists() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/lists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.lists = res.data;
    },
    async addBook(bookData) {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.post('http://localhost:5000/api/books', bookData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books.unshift(res.data);
        this.showToast('Libro aggiunto con successo!');
      } catch (err) {
        this.showToast(
          err.response?.data?.msg +
          (err.response?.data?.errors ? '\n' + err.response.data.errors.join('\n') : ''),
          'danger'
        );
      }
    },
    startEdit(book) {
      this.editingBook = book;
      this.$nextTick(() => {
        const form = this.$refs.bookForm?.$el || this.$refs.bookForm;
        if (form && form.scrollIntoView) {
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    async updateBook(updatedData) {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.put(`http://localhost:5000/api/books/${this.editingBook._id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books = this.books.map(b => (b._id === res.data._id ? res.data : b));
        this.editingBook = null;
        this.showToast('Libro aggiornato!');
      } catch (err) {
        this.showToast('Errore durante l\'aggiornamento', 'danger');
      }
    },
    async deleteBook(id) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books = this.books.filter(b => b._id !== id);
        this.showToast('Libro eliminato!');
      } catch (err) {
        this.showToast('Errore durante l\'eliminazione', 'danger');
      }
    },
    getBookLists(bookId) {
      return this.lists
        .filter(list => list.books.some(b => (b._id || b) === bookId))
        .map(list => list.name);
    },
    async addToList(book) {
      if (!this.lists.length) {
        this.showToast('Non hai ancora creato nessuna lista!', 'danger');
        return;
      }
      this.selectedBookToAdd = book;
      this.selectedListId = '';
      this.showListSelect = true;
      this.$nextTick(() => {
        // Focus sulla select
        if (this.$refs.selectList) {
          this.$refs.selectList.focus();
        }
        // Listener ESC
        window.addEventListener('keydown', this.handleEsc);
      });
    },
    cancelAddToList() {
      this.showListSelect = false;
      this.selectedBookToAdd = null;
      this.selectedListId = '';
      window.removeEventListener('keydown', this.handleEsc);
    },
    handleEsc(e) {
      if (e.key === 'Escape') {
        this.cancelAddToList();
      }
    },
    async confirmAddToList() {
      const list = this.lists.find(l => l._id === this.selectedListId);
      if (!list) {
        this.showToast('Seleziona una lista!', 'danger');
        return;
      }
      const token = localStorage.getItem('token');
      try {
        await axios.put(`http://localhost:5000/api/lists/${list._id}`, {
          bookId: this.selectedBookToAdd._id,
          action: 'add'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchLists();
        this.showToast('Libro aggiunto alla lista!');
      } catch (err) {
        this.showToast('Errore durante l\'aggiunta alla lista', 'danger');
      }
      this.showListSelect = false;
      this.selectedBookToAdd = null;
      this.selectedListId = '';
      window.removeEventListener('keydown', this.handleEsc);
    },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
    },
  },
  computed: {
    filteredBooks() {
      const q = this.searchQuery.toLowerCase();
      let filtered = this.books.filter(b => {
        const matchText = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
        const matchCat = this.selectedCategory ? b.category === this.selectedCategory : true;
        const matchStatus = this.statusFilter ? b.status === this.statusFilter : true;
        return matchText && matchCat && matchStatus;
      });

      // Ordinamento
      if (this.sortOrder === 'recent') {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (this.sortOrder === 'oldest') {
        filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (this.sortOrder === 'title') {
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOrder === 'author') {
        filtered = filtered.sort((a, b) => a.author.localeCompare(b.author));
      }

      return filtered;
    },
    allCategories() {
      const categories = this.books.map(b => b.category || 'Sconosciuta');
      return [...new Set(categories)];
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredBooks.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.pageSize);
    }
  },
  watch: {
    books(newBooks) {
      const editId = this.$route.query.edit;
      if (editId) {
        const book = newBooks.find(b => b._id === editId);
        if (book) {
          this.startEdit(book);
          this.$router.replace({ query: { ...this.$route.query, edit: undefined } });
        }
      }
    },
    filteredBooks() {
      this.currentPage = 1;
    }
  }
};
</script>