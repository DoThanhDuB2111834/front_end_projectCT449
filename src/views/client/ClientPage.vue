<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</link>
<template>
    <AppHeader></AppHeader>
    <div class="client-body">
        <router-view />
    </div>
    <AppFooter></AppFooter>
</template>
<style scoped>
@import "../../assets/client/css/main.css";
</style>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
    components: {
        AppHeader,
        AppFooter
    }
}
</script>
