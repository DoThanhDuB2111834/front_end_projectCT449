<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Chỉnh sửa:</h4>
            <BookForm :book="book" @submit:book="updateBook"></BookForm>
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
        const id = this.$route.params.id;
        return {
            id,
            book: {},
        }
    },
    methods: {
        async findBook() {
            try {
                this.book = await bookService.findById(this.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateBook(data) {
            try {
                await bookService.update(this.id, data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Cập nhật sản phẩm thành công",
                    icon: "success",
                });
                this.$router.push({ name: "book.index" });
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        await this.findBook();
    }
}
</script>