<template>
  <section class="about">
    <h2>About Me</h2>
    <p>
      Seasoned UI Developer with 8+ years of experience specializing in Angular 16+, JavaScript, TypeScript, and Node.js.
      Expertise in building scalable, high-performance web applications using Micro Frontend Architecture with runtime and
      build-time integration. Proficient in developing modular SPAs, implementing Role-Based Authorization, and optimizing
      performance for large datasets.
    </p>

    <h3>Skills</h3>
    <div class="skills-grid">
      <div class="skill-category" v-for="category in skills" :key="category.category">
        <h4>{{ category.category }}</h4>
        <ul>
          <li
            v-for="skill in category.skills"
            :key="skill.name"
            :class="{ 'current-project': skill.currentProject }"
          >
            {{ skill.name }}
            <span v-if="skill.currentProject" class="highlight">★</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import skills from '../../../backend/skills';

export default {
  name: 'AboutView',
  data() {
    return {
      skills,
    };
  },
};
</script>

<style scoped>
.about {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.about h3 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skill-category h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.skill-category ul {
  list-style-type: none;
  padding: 0;
}

.skill-category li {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.current-project {
  font-weight: bold;
}

.highlight {
  color: #42b983;
  margin-left: 0.5rem;
}
</style>