<template>
  <div class="card mb-4">
    <div class="card-body d-flex flex-column align-items-center p-3">
      <h5 class="mb-3 text-center w-100">{{ isEditing ? 'Modifica Libro' : 'Nuovo Libro' }}</h5>
      <form @submit.prevent="submit" class="w-100" style="max-width:400px;">
        <label for="title" class="form-label w-100 text-center">Titolo</label>
        <input id="title" v-model="title" placeholder="Inserisci il titolo del libro" class="form-control mb-2 text-center" required autocomplete="off" autofocus />

        <label for="author" class="form-label w-100 text-center">Autore</label>
        <input id="author" v-model="author" placeholder="Inserisci l'autore del libro" class="form-control mb-2 text-center" required autocomplete="off" />

        <label for="status" class="form-label w-100 text-center">Stato</label>
        <select id="status" v-model="status" class="form-select mb-2 text-center" required>
          <option disabled value="">Seleziona lo stato di lettura</option>
          <option value="letto">letto</option>
          <option value="da leggere">da leggere</option>
        </select>

        <label for="category" class="form-label w-100 text-center">Categoria</label>
        <select id="category" v-model="selectedCategory" class="form-select mb-2 text-center">
          <option disabled value="">Seleziona la categoria</option>
          <option v-for="cat in predefinedCategories" :key="cat" :value="cat">{{ cat }}</option>
          <option value="altro">Altro...</option>
        </select>

        <input
          v-if="selectedCategory === 'altro'"
          v-model="customCategory"
          placeholder="Inserisci una categoria personalizzata"
          class="form-control mb-2 text-center"
          required
          aria-label="Categoria personalizzata"
        />

        <div v-if="status === 'letto'">
          <label for="rating" class="form-label w-100 text-center">Voto (1-5)</label>
          <div class="mb-2 d-flex justify-content-center align-items-center gap-2">
            <span
              v-for="n in 5"
              :key="n"
              class="star-input"
              :class="{ active: n <= rating }"
              @click="rating = n"
              role="button"
              tabindex="0"
              :aria-label="`Dai ${n} stelle`"
            >★</span>
            <input
              id="rating"
              v-model.number="rating"
              type="number"
              min="1"
              max="5"
              class="form-control ms-2 text-center"
              style="width:70px;display:inline-block;"
              placeholder="1-5"
              aria-valuemin="1"
              aria-valuemax="5"
              required
            />
          </div>
          <label for="review" class="form-label w-100 text-center">Recensione</label>
          <textarea
            id="review"
            v-model="review"
            placeholder="Scrivi una breve recensione (opzionale)"
            class="form-control mb-2 text-center"
            rows="2"
          ></textarea>
        </div>

        <div class="d-flex flex-column flex-sm-row gap-2 justify-content-center mt-3">
          <button class="btn btn-primary" type="submit"
            :disabled="!title || !author || !status || (selectedCategory === 'altro' && !customCategory)">
            {{ isEditing ? 'Salva modifiche' : 'Aggiungi' }}
          </button>
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

      // Svuota il form quando non si sta modificando un libro 
      if (!this.isEditing) {
        this.title = '';
        this.author = '';
        this.status = '';
        this.selectedCategory = '';
        this.customCategory = '';
        this.rating = 1;
        this.review = '';
      }
    }
  }
};
</script>

<style scoped>
.star {
  font-size: 1.1em;
  vertical-align: middle;
}
button.btn {
  transition: background 0.2s, color 0.2s;
}
button.btn-primary:hover {
  background: #0056b3;
  color: #fff;
}
.star-input {
  font-size: 1.5em;
  color: #e4e5e9;
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
}
.star-input.active {
  color: #ffc107;
}
.star-input:focus {
  outline: 2px solid #ffc107;
}
</style>
