<template>
    <AppHeader></AppHeader>
    <div class="admin-body">
        <router-view />
    </div>
</template>
<style scoped>
@import "../../assets/admin/css/main.css";
</style>
<script>
import AppHeader from './components/AppHeader.vue';

export default {
    components: {
        AppHeader
    }
}
</script>