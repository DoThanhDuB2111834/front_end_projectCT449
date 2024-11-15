<template>
    <div class="form-group">
        <label for="book-image-upload">Chọn hình ảnh:</label>
        <input type="file" @change="onFileChange" id="book-image-upload" class="form-control" accept="image/*">
    </div>
    <div v-if="image" :style="{ backgroundImage: `url(http://127.0.0.1:3000${image})` }"
        style="width: 100px; height: 100px; background-size: cover; background-position: center;">
    </div>
</template>

<script>
export default {
    props: {
        imagePath: { type: String }
    },
    emits: ['change:image'],
    data() {
        return {
            selectedFile: null,
            image: "",
        }
    },
    watch: {
        imagePath: {
            handler(newimagePath) {
                this.image = newimagePath;
            },
            deep: true, immediate: true
        },
    },
    methods: {
        getBaseUrl() {
            const { protocol, hostname, port } = window.location;
            return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
        },
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.$emit("change:image", this.selectedFile);
        },
    },
    mounted() {
        this.image = this.imagePath;
    }
}
</script>