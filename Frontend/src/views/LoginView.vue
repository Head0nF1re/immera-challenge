<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import BaseLayout from '@/layouts/BaseLayout.vue';

const toast = useToast();

const initialValues = reactive({
    username: '',
});

const resolver = ref(zodResolver(
    z.object({
        email: z.string().email().max(255),
        password: z.string().email().max(255),
        passwordConfirmation: z.string().email().max(255)
    })
));

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({
            severity: 'success',
            summary: 'Form is submitted.',
            life: 3000
        });
    }
};
</script>

<template>
    <BaseLayout>
        <div class="card flex justify-center">
            <Toast />

            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit"
                class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <InputText name="email" type="text" placeholder="Email" fluid />
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                        $form.email.error?.message }}</Message>
                </div>
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
        </div>
    </BaseLayout>
</template>
