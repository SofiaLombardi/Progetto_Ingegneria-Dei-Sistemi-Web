<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2 px-md-3" role="navigation" aria-label="Menu principale">
    <router-link class="navbar-brand" to="/" aria-label="Homepage BookClub">
      📚 <span class="d-none d-sm-inline">BookClub</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/wishlist">Wishlist</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">Liste</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/stats">Statistiche</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Profilo</router-link>
        </li>
      </ul>
      <ul class="navbar-nav align-items-center d-flex flex-row gap-2 ms-auto justify-content-end">
        <li class="nav-item" v-if="isLoggedIn">
          <span class="navbar-text me-2">👤 {{ username }}</span>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="btn btn-outline-light btn-sm btn-logout" @click="logout" aria-label="Logout" tabindex="0">Logout</button>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login" aria-label="Vai alla pagina di login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/register" aria-label="Vai alla pagina di registrazione">Registrati</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    username() {
      return localStorage.getItem('username') || 'Utente';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push('/login');
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.navbar-text {
  color: #ffffff;
  font-weight: 500;
  white-space: nowrap;
}
.btn-logout {
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.btn-logout:hover, .btn-logout:focus {
  background: #dc3545 !important;
  color: #fff !important;
  border-color: #dc3545 !important;
}
</style>
