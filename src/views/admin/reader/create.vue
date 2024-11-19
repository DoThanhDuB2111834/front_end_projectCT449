<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Tạo đọc giả:</h4>
            <ReaderForm :reader="reader" @submit:reader="insertReader">
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
        return {
            reader: {
                surname: null,
                name: null,
                birthdate: null,
                gender: null,
                address: null,
                phoneNumber: null,
            }
        }
    },
    methods: {
        async insertReader(data) {
            try {
                const response = await readerService.create(data);

                if (response.message) {
                    await Swal.fire({
                        position: "top",
                        title: "Thất bại",
                        text: response.message,
                        icon: "error",
                    });
                }
                else {
                    this.$router.push({ name: "reader.index" });
                    await Swal.fire({
                        position: "top",
                        title: "Thành công",
                        text: "Thêm đọc giả thành công",
                        icon: "success",
                    });
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>