<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import type { FormSubmitEvent } from '@primevue/forms';
import type { LoginRequest } from '@/types/authApiTypes';
import { useLogin } from '@/composables/auth';

const { resolver, mutation } = useLogin()

const onFormSubmit = async (form: FormSubmitEvent) => {
    if (form.valid) {
        await mutation.mutateAsync(form.values as LoginRequest)
    }
};
</script>

<template>
    <BaseLayout>
        <div class="card flex justify-center">
            <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
                    <InputText type="email" placeholder="Email" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
                    <Password type="password" placeholder="Password" :feedback="false" toggleMask fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
        </div>
    </BaseLayout>
</template>
