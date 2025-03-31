<template> 
    <cards-slots class="modules-users" >
        <header>
            <h2>{{ title }}</h2>
         
            <UPopover  v-if="permissions == 'Admin'" v-model:open="isPopoverOpen"  mode="click">
                <UButton label="Add user" icon="prime:user-plus"  color="neutral" variant="subtle" />
                <template #content>
                    
                    <form class="modules-users__add-user" @submit.prevent="addUser">
                        <h3>New user</h3>
                        <UI-input ref="nameInput" type="text" placeholder="Name" ariaLabel="Name" v-model="valueName" required errorMessage="Name is required" />
                        <UI-input ref="emailInput" type="email" placeholder="Email" ariaLabel="Email" v-model="valueEmail" required errorMessage="Email is required" />
                        <UI-input ref="passwordInput" type="password" ariaLabel="password" placeholder="Password"  v-model="valuePassword" required errorMessage="Password is required" />
                        <UI-input ref="roleInput" type="dropdown" placeholder="Role"  required v-model="valueRole" errorMessage="Role is required" :dropDownItems="roleItems" />
                        <UI-button :state="formState" label="Add user" type="submit " text="Add user" color="primary" variant="solid" size="lg" class="mt-4"/>
                    </form>
                </template>
            </UPopover>
        </header>
        <div class="modules-users__user-list-header">
            <!-- these could come from a prop if you wanted to make a custom table compontent  -->
            <p class="modules-users__user-list-header__info">User</p>
            <p class="modules-users__user-list-header__role">Role</p>
            <p class="modules-users__user-list-header__email">Email</p>
        </div>
        <div class="modules-users__user-list">
            <div  v-if="listState == 'loading'" v-for="n in 6" :key="n" class="flex modules-users__user-list-skeliton items-center gap-4">
                <USkeleton class="h-8 w-8 rounded-full" /><USkeleton class="h-4 w-[25%]" /><USkeleton class="h-4 w-[20%]" /> <USkeleton class="h-4 w-[50%]" />
            </div>
            <p class="modules-users__no-list" v-if="userMemory.length === 0 && listState === 'success' ">Add some users to start building your team</p>
            <UI-userbar  v-if="listState == 'success'" v-for="user in userMemory" :key="user.id"  :user="user" />
        </div>
    </cards-slots>
</template>

<script setup lang="ts">
    import { useNuxtApp } from '#app'
import { from } from '@apollo/client';
    import { set } from '@nuxt/ui/runtime/utils/index.js';
    import gql from 'graphql-tag'
    const { $apollo } = useNuxtApp()

    const props = defineProps({
        users: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '' 
        },
        status: {
            type: String,
            default: 'loading' 
        }
    });


    

    const nameInput = ref(null)
    const emailInput = ref(null)
    const passwordInput = ref(null)
    const roleInput = ref(null)

    const isPopoverOpen = ref(false)

    const listState = ref< 'loading' | 'failed' | 'success' | 'idle'>('idle');

    const formState = ref< 'loading' | 'failed' | 'success' | 'idle'>('idle');

    const valueName = ref<string>('')
    const valueEmail = ref<string>('')
    const valuePassword = ref<string>('')
    const valueRole = ref<string>('')

    const permissions = ref<string>('');
    listState.value = 'loading'
    onMounted(() => {
        // delay UI load so you can see the skeliton
        setTimeout(() => {
            listState.value = props.status;
        }, 1000) 
       
        permissions.value = localStorage.getItem('role');
    });
    const userMemory = ref([...props.users]);


   
    const roleItems = ref(['Admin', 'User', 'Guest']) 


    const ADD_USER_MUTATION = gql`
        mutation AddUser($name: String!, $email: String!, $password: String!, $role: String!) {
            addUser(name: $name, email: $email, password: $password, role: $role) {
            id
            name
            email
            role
            }
        }
    `
    const toast = useToast()
    const addUser = async () => {
        // if i wanted to be really fancy i would use this for the input values to
        nameInput.value?.handleErrors()
        emailInput.value?.handleErrors()
        passwordInput.value?.handleErrors()
        roleInput.value?.handleErrors()

        if (
            valueName.value === '' ||
            valueEmail.value === '' ||
            valuePassword.value === '' ||
            valueRole.value === ''
        ) {
            return false
        }
        formState.value = 'loading'
        listState.value = 'loading'

        try {
            const result = await $apollo.mutate({
            mutation: ADD_USER_MUTATION,
            variables: {
                name: valueName.value,
                email: valueEmail.value,
                password: valuePassword.value,
                role: valueRole.value
            }
            })

            const newUser = result?.data?.addUser

            if (newUser) {
                formState.value = 'success'
                listState.value = 'success'
                userMemory.value.push(newUser) 
               
                setTimeout(() => {
                    isPopoverOpen.value = false
                }, 2000) // 2 second delay
                toast.add({
                    title : newUser.name + ' is here!',
                    description: 'User ' + newUser.name + ' added'
                });
                
                valueName.value = ''
                valueEmail.value = ''
                valuePassword.value = ''
                valueRole.value = ''
            }

        } catch (error: any) {
            console.error('Apollo addUser error:', error.message)
            formState.value = 'failed'
        }
        setTimeout(() => {
                formState.value = ''
        }, 2000) // 2 second delay
    }


</script>

<style scoped lang="scss">
    .modules-users{
        max-width: 580px;
        width: 100%;
        display: flex;
        flex-direction: column; 
        height: 720px; 
        header{
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 75px;
            justify-content: space-between;
            align-items: baseline;
            color: var(--color-primary);
            button{
                cursor: pointer;
            }
        }
        h2{
            font-size: var(--font-size-h2);
            color: var(--color-primary);
        }

        &__add-user{
            padding: 20px;
            h3{
                font-size: 16px;
                color: var(--color-quaternary);
                margin-bottom: 20px;
                text-align: center;
                /* margin-top: 10px; */
            }
            .ui-input{
                margin-bottom: 24px;
            }
            .ui-button{
                margin: 0 auto;
                width: 205px;
            }
        }
        &__user-list{
            width: 100%;
            height: 550px;
            display: flex;
            position: relative;
            flex-direction: column;
            overflow: scroll;
        }
        &__user-list-skeliton{
            margin-bottom: 10px;
            margin-top: 20px;
        }
        &__user-list-header{
            width: 100%;
            display: flex;
            flex-direction: row;
            color: var(--color-primary);
            font-size: 12PX;
            font-weight: 600;
            height: 20px;
            &__info{
                width: max-content;
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 40%;
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
                }
            }
        }
        &__user-list::-webkit-scrollbar {
            width: 8px;
        }
        @media (max-width: 750px) {
            max-width: 100%;
            border: none;
            background-color: #ffffff00 !important;
            box-shadow: none;
            height: auto;

            .modules-users__user-list {
                width: calc(100% + 4px);
                height: 550px;
                display: flex;
                position: relative;
                flex-direction: column;
                overflow: scroll;
                left: -4px;
                height: 407px;
                background-color: #f7f7f71a;
                border-radius: 20px;
                border: solid 4px #f7f7f71a;
            }
        }
        &__no-list{
            text-align: center;
            padding: 50px 0px;
            max-width: 200px;
            margin: 0 auto;
        }
    }    
</style>