<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Tạo mới sách:</h4>
            <BookForm :book="book" @submit:book="insertBook"></BookForm>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import BookForm from '../components/BookForm.vue';
import bookService from '@/services/book.service';

export default {
    components: {
        BookForm,
    },
    data() {
        return {
            book: {
                name: null,
                price: null,
                quantiy: null,
                publisherId: null,
                publicationYear: null,
                author: null,
                image: null,
            }
        }
    },
    methods: {
        async insertBook(data) {
            try {
                await bookService.create(data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Thêm sản phẩm thành công",
                    icon: "success",
                });
                this.$router.push({ name: "book.index" });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>