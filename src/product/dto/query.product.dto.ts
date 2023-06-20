import {ApiProperty } from '@nestjs/swagger'

export class QueryProductDto{
    @ApiProperty({
        type: String,
        description: "To search products by title",
        required: false
    })
    search: string

    @ApiProperty({
        type: Number,
        description: "Current page",
        required: false
    })
    page: number

    @ApiProperty({
        type: Number,
        description: "Limit products",
        required: false
    })
    limit: number
}