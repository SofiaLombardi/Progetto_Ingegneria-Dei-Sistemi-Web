<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Profilo Utente</h2>
    <ul class="list-group my-3">
      <li class="list-group-item">
        <strong>Nome utente:</strong> {{ username }}
      </li>
      <li class="list-group-item" v-if="createdAt">
        <strong>Iscritta il:</strong> {{ formattedDate }}
      </li>
    </ul>

    <h4 class="mt-4">Cambia password</h4>
    <form @submit.prevent="changePassword" class="mb-3">
      <label for="currentPassword" class="form-label">Password attuale</label>
      <input
        id="currentPassword"
        v-model="currentPassword"
        type="password"
        placeholder="Password attuale"
        class="form-control mb-2"
        required
        autocomplete="current-password"
        aria-label="Password attuale"
      />
      <label for="newPassword" class="form-label">Nuova password</label>
      <input
        id="newPassword"
        v-model="newPassword"
        type="password"
        placeholder="Nuova password"
        class="form-control mb-2"
        required
        autocomplete="new-password"
        aria-label="Nuova password"
      />
      <button class="btn btn-primary w-100" :disabled="loading" aria-label="Aggiorna password">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        Aggiorna password
      </button>
    </form>

    <button class="btn btn-danger w-100" @click="logout" aria-label="Logout">Logout</button>

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

export default {
  components: { Toast },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      createdAt: null,
      loading: false,
      toast: { show: false, message: '', type: 'success' }
    };
  },
  computed: {
    username() {
      return localStorage.getItem('username') || 'Anonimo';
    },
    formattedDate() {
      return this.createdAt ? new Date(this.createdAt).toLocaleDateString() : '';
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.createdAt = res.data.createdAt;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async changePassword() {
      const token = localStorage.getItem('token');
      this.loading = true;
      try {
        await axios.put('http://localhost:5000/api/auth/change-password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.showToast('Password aggiornata!');
        this.currentPassword = '';
        this.newPassword = '';
      } catch (err) {
        this.showToast('Errore: ' + (err.response?.data?.msg || 'Impossibile aggiornare la password'), 'danger');
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
    }
  }
};
</script>

