<template>
    <div class="cards-slots">
        <slot />
    </div>
  </template>
  
<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            default: '' 
        },
    })
</script>


<style scoped>
    .cards-slots{
        display: flex;
        flex-wrap: wrap;
        /* margin: 0 -10px; */
        padding: 30px;
        box-sizing: border-box;
        background-color: var(--color-tertiary);
        border: solid 3px var(--color-primary);
        border-radius: 12px;
        box-shadow: 15px 12px 8px -5px rgba(0, 0, 0, 0.14);
        -webkit-box-shadow: 6px 6px 8px -5px rgba(0, 0, 0, 0.14);
        -moz-box-shadow: 15px 12px 8px -5px rgba(0, 0, 0, 0.14);
    }
    @media (max-width: 750px) {
        .cards-slots{
            padding: 15px;
        }
    }
</style>
