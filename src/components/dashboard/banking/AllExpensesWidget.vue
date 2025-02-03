<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, watch } from 'vue';

const { getPrimary, isDarkTheme } = useLayout();

const pieData = ref(null);
const pieOptions = ref(null);

const dateRanges = ref([
    { name: 'Last 7 Days', code: '7day' },
    { name: 'Last 30 Days', code: '30day' },
    { name: 'Last 90 Days', code: '90day' }
]);

const selectedDate = ref(dateRanges.value[0]);

function onDateChangePieChart() {
    const documentStyle = getComputedStyle(document.documentElement);

    const last30Data = {
        labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
        datasets: [
            {
                data: [300, 50, 100, 80],
                backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--cp-yan-300')]
            }
        ]
    };

    const last7Data = {
        labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
        datasets: [
            {
                data: [450, 50, 200, 120],
                backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')]
            }
        ]
    };

    const last90Data = {
        labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
        datasets: [
            {
                data: [30, 200, 150, 20],
                backgroundColor: [documentStyle.getPropertyValue('--pp-rimary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')]
            }
        ]
    };

    let newPieData = { ...pieData.value };

    switch (selectedDate.value.code) {
        case '7day':
            newPieData = last7Data;
            break;
        case '30day':
            newPieData = last30Data;
            break;
        case '90day':
            newPieData = last90Data;
            break;
        default:
            break;
    }

    pieData.value = newPieData;
}

function initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    pieData.value = {
        labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
        datasets: [
            {
                data: [300, 50, 100, 80],
                backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('-p--orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')],
                borderColor: surfaceBorder
            }
        ]
    };

    pieOptions.value = {
        animation: {
            duration: 0
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    padding: 14,
                    boxHeight: 15,
                    pointStyleWidth: 17
                },
                position: 'bottom'
            }
        }
    };
}

watch([selectedDate], () => {
    onDateChangePieChart();
});

watch(
    [getPrimary, isDarkTheme],
    () => {
        initChart();
    },
    { immediate: true }
);
</script>

<template>
    <div class="card h-full">
        <div class="card-header gap-4">
            <div class="card-title">
                <div class="font-semibold mb-2">All Expenses</div>
                <p class="subtitle">
                    Your <b>{{ selectedDate.name }}</b> Expenses data.
                </p>
            </div>
            <Select :options="dateRanges" v-model="selectedDate" placeholder="Last 7 Days" optionLabel="name" :showClear="false" class="w-32" @onChange="onDateChangePieChart()"></Select>
        </div>
        <Chart type="doughnut" :data="pieData" :options="pieOptions" :height="300"></Chart>
    </div>
</template>
