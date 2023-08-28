import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasService } from 'src/medias/medias.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PublicationsService {
  constructor(
    @Inject(forwardRef(() => MediasService))
    private readonly mediasService: MediasService,
    private readonly publicationsRepository: PublicationsRepository,
    private readonly postsService: PostsService
    ) { }

  async create(publication: CreatePublicationDto) {
    const { mediaId, postId } = publication;

    await this.mediasService.findOne(mediaId);

    await this.postsService.findOne(postId);

    return await this.publicationsRepository.create(publication);
  }

  async findAll(published: string, after: string) {
    const currentDate = new Date();

    if (published === 'true' && after) {
      const afterDate = new Date(after);
      return this.publicationsRepository.findPublishedAfterDate(currentDate, afterDate);
    }

    if (published === 'true') {
      return this.publicationsRepository.findPublished(currentDate);
    }

    if (published === 'false' && after) {
      const afterDate = new Date(after);
      const latestDate = currentDate > afterDate ? currentDate : afterDate;
      
      return this.publicationsRepository.findNotPublishedAfterDate(latestDate);
    }

    if (published === 'false') {
      return this.publicationsRepository.findNotPublished(currentDate);
    }

    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    
    if(!publication) throw new NotFoundException(`Not found publication with id: ${id}`);

    return publication;
  }

  async findOneByPostId(id: number) {
    return await this.publicationsRepository.findOneByPostId(id);
  }

  async findOneByMediaId(id: number) {
    return await this.publicationsRepository.findOneByMediaId(id);
  }

  async update(id: number, updatePublication: CreatePublicationDto) {
    const { mediaId, postId } = updatePublication;
    
    const verifyPub = await this.publicationsRepository.findOne(id);

    if(!verifyPub) throw new NotFoundException(`Not found publication with id: ${id}`);

    const currentDate = new Date();
    const pudDate = new Date(verifyPub.date);

    if(pudDate < currentDate) throw new ForbiddenException(`Date must be greater than current date`);

    await this.mediasService.findOne(mediaId);

    await this.postsService.findOne(postId);
    
    return await this.publicationsRepository.update(id, updatePublication);
  }

  async remove(id: number) {
    const verifyPub = await this.publicationsRepository.findOne(id);

    if(!verifyPub) throw new NotFoundException(`Not found publication with id: ${id}`);

    return await this.publicationsRepository.remove(id);
  }
}
