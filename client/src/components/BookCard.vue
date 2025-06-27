<template>
  <div class="card mb-4 shadow-sm" tabindex="0" aria-label="Scheda libro">
    <div class="card-body text-center d-flex flex-column align-items-center">
      <h5 class="card-title w-100 mb-2">{{ book.title }}</h5>
      <h6 class="card-subtitle mb-3 text-muted w-100">{{ book.author }}</h6>
      <p class="card-text w-100 fst-italic mb-2" v-if="book.status === 'letto' && book.review">
        "{{ book.review }}"
      </p>
      <p class="card-text w-100 mb-2">
        Stato:
        <span class="badge bg-success ms-2" v-if="book.status === 'letto'">Letto</span>
        <span class="badge bg-secondary ms-2" v-else>{{ book.status }}</span>
      </p>
      <p class="card-text w-100 mb-2" v-if="book.status === 'letto'">
        Voto:
        <span aria-label="Voto">{{ book.rating }}</span>
        <span class="ms-2" aria-label="Stelle voto">
          <span v-for="n in 5" :key="n" class="star" :style="{ color: n <= book.rating ? '#ffc107' : '#e4e5e9' }">
            ★
          </span>
        </span>
      </p>
      <p class="card-text w-100 mb-2">
        <small class="text-muted">Genere: {{ book.category || 'Generale' }}</small>
      </p>
      <p class="card-text w-100 mb-2" v-if="lists && lists.length">
        <small class="text-muted">
          Liste:
          <span v-for="list in lists" :key="list" class="badge bg-info text-dark ms-1">{{ list }}</span>
        </small>
      </p>
      <hr class="w-100 my-2" />
      <div class="d-flex justify-content-center gap-2 w-100 mt-3 flex-wrap">
        <button class="btn btn-sm btn-warning" @click="$emit('edit', book)" aria-label="Modifica libro" title="Modifica libro">Modifica</button>
        <button class="btn btn-sm btn-danger" @click="$emit('delete', book._id)" aria-label="Elimina libro" title="Elimina libro">Elimina</button>
        <button
          v-if="!hideAddToList"
          class="btn btn-outline-primary btn-sm"
          @click="$emit('add-to-list', book)"
        >
          Aggiungi a lista
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    lists: {
      type: Array,
      default: () => []
    },
    hideAddToList: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.star {
  font-size: 1.5em;
  margin-right: 2px;
  vertical-align: middle;
  transition: color 0.2s;
}
</style>


