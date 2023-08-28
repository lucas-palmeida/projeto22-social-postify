import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreatePublicationDto {
    @IsInt({
        message: "mediaId must be an integer number",
    })
    @IsNotEmpty({
        message: "mediaId is required",
    })
    mediaId: number;

    @IsInt({
        message: "mediaId must be an integer number",
    })
    @IsNotEmpty({
        message: "mediaId is required",
    })
    postId: number;
    
    @IsDateString()    
    @IsNotEmpty({
        message: "date is required",
    })
    date: string;
}
