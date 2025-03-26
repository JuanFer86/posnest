import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { categories } from './data/categories';
import { products } from './data/products';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const connection = this.dataSource;
    await connection.dropDatabase();
    await connection.synchronize();
  }

  async seed() {
    console.log(
      'y yo estoy aquiiii',
      this.categoryRepository.manager.connection.isInitialized,
    );
    await this.categoryRepository.save(categories);

    for await (const seedProduct of products) {
      const category = await this.categoryRepository.findOneBy({
        id: seedProduct.categoryId,
      });

      const product = new Product();
      product.name = seedProduct.name;
      product.image = seedProduct.image;
      product.price = seedProduct.price;
      product.inventory = seedProduct.inventory;
      product.category = category as Category;

      await this.productRepository.save(product);
    }
  }
}
