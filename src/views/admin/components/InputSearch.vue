<script>
// import { type } from 'express/lib/response';
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        }
    }
}
</script>

<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="nhập thông tin cần tìm" :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" @click="submit">Tìm kiếm</button>
        </div>
    </div>
</template>

<style scoped>
input[type="text"] {
    height: 100%;
}
</style>