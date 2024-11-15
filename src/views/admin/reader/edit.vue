<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Tạo đọc giả:</h4>
            <ReaderForm :reader="reader" @submit:reader="updateReader">
            </ReaderForm>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import ReaderForm from '../components/ReaderForm.vue';
import readerService from '@/services/reader.service';

export default {
    components: {
        ReaderForm,
    },
    data() {
        const id = this.$route.params.id;
        return {
            reader: {},
            id,
        }
    },
    methods: {
        async updateReader(data) {
            try {
                await readerService.update(this.id, data);
                this.$router.push({ name: "reader.index" });
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Cập nhật sản phẩm thành công",
                    icon: "success",
                });
            } catch (error) {
                console.log(error);
            }
        },
        async findReader() {
            try {
                this.reader = await readerService.findById(this.id);
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        await this.findReader();
    }
}
</script>