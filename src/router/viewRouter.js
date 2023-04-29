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
viewsRouter.use('/login/auth', serveStatic('EmailAuth'));
viewsRouter.use('/find-password', serveStatic('FindPassword'));
viewsRouter.use('/find-password/reset', serveStatic('PasswordReset'));
viewsRouter.use('/signup', serveStatic('SignUp'));
viewsRouter.use('/products', serveStatic('Products'));
viewsRouter.use('/products/:productId', serveStatic('ProductDetail'));
viewsRouter.use('/cart', serveStatic('Cart'));
viewsRouter.use('/order', serveStatic('Order'));
viewsRouter.use('/order/complete', serveStatic('OrderComplete'));
viewsRouter.use('/user/mypage', serveStatic('User'));
viewsRouter.use('/user/update', serveStatic('UserUpdate'));
viewsRouter.use('/user/delete', serveStatic('UserDelete'));
viewsRouter.use('/user/orders', serveStatic('Orders'));
viewsRouter.use('/user/orders/:orderId', serveStatic('OrderDetail'));
viewsRouter.use('/admin/login', serveStatic('AdminLogin'));
viewsRouter.use('/admin/user-management', serveStatic('AdminUser'));
viewsRouter.use('/admin/user-management/:email', serveStatic('AdminUserDetail'));
viewsRouter.use('/admin/product-management', serveStatic('AdminProduct'));
viewsRouter.use('/admin/product-management/post', serveStatic('AdminPostProduct'));
viewsRouter.use('/admin/product-management/:productId', serveStatic('AdminEditProduct'));
viewsRouter.use('/admin/order-management', serveStatic('AdminOrder'));
viewsRouter.use('/admin/order-management/:orderId', serveStatic('AdminOrderDetail'));
viewsRouter.use('/admin/team-management', serveStatic('AdminTeam'));
viewsRouter.use('/admin/category-management', serveStatic('AdminCategory'));
viewsRouter.use('/NotFound', serveStatic('NotFound'));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.

export { viewsRouter };
