<template>
  <div class="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
    <div class="w-100" style="max-width: 400px;">
      <h2 class="mb-4 text-center">Registrati</h2>
      <form @submit.prevent="register" autocomplete="on" class="d-flex flex-column align-items-center">
        <label for="username" class="form-label w-100 text-center">Username</label>
        <input
          id="username"
          v-model="username"
          placeholder="Username"
          class="form-control mb-2 text-center"
          required
          autocomplete="username"
          aria-label="Username"
        />

        <label for="email" class="form-label w-100 text-center">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-control mb-2 text-center"
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
          class="form-control mb-3 text-center"
          required
          autocomplete="new-password"
          aria-label="Password"
        />

        <button class="btn btn-primary w-100" :disabled="loading" aria-label="Registrati">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          {{ loading ? 'Registrazione...' : 'Registrati' }}
        </button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/login">Hai già un account? Accedi</router-link>
      </div>

      <Toast
        :show="toast.show"
        :message="toast.message"
        :type="toast.type"
        @close="toast.show = false"
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
      username: '', 
      email: '', 
      password: '',
      loading: false,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  methods: {
    async register() {
      this.loading = true;
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.showToast('Registrazione avvenuta con successo!');
        setTimeout(() => {
          this.$router.push('/login');
        }, 1200);
      } catch (err) {
        this.showToast(
          err.response?.data?.msg || 'Errore durante la registrazione',
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
    },
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 1rem;
}
</style>
