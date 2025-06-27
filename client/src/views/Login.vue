<template>
  <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div class="w-100" style="max-width: 400px;">
      <h2 class="mb-4 text-center">Login</h2>
      <form @submit.prevent="login" autocomplete="on" class="d-flex flex-column align-items-center">
        <label for="email" class="form-label w-100 text-center">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :class="['form-control', 'mb-2', 'text-center', toast.type === 'danger' && toast.show ? 'is-invalid' : '']"
          required
          autocomplete="email"
          aria-label="Email"
        />

        <label for="password" class="form-label w-100 text-center">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          :class="['form-control', 'mb-3', 'text-center', toast.type === 'danger' && toast.show ? 'is-invalid' : '']"
          required
          autocomplete="current-password"
          aria-label="Password"
        />

        <button class="btn btn-success w-100" :disabled="loading" aria-label="Accedi">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          {{ loading ? 'Accesso in corso...' : 'Accedi' }}
        </button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/register">Non hai un account? Registrati</router-link>
      </div>

      <div v-if="toast.type === 'danger' && toast.show" class="invalid-feedback d-block text-center mb-2" aria-live="assertive">
        {{ toast.message }}
      </div>

      <Toast
        :show="toast.show"
        :message="toast.message"
        :type="toast.type"
        @close="toast.show = false"
        aria-live="polite"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Toast from '../components/Toast.vue';

export default {
  components: { Toast },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      toast: { show: false, message: '', type: 'success' }
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email, password: this.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        this.showToast('Login effettuato con successo!');
        setTimeout(() => {
          this.$router.push('/').then(() => {
            window.location.reload();
          });
        }, 800);
      } catch (err) {
        this.showToast(
          err.response?.data?.msg || 'Credenziali non valide',
          'danger'
        );
      } finally {
        this.loading = false;
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

<style scoped>
.container {
  min-height: 100vh;
  padding: 1rem;
}
</style>
