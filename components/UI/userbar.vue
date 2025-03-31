<template>
    <div class="ui-userbar">    
        <div class="ui-userbar__info">
            <UAvatar :alt="user.name" size="md" /> 
            <p>{{ user.name }}</p>
        </div>
        <div class="ui-userbar__role">
            <p>{{ user.role }}</p>
        </div>
        <div class="ui-userbar__email">
            <p>{{ user.email }}</p>
        </div>
        <!-- <div class="ui-userbar__controls">
            <button class="ui-userbar__delete">
                <UIcon name="prime:trash" class="size-5" />
            </button>
                
            <button class="ui-userbar__view" >
                <UIcon name="prime:chevron-right" class="size-5" />
            </button>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'


    interface User {
    name: string
    email: string
    role: string
    }
    const props = defineProps<{
    user: User
    }>()

</script>

<style scoped lang="scss">
    .ui-userbar{
        // display: flex;
        flex-direction: row;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: solid 1px var(--color-primary);
        color: var(--color-secondary);
        padding: 10px 0px;
        &__info{
            width: max-content;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 41%;
            height: min-content;
            
            p{
                height: min-content;
                margin-left: 20px;
            }
        }
        &__role{
            display: flex;
            align-items: center;
            width: 15%;
            height: min-content;
            p{
                width: 100%;
                height: min-content;
                font-size: 12px;
            }
        }
        &__email{
            width: max-content;
            display: flex;
            flex-direction: row;
            align-items: left;
            text-align: left;
            height: min-content;
            width: 35%;
            p{
                width: 100%;
                height: min-content;
                font-size: 12px;
                word-break: break-all;
                white-space: normal;
                overflow-wrap: break-word;
            }
        }
        &__controls{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
     
    }
    .ui-userbar__controls > *{
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover{
            transform: scale(1.1);
        }
    }      

    @media (max-width: 750px) {
        .ui-userbar__info p{
            margin-left: 6px;
            font-size: 11px;
        }
        .ui-userbar__role[data-v-2b7b3396] {
            display: flex;
            align-items: center;
            width: 20%;
            height: -moz-min-content;
            height: min-content;
        }
    }
</style>
