import { productService } from '../services';

/**
 * controller 함수(a.k.a. request handler)들을 모아놓은 객체
 * Presentation layer에 속하며, 바로 밑에 계층인 Business layer에 있는 service 객체를 불러서 비즈니스 로직을 수행하게 한다.
 * input 검증, 방어, 기타 비즈니스 로직이 수행되기 전에 진행되어야할 로직들을 수행한다. 물론 이 부분은 별도의 middleware로 분리하는 경우가 많다.
 * 보통은 request에서 매개변수들(params, query, body, headers)을 꺼내서 service 객체에게 넘겨주는 작업만을 수행한다(검증 부분은 미들웨어가 하기 때문에).
 * 그리고 service 객체에게로 부터 반환받은 값(DTO)을 최종적으로 client에게 응답으로 보내주는 역할을 담당한다.
 * 때로는 응답을 보내기전 응답에 담을 데이터를 한 번 검증하고 보내는 경우도 많다.
 */

const productController = {
  async getProducts(request, response, next) {
    try {
      const products = await productService.getProducts();

      response
        .status(201)
        .json(products);
    } catch (error) {
      next(error);
    }
  },

  async getProduct(request, response, next) {
    try {
      const { productId } = request.params;

      const product = await productService.getProduct(productId);

      response
        .status(201)
        .json(product);
    } catch (error) {
      next(error);
    }
  },

  async addProduct(request, response, next) {
    const {
      productId, title, quantity, price, shortDescription, detailDescription, image,
    } = request.body;

    try {
      await productService.addProduct({
        productId, title, quantity, price, shortDescription, detailDescription, image,
      });

      response
        .status(201)
        .json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(request, response, next) {
    const { productId } = request.params;
    const {
      title, quantity, price, shortDescription, detailDescription, image,
    } = request.body;

    const updateInfo = {
      title, quantity, price, shortDescription, detailDescription, image,
    };

    try {
      await productService.updateProductById(productId, updateInfo);

      response
        .status(201)
        .json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(request, response, next) {
    const { productId } = request.params;

    try {
      const product = await productService.getProduct(productId);

      if (!product || product.length === 0) {
        throw new Error('삭제하려는 상품 정보가 존재하지 않습니다.');
      }

      await productService.deleteProductById(productId);

      response
        .status(201)
        .json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

};

export { productController };
