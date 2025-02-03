<script setup>
import { ref } from 'vue';

const displayBasic = ref(false);
const cardName = ref(null);
const cardno = ref('');
const cardDate = ref(null);
const cvv = ref(null);

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

function showBasicDialog() {
    displayBasic.value = true;
}
</script>

<template>
    <Dialog header="Add New Card" v-model:visible="displayBasic" modal :style="{ width: '50vw' }">
        <template #header>
            <div class="block w-8/12">
                <h2 class="p-0 m-0 mb-4">Add your new card</h2>
                <p class="p-0 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores quasi consequuntur eveniet iure perspiciatis.</p>
            </div>
        </template>
        <div class="flex justify-between items-center gap-16">
            <div class="card-form w-full">
                <label for="name" class="block">Name on your card</label>
                <InputText class="w-full mb-4" type="text" id="name" v-model="cardName" />
                <label for="cardno" class="block">Your card number</label>
                <InputMask class="w-full mb-4" id="cardno" v-model="cardno" mask="9999-9999-9999-9999" :autoClear="false"></InputMask>
                <div class="flex gap-4">
                    <div class="mb-4 w-6/12">
                        <label for="carddate" class="block">Your card's valid date</label>
                        <InputMask class="w-full" id="carddate" v-model="cardDate" :autoClear="false" mask="99/99"></InputMask>
                    </div>
                    <div class="mb-4 w-6/12">
                        <label for="cvv" class="block">CVV on your card</label>
                        <InputMask class="w-full" id="cvv" v-model="cvv" :autoClear="false" mask="999"></InputMask>
                    </div>
                </div>
            </div>

            <div class="px-4 xl:px-8 py-8 w-full rounded-2xl shadow-md" style="background: linear-gradient(to left bottom, var(--p-primary-100), var(--p-primary-400)); min-height: 19rem">
                <div class="mb-8">
                    <img src="/demo/images/logo-freya-single.svg" class="w-8" alt="" />
                </div>
                <div class="mb-4">
                    <h3 class="text-surface-0 dark:text-surface-900" style="letter-spacing: -0.5px; min-height: 2.09rem">{{ cardno }}</h3>
                    <div class="text-surface-0 dark:text-surface-900 flex items-center justify-end">
                        <span class="m-0 text-sm p-0 mr-2">Valid <br />thru</span>
                        <h4 class="m-0 text-surface-0 dark:text-surface-900" style="min-width: 4.1rem">{{ cardDate }}</h4>
                    </div>
                    <h4 class="text-surface-0 dark:text-surface-900" style="min-height: 1.7rem">
                        {{ cardName }}
                    </h4>
                </div>
            </div>
        </div>
        <template #footer>
            <Button icon="pi pi-check" label="Save Card" text></Button>
        </template>
    </Dialog>

    <div class="card px-0">
        <div class="card-header gap-4" style="padding: 0 28px 16px">
            <div class="card-title">
                <span class="font-semibold">My Cards ({{ cards.length }})</span>
                <p class="subtitle">You can always add more</p>
            </div>
            <Button type="button" icon="pi pi-plus" severity="secondary" text rounded @click="showBasicDialog()"></Button>
        </div>
        <Carousel :value="cards" :numVisible="1" :numScroll="1" circular>
            <template #item="slotProps">
                <div class="px-2 pb-2">
                    <div class="px-4 xl:px-8 py-8 w-full rounded-2xl shadow-md" style="background: linear-gradient(to left bottom, var(--p-primary-100), var(--p-primary-400))">
                        <div class="mb-8">
                            <img :src="slotProps.data.logo" class="w-8" alt="" />
                        </div>
                        <div class="mb-4">
                            <h3 class="text-surface-0 dark:text-surface-900" style="letter-spacing: -0.5px">**** **** **** {{ slotProps.data.cardNo.split('-')[3] }}</h3>
                            <div class="text-surface-0 dark:text-surface-900 flex items-center justify-end">
                                <span class="m-0 text-sm p-0 mr-2">Valid <br />thru</span>
                                <h4 class="m-0 text-surface-0 dark:text-surface-900">{{ slotProps.data.validDate }}</h4>
                            </div>
                            <h4 class="text-surface-0 dark:text-surface-900">
                                {{ slotProps.data.name }}
                            </h4>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>
