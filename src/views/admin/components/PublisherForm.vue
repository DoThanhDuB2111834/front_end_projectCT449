<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="name">Tên nhà xuất bản: </label>

            <Field name="name" type="text" class="form-control" placeholder="Nhập vào tên nhà xuất bản"
                v-model="publisherLocal.name" />

            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ: </label>

            <Field name="address" type="text" class="form-control" placeholder="Nhập vào địa chỉ"
                v-model="publisherLocal.address" />

            <ErrorMessage name="address" class="text-danger" />
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "@/services/publisher.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:publisher"],
    props: {
        publisher: { type: Object, required: true },
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên Nhà cũng cấp không được rỗng")
                .max(50, "Tên Nhà cũng cấp không được vượt quá 50 ký tự"),
            address: yup
                .string()
                .required("Địa chỉ không được rỗng")
        });
        var publishers = [];
        return {
            publisherLocal: { ...this.publisher },
            publishers,
            publisherFormSchema,
        }
    },
    watch: {
        publisher: {
            handler(newpublisher) {
                this.publisherLocal = { ...newpublisher };
            },
            deep: true, immediate: true
        }
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
    },
}
</script>