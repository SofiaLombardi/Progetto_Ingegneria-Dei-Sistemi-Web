<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5>{{ isEditing ? 'Modifica Libro' : 'Nuovo Libro' }}</h5>
      <form @submit.prevent="submit">
        <label for="title" class="form-label">Titolo</label>
        <input id="title" v-model="title" placeholder="Titolo" class="form-control mb-2" required autocomplete="off" />

        <label for="author" class="form-label">Autore</label>
        <input id="author" v-model="author" placeholder="Autore" class="form-control mb-2" required autocomplete="off" />

        <label for="status" class="form-label">Stato</label>
        <select id="status" v-model="status" class="form-select mb-2" required>
          <option disabled value="">Seleziona stato</option>
          <option value="letto">letto</option>
          <option value="da leggere">da leggere</option>
        </select>

        <label for="category" class="form-label">Categoria</label>
        <select id="category" v-model="selectedCategory" class="form-select mb-2">
          <option disabled value="">Seleziona categoria</option>
          <option v-for="cat in predefinedCategories" :key="cat" :value="cat">{{ cat }}</option>
          <option value="altro">Altro...</option>
        </select>

        <input
          v-if="selectedCategory === 'altro'"
          v-model="customCategory"
          placeholder="Inserisci categoria personalizzata"
          class="form-control mb-2"
          required
          aria-label="Categoria personalizzata"
        />

        <div v-if="status === 'letto'">
          <label for="rating" class="form-label">Voto (1-5)</label>
          <input
            id="rating"
            v-model.number="rating"
            type="number"
            min="1"
            max="5"
            class="form-control mb-2"
            placeholder="Voto (1-5)"
            aria-valuemin="1"
            aria-valuemax="5"
            required
          />
          <label for="review" class="form-label">Recensione</label>
          <textarea
            id="review"
            v-model="review"
            placeholder="Recensione"
            class="form-control mb-2"
            rows="2"
          ></textarea>
        </div>

        <div class="d-flex flex-column flex-sm-row gap-2">
          <button class="btn btn-primary" type="submit">{{ isEditing ? 'Salva modifiche' : 'Aggiungi' }}</button>
          <button
            v-if="isEditing"
            class="btn btn-secondary"
            type="button"
            @click="$emit('cancel')"
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  data() {
    return {
      title: this.book?.title || '',
      author: this.book?.author || '',
      status: this.book?.status || '',
      selectedCategory: this.book?.category || '',
      customCategory: '',
      rating: this.book?.rating || 1,
      review: this.book?.review || '',
      predefinedCategories: ['Narrativa', 'Saggio','Romanzo', 'Fantasy', 'Giallo', 'Storico', 'Biografia']
    };
  },
  computed: {
    isEditing() {
      return !!this.book?._id;
    }
  },
  methods: {
    submit() {
      let category = '';
      if (this.selectedCategory === 'altro') {
        category = this.customCategory.trim();
      } else if (this.selectedCategory) {
        category = this.selectedCategory;
      } else {
        category = 'Generale';
      }

      const bookData = {
        title: this.title.trim(),
        author: this.author.trim(),
        status: this.status,
        category
      };

      if (this.status === 'letto') {
        bookData.rating = this.rating;
        bookData.review = this.review;
      }

      this.$emit('submit', bookData);
    }
  }
};
</script>

<style scoped>
.star {
  font-size: 1.1em;
  vertical-align: middle;
}
</style>
