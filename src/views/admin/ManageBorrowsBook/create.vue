<template>
    <div class="row mt-4">
        <div class="create-book-page col-12">
            <h2>Tạo đơn mượn sách:</h2>
            <Form class="row mt-5" @submit="borrowsBook">
                <div class="col-6">
                    <h4>Thông tin người dùng</h4>
                    <p class="mt-4">Tìm kiếm tên người dùng: *</p>
                    <div class="position-relative">
                        <InputSearch v-model="searchTextReader" class="" id="search_user" />
                        <ul id="search_user_result">

                        </ul>
                    </div>

                    <div class="mt-5 d-flex flex-row">
                        <h5>Họ và tên: </h5>
                        <p id="fullName" style="margin: 0 10px;"></p>
                    </div>
                    <div class="mt-4 d-flex flex-row">
                        <h5>Giới tính: </h5>
                        <p style="margin: 0 10px;" id="gender"></p>
                    </div>
                    <div class="mt-4 d-flex flex-row">
                        <h5>Ngày sinh: </h5>
                        <p style="margin: 0 10px;" id="birthdate"></p>
                    </div>
                    <div class="mt-4 d-flex flex-row">
                        <h5>Địa chỉ: </h5>
                        <p style="margin: 0 10px;" id="address"></p>
                    </div>
                    <div class="mt-4 d-flex flex-row">
                        <h5>Số điện thoại: </h5>
                        <p style="margin: 0 10px;" id="phoneNumber"></p>
                    </div>
                </div>
                <div class=" col-6">
                    <h4>Thông tin sách</h4>

                    <p class="mt-4">Tìm kiếm tên sách: *</p>
                    <div class="position-relative">
                        <InputSearch v-model="searchTextBook" class="" id="search_book" />
                        <ul id="search_book_result">

                        </ul>
                    </div>
                    <div class="d-flex flex-row mt-4">
                        <div :style="{ backgroundImage: this.productImageUrl }"
                            style="width: 200px; height: 200px; background-size: cover; background-position: center;"
                            id="bookImage">
                        </div>
                        <div class="mx-5">
                            <div class=" d-flex flex-row">
                                <h5>Tên sách: </h5>
                                <p id="bookName" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Giá sách: </h5>
                                <p id="bookPrice" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Số lượng sách trong thư viện: </h5>
                                <p id="bookQuantity" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Tác giả: </h5>
                                <p id="bookAuthor" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Năm xuất bản: </h5>
                                <p id="bookPublicationYear" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Danh mục: </h5>
                                <p id="bookCategory" style="margin: 0 10px;"></p>
                            </div>
                            <div class="mt-3 d-flex flex-row">
                                <h5>Nhà xuất bản: </h5>
                                <p id="bookPublisher" style="margin: 0 10px;"></p>
                            </div>
                        </div>


                    </div>
                    <div class="form-group">
                        <label for="dateBorrow">Ngày mượn</label>
                        <input type="date" name="" class="form-control" id="dateBorrow"
                            v-model="this.manageBorrowBook.dateBorrow">
                    </div>
                    <div class="form-group">
                        <label for="dateReturn">Ngày trả</label>
                        <input type="date" name="" class="form-control" id="dateReturn"
                            v-model="this.manageBorrowBook.dateReturn">
                    </div>
                    <button class="btn btn-success" type="submit">Tạo đơn mượn sách</button>
                </div>

            </Form>
        </div>
    </div>
</template>

<script>
import managerBorrowsBookService from "@/services/managerBorrowsBook.service";
import InputSearch from "../components/InputSearch.vue";
import Swal from "sweetalert2";
import { mapState, mapActions } from 'vuex';
import { Form, Field } from "vee-validate";

