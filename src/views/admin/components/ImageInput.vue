<template>
    <div class="form-group">
        <label for="book-image-upload">Chọn hình ảnh:</label>
        <input type="file" @change="onFileChange" id="book-image-upload" class="form-control" accept="image/*">
    </div>
</template>

<script>
export default {
    emits: ['change:image'],
    data() {
        return {
            selectedFile: null,
        }
    },
    methods: {
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.$emit("change:image", this.selectedFile);
        },
    }
}
</script>