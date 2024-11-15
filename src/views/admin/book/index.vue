<template>
    <div class="book-list-view">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-5">Danh sách sách:</h3>
            <div class="col-4 row justify-content-end">
                <router-link :to="{ name: 'book.create' }" class="btn btn-success col-7">Thêm sách
                    mới</router-link>
            </div>

        </div>
        <div class="row d-flex justify-content-between mb-4">
            <h3 class="title col-1">Lọc:</h3>
            <div class="filter col-8 d-flex justify-content-end p-0">
                <CategoryFilter v-model="filterCategory" class="col-4"></CategoryFilter>
                <InputSearch v-model="searchText" class="col-5 p-0" />
            </div>
        </div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>STT</td>
                    <td>Tên sách</td>
                    <td>Ảnh</td>
                    <td>giá sách</td>
                    <td>Số lượng</td>
                    <td>Nhà xuất bản</td>
                    <td>Danh mục</td>
                    <td v-if="Role == 'manager'">Hành động</td>
                </tr>
            </thead>
            <tbody class="table-gray">
                <tr v-for="(book, index) in filteredBooksByName">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div v-if="book.imagePath"
                            :style="{ backgroundImage: `url(http://127.0.0.1:3000${book.imagePath})` }"
                            style="width: 100px; height: 100px; background-size: cover; background-position: center;">
                        </div>
                    </td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.quantity }}</td>
                    <td>{{ book.publisher[0].name }}</td>
                    <td>{{ book.category[0].name }}</td>
                    <td v-if="Role == 'manager'"><button class="btn btn-warning"
                            v-on:click="goToBookDetails(book._id)">Chỉnh sửa</button><button
                            @click="deleteBook(book._id)" class="btn btn-danger ml-2">Xóa</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import BookService from "../../../services/book.service.js";
import Swal from "sweetalert2";
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        InputSearch,
        CategoryFilter,
    },
    data() {
        return {
            filterCategory: "",
            searchText: "",
            Books: [],
            filterBook: [],
        }
    },
    computed: {
        ...mapState(['Role']),
        filteredBooksByName() {
            // this.filterBook = this.Books;
            // if (this.searchText) {
            //     this.filterBook = this.filterBook.filter((book, index) =>
            //         book.name.includes(this.searchText)
            //     );
            // }
            // if (this.filterCategory) {
            //     this.filterBook = this.filterBook.filter((book, index) => {
            //         // console.log(book.category[0].name);
            //         return book.category[0].name.includes(this.filterCategory)
            //     }
            //     );
            // }
            // return this.filterBook;
            if (this.filterBook || this.searchText) {
                return this.Books.filter((book, index) => book.category[0].name.includes(this.filterCategory)
                    && book.name.includes(this.searchText));
            }
        },

    },
    methods: {
        getBaseUrl() {
            const { protocol, hostname, port } = window.location;
            return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
        },
        goToBookDetails(bookId) {
            this.$router.push({ name: 'book.edit', params: { id: bookId } });
        },
        async retriveBooks() {
            try {
                this.Books = await BookService.getAll();

            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook(id) {
            try {
                await BookService.delete(id);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Xóa sản phẩm thành công",
                    icon: "success",
                });
                this.retriveBooks();
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.retriveBooks();
    }
}
</script>
<style>
.book-list-view {
    max-width: 1200px;
    margin: 0 auto;
}

.table-gray {
    background-color: #e3dddd;
}
</style>