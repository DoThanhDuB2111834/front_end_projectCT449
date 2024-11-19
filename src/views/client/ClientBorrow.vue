<template>

    <Form :validation-schema="manageBorrowBookFormSchema" class="row">
        <div class="col-6">
            <h1>Thông tin sách mượn</h1>

            <div class="d-flex flex-column  mt-4" v-if="book">
                <img :src="`http://127.0.0.1:3000${book.imagePath}`" class="book-image" alt="Book Image">
                <div class="mx-5 mt-5">
                    <div class=" d-flex flex-row">
                        <h5>Tên sách: </h5>
                        <p id="bookName" style="margin: 0 10px;">{{ book.name }}</p>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <h5>Giá sách: </h5>
                        <p id="bookPrice" style="margin: 0 10px;">{{ book.price }}</p>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <h5>Tác giả: </h5>
                        <p id="bookAuthor" style="margin: 0 10px;">{{ book.author }}</p>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <h5>Năm xuất bản: </h5>
                        <p id="bookPublicationYear" style="margin: 0 10px;">{{ book.publicationYear }}</p>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <h5>Danh mục: </h5>
                        <p id="bookCategory" style="margin: 0 10px;">{{ book.category[0].name }}</p>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <h5>Nhà xuất bản: </h5>
                        <p id="bookPublisher" style="margin: 0 10px;">{{ book.publisher[0].name }}</p>
                    </div>
                </div>


            </div>


        </div>
        <div class="col-6">
            <h1>Thông tin người dùng</h1>
            <div class="form-group">
                <label for="email">Email: </label>

                <Field name="email" type="text" class="form-control" placeholder="Nhập vào email"
                    v-model="manageBorrowBook.email" />

                <ErrorMessage name="email" class="text-danger" />
            </div>
            <div class="form-group">
                <label for="surname">Họ: </label>

                <Field name="surname" type="text" class="form-control" placeholder="Nhập vào họ"
                    v-model="manageBorrowBook.surname" />

                <ErrorMessage name="surname" class="text-danger" />
            </div>
            <div class="form-group">
                <label for="name">Tên: </label>

                <Field name="name" type="text" class="form-control" placeholder="Nhập vào tên"
                    v-model="manageBorrowBook.name" />

                <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="form-group">
                <label for="birtdate">Ngày sinh: </label>

                <Field name="birthdate" type="date" class="form-control" placeholder="Nhập vào ngày sinh"
                    v-model="manageBorrowBook.birthdate" />

                <ErrorMessage name="birtdate" class="text-danger" />
            </div>
            <div class="form-group">
                <label for="price">Giới tính: </label>

                <select name="gender" id="" v-model="manageBorrowBook.gender" class="form-control">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>

            <div class="form-group">
                <label for="address">Địa chỉ: </label>

                <Field name="address" type="text" class="form-control" placeholder="Nhập vào địa chỉ"
                    v-model="manageBorrowBook.address" />

                <ErrorMessage name="address" class="text-danger" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Số điện thoại: </label>

                <Field name="phoneNumber" type="text" class="form-control" placeholder="Nhập vào số điện thoại"
                    v-model="manageBorrowBook.phoneNumber" />

                <ErrorMessage name="phoneNumber" class="text-danger" />
            </div>
            <div class="form-group mt-3">
                <label for="dateBorrow">Ngày mượn</label>
                <input type="date" name="" class="form-control" id="dateBorrow"
                    v-model="this.manageBorrowBook.dateBorrow">
            </div>
            <div class="form-group mt-3">
                <label for="dateReturn">Ngày trả</label>
                <input type="date" name="" class="form-control" id="dateReturn"
                    v-model="this.manageBorrowBook.dateReturn">
            </div>
            <button class="btn btn-success" type="submit">Tạo đơn mượn sách</button>
            <!-- <button type="submit" class="btn btn-success">Submit</button> -->

        </div>
    </Form>


</template>

<style>
.book-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: auto;
}
</style>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import bookService from "@/services/book.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const manageBorrowBookFormSchema = yup.object().shape({
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
            book: null,
            manageBorrowBook: {
                email: null,
                surname: null,
                name: null,
                gender: null,
                birthdate: null,
                address: null,
                phoneNumber: null,
                dateBorrow: null,
                dateReturn: null,
                bookId: null,
            },
            manageBorrowBookFormSchema,
        }
    },
    methods: {
        async findBook() {
            try {
                this.book = await bookService.findById(this.$route.params.bookId)
            } catch (error) {
                console.error(error.message);
            }
        },
        submitBorrowBook() {
            console.log("Da submit");

        },
    },
    mounted() {
        this.findBook();
    }
}
</script>