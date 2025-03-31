<template>
    <div class="ui-input" :class="{ error: inputHasError }">
        <UInput v-if="type == 'text'" type="text" :aria-label="ariaLabel" v-model="model"  :placeholder="placeholder"/>
        <UInput  v-if="type == 'email'" v-model="model" :aria-label="ariaLabel" :placeholder="placeholder" :type="type" />
        <UInput :aria-label="ariaLabel" v-if="type == 'password'"
            v-model="model"
            placeholder="Password"
            :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
           
        >
            <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
            />
            </template>
        </UInput>
        <USelectMenu v-if="type == 'dropdown'" :search-input="false" placeholder="Role" v-model="model" :items="dropDownItems" :class="['dropdown w-48', { valid: model }]" />
        <p class="ui-input__error-text"  aria-live="assertive" v-if="errorMessage && inputHasError" >{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const model = defineModel();

watch(model, (value) => {
    if(value){
        inputHasError.value = false;
    }
})


const props = defineProps({
    type: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    errorMessage : {
        type: String,
        default: ''
    },
    ariaLabel : {
        type: String,
        default: ''
    },
    dropDownItems : {
        type: Array,
        default: () => []
    }
})

const show = ref(false)
const password = ref('')
const inputHasError = ref(false)


function handleErrors() {

  if (
    props.required &&
    (model.value === '' || model.value === 'Undefined')
  ) {
    inputHasError.value = true;
  } else {
    inputHasError.value = false;
  }
}


defineExpose({
    handleErrors
})


</script>

<style scoped >
   
    .ui-input{
        position: relative;
        div{
            width: 100%;
        }
        ::v-deep(input) {
            width: 100%;
            border: solid 1px var(--color-secondary);
            transition: all 0.3s ease-in-out;
            &:focus {
                transition: all 0.3s ease-in-out;
                border: solid 1px var(--color-primary);
                outline: none;
                box-shadow: 0 0 0 2px rgba(65, 198, 251, 0.4);
            }

        }
        .ui-input__error-text{
            color: var(--color-error);
            font-size: 12px;
            position: absolute;
            bottom: -20px;
        }
        &.error{
            animation: shake 0.2s ease;
            ::v-deep(input) {
                border: solid 1px var(--color-error);
                transition: all 0.3s ease-in-out;
                box-shadow: 0px 0px 4px 0px var(--color-error);

            }
        }
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
        100% { transform: translateX(0); }
    }
</style>
