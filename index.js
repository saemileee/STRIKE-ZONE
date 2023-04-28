import { app } from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버 시작:  http://localhost:${PORT}`);
});
