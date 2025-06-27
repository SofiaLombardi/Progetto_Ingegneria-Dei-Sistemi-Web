<template>
  <div class="container mt-4 d-flex flex-column align-items-center">
    <h2 class="mb-4 text-center w-100">Le mie Liste</h2>

    <!-- Toast -->
    <div
      v-if="toast.show"
      class="toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style="z-index: 2000; min-width: 220px;"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toast.show = false" aria-label="Chiudi"></button>
      </div>
    </div>

    <!-- Form creazione lista -->
    <form @submit.prevent="createList" class="mb-4 row g-2 justify-content-center w-100" style="max-width: 500px;">
      <div class="col-12 col-sm-8">
        <label for="newList" class="form-label visually-hidden">Nome Lista</label>
        <input
          v-model="newListName"
          type="text"
          id="newList"
          :class="['form-control', 'text-center', toast.show && toast.message.includes('successo') ? 'is-valid' : '', toast.show && toast.message.includes('Errore') ? 'is-invalid' : '']"
          placeholder="Es: Libri preferiti, Da leggere, Fantasy..."
          required
        />
      </div>
      <div class="col-12 col-sm-4">
        <button class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Crea lista
        </button>
      </div>
    </form>

    <!-- Liste -->
    <div v-if="lists.length === 0" class="text-center">Nessuna lista creata.</div>
    <div v-else class="w-100 d-flex flex-column align-items-center">
      <div
        v-for="list in sortedLists"
        :key="list._id"
        class="card mb-3 w-100"
        style="max-width: 500px;"
        tabindex="0"
        :aria-label="`Lista ${list.name}`"
      >
        <div class="card-body d-flex flex-column align-items-center">
          <h5 class="card-title text-center w-100">{{ list.name }}</h5>
          <p class="card-text text-center w-100">
            Libri nella lista: {{ list.books.length }}
          </p>
          <ul class="list-group mt-2 mb-3 w-100">
            <li
              v-for="book in list.books"
              :key="book._id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{{ book.title }}</strong>
                <span class="text-muted ms-2" v-if="book.author">di {{ book.author }}</span>
              </span>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="askRemoveBook(list._id, book._id, book.title)"
                :aria-label="`Rimuovi ${book.title} da ${list.name}`"
              >
                Rimuovi
              </button>
            </li>
          </ul>
          <hr class="my-4 w-100" v-if="list.books.length">
          <button
            class="btn btn-sm btn-outline-danger mt-2"
            @click="askDeleteList(list._id)"
            :aria-label="`Elimina la lista ${list.name}`"
          >
            Elimina lista
          </button>
        </div>
      </div>
    </div>

    <!-- Modal conferma eliminazione lista -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" style="display:block; background:rgba(0,0,0,0.4);" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Conferma eliminazione</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false" aria-label="Chiudi"></button>
          </div>
          <div class="modal-body">
            <p>Sei sicuro di voler eliminare questa lista? Questa azione non può essere annullata.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showDeleteModal = false">Annulla</button>
            <button class="btn btn-danger" @click="confirmDeleteList">Elimina</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale conferma rimozione libro -->
    <div v-if="removeBookModal.show" class="modal fade show" tabindex="-1" style="display:block; background:rgba(0,0,0,0.4);" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Conferma rimozione</h5>
            <button type="button" class="btn-close" @click="removeBookModal.show = false" aria-label="Chiudi"></button>
          </div>
          <div class="modal-body">
            <p>Vuoi davvero rimuovere <strong>{{ removeBookModal.bookTitle }}</strong> dalla lista?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="removeBookModal.show = false">Annulla</button>
            <button class="btn btn-danger" @click="confirmRemoveBook" autofocus>Rimuovi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newListName: '',
      lists: [],
      toast: {
        show: false,
        message: ''
      },
      loading: false,
      showDeleteModal: false,
      listToDelete: null,
      removeBookModal: {
        show: false,
        listId: null,
        bookId: null,
        bookTitle: '',
      },
    };
  },
  computed: {
    sortedLists() {
      return [...this.lists].sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  async mounted() {
    this.fetchLists();
    this.$nextTick(() => {
      document.getElementById('newList').focus();
    });
  },
  methods: {
    showToast(message) {
      this.toast.message = message;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false; }, 2500);
    },
    async fetchLists() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.lists = res.data;
      } catch (err) {
        this.showToast('Errore nel recupero delle liste');
      }
    },
    async createList() {
      this.loading = true;
      const token = localStorage.getItem('token');
      try {
        const res = await axios.post('http://localhost:5000/api/lists', { name: this.newListName }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.lists.push(res.data);
        this.newListName = '';
        this.showToast('Lista creata con successo!');
      } catch (err) {
        if (err.response?.data?.msg?.includes('esiste già')) {
          this.showToast('Hai già una lista con questo nome!');
        } else {
          this.showToast('Errore nella creazione della lista');
        }
      } finally {
        this.loading = false;
      }
    },
    askDeleteList(listId) {
      this.listToDelete = listId;
      this.showDeleteModal = true;
    },
    async confirmDeleteList() {
      this.showDeleteModal = false;
      if (!this.listToDelete) return;
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/lists/${this.listToDelete}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchLists();
        this.showToast('Lista eliminata!');
      } catch (err) {
        this.showToast('Errore nell\'eliminazione della lista');
      } finally {
        this.listToDelete = null;
      }
    },
    askRemoveBook(listId, bookId, bookTitle) {
      this.removeBookModal.listId = listId;
      this.removeBookModal.bookId = bookId;
      this.removeBookModal.bookTitle = bookTitle;
      this.removeBookModal.show = true;
    },
    async confirmRemoveBook() {
      this.removeBookModal.show = false;
      const { listId, bookId } = this.removeBookModal;
      if (!listId || !bookId) return;
      const token = localStorage.getItem('token');
      try {
        await axios.put(`http://localhost:5000/api/lists/${listId}`, {
          bookId, action: 'remove'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchLists();
        this.showToast('Libro rimosso dalla lista!');
      } catch (err) {
        this.showToast('Errore nella rimozione del libro dalla lista');
      } finally {
        this.removeBookModal.listId = null;
        this.removeBookModal.bookId = null;
        this.removeBookModal.bookTitle = '';
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border-radius: 14px;
}
@media (max-width: 576px) {
  .card,
  form[style] {
    max-width: 100% !important;
  }
}
.toast {
  transition: opacity 0.3s;
}
.modal.fade.show {
  animation: fadeIn 0.25s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
