// vite.config.js
export default {
  base: '/', // Adjust this if your project is deployed in a sub-path
  build: {
    rollupOptions: {
      input: 'index.html', // Ensure Vite knows your entry file
    }
  }
};
