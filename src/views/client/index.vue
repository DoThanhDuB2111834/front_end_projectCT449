<template>
    <div v-if="books">
        <div class="row">
            <h2 class="col-4">Sách trong thư viện: </h2>
            <div class="col-7 offset-1 d-flex flex-row align-items-center justify-content-end">
                <CategoryFilter class="col-4" v-model="filterCategory"></CategoryFilter>
                <InputSearch class="col-7" v-model="searchTest"></InputSearch>
            </div>
        </div>
        <div class="mt-5">
            <div class="row"> <!-- Example Book Card -->
                <div class="col-md-3" v-for="(book, index) in filterBook">
                    <div class="card">
                        <img :src="`http://127.0.0.1:3000${book.imagePath}`" width="50" class="card-img-top"
                            alt="Book Image">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ book.name }}</h5>
                        <p class="card-text">{{ book.category[0].name }}</p>
                        <p class="card-text">{{ book.quantity > 0 ? 'Còn sách' : 'Hết sách' }}</p>
                        <p class="card-text">{{ book.publisher[0].name }}</p> <button class="btn btn-primary"
                            @click="gotoDetail(book._id)">Xem chi tiết</button>
                    </div>
                </div>
            </div> <!-- Add more book cards below -->
        </div>
    </div>

</template>
<style>
.card-img-top {
    max-height: 340px;
}
</style>

<script>
import InputSearch from './components/InputSearch.vue';
import bookService from '@/services/book.service';
import CategoryFilter from './components/CategoryFilter.vue';
export default {
    components: {
        InputSearch,
        CategoryFilter,
    },
    data() {
        return {
            filterCategory: "",
            searchTest: "",
            books: [],
        }
    },
    computed: {
        filterBook() {
            if (this.filterCategory || this.searchTest) {
                return this.books.filter((book, index) => {
                    return book.name.includes(this.searchTest) && book.category[0].name.includes(this.filterCategory);
                });
            }
            return this.books;
        }
    },

    methods: {
        async retriveBook() {
            try {
                this.books = await bookService.getAll();
                console.log(this.books);
            } catch (error) {
                console.log(error.message);
            }
        },
        gotoDetail(id) {
            this.$router.push({ name: "detail", params: { id: id } });
        }
    },
    async mounted() {
        await this.retriveBook();
    }
}
</script>