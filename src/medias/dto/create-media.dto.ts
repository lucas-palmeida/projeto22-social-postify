import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @IsString({
        message: "Title must be a string",
    })
    @IsNotEmpty({
        message: "Title is required",
    })
    title: string;

    @IsString({
        message: "Username must be a string",
    })
    @IsNotEmpty({
        message: "Title is required",
    })
    username: string;
}
