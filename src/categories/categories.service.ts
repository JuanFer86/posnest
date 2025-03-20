import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    // use this way for make validations
    // const category = new Category();
    // category.name = createCategoryDto.name;
    // return this.categoryRepository.save(category);
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      // throw new HttpException("The Category doesn't exist", 404);
      throw new NotFoundException("The Category doesn't exist");
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // this.findOne makes reference to findOne method in this service, is up to this
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    // await this.categoryRepository.delete({ id: category.id }); // not return deleted data
    await this.categoryRepository.remove(category); // return data deleted
    return 'Category deleted';
  }
}
