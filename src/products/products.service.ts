import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      let errors: string[] = [];
      errors.push('Category not exists');
      throw new NotFoundException(errors);
    }

    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(categoryId: number, take: number, skip: number) {
    // return this.productRepository.find({
    //   relations: {
    //     // bring the data from category
    //     category: true,
    //   },
    //   order: {
    //     id: 'DESC',
    //     // inventory: 'DESC',
    //   },
    //   // loadEagerRelations: false, // disabled eager for not bring relations data when have an eager in the entity
    // });

    const [products, total] = await this.productRepository.findAndCount({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });

    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} was not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      });

      if (!category) {
        let errors: string[] = [];
        errors.push('Category not exists');
        throw new NotFoundException(errors);
      }

      // update relation category
      product.category = category;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return `Product with id: ${id} was removed`;
  }
}
