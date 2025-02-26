<template>
    <div class="chatbot">
      <button class="chatbot-button" @click="toggleChat">Chat</button>
      <div class="chat-window" v-if="isOpen">
        <div class="chat-header">Chatbot</div>
        <div class="chat-body">
          <p>Hello! How can I help you?</p>
        </div>
        <input type="text" placeholder="Type a message..." />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TheChatbot',
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleChat() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .chatbot {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  
  .chatbot-button {
    padding: 0.8rem 1.5rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chatbot-button:hover {
    background-color: #369f6e;
  }
  
  .chat-window {
    width: 300px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
  
  .chat-header {
    padding: 1rem;
    background-color: #2c3e50;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .chat-body {
    padding: 1rem;
    height: 200px;
    overflow-y: auto;
  }
  
  .chat-body p {
    margin: 0;
  }
  
  .chat-window input {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-top: 1px solid #ccc;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  </style>