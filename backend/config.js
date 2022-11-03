module.exports = {
  apps: [
    {
      name: "md_task",
      script: "./server.js",
      watch: true,
      env: {
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASS: "password",
        DB: "form",
        PORT: "5000",
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASS: "password",
        DB: "form",
        PORT: "5000",
      },
    },
  ],
};