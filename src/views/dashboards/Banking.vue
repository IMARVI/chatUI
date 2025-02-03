<script setup>
import AllExpensesWidget from '@/components/dashboard/banking/AllExpensesWidget.vue';
import MoneyFlowWidget from '@/components/dashboard/banking/MoneyFlowWidget.vue';
import MyCardsWidget from '@/components/dashboard/banking/MyCardsWidget.vue';
import QuickActionsWidget from '@/components/dashboard/banking/QuickActionsWidget.vue';
import StatsBankingWidget from '@/components/dashboard/banking/StatsBankingWidget.vue';
import TransactionsWidget from '@/components/dashboard/banking/TransactionsWidget.vue';
import WelcomeWidget from '@/components/dashboard/banking/WelcomeWidget.vue';
</script>

<template>
    <div class="layout-banking-dashboard">
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12">
                <WelcomeWidget />
            </div>
            <div class="col-span-12 xl:col-span-8">
                <div class="flex flex-col sm:flex-row gap-4 mx-2 mb-4">
                    <StatsBankingWidget />
                </div>
                <div>
                    <div class="col-span-12 p-2">
                        <MoneyFlowWidget />
                    </div>
                </div>
            </div>
            <div class="col-span-12 xl:col-span-4">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-6 xl:col-span-12">
                        <AllExpensesWidget />
                    </div>
                    <div class="col-span-12 md:col-span-6 xl:col-span-12">
                        <QuickActionsWidget />
                    </div>
                </div>
            </div>

            <div class="col-span-12 p-1">
                <TransactionsWidget />
            </div>
        </div>
    </div>
</template>
