<template>
  <div class="chatbot">
    <button class="chatbot-button" @click="toggleChat">Chat</button>
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">Chatbot</div>
      <div class="chat-body chatbot-messages">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.sender">
          <p>{{ msg.text }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input
          v-model="userInput"
          type="text"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
        />
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
      userInput: '',
      messages: [],
      isOpen: false,
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    async sendMessage() {
  if (!this.userInput.trim() || this.isSending) return; // Ignore if already sending

  this.isSending = true; // Disable the button

  // Add user message to the chat
  this.messages.push({ sender: 'user', text: this.userInput });

  try {
    // Send user message to the backend API
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: this.userInput }),
    });

    const data = await response.json();

    // Add bot response to the chat
    this.messages.push({ sender: 'bot', text: data.response });
  } catch (error) {
    console.error('Error sending message:', error);
    this.messages.push({ sender: 'bot', text: 'Sorry, something went wrong. Please try again.' });
  } finally {
    this.isSending = false; // Re-enable the button
  }

  // Clear the input field
  this.userInput = '';

  // Scroll to the bottom of the chat
  this.$nextTick(() => {
    const chatContainer = this.$el.querySelector('.chatbot-messages');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
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