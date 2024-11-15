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
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        AppHeader
    },
    computed: {
        ...mapState(['Role']),
    },
    methods: {
        ...mapActions(['updateRole', 'fetchRole']),
    },
    async mounted() {

    }
}
</script>