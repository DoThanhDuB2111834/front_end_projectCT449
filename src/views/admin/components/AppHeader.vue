<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <router-link :to="{ name: 'dashboard' }" class="navbar-brand">Trang chủ</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex flex-row" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
                        <li class="nav-item">
                            <router-link :to="{ name: 'book.index' }" class="nav-link">Quản lý sách</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'publisher.index' }" class="nav-link">Quản lý nhà xuất
                                bản</router-link>
                        </li>
                    </ul>
                    <span class="navbar-text" @click="logout">
                        <i class="fas fa-user"></i>
                        Đăng xuất
                    </span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import authService from '@/services/auth.service';
export default {
    methods: {
        deleteCookie(name) {
            document.cookie = name + '=; Max-Age=0; path=/;';
        },
        async logout() {
            await authService.logout();
            console.log("Dang xuat");
            this.deleteCookie("token");
            this.$router.replace('/login');
        }
    }
}
</script>