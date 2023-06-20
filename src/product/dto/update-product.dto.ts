import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    // @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    owner: string;  
}