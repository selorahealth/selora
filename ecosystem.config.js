module.exports = {
  apps: [
    {
      name: 'selora-health',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // Runs as many instances as there are CPU cores
      exec_mode: 'cluster', // Enables clustering for load balancing
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
