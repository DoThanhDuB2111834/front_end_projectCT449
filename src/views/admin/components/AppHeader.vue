<template>
    <div class="header">
        <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
                            <router-link :to="{ name: 'publisher.index' }" class="nav-link">Nhà xuất
                                bản</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'category.index' }" class="nav-link">Danh mục</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'reader.index' }" class="nav-link">Đọc giả</router-link>
                        </li>
                    </ul>
                    <span class="navbar-text" @click="logout">
                        <i class="fas fa-user"></i>
                        Đăng xuất
                    </span>
                </div>
            </div>
        </nav> -->
        <nav class="navbar navbar-expand-lg navbar-dark"> <a class="navbar-brand" href="#">LibraryAdmin</a> <button
                class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span
                    class="navbar-toggler-icon"></span> </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'bookOrder.index' }" class="nav-link">Quản lý mượn sách</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'book.index' }" class="nav-link">Quản lý sách</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'publisher.index' }" class="nav-link">Nhà xuất
                            bản</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'category.index' }" class="nav-link">Danh mục</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'reader.index' }" class="nav-link">Đọc giả</router-link>
                    </li>
                </ul>

                <span class="navbar-text" @click="logout">
                    <i class="fas fa-user"></i>
                    Đăng xuất
                </span>
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
            this.$router.replace('/admin/login');
        }
    }
}
</script>

<style>
.header {
    background-color: #3C3B6E;
    /* Màu nền xanh đậm */
}

.navbar {
    max-width: 1270px;
    margin: 0 auto;
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFFFFF;
    /* Màu chữ trắng */
}

.navbar-nav .nav-link {
    color: #FFFFFF;
    /* Màu chữ trắng */
}

.navbar-nav .nav-link:hover {
    color: #F39C12;
    /* Màu chữ vàng khi hover */
}

.form-control {
    background-color: #F1F1F1;
    /* Màu nền của thanh tìm kiếm */
}

.btn-outline-light {
    color: #FFFFFF;
    /* Màu chữ của nút tìm kiếm */
    border-color: #F39C12;
    /* Màu viền của nút tìm kiếm */
}

.btn-outline-light:hover {
    background-color: #F39C12;
    /* Màu nền của nút tìm kiếm khi hover */
    border-color: #F39C12;
    /* Màu viền của nút tìm kiếm khi hover */
}
</style>