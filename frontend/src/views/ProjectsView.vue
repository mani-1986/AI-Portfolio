<template>
  <section class="projects">
    <h2>My Projects</h2>
    <div v-if="isLoading">
      <p>Loading skills...</p>
    </div>
    <div class="project-grid" v-else>
      <div class="project-card" v-for="project in projects" :key="project.id">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-skills">
          <span v-for="skill in project.skills" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'ProjectsView',
  data() {
    return {
      projects: [],
      isLoading: true,
    };
  },
  async created() {
    try {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/projects`);
      this.projects = await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      this.isLoading = false; // Update loading state when fetch is complete
    }
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
  color: #2c3e50;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.project-card p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.project-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.skill-tag {
  background-color: #42b983;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}
</style>
