<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Chỉnh sửa:</h4>
            <CategoryForm :category="category" @submit:category="insertCategory">
            </CategoryForm>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import categoryService from "@/services/category.service";
import CategoryForm from "../components/CategoryForm.vue";

export default {
    components: {
        CategoryForm,
    },
    data() {
        return {
            category: {
                name: null,
            }
        }
    },
    methods: {
        async insertCategory(data) {
            try {
                await categoryService.create(data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Thêm danh mục thành công",
                    icon: "success",
                });
                this.$router.push({ name: "category.index" });
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>