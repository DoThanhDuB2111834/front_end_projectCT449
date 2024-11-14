<template>
    <div class="book-list-view">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-4">Danh sách các loại sách</h3>
            <div class="row col-5">
                <InputSearch v-model="searchText" class="col-8" />
                <router-link :to="{ name: 'book.create' }" class="btn btn-success col-4">Thêm sách mới</router-link>
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
                    <td>Hành động</td>
                </tr>
            </thead>
            <tbody class="table-gray">
                <tr v-for="(book, index) in filteredContacts">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div :style="{ backgroundImage: `url(http://127.0.0.1:3000${book.imagePath})` }"
                            style="width: 100px; height: 100px; background-size: cover; background-position: center;">
                        </div>
                    </td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.quantity }}</td>
                    <td>{{ book.publisher[0].name }}</td>
                    <td><button class="btn btn-warning" v-on:click="goToBookDetails(book._id)">Chỉnh sửa</button><button
                            @click="deleteBook(book._id)" class="btn btn-danger ml-2">Xóa</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import BookService from "../../../services/book.service.js";
import Swal from "sweetalert2";
export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            searchText: "",
            Books: [],
        }
    },
    computed: {
        filteredContacts() {
            if (!this.searchText) return this.Books;
            return this.Books.filter((book, index) =>
                book.name.includes(this.searchText)
            );
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