<template>
  <div class="chatbot">
    <button class="chatbot-button" @click="toggleChat">Chat</button>
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">Chatbot</div>
      <div class="chat-body">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.sender">
          <p>{{ msg.text }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="userMessage" type="text" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'TheChatbot',
  data() {
    return {
      isOpen: false,
      userMessage: '',
      messages: [],
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    async sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Add user's message to the chat history
    this.messages.push({ text: this.userMessage, sender: 'user' });

    // Clear the input field
    const userMessage = this.userMessage;
    this.userMessage = '';

    // Call your backend API
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      // Add bot's response to the chat history
      this.messages.push({ text: botMessage, sender: 'bot' });
    } catch (error) {
      console.error('Error fetching bot response:', error);
      this.messages.push({ text: 'Sorry, something went wrong.', sender: 'bot' });
    }
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

.chat-body .user {
  text-align: right;
  margin-bottom: 0.5rem;
}

.chat-body .bot {
  text-align: left;
  margin-bottom: 0.5rem;
}

.chat-body p {
  margin: 0;
  padding: 0.5rem;
  background-color: #f4f4f4;
  border-radius: 5px;
  display: inline-block;
}

.chat-body .user p {
  background-color: #42b983;
  color: white;
}

.chat-window form {
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #ccc;
}

.chat-window input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-window button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-window button:hover {
  background-color: #369f6e;
}
</style>