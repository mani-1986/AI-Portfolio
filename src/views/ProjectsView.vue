<template>
    <section class="projects">
      <h2>My Projects</h2>
      <div class="project-grid">
        <div class="project-card" v-for="project in projects" :key="project.id">
          <img :src="project.image" :alt="project.name" />
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProjectsView',
    data() {
      return {
        projects: [
          { id: 1, name: 'Project 1', description: 'A Vue.js project', image: 'https://via.placeholder.com/300' },
          { id: 2, name: 'Project 2', description: 'An SEO-optimized website', image: 'https://via.placeholder.com/300' },
          { id: 3, name: 'Project 3', description: 'A CSS-heavy design', image: 'https://via.placeholder.com/300' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .projects {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .projects h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .project-card {
    background-color: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .project-card img {
    width: 100%;
    border-radius: 10px;
  }
  
  .project-card h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  
  .project-card p {
    font-size: 1rem;
  }
  </style>