<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên sách: </label>

            <Field name="name" type="text" class="form-control" placeholder="Nhập vào tên sách"
                v-model="bookLocal.name" />

            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="price">Giá sách: </label>

            <Field name="price" type="number" class="form-control" placeholder="Nhập vào giá sách"
                v-model="bookLocal.price" />

            <ErrorMessage name="price" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng sách: </label>

            <Field name="quantity" type="number" class="form-control" placeholder="Nhập vào số lượng sách"
                v-model="bookLocal.quantity" />

            <ErrorMessage name="quantity" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="publicationYear">Năm xuất bản: </label>

            <Field name="publicationYear" type="date" class="form-control" placeholder="Nhập vào năm xuất bản"
                v-model="bookLocal.publicationYear" />

            <ErrorMessage name="publicationYear" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="author">Tên tác giả : </label>

            <Field name="author" type="text" class="form-control" placeholder="Nhập vào tên tác giả"
                v-model="bookLocal.author" />

            <ErrorMessage name="author" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="publisher">Nhà xuất bản: </label>

            <select class="form-control" id="publisher" v-model="bookLocal.publisherId">
                <option v-for="(publisher, index) in publishers" :value="publisher._id">{{ publisher.name }}
                </option>
            </select>
        </div>
        <ImageInput @change:image="changImageBookProperty"></ImageInput>
        <button type="submit" class="btn btn-success">Submit</button>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "@/services/publisher.service";
import ImageInput from "./ImageInput.vue";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ImageInput,
    },
    emits: ["submit:book"],
    props: {
        book: { type: Object, required: true },
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên sách không được rỗng")
                .max(50, "Tên sách không được vượt quá 50 ký tự"),
            price: yup
                .number()
                .required("Giá sách không được rỗng")
                .min(0, "Giá sách không được nhỏ hơn 0"),
            quantity: yup
                .number()
                .required("Số lượng sách không được rỗng")
                .min(0, "Số lượng sách không được nhỏ hơn 0"),
            author: yup
                .string()
                .required("Tên tác giả không được rỗng")
                .max(50, "Tên tác giả không được vượt quá 50 ký tự"),
        });
        var publishers = [];
        return {
            bookLocal: this.book,
            publishers,
            bookFormSchema,
        }
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        async retrivePubliser() {
            this.publishers = await publisherService.getAll();
        },
        changImageBookProperty(data) {
            this.bookLocal.image = data;
        }
    },
    mounted() {
        this.retrivePubliser();
    }
}
</script>