import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  
  constructor(private readonly repository: MediasRepository) {}

  async create(body: CreateMediaDto) {
    const verifyDuplicity = await this.findOneByTitleAndUsername(body.title, body.username);
    
    if(verifyDuplicity) throw new HttpException('Media with this title and username already exists', HttpStatus.CONFLICT);

    return await this.repository.create(body);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const media = await this.repository.findOne(id);

    if(!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);

    return media;
  }

  async findOneByTitleAndUsername(title: string, username: string) {
    return await this.repository.findOneByTitleAndUsername(title, username);
  }

  async update(id: number, body: CreateMediaDto) {
    const exists = await this.repository.findOne(id);

    if(!exists) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);

    const verifyDuplicity = await this.findOneByTitleAndUsername(body.title, body.username);

    if(verifyDuplicity) throw new HttpException('Media with this title and username already exists', HttpStatus.CONFLICT);
    
    return await this.repository.update(id, body);
  }

  async remove(id: number) {
    const exists = await this.repository.findOne(id);

    if(!exists) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    
    return await this.repository.remove(id);
  }
}
