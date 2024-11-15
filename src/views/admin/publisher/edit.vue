<template>
    <div class="row mt-4">
        <div class="create-book-page col-6 offset-3">
            <h4>Chỉnh sửa:</h4>
            <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher"></PublisherForm>
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
        const id = this.$route.params.id;
        return {
            id,
            publisher: {},
        }
    },
    methods: {
        async findPublisher() {
            try {
                this.publisher = await publisherService.findById(this.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updatePublisher(data) {
            try {
                await publisherService.update(this.id, data);
                await Swal.fire({
                    position: "top",
                    title: "Thành công",
                    text: "Cập nhật nhà xuất bản thành công",
                    icon: "success",
                });
                this.$router.push({ name: "publisher.index" });
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        await this.findPublisher();
    }
}
</script>