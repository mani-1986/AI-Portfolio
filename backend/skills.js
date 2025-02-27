const skills = [
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular 16+', currentProject: false },
        { name: 'TypeScript', currentProject: false },
        { name: 'JavaScript (ES6+)', currentProject: false },
        { name: 'HTML5', currentProject: false },
        { name: 'CSS3', currentProject: false },
        { name: 'SCSS', currentProject: false },
        { name: 'RxJS', currentProject: false },
        { name: 'NgRx', currentProject: false },
        { name: 'Webpack', currentProject: false },
        { name: 'Vue.js', currentProject: true }, // Highlighted for the current project
        { name: 'Vite', currentProject: true },   // Highlighted for the current project
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', currentProject: false },
        { name: 'Express.js', currentProject: false },
        { name: 'RESTful APIs', currentProject: false },
        { name: 'GraphQL', currentProject: false },
      ],
    },
    {
      category: 'Architecture',
      skills: [
        { name: 'Micro Frontend', currentProject: false },
        { name: 'Modular SPA Development', currentProject: false },
        { name: 'Performance Optimization', currentProject: false },
        { name: 'Single Page Applications (SPA)', currentProject: true }, // Highlighted for the current project
      ],
    },
    {
      category: 'State Management',
      skills: [
        { name: 'NgRx', currentProject: false },
        { name: 'Redux', currentProject: false },
        { name: 'Store Management', currentProject: false },
        { name: 'Lazy Loading', currentProject: false },
        { name: 'Vuex', currentProject: true }, // Highlighted for the current project
      ],
    },
    {
      category: 'Security & Authentication',
      skills: [
        { name: 'Role-Based Authorization', currentProject: false },
        { name: 'JWT', currentProject: false },
        { name: 'OAuth', currentProject: false },
      ],
    },
    {
      category: 'Testing & Debugging',
      skills: [
        { name: 'Jest', currentProject: false },
        { name: 'Karma', currentProject: false },
        { name: 'Jasmine', currentProject: false },
        { name: 'Cypress', currentProject: false },
        { name: 'ViteTest', currentProject: true }, // Highlighted for the current project
      ],
    },
    {
      category: 'CI/CD & DevOps',
      skills: [
        { name: 'AWS (EC2, S3, Lambda, Route 53)', currentProject: false },
        { name: 'Docker', currentProject: false },
        { name: 'Jenkins', currentProject: false },
        { name: 'GitHub Actions', currentProject: false },
        { name: 'GitHub Pages', currentProject: true }, // Highlighted for the current project
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Jira', currentProject: false },
        { name: 'Bitbucket', currentProject: false },
        { name: 'Figma', currentProject: false },
        { name: 'Splunk', currentProject: false },
        { name: 'GitHub', currentProject: false },
        { name: 'Vite', currentProject: true }, // Highlighted for the current project
      ],
    },
  ];
  
  module.exports = skills;