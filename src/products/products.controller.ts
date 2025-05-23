import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from '../upload-image/upload-image.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly UploadImageService: UploadImageService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  // findAll(@Query('category_id') categoryId: string) {
  findAll(@Query() query: GetProductsQueryDto) {
    const category = query.category_id;
    const take = query.take ? query.take : 10;
    const skip = query.skip ? query.skip : 0;

    return this.productsService.findAll(category, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.UploadImageService.uploadFile(file);
  }
}
