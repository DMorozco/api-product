import { IsNumber, IsNotEmpty, IsAlphanumeric, IsString } from 'class-validator';

export class ProductInput {
  @IsNotEmpty()
  @IsAlphanumeric()
  public code: string;
  
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number;
}