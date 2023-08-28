import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() body: CreatePublicationDto) {
    return await this.publicationsService.create(body);
  }

  @Get()
  async findAll(@Query('published') published: string, @Query('after') after: string) {
    return await this.publicationsService.findAll(published, after);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.publicationsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: CreatePublicationDto) {
    return await this.publicationsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.publicationsService.remove(id);
  }
}
