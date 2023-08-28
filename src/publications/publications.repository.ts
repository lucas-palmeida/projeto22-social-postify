import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";

@Injectable()
export class PublicationsRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreatePublicationDto) {
        return this.prisma.publication.create({
            data
        });
    }

    findAll() {
        return this.prisma.publication.findMany();
    }

    findPublished(currentDate: Date) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    lt: currentDate,
                },
            },
        });
    }
    
    findNotPublished(currentDate: Date) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    gt: currentDate,
                },
            },
        });
    }
    
    findPublishedAfterDate(currentDate: Date, afterDate: Date) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    gte: afterDate,
                    lt: currentDate,
                },
            },
        });
    }
    
    findNotPublishedAfterDate(latestDate: Date) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    gte: latestDate,
                },
            },
        });
    }

    findOne(id: number) {
        return this.prisma.publication.findFirst({
            where: { id },
        });
    }

    findOneByPostId(postId: number) {
        return this.prisma.publication.findFirst({
            where: {
                postId,
            }
        });
    }

    findOneByMediaId(mediaId: number) {
        return this.prisma.publication.findFirst({
            where: {
                mediaId,
            }
        });
    }

    update(id: number, data: CreatePublicationDto) {
        return this.prisma.publication.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.publication.delete({
            where: { id },
        });
    }
}