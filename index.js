import app from './src/app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`서버 시작:  http://localhost:${PORT}`);
});
