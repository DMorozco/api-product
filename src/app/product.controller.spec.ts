import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../domain/product.service';
import { Product } from '../domain/product.model';
import { HttpStatus } from '@nestjs/common';
import { DeleteProductResponse, ProductResponse } from '../domain/product.response';
import { MongoRepository } from '../infrastructure/mongodb/mongoRepository';

describe('ProductController Unit testing', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, MongoRepository],
    }).compile();
    
    controller = app.get<ProductController>(ProductController);
  });

  describe('GIVEN a create request', () => {
    it('THEN should return a product', async () => {
      // arrange
      const product = new Product('code', 'product 1', 'desc product 1', 1);
      const expected = new ProductResponse(HttpStatus.CREATED, [product]);
      // act
      const result = await controller.createProduct(null);
      // assert
      expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
    });
  });

  describe('GIVEN a update request', () => {
    it('THEN should return a product', async () => {
      // arrange
      const product = new Product('code', 'product 1', 'desc product 1', 1);
      const expected = new ProductResponse(HttpStatus.OK, [product]);
      // act
      const result = await controller.updateProduct(null, 'id');
      // assert
      expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
    });
  });

  describe('GIVEN a delete request', () => {
    it('THEN should return success message', async () => {
      // arrange
      const product = new Product('code', 'product 1', 'desc product 1', 1);
      const expected = new DeleteProductResponse(HttpStatus.OK, 'product was deleted');
      // act
      const result = await controller.deleteProduct('id');
      // assert
      expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
    });

    describe('GIVEN a get by id request', () => {
      it('THEN should return a product', async () => {
        // arrange
        const product = new Product('code', 'product 1', 'desc product 1', 1);
        const expected = new ProductResponse(HttpStatus.OK, [product]);
        // act
        const result = await controller.getProductById('id');
        // assert
        expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
      });

      describe('GIVEN a get all request', () => {
        it('THEN should return two products', async () => {
          // arrange
          const product = new Product('code', 'product 1', 'desc product 1', 1);
          const expected = new ProductResponse(HttpStatus.OK, [product, product, product]);
          // act
          const result = await controller.getAllProducts();
          // assert
          expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
        });
      });
    });
  });
});
