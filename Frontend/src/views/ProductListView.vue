<script setup lang="ts">
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/api/productApi';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useRouteQuery } from '@vueuse/router';
import { useConfirm, useToast, type PageState } from 'primevue';
import { PrimeIcons } from '@primevue/core/api';
import { ref } from 'vue';
import type { FormSubmitEvent } from '@primevue/forms';
import { createOrUpdateProductSchema, type CreateOrUpdateProductRequest, type IProduct } from '@/types/api/productApiTypes';
import { zodResolver } from '@primevue/forms/resolvers/zod';

const toast = useToast()
const confirm = useConfirm()
const showAddProductModal = ref(false)
const showUpdateProductModal = ref(false)
const pageNumber = useRouteQuery('page', 1, { mode: 'push', transform: Number })

const {
    data: response,
    isLoading,
    refetch

} = useQuery({
    queryKey: ['products', pageNumber],
    queryFn: () => getAllProducts(pageNumber.value),
})

const onChangePage = async (e: PageState) => {
    pageNumber.value = e.page + 1
}

const onRefresh = async () => {
    await refetch()
    toast.add({ severity: 'info', summary: 'List refreshed.', life: 2000 });
}

const resolver = ref(zodResolver(createOrUpdateProductSchema))

const {
    mutate: createProductMutate,
    isPending: createIsPending,
    isError: createIsError,
    error: createError

} = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
        await refetch()
        showAddProductModal.value = false
        toast.add({ severity: 'success', summary: 'New Product added', life: 2000 });
    },
})

const onCreateProduct = (form: FormSubmitEvent) => {
    if (form.valid) {
        createProductMutate(form.values as CreateOrUpdateProductRequest)
    }
}

const updateProductInitialValues = {
    id: -1,
    name: '',
    description: ''
};

const onEditProduct = (product: IProduct) => {
    console.log(product.id)
    showUpdateProductModal.value = true
    updateProductInitialValues.id = product.id
    updateProductInitialValues.name = product.name
    updateProductInitialValues.description = product.description
}

const {
    mutate: updateProductMutate,
    isPending: updateIsPending,
    isError: updateIsError,
    error: updateError

} = useMutation({
    mutationFn: ({ id, form }: { id: number, form: CreateOrUpdateProductRequest }) => updateProduct(id, form),
    onSuccess: async () => {
        await refetch()
        showUpdateProductModal.value = false
        toast.add({ severity: 'success', summary: 'Product updated.', life: 2000 });
    },
})

const onUpdateProduct = (form: FormSubmitEvent) => {
    if (form.valid) {
        form.values.id = updateProductInitialValues.id
        updateProductMutate({ id: updateProductInitialValues.id, form: form.values as CreateOrUpdateProductRequest })
    }
}

const {
    mutate: deleteProductMutate,

} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    },
})

const onConfirmDeleteProduct = (product: IProduct) => {
    confirm.require({
        message: `Do you want to delete this record?`,
        header: 'Danger Zone',
        icon: PrimeIcons.INFO_CIRCLE,
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            deleteProductMutate(product.id)
        },
    });
};


</script>

<template>
    <BaseLayout>
        <Toast position="top-center" />
        <ConfirmDialog />

        <div class="card flex justify-center">
            <DataTable :value="response?.data.data" data-key="id" paginator :rows="response?.data.per_page"
                :total-records="response?.data.total" tableStyle="min-width: 50rem" class="w-3/4" @page="onChangePage"
                :lazy="true" :loading="isLoading && !response" :first="(response?.data.from as number)">

                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="text-xl font-bold">Products</span>
                        <div class="space-x-2">
                            <Button @click="showAddProductModal = true" :icon="PrimeIcons.PLUS" rounded raised />
                            <Button @click="onRefresh" :icon="PrimeIcons.REFRESH" rounded raised />
                        </div>
                    </div>
                </template>

                <Column field="name" header="Name" />
                <Column field="description" header="Description" class="wrap" />

                <Column :exportable="false" style="min-width: 12rem" class="text-right">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="onEditProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="onConfirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="showAddProductModal" modal header="Add Product" :style="{ width: '40rem' }">
            <Form :resolver @submit="onCreateProduct">
                <FormField v-slot="$field" name="name" class="flex items-center gap-4 mb-4">
                    <label for="name" class="font-semibold w-24">Name</label>
                    <InputText type="text" class="flex-auto" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="description" class="flex items-center gap-4 mb-8">
                    <label for="description" class="font-semibold w-24">Description</label>
                    <Textarea class="flex-auto" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <Message v-if="createIsError" severity="error" size="small" variant="simple">
                    {{ createError.response.data.message }}
                </Message>

                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="showAddProductModal = false" />
                    <Button type="submit" label="Save" :disabled="createIsPending" />
                </div>
            </Form>
        </Dialog>

        <Dialog v-model:visible="showUpdateProductModal" modal header="Update Product" :style="{ width: '40rem' }">
            <Form :resolver @submit="onUpdateProduct" :initial-values="updateProductInitialValues">
                <FormField v-slot="$field" name="name" class="flex items-center gap-4 mb-4">
                    <label for="name" class="font-semibold w-24">Name</label>
                    <InputText type="text" class="flex-auto" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <FormField v-slot="$field" name="description" class="flex items-center gap-4 mb-8">
                    <label for="description" class="font-semibold w-24">Description</label>
                    <Textarea class="flex-auto" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                        $field.error?.message }}</Message>
                </FormField>

                <Message v-if="updateIsError" severity="error" size="small" variant="simple">
                    {{ updateError.response.data.message }}
                </Message>

                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="showUpdateProductModal = false" />
                    <Button type="submit" label="Save" :disabled="updateIsPending" />
                </div>
            </Form>
        </Dialog>
    </BaseLayout>
</template>