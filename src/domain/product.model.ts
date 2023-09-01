export class Product {
  private id: string;
  private code: string;
  private name: string;
  private description: string;
  private price: number;

  constructor(id: string, code: string, name: string, description: string, price: number) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this. price = price;
  }

  public get Id() {
    return this.id;
  }

  public get Code() {
    return this.code;
  }

  public get Name() {
    return this.name;
  }

  public get Description() {
    return this.description;
  }

  public get Price() {
    return this.price;
  }
}