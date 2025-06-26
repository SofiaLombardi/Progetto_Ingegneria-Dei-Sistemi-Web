<template>
  <div class="card mb-3" tabindex="0" aria-label="Scheda libro">
    <div class="card-body">
      <h5 class="card-title">{{ book.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
      <p class="card-text" v-if="book.status === 'letto' && book.review">
        {{ book.review }}
      </p>
      <p class="card-text">
        Stato: <strong>{{ book.status }}</strong>
        <span v-if="book.status === 'letto'">
          | Voto:
          <span aria-label="Voto">{{ book.rating }}</span>
          <span class="ms-2" aria-label="Stelle voto">
            <span v-for="n in 5" :key="n" class="star" :style="{ color: n <= book.rating ? '#ffc107' : '#e4e5e9' }">
              ★
            </span>
          </span>
        </span>
      </p>
      <p class="card-text">
        <small class="text-muted">Genere: {{ book.category || 'Generale' }}</small>
      </p>
      <p class="card-text" v-if="lists && lists.length">
        <small class="text-muted">
          Liste: <span v-for="(list, i) in lists" :key="list">{{ list }}<span v-if="i < lists.length - 1">, </span></span>
        </small>
      </p>
      <button class="btn btn-sm btn-warning me-2" @click="$emit('edit', book)" aria-label="Modifica libro">Modifica</button>
      <button class="btn btn-sm btn-danger me-2" @click="$emit('delete', book._id)" aria-label="Elimina libro">Elimina</button>
      <button
        v-if="!hideAddToList"
        class="btn btn-outline-primary btn-sm"
        @click="$emit('add-to-list', book)"
      >
        Aggiungi a lista
      </button>
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


