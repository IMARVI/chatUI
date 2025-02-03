<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

const confirm = useConfirm();
const toast = useToast();

const selectedSubscription = ref(null);
const selectedAccount = ref(null);
const inputValue = ref(null);

const cards = ref([
    {
        logo: '/demo/images/logo-freya-single.svg',
        cardNo: '5454-5454-9999-8888',
        validDate: '05/28',
        name: 'John Doe'
    },
    {
        logo: '/demo/images/logo-freya-single.svg',
        cardNo: '5454-5454-9999-7777',
        validDate: '08/26',
        name: 'John Doe'
    }
]);

const selectedCard = ref(cards.value[0]);

const filteredSubscriptions = ref([]);
const subscriptions = ref([
    {
        accountNo: '548268',
        name: 'Electric Bill',
        amount: 15,
        due: 'close'
    },
    {
        image: '/demo/images/dashboard/brands/hbo-logo.png',
        accountNo: '845152848',
        name: 'TV Subscription',
        amount: 120,
        due: ''
    },
    {
        image: '/demo/images/dashboard/brands/netflix-logo.png',
        accountNo: '659815523',
        name: 'Netflix Subscription',
        amount: 48,
        due: 'close'
    },
    {
        image: '/demo/images/dashboard/brands/harvard-logo.png',
        accountNo: '*6585122',
        name: 'Education Payment',
        amount: 45,
        due: 'late'
    }
]);

const amount = ref(null);
const accountNumber = ref(null);

const filteredAccounts = ref([]);
const accounts = ref([
    {
        photo: '/demo/images/avatar/amyelsner.png',
        accountNo: '** 4848',
        name: 'Amy Elsner'
    },
    {
        photo: '/demo/images/avatar/annafali.png',
        accountNo: '** 4848',
        name: 'Anna Fali'
    },
    {
        photo: '/demo/images/avatar/bernardodominic.png',
        accountNo: '** 4848',
        name: 'Bernardo Dominic'
    },
    {
        photo: '/demo/images/avatar/ivanmagalhaes.png',
        accountNo: '** 4848',
        name: 'Ivan Magalhaes'
    },
    {
        photo: '/demo/images/avatar/stephenshaw.png',
        accountNo: '** 4848',
        name: 'Stephen Shaw'
    }
]);

function filterAccounts(event) {
    let filtered = [];
    let query = event.query;

    for (let i = 0; i < accounts.value.length; i++) {
        let country = accounts.value[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    filteredAccounts.value = filtered;
}

function filterSubscription(event) {
    const filtered = [];
    const query = event.query;

    for (let i = 0; i < subscriptions.value.length; i++) {
        let country = subscriptions.value[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    filteredSubscriptions.value = filtered;
}

function confirm1(name, amount) {
    confirm.require({
        message: 'Are you sure that you want to send $' + amount + ' to ' + name + '?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You sent $' + amount + ' to ' + name, life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'canceled', detail: 'Your transaction canceled', life: 3000 });
        }
    });
}

function confirm2(name, amount) {
    confirm.require({
        message: 'Are you sure that you want to pay $' + amount + ' for your ' + name + '?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You sent $' + amount + ' to ' + name, life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'canceled', detail: 'Your transaction canceled', life: 3000 });
        }
    });
}

watch(selectedAccount, (newVal) => {
    if (newVal) {
        inputValue.value = newVal.accountNo;
    }
});
</script>

