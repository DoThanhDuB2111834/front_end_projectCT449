<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-dark d-flex ">
            <router-link :to="{ name: 'index' }" class="navbar-brand d-flex align-items-center"> <img
                    src="../../../assets/client/Images/logoNav.png" width="50" alt="Library Logo"
                    class="d-inline-block align-top" style="margin-right: 10px;"> <span>
                    Library
                </span>
            </router-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"> <router-link :to="{ name: 'index' }" class="nav-link" href="#">Trang
                            chủ</router-link> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">Catalog</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">Contact</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="#">About Us</a> </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<style>
.header {
    background-color: #343a40;
}

.navbar {

    max-width: 1270px;
    margin: 0 auto;
    /* Màu nền của navbar */
}

.navbar-brand,
.navbar-nav .nav-link {
    color: #ffffff;
    /* Màu chữ */
}

.navbar-brand:hover,
.navbar-nav .nav-link:hover {
    color: #ffc107;
    /* Màu chữ khi hover */
}
</style>