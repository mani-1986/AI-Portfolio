module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Ensure compatibility with your Node.js version
        },
        modules: 'auto', // Automatically handle ES6 modules
      },
    ],
  ],
};