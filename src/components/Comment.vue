<script setup lang="ts">
const status = "authenticated";

const basePath = import.meta.env.BASE_URL
</script>

<template>
    <div :class="[$style.container]">
        <h1 :class="[$style.title]">Comments</h1>
        <a v-if="status !== 'authenticated'" href="/login">Login to write a comment</a>
        <div v-else :class="[$style.write]">
            <textarea :class="[$style.input]" placeholder="Write a comment..." />
            <button :class="[$style.button]">Send</button>
        </div>

        <div :class="[$style.comments]">
            <div :class="[$style.comment]">
                <div :class="[$style.user]">
                    <img :src="`${basePath}p1.jpeg`" :class="[$style.image]" width="50" height="50" />
                    <div :class="[$style.userInfo]">
                        <span :class="[$style.username]">John Doe</span>
                        <span :class="[$style.date]">11.02.2023</span>
                    </div>
                </div>
                <p :class="[$style.desc]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, cumque! Amet
                    architecto impedit commodi
                    inventore quisquam ut. Soluta iure non vero sed quia quisquam nulla nihil consequatur. Vero,
                    praesentium? Quae.</p>
            </div>
        </div>
    </div>
</template>

<style module>
.container {
    margin-top: 50px;
}

.title {
    color: var(--softTextColor);
    margin-bottom: 30px;
}

.write {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.input {
    padding: 20px;
    width: 100%;
}

.button {
    padding: 16px 20px;
    background-color: teal;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.comments {
    margin-top: 50px;
}

.comment {
    margin-bottom: 50px;
}

.user {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.userInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--softTextColor);
}

.image {
    border-radius: 50%;
    object-fit: cover;
}

.username {
    font-weight: 500;
}

.date {
    font-size: 14px;
}

.desc {
    font-size: 18px;
    font-weight: 300;
}
</style>