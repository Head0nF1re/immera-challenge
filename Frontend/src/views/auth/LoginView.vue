<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useLogin } from '@/composables/auth';
import { useOnInputChange } from '@/composables/inputChange';

const {
    initialValues,
    resolver,
    mutation: { isPending, isError, error },
    onFormSubmit
} = useLogin()
</script>

<template>
    <BaseLayout>
        <div class="card flex justify-center">
            <Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
                    <InputText type="email" placeholder="Email"
                        @value-change="useOnInputChange($event, 'formLogin.email')" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
                    <Password type="password" placeholder="Password" :feedback="false" toggleMask fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <Message v-if="isError" severity="error" size="small" variant="simple">
                    {{ error.response.data.message }}
                </Message>

                <Button type="submit" severity="secondary" label="Submit" :disabled="isPending" />
            </Form>
        </div>
    </BaseLayout>
</template>
