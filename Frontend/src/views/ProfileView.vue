<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import type { FormSubmitEvent } from '@primevue/forms';
import type { UpdatePasswordRequest, UpdateProfileRequest } from '@/types/api/authApiTypes';
import { useUpdatePassword, useUpdateProfile } from '@/composables/auth';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

const authStore = useAuthStore()

const updateProfileInitialValues = ref<UpdateProfileRequest>({
    name: authStore.user!.name,
    email: authStore.user!.email,
    phone_number: authStore.user!.phone_number,
})

const {
    resolver: updateProfileResolver,
    mutation: {
        isPending: updateProfileIsPending,
        isError: updateProfileIsError,
        error: updateProfileError,
        mutate: updateProfile
    }
} = useUpdateProfile()

const onUpdateProfile = async (form: FormSubmitEvent) => {
    if (form.valid) {
        updateProfile(form.values as UpdateProfileRequest)
    }
};

const {
    resolver: updatePasswordResolver,
    mutation: {
        isPending: updatePasswordIsPending,
        isError: updatePasswordIsError,
        error: updatePasswordError,
        mutate: updatePassword
    }
} = useUpdatePassword()

const onUpdatePassword = async (form: FormSubmitEvent) => {
    if (form.valid) {
        updatePassword(form.values as UpdatePasswordRequest)
    }
};
</script>

<template>
    <BaseLayout>
        <Toast />
        <div class="card flex justify-center">
            <div class="flex-col space-y-16">

                <Form :initialValues="updateProfileInitialValues" :resolver="updateProfileResolver"
                    @submit="onUpdateProfile">
                    <span class="text-xl font-bold">Edit Profile</span>
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

                    <FormField v-slot="$field" name="name" class="flex items-center gap-4 mb-4">
                        <label for="name" class="font-semibold w-24">Name</label>
                        <InputText type="text" class="flex-auto" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>
                    <FormField v-slot="$field" name="email" class="flex items-center gap-4 mb-4">
                        <label for="email" class="font-semibold w-24">Email</label>
                        <InputText type="text" class="flex-auto" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>
                    <FormField v-slot="$field" name="phone_number" class="flex items-center gap-4 mb-4">
                        <label for="phone_number" class="font-semibold w-24">Phone Number</label>
                        <InputText type="text" class="flex-auto" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>

                    <Message v-if="updateProfileIsError" severity="error" size="small" variant="simple">
                        {{ updateProfileError.response.data.message }}
                    </Message>

                    <div class="flex justify-end gap-2">
                        <Button type="submit" label="Save" :disabled="updateProfileIsPending" />
                    </div>
                </Form>

                <Form :resolver="updatePasswordResolver" @submit="onUpdatePassword">
                    <span class="text-xl font-bold">Update Password</span>
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your password.</span>

                    <FormField v-slot="$field" name="current_password" class="flex items-center gap-4 mb-4">
                        <label for="current_password" class="font-semibold w-24">Current Password</label>
                        <Password type="password" :feedback="false" toggleMask fluid />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>

                    <FormField v-slot="$field" name="password" class="flex items-center gap-4 mb-4">
                        <label for="password" class="font-semibold w-24">New Password</label>
                        <Password type="password" :feedback="false" toggleMask fluid />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>

                    <FormField v-slot="$field" name="password_confirmation" class="flex items-center gap-4 mb-4">
                        <label for="password_confirmation" class="font-semibold w-24">Confirm New Password</label>
                        <Password type="password" :feedback="false" toggleMask fluid />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                            $field.error?.message }}</Message>
                    </FormField>

                    <Message v-if="updatePasswordIsError" severity="error" size="small" variant="simple">
                        {{ updatePasswordError.response.data.message }}
                    </Message>

                    <div class="flex justify-end gap-2">
                        <Button type="submit" label="Save" :disabled="updatePasswordIsPending"></Button>
                    </div>
                </Form>
            </div>
        </div>
    </BaseLayout>
</template>
