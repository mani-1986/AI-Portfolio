<template>
    <section class="about">
      <h2>About Me</h2>
      <p>I'm a web developer with expertise in Vue.js, SEO, and CSS. I love building user-friendly and performant applications.</p>
      <div class="skills">
        <h3>Skills</h3>
        <ul>
          <li>Vue.js</li>
          <li>JavaScript</li>
          <li>HTML & CSS</li>
          <li>SEO Optimization</li>
        </ul>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'AboutView',
  };
  </script>
  
  <style scoped>
  .about {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .about h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .about p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .skills {
    margin-top: 2rem;
  }
  
  .skills h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .skills ul {
    list-style: none;
    padding: 0;
  }
  
  .skills li {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  </style>