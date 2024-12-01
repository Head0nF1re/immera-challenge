<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import type { FormSubmitEvent } from '@primevue/forms';
import type { RegisterRequest } from '@/types/api/authApiTypes';
import { useRegister } from '@/composables/auth';

const {
    resolver,
    mutation: { isPending, isError, error, mutate: register }
} = useRegister()

const onFormSubmit = async (form: FormSubmitEvent) => {
    if (form.valid) {
        register(form.values as RegisterRequest)
    }
};
</script>

<template>
    <BaseLayout>
        <div class="card flex justify-center">
            <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <FormField v-slot="$field" name="name" class="flex flex-col gap-1">
                    <InputText type="text" placeholder="Name" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
                    <InputText type="email" placeholder="Email" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="phone_number" class="flex flex-col gap-1">
                    <InputText type="text" placeholder="Phone Number" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
                    <Password type="password" placeholder="Password" :feedback="false" toggleMask fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="password_confirmation" class="flex flex-col gap-1">
                    <Password type="password" placeholder="Password Confirmation" :feedback="false" toggleMask fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <Message v-if="isError" severity="error" size="small" variant="simple">
                    {{ error.response.data.message }}
                </Message>

                <Button type="submit" severity="secondary" label="Submit" :disabled="isPending" />
            </Form>
        </div>
    </BaseLayout>
</template>
