import { Injectable } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/types/order';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private orderModule: Model<Order>
    ){}

    async createOrder(orderDto: orderDto){
        let order = await this.orderModule.findOne()
            .where({owner: orderDto.owner})
            .where({'product.product': orderDto.product.product})
        
        if(!order){
            order = new this.orderModule({
                owner: orderDto.owner,
                totalPrice: orderDto.totalPrice,
                product:[
                    orderDto.product
                ]
            })

            console.log({ ...orderDto.product })

            // console.log( this.orderModule )

            await order.save()
            return order
        }

        await order.updateOne({
            owner: orderDto.owner,
            totalPrice: orderDto.totalPrice,
            product:[
                orderDto.product
            ]
        })

        return order
    }
}
