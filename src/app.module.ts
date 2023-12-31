import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './app/product.controller';
import { ProductService } from './domain/product.service';
import { MongoRepository } from './infrastructure/mongodb/mongoRepository';
import { Product, ProductSchema } from './domain/product.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          return ProductSchema;
        },
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [ProductController],
  providers: [
    ProductService, 
    MongoRepository
  ],
})
export class AppModule {}
