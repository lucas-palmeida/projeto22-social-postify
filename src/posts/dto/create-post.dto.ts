import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
    @IsString({
        message: "Title must be a string",
    })
    @IsNotEmpty({
        message: "Title is required",
    })
    title: string;

    @IsUrl()
    @IsNotEmpty({
        message: "Text is required",
    })
    text: string;

    @IsUrl()
    @IsOptional()
    image: string;
}
