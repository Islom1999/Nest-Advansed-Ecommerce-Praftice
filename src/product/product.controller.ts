import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editedFileName } from 'src/utils/file-helper';
import { AuthGuard } from '@nestjs/passport';
import { QueryProductDto } from './dto/query.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName
      })
    })  
  )
  async create(
    @Body() ProductDto: CreateProductDto, 
    @UploadedFile() image: Express.Multer.File
  ){
    return await this.productService.create(ProductDto, image);
  }

  @Get()
  async findAll(@Query() query: QueryProductDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName
      })
    })  
  )
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto, 
    @UploadedFile() image: Express.Multer.File
  ){
    return this.productService.update(id, updateProductDto, image);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
