<template>
  <div class="container mt-4">
    <h2 class="mb-4">Le mie Liste</h2>

    <!-- Toast -->
    <div v-if="toast.show" class="toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true" style="z-index: 2000; min-width: 220px;">
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toast.show = false" aria-label="Chiudi"></button>
      </div>
    </div>

    <!-- Form creazione lista -->
    <form @submit.prevent="createList" class="mb-4 row g-2">
      <div class="col-sm-8">
        <label for="newList" class="form-label visually-hidden">Nome Lista</label>
        <input v-model="newListName" type="text" id="newList" class="form-control" placeholder="Nome nuova lista" required />
      </div>
      <div class="col-sm-4">
        <button class="btn btn-primary w-100">Crea lista</button>
      </div>
    </form>

    <!-- Liste -->
    <div v-if="lists.length === 0">Nessuna lista creata.</div>
    <div v-else>
      <div v-for="list in lists" :key="list._id" class="card mb-3" tabindex="0" :aria-label="`Lista ${list.name}`">
        <div class="card-body">
          <h5 class="card-title">{{ list.name }}</h5>
          <p class="card-text">
            Libri nella lista: {{ list.books.length }}
          </p>
          <ul class="list-group mt-2 mb-3">
            <li v-for="book in list.books" :key="book._id" class="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{{ book.title }}</strong>
                <span class="text-muted ms-2" v-if="book.author">di {{ book.author }}</span>
              </span>
              <button class="btn btn-sm btn-outline-danger" @click="removeFromList(list._id, book._id)" :aria-label="`Rimuovi ${book.title} da ${list.name}`">Rimuovi</button>
            </li>
          </ul>
          <hr class="my-4" v-if="list.books.length">
          <button class="btn btn-sm btn-outline-danger mt-2" @click="deleteList(list._id)" :aria-label="`Elimina la lista ${list.name}`">
            Elimina lista
          </button>
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
      }
    };
  },
  async mounted() {
    this.fetchLists();
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
      const token = localStorage.getItem('token');
      try {
        const res = await axios.post('http://localhost:5000/api/lists', { name: this.newListName }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.lists.push(res.data);
        this.newListName = '';
        this.showToast('Lista creata con successo!');
      } catch (err) {
        this.showToast('Errore nella creazione della lista');
      }
    },
    async removeFromList(listId, bookId) {
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
      }
    },
    async deleteList(listId) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/lists/${listId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchLists();
        this.showToast('Lista eliminata!');
      } catch (err) {
        this.showToast('Errore nell\'eliminazione della lista');
      }
    }
  }
};
</script>
