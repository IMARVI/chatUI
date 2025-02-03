<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';

const selectedDate = ref({ name: 'Weekly', code: 'WEEK' });

const menu = ref(null);

const filterSalesTable = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const items = ref([
    {
        icon: 'pi pi-refresh',
        label: 'Re-send or Pay'
    },
    {
        icon: 'pi pi-external-link',
        label: 'Details'
    },
    {
        icon: 'pi pi-download',
        label: 'Download doc'
    }
]);

const transactions = ref([
    {
        image: '/demo/images/avatar/amyelsner.png',
        accountNo: '** 4848',
        action: 'Bank Transfer',
        name: 'Amy Elsner',
        amount: 112.0
    },
    {
        image: '/demo/images/avatar/annafali.png',
        accountNo: '** 4848',
        action: 'Bank Transfer',
        name: 'Anna Fali',
        amount: -112.0
    },
    {
        image: '/demo/images/dashboard/brands/netflix-logo.png',
        accountNo: '** 4848',
        action: 'Subscription Payment',
        name: 'Netflix Subscription',
        amount: -48.0
    },
    {
        image: '',
        accountNo: '** 4848',
        action: 'Bill Payment',
        name: 'Electric Bill',
        amount: -48.0
    },
    {
        image: '/demo/images/avatar/ivanmagalhaes.png',
        accountNo: '** 4848',
        action: 'Bank Transfer',
        name: 'Ivan Magalhaes',
        amount: -112.0
    },
    {
        image: '/demo/images/avatar/stephenshaw.png',
        accountNo: '** 4848',
        action: 'Bank Transfer',
        name: 'Stephen Shaw',
        amount: 112.0
    }
]);
</script>

<template>
    <div class="card h-full">
        <div class="card-header gap-4 flex-wrap md:flex-nowrap">
            <div class="card-title">
                <div class="font-semibold mb-2">Transactions</div>
                <p class="subtitle">
                    Your <b>{{ selectedDate.name }}</b> Income & Expenses data.
                </p>
            </div>
            <div class="inline-flex items-center w-full md:w-auto">
                <IconField class="flex-auto">
                    <InputIcon class="pi pi-search" />
                    <InputText type="text" v-model="filterSalesTable.global.value" placeholder="Search" class="w-full" style="border-radius: 2rem" />
                </IconField>
                <Button icon="pi pi-upload" class="mx-4 flex-shrink-0" rounded></Button>
            </div>
        </div>
        <DataTable :value="transactions" :paginator="true" :rows="3" v-model:filters="filterSalesTable">
            <Column>
                <template #body="slotProps">
                    <img v-if="slotProps.data.image.length > 0" class="w-8 h-8 rounded-full mt-2" :src="slotProps.data.image" />
                    <span v-else class="w-8 h-8 rounded-full flex justify-center items-center uppercase font-medium bg-surface-100 dark:bg-surface-700 mt-2">
                        {{ slotProps.data.name[0] }}
                    </span>
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="action" header="Action"></Column>
            <Column field="accountNo" header="Account&User No"></Column>
            <Column header="Amount">
                <template #body="slotProps">
                    <span class="rounded-xl p-1 w-16 text-center block font-medium" :style="slotProps.data.amount > 0 ? 'background-color:#8fff493a;' : 'background-color:#ff6e493a;'">${{ slotProps.data.amount }}</span>
                </template>
            </Column>
            <Column>
                <template #body>
                    <Button icon="pi pi-ellipsis-v" rounded text @click="menu.toggle($event)"></Button>
                </template>
            </Column>
        </DataTable>
        <Menu ref="menu" popup :model="items"></Menu>
    </div>
</template>
