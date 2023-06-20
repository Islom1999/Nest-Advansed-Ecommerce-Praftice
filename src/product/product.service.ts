import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, Query } from 'mongoose';
import { Product } from 'src/types/product';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { QueryProductDto } from './dto/query.product.dto';


@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private productModule: Model<Product>
  ) {}

  async create(ProductDto: CreateProductDto, image: Express.Multer.File) {
    ProductDto.image = image.filename;
    return await this.productModule.create(ProductDto);
  }

  async findAll(query: QueryProductDto) {
    const queryObject = query.search ? {
      title: { 
        $regex: query.search,
        $options: 'i'
      }
    } : {}

    const limit = Number(query.limit || 12)
    const skip = Number((query.page || 1) - 1) * limit

    return await this.productModule.find(queryObject)
      .limit(limit)
      .skip(skip);
  }

  async findOne(id: string) {
    return await this.productModule.findOne({ _id: id });
  }

  async update(id: string, updateProductDto: UpdateProductDto, image: Express.Multer.File) {
    const product = await this.productModule.findOne({ _id: id })
    if(image){
      fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
        // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND); 
      })
      updateProductDto.image = image.filename;
      return await this.productModule.updateOne({_id: id}, updateProductDto);
    }
    return await this.productModule.updateOne({_id: id}, updateProductDto);
  }

  async remove(id: string) {
    try {
      
    } catch (error) {
      console.log(error);
    }
    const product = await this.productModule.findOne({ _id: id })
    fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
      // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND); 
    })
      
    return await this.productModule.deleteOne({_id: id});
  }
}
