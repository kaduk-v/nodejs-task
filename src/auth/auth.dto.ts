import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
    @ApiProperty({
        type: String,
        required: true,
        minLength: 4,
        maxLength: 80,
        description: 'User name',
        example: 'Maria',
    })
    @Length(4, 80)
    @IsString()
    readonly username: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User password',
        example: 'ILoveCrypto69',
    })
    @IsString()
    readonly password: string;
}

export class SignedInDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'User access JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJpYS5tYW5hZ2VyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTWFyaWEiLCJpZCI6MSwiaFF0IjoxNjkzNjEzMjQ3LCJleHAiOjE2OTM6NzI0NDd9.wSCoxfaUJzLPXCA2uUvlDWPlESZEVQivwzXJc5n_IOA',
    })
    @IsString()
    readonly accessToken: string;
}

export class CreateUserDto {
    @ApiProperty({
        type: String,
        required: true,
        minLength: 4,
        maxLength: 80,
        description: 'User name',
        example: 'Maria',
    })
    @Length(4, 80)
    @IsString()
    readonly username: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User email',
        example: 'maria.manager@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User password',
        example: 'ILoveCrypto69',
    })
    @IsNotEmpty()
    readonly password: string;
}
