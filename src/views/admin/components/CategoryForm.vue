<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group">
            <label for="name">Tên danh mục: </label>

            <Field name="name" type="text" class="form-control" placeholder="Nhập vào tên danh mục"
                v-model="categoryLocal.name" />

            <ErrorMessage name="name" class="text-danger" />
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:category"],
    props: {
        category: { type: Object, required: true },
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên danh mục không được rỗng")
                .max(50, "Tên danh mục không được vượt quá 50 ký tự"),
        });
        return {
            categoryLocal: { ...this.category },
            categoryFormSchema,
        }
    },
    watch: {
        category: {
            handler(newcategory) {
                this.categoryLocal = { ...newcategory };
            },
            deep: true, immediate: true
        }
    },
    methods: {
        submitCategory() {
            this.$emit("submit:category", this.categoryLocal);
        },
    },
}
</script>