<template>

    <div class="container mt-4">
        <div class="row" v-if="book">
            <div class="col-md-4 text-center"> <img :src="`http://127.0.0.1:3000${book.imagePath}`" class="book-image"
                    alt="Book Image"> </div>
            <div class="col-md-8">
                <h2>{{ book.name }}</h2>
                <p class="text-muted">by {{ book.author }}</p>
                <p><strong>Danh mục:</strong> {{ book.category[0].name }}</p>
                <p><strong>Tình trạng:</strong> {{ book.quantity > 0 ? 'Còn sách' : 'Hết sách' }}</p>
                <p><strong>Nhà xuất bản:</strong> {{ book.publisher[0].name }}</p>
                <button v-on:click="gotoBorrow(book._id)" class="btn btn-success mt-3">Đăng ký mượn</button>
            </div>
        </div> <!-- Related Books -->
        <div class="related-books mt-5">
            <h3>Related Books</h3>
            <div class="row">
                <div class="col-md-2" v-for="(book, index) in bookWithSameCategory">
                    <div class="card"> <img :src="`http://127.0.0.1:3000${book.imagePath}`" class="card-img-top"
                            alt="Related Book 1">
                        <div class="card-body">
                            <h6 class="card-title">{{ book.name }}</h6> <button @click="gotoDetail(book._id)"
                                class="btn btn-primary btn-sm">Xem chi
                                tiết</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.book-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: auto;
}

.breadcrumb {
    background-color: #f8f9fa;
}

.related-books img {
    height: 190px;
    object-fit: cover;
}
</style>

<script>
import bookService from '@/services/book.service';

export default {
    data() {
        return {
            book: null,
            bookWithSameCategory: [],
        };
    },
    methods: {
        async findBook() {
            try {
                this.book = await bookService.findById(this.$route.params.id);
            } catch (error) {
                console.log(error.message);
            }
        },
        async retriveBookWithSameCategory() {
            try {
                this.bookWithSameCategory = await bookService.getAll();
                if (this.book) {
                    this.bookWithSameCategory = this.bookWithSameCategory.filter((book, index) => {
                        return book.category[0]._id == this.book.category[0]._id;

                    })
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        gotoDetail(id) {
            this.$router.push({ name: "detail", params: { id: id } });
        },
        gotoBorrow(id) {
            this.$router.push({ name: "clientBorrow", params: { bookId: id } });
        }
    },
    async mounted() {
        await this.findBook();
        await this.retriveBookWithSameCategory();
    }
}
</script>