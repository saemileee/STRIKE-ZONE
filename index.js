import app from './src/app.js';

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`서버 시작:  http://localhost:${PORT}`);
});