export default {
    components: {
        InputSearch,
        Form,
        Field
    },
    data() {
        return {
            searchTextReader: "",
            searchTextBook: "",
            manageBorrowBook: {
                readerId: null,
                bookId: null,
                dateBorrow: null,
                dateReturn: null,
                state: "Đang mượn",
            },
            productImageUrl: `url(data:image/png;base64,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)`,
        }
    },
    watch: {
        searchTextReader: {
            handler() {
                this.filterUser();
            },
            deep: true, immediate: true,
        },
        searchTextBook: {
            handler() {
                this.filterBook();
            },
            deep: true, immediate: true,
        }
    },
    computed: {

    },
    methods: {
        getBaseUrl() {
            const { protocol, hostname, port } = window.location;
            return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
        },
        async filterUser() {
            var userSearchResult = document.getElementById("search_user_result");
            if (userSearchResult) userSearchResult.innerHTML = "";
            if (this.searchTextReader) {

                const data = await managerBorrowsBookService.findReaderByKeyword(this.searchTextReader);
                data.forEach((reader, index) => {
                    var li = document.createElement("li");
                    li.style.cursor = "pointer";
                    li.addEventListener("click", (e) => {
                        this.manageBorrowBook.readerId = reader._id;
                        document.getElementById("fullName").textContent = reader.surname + " " + reader.name;
                        document.getElementById("gender").textContent = reader.gender;
                        document.getElementById("birthdate").textContent = reader.birthdate;
                        document.getElementById("address").textContent = reader.address;
                        document.getElementById("phoneNumber").textContent = reader.phoneNumber;
                        console.log(this.manageBorrowBook);
                    });
                    li.textContent = `${reader.surname} ${reader.name} #${reader.phoneNumber}`;
                    userSearchResult.appendChild(li);
                });
            } else {
                if (userSearchResult) userSearchResult.innerHTML = "";
            }

        },

        async filterBook() {
            var userBookResult = document.getElementById("search_book_result");
            if (this.searchTextBook) {
                if (userBookResult != null) {
                    userBookResult.innerHTML = "";
                }
                const data = await managerBorrowsBookService.findBookByKeyword(this.searchTextBook);
                console.log(data);
                data.forEach((book, index) => {
                    var li = document.createElement("li");
                    li.style.cursor = "pointer";
                    li.onclick = (e) => {
                        this.manageBorrowBook.bookId = book._id;
                        this.productImageUrl = `url(http://127.0.0.1:3000${book.imagePath})`;
                        // document.getElementById("bookImage").style.backgroundImage = `url(http://127.0.0.1:3000${book.imagePath})`;
                        document.getElementById("bookName").textContent = book.name;
                        document.getElementById("bookPrice").textContent = book.price;
                        document.getElementById("bookAuthor").textContent = book.author;
                        document.getElementById("bookPublicationYear").textContent = book.publicationYear;
                        document.getElementById("bookCategory").textContent = book.category[0].name;
                        document.getElementById("bookPublisher").textContent = book.publisher[0].name;
                        document.getElementById("bookQuantity").textContent = book.quantity;
                        console.log(this.manageBorrowBook);
                    };
                    // li.textContent = `${book.name} #${book._id}`;
                    var imageElement = document.createElement('img');
                    imageElement.style.marginRight = '10px';
                    imageElement.setAttribute('src', `http://127.0.0.1:3000${book.imagePath}`);
                    imageElement.style.width = '50px';
                    imageElement.style.height = '50px';
                    imageElement.style.backgroundPosition = 'center';
                    imageElement.style.backgroundSize = 'cover';
                    var textElement = document.createElement('p');
                    textElement.textContent = `${book.name}`;
                    li.appendChild(imageElement);
                    li.appendChild(textElement);
                    li.style.display = 'flex';
                    li.style.flexDirection = 'row';
                    li.style.justifyContent = 'between';
                    li.style.marginBottom = '20px'
                    li.style.marginTop = '10px';
                    userBookResult.appendChild(li);
                });
            } else {
                if (userBookResult != null) {
                    userBookResult.innerHTML = "";
                }
            }
        },
        async borrowsBook() {
            try {
                await managerBorrowsBookService.create(this.manageBorrowBook);

                this.$router.push({ name: "bookOrder.index" });
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Thêm đơn mượn sách thành công",
                    icon: "success",
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>

<style scoped>
@import "../../../../src/assets/admin/css/manageBorrowPage.css";
</style>