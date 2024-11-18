<template>
    <div class="book-order" v-if="BookOrders">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-5">Tổng hợp các đơn mượn sách:</h3>
            <div class="col-4 row justify-content-end">
                <router-link :to="{ name: 'bookOrder.create' }" class="btn btn-success col-7">Thêm đơn
                    mượn</router-link>
            </div>

        </div>
        <div class="row d-flex justify-content-between mb-4">
            <h3 class="title col-1">Lọc:</h3>
            <div class="filter col-8 d-flex justify-content-end p-0">
                <!-- <CategoryFilter v-model="filterCategory" class="col-4"></CategoryFilter> -->
                <InputSearch v-model="searchText" class="col-5 p-0" />
            </div>
        </div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>STT</td>
                    <td>Tên sách</td>
                    <td>Tên đọc giả</td>
                    <td>Ngày mượn</td>
                    <td>Ngày trả</td>
                    <td>Nhân viên xác nhận đơn</td>
                    <td>Trạng thái</td>
                    <td v-if="Role == 'manager'">Hành động</td>
                </tr>
            </thead>
            <tbody class="table-gray">
                <tr v-for="(bookOrder, index) in filteredBookOrders">
                    <td>{{ index + 1 }}</td>
                    <td>
                        {{ bookOrder.book[0].name }}
                    </td>
                    <td>{{ bookOrder.reader[0].name }}</td>
                    <td>{{ bookOrder.dateBorrow }}</td>
                    <td>{{ bookOrder.dateReturn }}</td>
                    <td>{{ bookOrder.staff[0].name }}</td>
                    <td>{{ bookOrder.state }}</td>
                    <td v-if="Role == 'manager'"><button class="btn btn-warning"
                            v-on:click="goToBookDetails(bookOrder._id)">Chỉnh
                            sửa</button><button @click="deleteManageBook(bookOrder._id)"
                            class="btn btn-danger ml-2">Xóa</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import managerBorrowsBookService from "@/services/managerBorrowsBook.service";
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
            BookOrders: [],
        }
    },
    computed: {
        ...mapState(['Role']),
        filteredBookOrders() {
            return this.BookOrders.filter((bookOrder, index) => bookOrder.book[0].name.includes(this.searchText));
        },

    },
    methods: {
        getBaseUrl() {
            const { protocol, hostname, port } = window.location;
            return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
        },
        goToBookDetails(id) {
            this.$router.push({ name: 'bookOrder.edit', params: { id: id } });
        },
        async retriveBookOrder() {
            try {
                this.BookOrders = await managerBorrowsBookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteManageBook(id) {
            try {
                await managerBorrowsBookService.delete(id);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Xóa đơn mượn thành công",
                    icon: "success",
                });
                this.retriveBookOrder();
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.retriveBookOrder();
    }
}
</script>
<style>
.book-order {
    max-width: 1200px;
    margin: 0 auto;
}

.table-gray {
    background-color: #e3dddd;
}
</style>