<template>
    <div class="publiser-list-view">
        <div class="row d-flex justify-content-between mb-3">
            <h3 class="col-5">Danh sách các nhà xuất bản</h3>
            <div class="row col-6">
                <InputSearch v-model="searchText" class="col-8" />
                <router-link :to="{ name: 'publisher.create' }" class="btn btn-success col-4">Thêm nhà xuất
                    bản</router-link>
            </div>
        </div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>STT</td>
                    <td>Tên nhà xuất bản</td>
                    <td>Địa chỉ</td>
                    <td v-if="Role == 'manager'">Hành động</td>
                </tr>
            </thead>
            <tbody class=" table-gray">
                <tr v-for="(publisher, index) in filteredPublisher">
                    <td>{{ index + 1 }}</td>
                    <td>{{ publisher.name }}</td>
                    <td>{{ publisher.address }}</td>
                    <td v-if="Role == 'manager'"><button class="btn btn-warning"
                            @click="goToPublisherDetails(publisher._id)">Chỉnh
                            sửa</button><button @click="deletePublisher(publisher._id)"
                            class="btn btn-danger ml-2">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import InputSearch from "../components/InputSearch.vue";
import Swal from "sweetalert2";
import publisherService from "@/services/publisher.service";
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            searchText: "",
            publishers: [],
        }
    },
    computed: {
        ...mapState(['Role']),
        filteredPublisher() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((publisher, index) =>
                publisher.name.includes(this.searchText)
            );
        },
    },
    methods: {
        getBaseUrl() {
            const { protocol, hostname, port } = window.location;
            return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
        },
        goToPublisherDetails(publisherId) {
            this.$router.push({ name: 'publisher.edit', params: { id: publisherId } });
        },
        async retrivePublishers() {
            try {
                this.publishers = await publisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher(id) {
            try {
                if (await publisherService.delete(id)) {
                    await Swal.fire({
                        position: "top",
                        title: "Thành công",
                        text: "Xóa nhà xuất bản thành công",
                        icon: "success",
                    });
                    this.retrivePublishers();
                } else {
                    await Swal.fire({
                        position: "top",
                        title: "Thất bại",
                        text: "Xóa nhà xuất bản không thành công",
                        icon: "danger",
                    });
                }

            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        await this.retrivePublishers();
    }
}
</script>

<style>
.publiser-list-view {
    max-width: 1000px;
    margin: 0 auto;
}

.table-gray {
    background-color: #e3dddd;
}
</style>