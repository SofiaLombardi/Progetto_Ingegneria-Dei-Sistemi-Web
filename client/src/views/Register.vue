<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Registrati</h2>
    <form @submit.prevent="register" autocomplete="on">
      <label for="username" class="form-label">Username</label>
      <input
        id="username"
        v-model="username"
        placeholder="Username"
        class="form-control mb-2"
        required
        autocomplete="username"
        aria-label="Username"
      />

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
        autocomplete="new-password"
        aria-label="Password"
      />

      <button class="btn btn-primary w-100" aria-label="Registrati">Registrati</button>
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
      username: '', 
      email: '', 
      password: '',
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  methods: {
    async register() {
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
