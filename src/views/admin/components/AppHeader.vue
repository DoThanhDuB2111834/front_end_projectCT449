<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Trang chủ</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex flex-row" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">

                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
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