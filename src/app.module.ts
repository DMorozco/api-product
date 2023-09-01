import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './domain/product.service';
import { ProductController } from './app/product.controller';
import { MongoRepository } from './infrastructure/mongodb/mongoRepository';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [
    AppService, 
    ProductService, 
    MongoRepository
  ],
})
export class AppModule {}
