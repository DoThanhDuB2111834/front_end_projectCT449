<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <div class="form-group">
            <label for="surname">Họ: </label>

            <Field name="surname" type="text" class="form-control" placeholder="Nhập vào họ"
                v-model="readerLocal.surname" />

            <ErrorMessage name="surname" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="name">Tên: </label>

            <Field name="name" type="text" class="form-control" placeholder="Nhập vào tên" v-model="readerLocal.name" />

            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="birtdate">Ngày sinh: </label>

            <Field name="birthdate" type="date" class="form-control" placeholder="Nhập vào ngày sinh"
                v-model="readerLocal.birthdate" />

            <ErrorMessage name="birtdate" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="price">Giới tính: </label>

            <select name="gender" id="" v-model="readerLocal.gender" class="form-control">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ: </label>

            <Field name="address" type="text" class="form-control" placeholder="Nhập vào địa chỉ"
                v-model="readerLocal.address" />

            <ErrorMessage name="address" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="phoneNumber">Số điện thoại: </label>

            <Field name="phoneNumber" type="text" class="form-control" placeholder="Nhập vào số điện thoại"
                v-model="readerLocal.phoneNumber" />

            <ErrorMessage name="phoneNumber" class="text-danger" />
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
    emits: ["submit:reader"],
    props: {
        reader: { type: Object, required: true },
    },
    data() {
        const readerFormSchema = yup.object().shape({
            surname: yup
                .string()
                .required("Họ không được rỗng")
                .max(50, "Họ không được vượt quá 50 ký tự"),
            name: yup
                .string()
                .required("Tên không được rỗng")
                .max(50, "Tên không được vượt quá 50 ký tự"),
            address: yup
                .string()
                .required("Địa chỉ không được rỗng"),
        });
        return {
            readerLocal: { ...this.reader },
            readerFormSchema,
        }
    },
    watch: {
        reader: {
            handler(newReader) {
                this.readerLocal = { ...newReader };
            },
            deep: true, immediate: true
        }
    },
    methods: {
        submitReader() {
            console.log("Da submit");
            this.$emit("submit:reader", this.readerLocal);
        },
    },
    mounted() {
    }
}
</script>