import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class Product {
    @ApiProperty({
        type: String,
        description: "Id of the product",
    })
    @IsString()
    @IsNotEmpty()
    product: string;

    @ApiProperty({
        type: Number,
        description: "Quantity of the product",
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class orderDto{
    @ApiProperty({
        type: String,
        description: "Owner Id"
    })
    @IsString()
    @IsNotEmpty()
    owner: string;

    @ApiProperty({
        type: String,
        description: "Total Price of purchased products"
    })
    @IsString()
    @IsNotEmpty()
    totalPrice: string;

    @ApiProperty({
        type: Product,
        description: "Purchase Product"
    })
    @ValidateNested()
    @Type(() => Product)
    product: Product;
}