<template>
    <div class="card">
        <div class="card-header gap-4">
            <div class="card-title">
                <div class="font-semibold mb-2">Quick Actions</div>
                <p class="subtitle">Send money or pay your bills.</p>
            </div>
            <Select :options="cards" v-model="selectedCard" :placeholder="selectedCard.cardNo" optionLabel="cardNo" :showClear="false" class="w-32" panelclass="w-32">
                <template #option="slotProps">
                    <span class="block">****{{ slotProps.option.cardNo.split('-')[3] }}</span>
                </template>
            </Select>
        </div>
        <ConfirmDialog :style="{ width: '360px' }" :baseZIndex="10000"></ConfirmDialog>
        <Tabs value="0">
            <TabList>
                <Tab value="0">Send Money</Tab>
                <Tab value="1">Pay Subscriptions or Bills</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <AutoComplete class="w-full p-0" v-model="selectedAccount" placeholder="Enter Name" :suggestions="filteredAccounts" @complete="filterAccounts" field="name" dropdown>
                        <template #option="slotProps">
                            <div class="name-item flex items-center justify-between">
                                <div class="flex items-center">
                                    <img v-if="slotProps.option.photo.length > 0" class="w-8 h-8 rounded-full" :src="slotProps.option.photo" />
                                    <div v-else class="w-8 h-8 rounded-full flex justify-center items-center uppercase font-medium bg-surface-100 dark:bg-surface-700">
                                        {{ slotProps.option.name[0] }}
                                    </div>
                                    <div class="ml-2">{{ slotProps.option.name }}</div>
                                </div>
                                <div>{{ slotProps.option.accountNo }}</div>
                            </div>
                        </template>
                    </AutoComplete>

                    <div class="flex items-center my-4 gap-4">
                        <InputText class="w-8/12" type="text" v-model="inputValue" placeholder="Enter Account No" />
                        <InputNumber v-model="amount" inputId="currency-us" mode="currency" placeholder="$00.00" currency="USD" locale="en-US"></InputNumber>
                    </div>
                    <Button icon="pi pi-send" type="button" label="Send" class="w-full" outlined @click="confirm1(selectedAccount.name ? selectedAccount.name : selectedAccount, amount)"></Button>
                </TabPanel>
                <TabPanel value="1">
                    <AutoComplete class="w-full" v-model="selectedSubscription" placeholder="Enter Subscription or Bill Company" :suggestions="filteredSubscriptions" @complete="filterSubscription($event)" field="name" dropdown>
                        <template #option="subscription">
                            <div class="name-item flex items-center justify-between">
                                <div class="flex items-center">
                                    <img v-if="subscription.option.image && subscription.option.image.length > 0" class="w-8 h-8 rounded-full" :src="subscription.option.image" />
                                    <span v-else class="w-8 h-8 rounded-full flex justify-center items-center uppercase font-medium bg-surface-100 dark:bg-surface-700">
                                        {{ subscription.option.name[0] }}
                                    </span>

                                    <div class="ml-2">{{ subscription.option.name }}</div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <small :style="{ color: subscription.due === 'late' ? '#fe572c' : subscription.due === 'close' ? '#ffc800' : '' }">{{ subscription.due === 'late' ? 'late' : subscription.due === 'close' ? 'close' : '' }}</small>
                                    <div class="rounded-2xl p-1 text-center" :style="{ backgroundColor: subscription.due === 'late' ? '#ff6e493a' : subscription.due === 'close' ? '#ffd8493a' : '' }">${{ subscription.option.amount }}</div>
                                </div>
                            </div>
                        </template>
                    </AutoComplete>

                    <div class="flex items-center my-4 gap-4">
                        <InputText class="w-8/12" type="text" :v-model="selectedSubscription ? selectedSubscription.accountNo : accountNumber" placeholder="Enter User No" />
                        <InputNumber :v-model="selectedSubscription ? selectedSubscription.amount : amount" inputId="currency-us" placeholder="$00.00" mode="currency" currency="USD" locale="en-US"></InputNumber>
                    </div>
                    <Button
                        icon="pi pi-wallet"
                        type="button"
                        label="Pay"
                        class="w-full"
                        outlined
                        @click="confirm2(selectedSubscription.name ? selectedSubscription.name : selectedSubscription, selectedSubscription ? selectedSubscription.amount : amount)"
                    ></Button>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
