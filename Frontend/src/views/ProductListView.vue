<script setup lang="ts">
import { getAllProducts } from '@/api/productApi';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouteQuery } from '@vueuse/router';
import type { PageState } from 'primevue';

const pageNumber = useRouteQuery('page', 1, { mode: 'push', transform: Number })

const { data: response, isLoading, refetch } = useQuery({
    queryKey: ['products', pageNumber],
    queryFn: () => getAllProducts(pageNumber.value),
})

const onChangePage = async (e: PageState) => {
    pageNumber.value = e.page + 1
}

const onRefresh = async () => {
    await refetch()
}

</script>

<template>
    <BaseLayout>
        <div class="card flex justify-center">
            <DataTable :value="response?.data.data" data-key="id" paginator :rows="response?.data.per_page"
                :total-records="response?.data.total" tableStyle="min-width: 50rem" class="w-3/4" @page="onChangePage"
                :lazy="true" :loading="isLoading && !response" :first="response?.data.from as number">
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="text-xl font-bold">Products</span>
                        <Button @click="onRefresh" icon="pi pi-refresh" rounded raised />
                    </div>
                </template>
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description" class="wrap"></Column>
            </DataTable>
        </div>
    </BaseLayout>
</template>