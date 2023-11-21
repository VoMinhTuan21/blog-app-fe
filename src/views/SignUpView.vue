<script setup lang="ts">
import FormAuth from '../components/FormAuth.vue'
import { Icon } from '@iconify/vue';
import StandardInput from '../components/input/StandardInput.vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { genURLFacebookLogin } from '../utils/facebook';
import { genURLGoogleLogin } from '../utils/google';
import AuthRepository from '../repositories/authRepository';
import UserRepository from '../repositories/userRepository';
import { useUser } from '../stores/user';
import { useRoute, useRouter } from 'vue-router';
import type { IResponseError } from '../types/global';
import { toast } from '@steveyuowo/vue-hot-toast';

interface FormData {
    email: string,
    password: string,
    name: string,
    rePassword: string,
}

const schema: yup.ObjectSchema<FormData> = yup.object().shape({
    email: yup.string().email("Email không đúng định dạng.").required("Vui lòng nhập email."),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/, {
        message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa, in thường, số và kí tự đặc biệt'
    }).required("Vui lòng nhập mật khẩu."),
    name: yup.string().required('Vui lòng nhập họ tên'),
    rePassword: yup.string().oneOf([yup.ref('password'), undefined], 'Mật khẩu không khớp.').required('Vui lòng nhập lại mật khẩu.')
})

const { handleSubmit, defineComponentBinds, errors } = useForm<FormData>({
    validationSchema: schema
})

const email = defineComponentBinds('email');
const name = defineComponentBinds('name');
const password = defineComponentBinds('password');
const rePassword = defineComponentBinds('rePassword');

const userStore = useUser()
const router = useRouter();
const route = useRoute();

const redirectURL = route.query.redirectURL;

const onSubmit = handleSubmit(async (values) => {
    try {
        const data = await AuthRepository.signUp({
            email: values.email,
            name: values.name,
            password: values.password
        })

        localStorage.setItem('blog-app-access-token', data.accessToken)
        localStorage.setItem('blog-app-refresh-token', data.refreshToken)

        UserRepository.getUserInfo().then(data => {
            userStore.setUserData(data.data);
            userStore.setLogined()
        })

        if (redirectURL) {
            router.push(redirectURL as string)
        } else {
            router.push('/')
        }
    } catch (err) {
        const { error } = err as IResponseError

        if (error === 'ERROR_EMAIL_HAS_BEEN_USED') {
            toast.error('Vui lòng sử dụng email khác.')
        } else {
            toast.error("Vui lòng thử lại sau ít phút.")
        }
    }
})

</script>

<template>
    <div :class="$style.container">
        <div :class="$style.wrap">
            <FormAuth>
                <form @submit="onSubmit" :class="$style['form-sign-up']">
                    <h3 :class="$style.title">Đăng ký tài khoản</h3>
                    <StandardInput v-bind="name" :error="errors.name" type="text" placeholder="Họ và tên">
                        <Icon icon="majesticons:user-line" />
                    </StandardInput>
                    <StandardInput v-bind="email" :error="errors.email" type="text" placeholder="Email">
                        <Icon icon="octicon:mail-16" />
                    </StandardInput>
                    <StandardInput type="password" :error="errors.password" v-bind="password" placeholder="Mật khẩu" />
                    <StandardInput type="password" :error="errors.rePassword" v-bind="rePassword"
                        placeholder="Nhập lại mật khẩu" />
                    <div>
                        <div :class="$style.grbuttons">
                            <button :class="$style['sign-up-btn']">Đăng ký</button>
                            <button :class="$style['cancel-btn']">Hủy</button>
                        </div>
                        <div :class="$style['terms-of-use']">
                            <p>
                                Khi bấm vào đăng ký bạn đã đồng ý với
                            </p>
                            <a>Điều khoản sử dụng</a>
                        </div>
                        <p :class="$style.or">Hoặc</p>
                        <div :class="$style.grsocial">
                            <a :href="genURLFacebookLogin('login')" :class="[$style.social, $style.fb]"></a>
                            <a :href="genURLGoogleLogin('login')" :class="[$style.social, $style.gg]"></a>
                        </div>
                    </div>
                </form>
            </FormAuth>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    background: url(https://account.vietnamnet.vn/icon/VnnId_Back.jpg) no-repeat scroll 0 0 transparent;
    width: 100%;

    .wrap {
        padding-top: 52px;
        padding-bottom: 52px;
    }

    .form-sign-up {
        &>*+* {
            margin-top: 20px;
        }
    }

    .title {
        font-size: 24px;
        font-weight: 700px;
        padding-top: 10px;
        text-align: center;
        color: #447ec5;
    }

    .grbuttons {
        display: flex;
        justify-content: space-between;

        .sign-up-btn {
            background-color: #447ec5;
            border: none;
            padding: 6px 20px;
            color: white;
            border-radius: 5px;
            font-size: 14px;
            text-transform: uppercase;
            font-family: 'Noto Sans', sans-serif;
            cursor: pointer;
        }

        .cancel-btn {
            background-color: #cfcfcf;
            border-radius: 5px;
            padding: 6px 30px;
            color: #fff;
            border: none;
            text-transform: uppercase;
            font-family: 'Noto Sans', sans-serif;
            cursor: pointer;
        }
    }

    .terms-of-use {
        font-size: 12px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;

        p,
        a {
            line-height: 20px;
        }

        a {
            text-decoration: underline;
            color: #447ec5;
        }
    }

    .or {
        padding: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        text-align: center;
    }

    .grsocial {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;

        &>*+* {
            margin-left: 20px;
        }
    }

    .social {
        width: 42px;
        height: 42px;
        cursor: pointer;
        display: inline-block;

        &.fb {
            background: url(https://account.vietnamnet.vn/icon/Fb.svg) no-repeat scroll 0 0 transparent;
            background-size: 42px;
        }

        &.gg {
            background: url(https://account.vietnamnet.vn/icon/google-plus.svg) no-repeat scroll 0 0 transparent;
            background-size: 42px;
        }
    }
}
</style>