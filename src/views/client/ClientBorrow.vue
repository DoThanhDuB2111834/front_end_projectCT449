<template>

    <Form :validation-schema="manageBorrowBookFormSchema" @submit="submitBorrowBook()" class="row">
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
            <div>
                <div class="">
                    <h2>Bạn có tài khoản chưa?</h2>
                    <div class="btn-group my-4 d-flex flex-row justify-content-evenly">
                        <a class="btn btn-success" @click="displayNormalForm()">Đã có tài khoản</a>
                        <a class="btn btn-danger" @click="displayRegisterForm()">Chưa có tài khoản</a>
                    </div>

                    <div id="normal-form" class="hidden">
                        <div class="form-group"> <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Nhập email"
                                v-model="manageBorrowBook.email" />


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
                    </div>

                    <div id="register-form" class="hidden">
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

                            <Field name="phoneNumber" type="text" class="form-control"
                                placeholder="Nhập vào số điện thoại" v-model="manageBorrowBook.phoneNumber" />

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
                        <button class="btn btn-success" type="submit">Tạo đơn mượn
                            sách</button>
                    </div>
                </div>
            </div>
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

.hidden {
    display: none;
}
</style>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import bookService from "@/services/book.service";
import managerBorrowsBookService from "@/services/managerBorrowsBook.service";
import Swal from "sweetalert2";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const manageBorrowBookFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Email không được rỗng"),
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
        displayRegisterForm() {

            document.getElementById('register-form').classList.remove('hidden');
            document.getElementById('normal-form').classList.add('hidden');
        },
        displayNormalForm() {

            document.getElementById('normal-form').classList.remove('hidden');
            document.getElementById('register-form').classList.add('hidden');
        },
        async findBook() {
            try {
                this.book = await bookService.findById(this.$route.params.bookId)
            } catch (error) {
                console.error(error.message);
            }
        },
        async submitBorrowBook() {
            console.log("du me m");
            if (this.manageBorrowBook.surname || this.manageBorrowBook.name) {
                try {
                    this.manageBorrowBook.bookId = this.book._id;
                    var response = await managerBorrowsBookService.clientBorrowRequest(this.manageBorrowBook);
                    console.log(response);
                    Swal.fire({
                        title: "Vui lòng nhập mã xác nhận",
                        input: "text",
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "Look up",

                        preConfirm: async (code) => {
                            try {
                                await managerBorrowsBookService.verify(code);

                                await Swal.fire({
                                    position: "top",
                                    title: "Thông báo",
                                    text: "Xác nhận thành công",
                                    icon: "success",
                                });
                                this.$router.push({ name: 'index' });
                            } catch (error) {
                                console.error(error.message);
                            }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    })
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                try {
                    this.manageBorrowBook.bookId = this.book._id;
                    console.log(this.manageBorrowBook);
                    var response = await managerBorrowsBookService.clientBorrowRequestWithAccount(this.manageBorrowBook);
                    console.log(response);

                    this.$router.push({ name: 'index' });
                    await Swal.fire({
                        position: "top",
                        title: "Thông báo",
                        text: "Gửi đơn mượn sách thành công",
                        icon: "success",
                    });
                } catch (error) {
                    console.log(error.message);
                }
            }

        },
    },
    mounted() {
        this.findBook();
    }
}
</script>