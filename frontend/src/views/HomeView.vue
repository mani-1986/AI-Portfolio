<template>
    <section class="home">
      <div class="hero">
        <h1>Welcome to Manivas Medishetty's Portfolio</h1>
        <p>Driven by curiosity and innovation, I am a passionate developer eager to embrace new challenges, expand my skill set, and craft impactful digital experiences. I thrive in dynamic environments where I can continuously learn, explore emerging technologies, and contribute to cutting-edge solutions.</p>
        <router-link to="/projects" class="cta-button">View My Work</router-link>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
    text-align: center;
  }
  
  .hero {
    max-width: 600px;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    padding: 0.8rem 1.5rem;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .cta-button:hover {
    background-color: #369f6e;
  }
  </style>