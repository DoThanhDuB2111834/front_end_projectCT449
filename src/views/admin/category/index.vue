<template>
    <div class="category-list-view">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-4">Danh sách các loại sách</h3>
            <div class="row col-7">
                <InputSearch v-model="searchText" class="col-8" />
                <router-link :to="{ name: 'category.create' }" class="btn btn-success col-4">Thêm danh mục
                    mới</router-link>
            </div>
        </div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>STT</td>
                    <td>Tên danh mục</td>

                    <td v-if="Role == 'manager'">Hành động</td>
                </tr>
            </thead>
            <tbody class=" table-gray">
                <tr v-for="(category, index) in filteredCategories">
                    <td>{{ index + 1 }}</td>
                    <td>{{ category.name }}</td>

                    <td v-if="Role == 'manager'"><button class="btn btn-warning"
                            @click="goToCategoriesDetails(category._id)">Chỉnh
                            sửa</button><button @click="deleteCategories(category._id)"
                            class="btn btn-danger ml-2">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import InputSearch from "../components/InputSearch.vue";
import Swal from "sweetalert2";
import categoryService from "@/services/category.service";
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            searchText: "",
            categories: [],
        }
    },
    computed: {
        ...mapState(['Role']),
        filteredCategories() {
            if (!this.searchText) return this.categories;
            return this.categories.filter((category, index) =>
                category.name.includes(this.searchText)
            );
        },
    },
    methods: {
        goToCategoriesDetails(publisherId) {
            this.$router.push({ name: 'category.edit', params: { id: publisherId } });
        },
        async retriveCategories() {
            try {
                this.categories = await categoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategories(id) {
            try {
                if (await categoryService.delete(id)) {
                    await Swal.fire({
                        position: "top",
                        title: "Thành công",
                        text: "Xóa danh mục thành công",
                        icon: "success",
                    });
                    this.retriveCategories();
                } else {
                    await Swal.fire({
                        position: "top",
                        title: "Thất bại",
                        text: "Xóa danh mục không thành công",
                        icon: "danger",
                    });
                }

            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        await this.retriveCategories();
    }
}
</script>

<style>
.category-list-view {
    max-width: 1000px;
    margin: 0 auto;
}

.table-gray {
    background-color: #e3dddd;
}
</style>