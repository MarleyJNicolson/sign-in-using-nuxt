<template>
    <button class="ui-button" :class="'ui-button--' + state" :type="type">
        <p v-if="state !== 'loading' && state !== 'success' ">{{ text }}</p>
        <UIcon v-if="state === 'loading'" name="line-md:loading-twotone-loop" class="size-5" />
        <UIcon v-if="state === 'success'" name="line-md:confirm" class="size-5" />
    </button>
</template>

<script setup>
import { defineProps } from 'vue' 
defineProps({
    text: {
        type: String,
        default: '' 
    },
    type: {
        type: String,
        default: 'button' 
    },
    state: {
        type: String,
        default: 'default' 
    },
})
</script>

<style scoped lang="scss">
    button{
        background-color: var(--color-primary);
        color: var(--color-tertiary);
        padding: 5px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        min-height: 35px;
        &.ui-button--loading{
            background-color: var(--color-primary-dropback);
            pointer-events: none;
        }
        &.ui-button--success{
            background-color: var(--color-success);
        }
        &.ui-button--failed{
            animation: shake 0.3s ease-in-out;
        }
        &:hover{
            transition: all 0.3s ease-in-out;
            background-color: var(--color-primary-dropback);
        }
    }
    @keyframes shake {
        0% { transform: translateX(0); background-color: var(--color-error); }
        20% { transform: translateX(-6px);background-color: var(--color-error); }
        40% { transform: translateX(6px); background-color: var(--color-error); }
        60% { transform: translateX(-4px); background-color: var(--color-error); }
        80% { transform: translateX(4px); background-color: var(--color-error); }
        100% { transform: translateX(0);  background-color: var(--color-primary);}
    }
</style>