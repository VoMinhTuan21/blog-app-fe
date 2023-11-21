<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>

<template>
    <footer>
        <div :class="$style.footer">

            <RouterLink to="/">
                <img :class="$style.logo" :src="`${basePath}logo.svg`" />
            </RouterLink>
            <div :class="$style['footer-address']">
                <ul :class="$style['footer-list']">
                    <li>Cơ quan chủ quản: Bộ Thông tin và Truyền thông</li>
                    <li>Số giấy phép: 09/GP - BTTTT, cấp ngày 07/01/2019</li>
                    <li>Tổng biên tập: Nguyễn Văn Bá</li>
                </ul>
                <ul :class="$style['footer-list']">
                    <li>Tòa soạn: Tòa nhà C'Land - 156 Xã Đàn 2, Đống Đa, Hà Nội</li>
                    <li>Hotline: 19001081 (8-20h) | 0923457788 (ngoài giờ HC)</li>
                    <li>© 1997 Báo VietNamNet. All rights reserved.</li>
                    <li>Chỉ được phát hành lại thông tin từ website này khi có sự</li>
                    <li>đồng ý bằng văn bản của báo VietNamNet.</li>
                </ul>
            </div>
            <div :class="$style['footer-gom']">
                <div :class="$style['footer-contact']">

                    <ul :class="$style['footer-list']">
                        <li>Liên hệ quảng cáo</li>
                        <li>Hà Nội. Hotline: <span :class="$style.phone">0919 405 885</span></li>
                        <li>Tp.HCM. Hotline: <span :class="$style.phone">0919 435 885</span></li>
                        <li>Email : contact@vietnamnet.vn</li>
                    </ul>
                    <ul :class="$style['footer-list']">
                        <li>Xem thông tin chi tiết: <a href="http://vads.vn">http://vads.vn</a></li>
                        <li>Hỗ trợ kỹ thuật: support@tech.vietnamnet.vn</li>
                    </ul>
                </div>
                <div :class="$style['footer-follow']">
                    <ul :class="$style['footer-list']">
                        <li>Theo dõi VietNamNet trên</li>
                    </ul>
                    <ul :class="[$style['footer-list'], $style.social]">
                        <li>
                            <a href="https://www.facebook.com/vietnamnet.vn">
                                <img src="https://static.vnncdn.net/v1/icon/facebook-black.svg" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/vietnamnet.vn">
                                <img src="	https://static.vnncdn.net/v1/icon/youtube-black.svg" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/vietnamnet.vn">
                                <img src="https://static.vnncdn.net/v1/icon/tiktok-black.svg" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/vietnamnet.vn">
                                <img src="https://static.vnncdn.net/v1/icon/twitter-black.svg" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/vietnamnet.vn">
                                <img src="https://static.vnncdn.net/v1/icon/zalo-black.svg" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" module>
footer {
    background-color: #f5f5f5;
    margin-top: 25px !important;
}

.footer {
    padding: 20px 0;
    max-width: 1110px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: space-between;

    .logo {
        width: 120px;
    }

    &-list {
        list-style: none;
        font-size: 13px;

        &>*+* {
            margin-top: 10px;
        }



        &:not(:first-child) {
            margin-top: 20px;
        }
    }

    &-address {
        .footer-list:first-child {
            &>:last-child {
                color: #4780c3;
                font-weight: bold;
            }
        }
    }

    &-gom {
        display: flex;
    }

    &-contact {
        .footer-list:first-child {
            &>:first-child {
                color: #4780c3;
                font-weight: bold;
            }
        }

        .footer-list:last-child {
            &>:first-child {
                a {
                    font-weight: bold;
                }
            }
        }

        .phone {
            font-weight: bold;
        }
    }

    &-follow {

        .footer-list {
            text-align: right;
        }

        .social.footer-list {
            display: flex;



            &>*+* {
                margin-top: auto;
                margin-left: 10px;
            }

            a>img {
                width: 27px;
            }
        }
    }
}
</style>