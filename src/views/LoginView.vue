<script setup lang="ts">

</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.wrapper]">
            <div :class="[$style.socialButton]">Sign in with Google</div>
            <div :class="[$style.socialButton]">Sign in with Facebook</div>
            <div :class="[$style.socialButton]">Sign in with Github</div>
        </div>
    </div>
</template>

<style module>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}

.wrapper {
    background-color: var(--softBg);
    padding: 150px 200px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    border-radius: 10px;
}

.socialButton {
    padding: 20px;
    border-radius: 5px;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
}

.socialButton:first-child {
    background-color: #ff5555;
}

.socialButton:nth-child(2) {
    background-color: #087bea;
}

.socialButton:last-child {
    background-color: black;
}

@media screen and (max-width:768px) {
    .wrapper {
        padding: 50px 100px;
    }
}

@media screen and (max-width:640px) {
    .wrapper {
        padding: 30px;
    }

    .socialButton {
        font-weight: 400;
        font-size: 14px;
    }
}
</style>