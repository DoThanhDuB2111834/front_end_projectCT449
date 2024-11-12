<template>
    <div id="wrapper">
        <Form id="form-login" @submit="submitLoginForm" :validation-schema="loginFormSchema">
            <h1 class="form-heading">Form đăng nhập</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <Field name="username" type="text" class="form-input" placeholder="Tên đăng nhập"
                    v-model="loginData.username" />

            </div>
            <ErrorMessage name="username" class="text-danger" />
            <div class="form-group">
                <i class="fa-solid fa-key"></i>
                <Field name="password" type="password" class="form-input" placeholder="Mật khẩu"
                    v-model="loginData.password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <input type="submit" value="Đăng nhập" class="form-submit">
        </Form>
    </div>
</template>

<style scoped>
@import "../../assets/admin/css/login.css";
</style>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import authService from "@/services/auth.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const loginFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên đăng nhập phải có giá trị.")
                .min(2, "Tên đăng nhập phải ít nhất 2 ký tự.")
                .max(50, "Tên đăng nhập có nhiều nhất 50 ký tự."),

            password: yup
                .string()
                .required("Tên đăng nhập phải có giá trị.")
        });
        const loginData = {
            username: null,
            password: null,
        }
        return {
            loginFormSchema,
            loginData,
        };
    },
    methods: {
        getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i]; while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length); if (c.indexOf(nameEQ) === 0)
                    return c.substring(nameEQ.length, c.length);
            } return null;
        },
        setCookie(name, value, hours) {
            const date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        },
        async submitLoginForm() {
            try {
                var loginResult = await authService.login(this.loginData);
                this.setCookie("token", loginResult.data.token, 1);
                this.$router.push({ name: "admin" });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>