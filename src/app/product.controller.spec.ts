import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../domain/product.service';
import { Product } from '../domain/product.model';
import { HttpStatus } from '@nestjs/common';
import { ProductResponse } from '../domain/product.response';
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
      const product = new Product('id', 'code', 'product 1', 'desc product 1', 1);
      const expected = new ProductResponse(HttpStatus.CREATED, [product]);
      // act
      const result = await controller.createProduct(null);
      // assert
      expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
    });
  });
});
