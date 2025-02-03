<script setup>
import { ref } from 'vue';

defineProps({
    user: {
        type: Object,
        required: true
    }
});

const defaultUserId = ref(123);
const emit = defineEmits(['send:message']);
const op = ref(null);
const textContent = ref('');

const emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😇',
    '😉',
    '😊',
    '🙂',
    '🙃',
    '😋',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '🤪',
    '😜',
    '😝',
    '😛',
    '🤑',
    '😎',
    '🤓',
    '🧐',
    '🤠',
    '🥳',
    '🤗',
    '🤡',
    '😏',
    '😶',
    '😐',
    '😑',
    '😒',
    '🙄',
    '🤨',
    '🤔',
    '🤫',
    '🤭',
    '🤥',
    '😳',
    '😞',
    '😟',
    '😠',
    '😡',
    '🤬',
    '😔',
    '😟',
    '😠',
    '😡',
    '🤬',
    '😔',
    '😕',
    '🙁',
    '😬',
    '🥺',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥱',
    '😤',
    '😮',
    '😱',
    '😨',
    '😰',
    '😯',
    '😦',
    '😧',
    '😢',
    '😥',
    '😪',
    '🤤'
];

function parseDate(timestamp) {
    return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
}

function sendMessage() {
    if (textContent.value == '' || textContent.value === ' ') {
        return;
    }
    let message = {
        text: textContent.value,
        ownerId: 123,
        createdAt: new Date().getTime()
    };

    emit('send:message', message);
    textContent.value = '';
}

function addEmoji(emoji) {
    textContent.value = textContent.value + emoji;
    op.value.hide();
}
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="user-message-container p-4 md:px-6 lg:px-12 lg:py-6 mt-2 overflow-y-auto" style="max-height: 80vh">
            <div v-for="message in user.messages" :key="message">
                <div v-if="message.ownerId !== 123" class="grid gap-4 grid-nogutter mb-6">
                    <div class="col mt-4">
                        <p class="text-surface-900 dark:text-surface-0 font-semibold mb-4">{{ user.name }}</p>
                        <span class="text-surface-700 dark:text-surface-100 inline-block font-medium border border-surface-200 dark:border-surface-700 p-4 whitespace-normal rounded" style="word-break: break-word; max-width: 80%">{{
                            message.text
                        }}</span>
                        <p class="text-surface-700 dark:text-surface-100 mt-4">{{ parseDate(message.createdAt) }}<i class="pi pi-check ml-2 text-green-400"></i></p>
                    </div>
                </div>

                <div v-if="message.ownerId === defaultUserId" class="grid gap-4 grid-nogutter mb-6">
                    <div class="col mt-4 text-right">
                        <span class="inline-block text-left font-medium border border-surface-200 dark:border-surface-700 bg-primary-100 text-primary-900 p-4 whitespace-normal rounded" style="word-break: break-word; max-width: 80%">{{
                            message.text
                        }}</span>
                        <p class="text-surface-100 dark:text-surface-100 mt-4">{{ parseDate(message.createdAt) }} <i class="pi pi-check ml-2 text-green-400"></i></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4 md:p-6 lg:p-12 flex flex-col sm:flex-row items-center mt-auto border-t border-surface-200 dark:border-surface-700 gap-4">
            <InputText id="message" type="text" placeholder="Type a message" class="flex-1 w-full sm:w-auto rounded" v-model="textContent" @keydown.enter="sendMessage()" />
            <div class="flex w-full sm:w-auto gap-4">
                <Button class="w-full sm:w-auto justify-center text-xl" severity="secondary" @click="(event) => $refs.op.toggle(event)">😀</Button>
                <Button label="Send" icon="pi pi-send" class="w-full sm:w-auto" @click="sendMessage()"></Button>
            </div>
        </div>
    </div>

    <Popover ref="op" class="w-full sm:w-[30rem]">
        <Button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)" type="button" :label="emoji" class="p-2 text-2xl" text></Button>
    </Popover>
</template>
