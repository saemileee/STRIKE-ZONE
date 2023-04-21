import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/pages/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

viewsRouter.use('/', serveStatic('Main'));
viewsRouter.use('/login', serveStatic('Login'));
viewsRouter.use('/find-password', serveStatic('FindPassword'));
viewsRouter.use('/signup', serveStatic('SignUp'));
viewsRouter.use('/products', serveStatic('Products'));
viewsRouter.use('/products/:productId', serveStatic('ProductDetail'));
viewsRouter.use('/cart', serveStatic('Cart'));
viewsRouter.use('/order', serveStatic('Order'));
viewsRouter.use('/user', serveStatic('User'));
viewsRouter.use('/user/update', serveStatic('UserUpdate'));
viewsRouter.use('/user/delete', serveStatic('UserDelete'));
viewsRouter.use('/user/orders', serveStatic('OrderList'));
viewsRouter.use('/user/orders/:orderId', serveStatic('OrderComplete'));
viewsRouter.use('/NotFound', serveStatic('NotFound'));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.

export { viewsRouter };