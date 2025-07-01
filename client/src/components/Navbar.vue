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
      <!-- Mostra i link solo se loggato -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isLoggedIn">
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
      </ul>
      <ul class="navbar-nav align-items-center d-flex flex-row gap-2 ms-auto justify-content-end">
        <li class="nav-item" v-if="isLoggedIn">
          <span class="navbar-text me-2">👤 {{ username }}</span>
        </li>
        <!-- Bottone profilo con icona -->
        <li class="nav-item" v-if="isLoggedIn">
          <router-link
            class="btn btn-outline-light btn-sm btn-profile d-flex align-items-center"
            to="/profile"
            aria-label="Vai al profilo"
            tabindex="0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-circle me-1" viewBox="0 0 16 16">
              <path d="M11 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5.978 5.978 0 0 1-4.468-2.09C3.242 10.226 5.21 9 8 9s4.758 1.226 4.468 1.91A5.978 5.978 0 0 1 8 13z"/>
            </svg>
            <span class="d-none d-md-inline">Profilo</span>
          </router-link>
        </li>
        <!-- Solo Registrati se non loggato e su /login -->
        <li class="nav-item" v-if="!isLoggedIn && isLoginPage">
          <router-link class="nav-link" to="/register" aria-label="Vai alla pagina di registrazione">Registrati</router-link>
        </li>
        <!-- Solo Login se non loggato e su /register -->
        <li class="nav-item" v-if="!isLoggedIn && isRegisterPage">
          <router-link class="nav-link" to="/login" aria-label="Vai alla pagina di login">Login</router-link>
        </li>
        <!-- Solo Registrati se non loggato e NON su /register o /login -->
        <li class="nav-item" v-if="!isLoggedIn && !isRegisterPage && !isLoginPage">
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
    },
    isLoginPage() {
      return this.$route.path === '/login';
    },
    isRegisterPage() {
      return this.$route.path === '/register';
    }
  },
};
</script>

<style scoped>
.navbar-text {
  color: #ffffff;
  font-weight: 500;
  white-space: nowrap;
}
.btn-profile {
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  padding: 0.25rem 0.75rem;
}
.btn-profile:hover, .btn-profile:focus {
  background: #0d6efd !important;
  color: #fff !important;
  border-color: #0d6efd !important;
}
.nav-link {
  color: #fff !important;
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  transition: color 0.2s, background 0.2s, border-bottom 0.2s;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
}

.nav-link:hover,
.nav-link:focus {
  color: #0d6efd !important;
  background: #fff !important;
  text-decoration: none;
}

.router-link-exact-active.nav-link,
.router-link-active.nav-link {
  color: #fff !important;
  background: #0d6efd !important;
}
</style>
