<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  
  const messages = ref([]);
  const newMessage = ref('');
  const chatContainer = ref(null);
  
  const sendMessage = async () => {
    if (!newMessage.value.trim()) return;
    
    messages.value.push({ sender: 'user', text: newMessage.value });
    const userMessage = newMessage.value;
    newMessage.value = '';
    
    await nextTick();
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    
    // Simulated AI response (replace with actual API call)
    setTimeout(() => {
      messages.value.push({ sender: 'ai', text: 'This is a response from ChatGPT.' });
      nextTick(() => chatContainer.value.scrollTop = chatContainer.value.scrollHeight);
    }, 1000);
  };
</script>

<template>
   <div class="card min-h-full">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl pl-8 pt-20">
            <span class="block my-8">
                Holi,
                <span class="text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600 ">
                    Marvo
                </span> 
            <p class="break-normal">Que quieres saber hoy? </p>
            </span>
        </h1>
        <h2 class="text-2xl text-gray-900 pl-8 pb-8"> 
            Elige alguna de las consultas anteriores o comienza a escribir 
        </h2>
        <div class="flex flex-col h-96 p-8 rounded-md bg-gray-50 border-2">
            <div class="flex-1 overflow-y-auto p-8" ref="chatContainer">
                <div v-for="(msg, index) in messages" :key="index" class="mb-4">
                <div :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
                    <span class="text-xl inline-block p-3 rounded-lg" 
                    :class="msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-black '">
                    {{ msg.text }}
                    </span>
                </div>
                </div>
            </div>
            <div class="p-8 border-t flex ">
                <input v-model="newMessage" @keyup.enter="sendMessage" 
                class="text-xl flex-1 p-2 border rounded-lg outline-none" 
                placeholder="Preguntame algo :) ..." />
                <button @click="sendMessage" class="text-xl font-bold ml-2 p-4 bg-cyan-500 hover:bg-indigo-500 text-white rounded-lg">Enviar</button>
            </div>
        </div>
   </div>
   
</template>

