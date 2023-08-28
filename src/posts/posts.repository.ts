import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreatePostDto) {
        return this.prisma.post.create({
            data
        });
    }

    findAll() {
        return this.prisma.post.findMany();
    }

    findOne(id: number) {
        return this.prisma.post.findFirst({
            where: { id },
        });
    }

    update(id: number, data: CreatePostDto) {
        return this.prisma.post.update({
            where: { id },
            data
        });
    }

    remove(id: number) {
        return this.prisma.post.delete({
            where: { id },
        })
    }
}