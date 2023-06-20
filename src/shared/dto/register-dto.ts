import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    region: string;

    @ApiProperty({required:false})
    @IsString()
    @IsNotEmpty()
    @IsOptional()      // ixtiyoriy qator
    district: string;
}