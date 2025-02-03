<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, watch } from 'vue';

const { getPrimary, isDarkTheme } = useLayout();

const currencyChartOptions = ref(null);
const usdChartData = ref(null);
const btcChartData = ref(null);
const poundChartData = ref(null);

const op = ref(null);
const op2 = ref(null);
const op3 = ref(null);

function initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    usdChartData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Euro to US Dollar',
                backgroundColor: documentStyle.getPropertyValue('--primary-100'),
                borderColor: documentStyle.getPropertyValue('--primary-100'),
                data: [1.1, 1.12, 1.15, 1.18, 1.2, 1.25, 1.3],
                barThickness: 10
            }
        ]
    };

    btcChartData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Bitcoin to US Dollar',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-100'),
                borderColor: documentStyle.getPropertyValue('--p-primary-100'),
                data: [35000, 40000, 45000, 55000, 60000, 65000, 60000],
                barThickness: 10
            }
        ]
    };

    poundChartData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'GBP to US Dollar',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-100'),
                borderColor: documentStyle.getPropertyValue('--p-primary-100'),
                data: [1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6],
                barThickness: 10
            }
        ]
    };

    currencyChartOptions.value = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    boxHeight: 15,
                    pointStyleWidth: 17,
                    padding: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ':';
                        }

                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

watch(
    [getPrimary, isDarkTheme],
    () => {
        initChart();
    },
    { immediate: true }
);
</script>

<template>
    <div class="flex flex-col sm:flex-row items-center gap-6">
        <div class="flex flex-col sm:flex-row items-center gap-4 pb-2">
            <img src="/demo/images/avatar/ivanmagalhaes.png" class="w-12 h-12 flex-shrink-0" />
            <div class="flex flex-col items-center sm:items-start">
                <span class="text-surface-800 dark:text-surface-50 text-2xl font-medium m-0 mb-1">Welcome Nate</span>
                <p class="text-surface-600 dark:text-surface-200 m-0">Your last login was on 01/02/2024 at 10:24 pm</p>
            </div>
        </div>
    </div>
</template>
