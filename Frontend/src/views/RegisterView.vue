<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { register } from '@/api/authApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore()

/**
 * TODO: 
 * - move auth logic to authStore
 * - Remove spaces from phone_number; 
 * - confirm password; 
 * - add values to storage while not submited
 */
const resolver = ref(zodResolver(
    z.object({
        name: z.string().trim().min(1, { message: 'Required' }).max(255),
        email: z.string().email().max(255),
        phone_number: z.string().min(9).max(13, { message: 'Phone number must be a valid Portuguese mobile number.' }),
        password: z.string().min(8).max(255),
        password_confirmation: z.string().min(8).max(255),
    })
));

const onFormSubmit = async (form) => {
    if (form.valid) {
        await register(form.values)
            .then(() => {
                authStore.isAuthenticated = true
                router.push({ name: 'home' })
            });
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
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
        </div>
    </BaseLayout>
</template>
