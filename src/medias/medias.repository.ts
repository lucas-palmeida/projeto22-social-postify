import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";

@Injectable()
export class MediasRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateMediaDto) {    
        return this.prisma.media.create({data});
    }

    findAll() {
        return this.prisma.media.findMany();
    }

    findOne(id: number) {
        return this.prisma.media.findFirst({
            where: { id }
        });
    }

    findOneByTitleAndUsername(title: string, username: string) {
        return this.prisma.media.findFirst({
            where: { title, username }
        });
    }

    update(id: number, data: CreateMediaDto) {
        return this.prisma.media.update({
            where: { id },
            data
        });
    }

    remove(id: number) {
        return this.prisma.media.delete({
            where: { id }
        });
    }
}