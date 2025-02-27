<template>
    <section class="contact">
      <h2>Contact Me</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="name" placeholder="Your Name" required />
        <input type="email" v-model="email" placeholder="Your Email" required />
        <textarea v-model="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactView',
    data() {
      return {
        name: '',
        email: '',
        message: '',
      };
    },
    methods: {
  async submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.successMessage = data.message;
        this.name = '';
        this.email = '';
        this.message = '';
      } else {
        this.errorMessage = data.error || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to send message. Please try again.';
    }
  },
},
  };
  </script>
  
  <style scoped>
  .contact {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .contact h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .contact form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact input,
  .contact textarea {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .contact button {
    padding: 0.8rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .contact button:hover {
    background-color: #369f6e;
  }
  </style>