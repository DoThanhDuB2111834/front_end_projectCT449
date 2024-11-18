<template>
    <div class="book-list-view">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-5">Danh sách người dùng:</h3>
            <div class="col-4 row justify-content-end">
                <router-link :to="{ name: 'reader.create' }" class="btn btn-success col-7">Thêm đọc giả
                    mới</router-link>
            </div>

        </div>
        <div class="row d-flex justify-content-between mb-4">
            <h3 class="title col-1">Lọc:</h3>
            <div class="filter col-8 d-flex justify-content-end p-0">
                <InputSearch v-model="searchText" class="col-5 p-0" />
            </div>
        </div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>STT</td>
                    <td>Họ và tên</td>
                    <td>Ngày sinh</td>
                    <td>Phái</td>
                    <td>Địa chỉ</td>
                    <td>Điện thoại</td>
                    <td v-if="Role == 'manager'">Hành động</td>
                </tr>
            </thead>
            <tbody class="table-gray">
                <tr v-for="(reader, index) in filteredReader">
                    <td>{{ index + 1 }}</td>
                    <td>{{ reader.surname + " " + reader.name }}</td>
                    <td>{{ reader.birthdate }}</td>
                    <td>{{ reader.gender }}</td>
                    <td>{{ reader.address }}</td>
                    <td>{{ reader.phoneNumber }}</td>
                    <td v-if="Role == 'manager'"><button class="btn btn-warning"
                            v-on:click="goToReaderDetails(reader._id)">Chỉnh sửa</button><button
                            @click="deleteReader(reader._id)" class="btn btn-danger ml-2">Xóa</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import readerService from "../../../services/reader.service";
import Swal from "sweetalert2";
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            searchText: "",
            readers: [],
        }
    },
    computed: {
        ...mapState(['Role']),
        filteredReader() {
            if (!this.searchText) {
                return this.readers;
            }
            return this.readers.filter((reader, index) => reader.name.includes(this.searchText));
        },

    },
    methods: {
        goToReaderDetails(readerId) {
            this.$router.push({ name: 'reader.edit', params: { id: readerId } });
        },
        async retriveBooks() {
            try {
                this.readers = await readerService.getAll();

            } catch (error) {
                console.log(error);
            }
        },
        async deleteReader(id) {
            try {
                await readerService.delete(id);

                this.retriveBooks();
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Xóa sản phẩm thành công",
                    icon: "success",
                });
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