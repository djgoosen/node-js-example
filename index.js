const { createApp } = require('./src/app');

const port = Number(process.env.PORT || 3000);
const app = createApp();

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

module.exports = { app };
