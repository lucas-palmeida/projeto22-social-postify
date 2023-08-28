import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.repository';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class MediasService {
  
  constructor(
    @Inject(forwardRef(() => PublicationsService))
    private readonly publicationsService: PublicationsService,
    private readonly mediasRepository: MediasRepository
    ) {}

  async create(body: CreateMediaDto) {
    const verifyDuplicity = await this.findOneByTitleAndUsername(body.title, body.username);
    
    if(verifyDuplicity) throw new ConflictException('Media with this title and username already exists');

    return await this.mediasRepository.create(body);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findOne(id);

    if(!media) throw new NotFoundException('Media not found');

    return media;
  }

  async findOneByTitleAndUsername(title: string, username: string) {
    return await this.mediasRepository.findOneByTitleAndUsername(title, username);
  }

  async update(id: number, body: CreateMediaDto) {
    const exists = await this.mediasRepository.findOne(id);

    if(!exists) throw new NotFoundException('Media not found');

    const verifyDuplicity = await this.findOneByTitleAndUsername(body.title, body.username);

    if(verifyDuplicity) throw new ConflictException('Media with this title and username already exists');
    
    return await this.mediasRepository.update(id, body);
  }

  async remove(id: number) {
    const exists = await this.mediasRepository.findOne(id);

    if(!exists) throw new NotFoundException('Media not found');
    
    const publicationWithThisMedia = await this.publicationsService.findOneByMediaId(id);

    if(publicationWithThisMedia) throw new ForbiddenException(`Cannot delete media with id: ${id} because it is used in publication with id: ${publicationWithThisMedia.id}`);

    return await this.mediasRepository.remove(id);
  }
}
