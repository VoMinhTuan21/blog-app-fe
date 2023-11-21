<script setup lang="ts">
import { Icon } from '@iconify/vue';
import FormAuth from './FormAuth.vue';
import StandardInput from '../components/input/StandardInput.vue';
import ContainedButton from '../components/button/ContainedButton.vue';
import { genURLFacebookLogin } from '../utils/facebook';
import { genURLGoogleLogin } from '../utils/google';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import AuthRepository from '../repositories/authRepository';
import { toast } from '@steveyuowo/vue-hot-toast';
import type { IResponseError } from '../types/global';
import { useUser } from '../stores/user';
import UserRepository from '../repositories/userRepository';
import { ref } from 'vue';
import Modal from '../components/modal/Modal.vue'

interface FormSchema {
    email: string,
    password: string,
    rememberMe?: boolean
}


const schema: yup.ObjectSchema<FormSchema> = yup.object().shape({
    email: yup.string().email("Email không đúng định dạng.").required("Vui lòng nhập email."),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/, {
        message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa, in thường, số và kí tự đặc biệt'
    }).required("Vui lòng nhập mật khẩu."),
    rememberMe: yup.boolean().optional()
})

const { defineInputBinds, defineComponentBinds, errors, handleSubmit } = useForm<FormSchema>({
    validationSchema: schema
})

const userStore = useUser();

const closeBtn = ref<HTMLDivElement | null>(null)

const email = defineComponentBinds('email');
const password = defineComponentBinds('password');
const rememberMe = defineInputBinds('rememberMe');

const onSubmit = handleSubmit(async (values) => {
    try {
        const data = await AuthRepository.signIn(values);

        localStorage.setItem('blog-app-access-token', data.accessToken)
        localStorage.setItem('blog-app-refresh-token', data.refreshToken)

        UserRepository.getUserInfo().then(data => {
            userStore.setUserData(data.data);
            userStore.setLogined()
        })

        if (closeBtn.value) {
            closeBtn.value.click()
        }
    } catch (err) {
        const { error } = err as IResponseError;

        if (error === 'ERROR_EMAIL_NOT_FOUND') {
            toast.error('Email này chưa được đăng ký.')
        } else if (error === 'ERROR_PASSWORD_NOT_MATCH') {
            toast.error('Mật khẩu không đúng.')
        } else {
            toast.error('Vui lòng thử lại sau.')
        }
    }

})

</script>


<template>
    <Modal data-toogle="modal">
        <div :class="$style.container">
            <div ref="closeBtn">
                <Icon class="modal" :class="$style['close-icon']" icon="material-symbols:close" />
            </div>
            <div :class="$style.form">
                <FormAuth>
                    <form @submit="onSubmit">
                        <div :class="$style.form__top">
                            <h1 :class="$style.title">Đăng nhập</h1>

                            <StandardInput v-bind="email" type="text" placeholder="Email" :error="errors.email">
                                <Icon icon="material-symbols:mail" />
                            </StandardInput>

                            <StandardInput v-bind="password" type="password" placeholder="Mật khẩu"
                                :error="errors.password" />

                            <div :class="$style.action">
                                <label for="remeber-me">
                                    <input v-bind="rememberMe" type="checkbox" id="remeber-me">
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>

                                <RouterLink to="/">Quên mật khẩu?</RouterLink>
                            </div>

                            <ContainedButton type="submit">Đăng nhập</ContainedButton>
                        </div>

                        <div :class="$style['login-or']">
                            <p :class="$style.quote">Hoặc đăng nhập bằng các tài khoản sau:</p>
                            <div :class="$style.grsocial">
                                <a :href="genURLFacebookLogin('login')" :class="[$style.social, $style.fb]"></a>
                                <a :href="genURLGoogleLogin('login')" :class="[$style.social, $style.gg]"></a>
                            </div>
                            <div :class="$style.register">
                                <span>Chưa có tài khoản?</span>
                                <RouterLink to="/">Đăng ký</RouterLink>
                            </div>
                        </div>
                    </form>
                </FormAuth>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" module>
.container {
    width: 865px;
    height: 630px;
    margin: auto;
    position: relative;
    background: url(https://account.vietnamnet.vn/icon/VnnId_Back.jpg) no-repeat scroll 0 0 transparent;

    .close-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }

    .form {
        padding: 52px 0;

        &__top {
            &>*+* {
                margin-top: 20px;
            }

            button {
                margin-top: 25px !important;
            }
        }

        .title {
            padding-top: 30px;
            font-size: 24px;
            font-weight: 700;
            color: #447ec5;
            text-align: center;
        }

        .action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px !important;

            label {
                font-size: 12px;
                color: #333333;
                cursor: pointer;

                span {
                    padding-left: 6px;
                }
            }

            a {
                font-size: 11px;
                line-height: 30px;
                color: #929292;
            }
        }
    }

    .login-or {
        .quote {
            font-size: 13px;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 36px;
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

        .register {
            margin-top: 15px;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;

            span,
            a {
                font-size: 14px;
                line-height: 21px;
            }

            span {
                color: #333;
            }

            a {
                color: #447ec5;
                text-decoration: underline;
                margin-left: 3px;
            }
        }
    }
}
</style>