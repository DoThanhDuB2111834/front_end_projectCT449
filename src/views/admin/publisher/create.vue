<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Chỉnh sửa:</h4>
            <PublisherForm :publisher="publisher" @submit:publisher="insertPublisher"></PublisherForm>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import publisherService from "@/services/publisher.service";
import PublisherForm from "../components/PublisherForm.vue";

export default {
    components: {
        PublisherForm,
    },
    data() {
        return {
            publisher: {
                name: null,
                address: null,
            }
        }
    },
    methods: {
        async insertPublisher(data) {
            try {
                await publisherService.create(data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Thêm nhà cung ứng thành công",
                    icon: "success",
                });
                this.$router.push({ name: "publisher.index" });
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>