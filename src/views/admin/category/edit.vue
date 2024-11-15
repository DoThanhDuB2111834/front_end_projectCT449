<template>
    <div class="row mt-4">
        <div class="create-category-page col-6 offset-3">
            <h4>Chỉnh sửa:</h4>
            <CategoryForm :category="category" @submit:category="updateCategory">
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
        const id = this.$route.params.id;
        return {
            id,
            category: {},
        }
    },
    methods: {
        async findCategory() {
            try {
                this.category = await categoryService.findById(this.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateCategory(data) {
            try {
                await categoryService.update(this.id, data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Cập nhật nhà xuất bản thành công",
                    icon: "success",
                });
                this.$router.push({ name: "category.index" });
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        await this.findCategory();
    }
}
</script>