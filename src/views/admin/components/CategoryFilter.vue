<script>
import categoryService from '@/services/category.service';

export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    data() {
        return {
            categories: [],
        }
    },
    emits: ["update:modelValue"],
    methods: {
        updateModelValue(e) {
            console.log(e.target.value);
            this.$emit("update:modelValue", e.target.value);
        },
        async getAllCategories() {
            this.categories = await categoryService.getAll();
        }
    },
    async mounted() {
        await this.getAllCategories();
    }
}
</script>

<template>
    <div class="input-group">
        <select name="" id="" class="form-control" @change="updateModelValue">
            <option value="">Lọc danh mục</option>
            <option v-for="(category, index) in categories" :value="category.name">{{ category.name }}</option>
        </select>
    </div>
</template>