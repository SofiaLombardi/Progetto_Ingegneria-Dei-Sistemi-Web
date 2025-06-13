<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Login</h2>
    <form @submit.prevent="login" autocomplete="on">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        class="form-control mb-2"
        required
        autocomplete="email"
        aria-label="Email"
      />

      <label for="password" class="form-label">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
        class="form-control mb-3"
        required
        autocomplete="current-password"
        aria-label="Password"
      />

      <button class="btn btn-success w-100" :disabled="loading" aria-label="Accedi">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        Accedi
      </button>
    </form>

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
          this.$router.push('/');
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
