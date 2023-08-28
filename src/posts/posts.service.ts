import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => PublicationsService))
    private readonly publicationsService: PublicationsService,
    private readonly postsRepository: PostsRepository
  ) { }
  
  async create(post: CreatePostDto) {
    return await this.postsRepository.create(post);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);

    if(!post) throw new NotFoundException(`Not found post with id: ${id}`);

    return post;
  }

  async update(id: number, updatePost: CreatePostDto) {
    const exists = await this.postsRepository.findOne(id);

    if(!exists) throw new NotFoundException(`Not found post with id: ${id}`);

    return await this.postsRepository.update(id, updatePost);
  }

  async remove(id: number) {
    await this.postsRepository.findOne(id);

    const publicationWithThisPost = await this.publicationsService.findOneByPostId(id);

    console.log(publicationWithThisPost);

    if(publicationWithThisPost) throw new ForbiddenException(`Cannot delete post with id: ${id} because it is used in publication with id: ${publicationWithThisPost.id}`);
    
    return await this.postsRepository.remove(id);
  }
}
