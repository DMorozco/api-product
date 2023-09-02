import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../domain/product.service';
import { Product } from '../domain/product.model';
import { HttpStatus } from '@nestjs/common';
import { DeleteProductResponse, ProductResponse } from '../domain/product.response';
import { MongoRepository } from '../infrastructure/mongodb/mongoRepository';
import { getModelToken } from '@nestjs/mongoose';
import { ProductInput } from './product.dto';

describe('ProductController Unit testing', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        MongoRepository,
        {
          provide: getModelToken(Product.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  });

  describe('GIVEN a create request', () => {
    it('THEN should return a product', async () => {
      // Arrange
      const mockProductInput: ProductInput = {
        code: 'code',
        name: 'product 1',
        description: 'desc product 1',
        price: 1
      };

      const mockProduct = new Product('code', 'product 1', 'desc product 1', 1);
      const expected = new ProductResponse(HttpStatus.CREATED, [mockProduct]);

      const createSpy = jest.spyOn(productService, 'saveProduct').mockResolvedValue(expected);

      // Act
      const result = await controller.createProduct(mockProductInput);

      // Assert
      expect(createSpy).toHaveBeenCalledWith(mockProductInput);
      expect(result).toEqual(expected);
    });
  });

  describe('GIVEN a update request', () => {
    it('THEN should return a product', async () => {
      // Arrange
      const mockProductInput: ProductInput = {
        code: 'code',
        name: 'product 1',
        description: 'desc product 1',
        price: 1
      };

      const mockProduct = new Product('code', 'product 1', 'desc product 1', 1);
      const expected = new ProductResponse(HttpStatus.OK, [mockProduct]);

      const updateSpy = jest.spyOn(productService, 'updateProduct').mockResolvedValue(expected);

      // Act
      const result = await controller.updateProduct(mockProductInput, 'id');

      // Assert
      expect(updateSpy).toHaveBeenCalledWith(mockProductInput, 'id');
      expect(result).toEqual(expected);
    });
  });

  describe('GIVEN a delete request', () => {
    it('THEN should return success message', async () => {
      // Arrange
      const expected = new DeleteProductResponse(HttpStatus.OK, 'product was deleted');

      const deleteSpy = jest.spyOn(productService, 'deleteProduct').mockResolvedValue(expected);

      // Act
      const result = await controller.deleteProduct('id');

      // Assert
      expect(deleteSpy).toHaveBeenCalledWith('id');
      expect(result).toEqual(expected);
    });

    describe('GIVEN a get by id request', () => {
      it('THEN should return a product', async () => {
        // Arrange
        const mockProduct = new Product('code', 'product 1', 'desc product 1', 1);
        const expected = new ProductResponse(HttpStatus.OK, [mockProduct]);

        const getSpy = jest.spyOn(productService, 'getProductById').mockResolvedValue(expected);

        // Act
        const result = await controller.getProductById('id');

        // Assert
        expect(getSpy).toHaveBeenCalledWith('id');
        expect(result).toEqual(expected);
      });

      describe('GIVEN a get all request', () => {
        it('THEN should return two products', async () => {
          // Arrange
          const mockProduct = new Product('code', 'product 1', 'desc product 1', 1);
          const expected = new ProductResponse(HttpStatus.OK, [mockProduct, mockProduct, mockProduct]);

          const getAllSpy = jest.spyOn(productService, 'getAllProducts').mockResolvedValue(expected);

          // Act
          const result = await controller.getAllProducts();

          // Assert
          expect(getAllSpy).toHaveBeenCalledWith();
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
