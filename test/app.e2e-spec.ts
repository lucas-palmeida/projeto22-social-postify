import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await prisma.publication.deleteMany();
    await prisma.post.deleteMany();
    await prisma.media.deleteMany();

    await app.init();
  });

  it('/health => should get an alive message', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });

  it('/medias (GET) => should get all medias', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/medias',
    );

    expect(statusCode).toBe(HttpStatus.OK);

    expect(body).toEqual([]);
  });

  it('/posts (GET) => should get all posts', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/posts',
    );

    expect(statusCode).toBe(HttpStatus.OK);

    expect(body).toEqual([]);
  });

  it('/publications (GET) => should get all publications', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/publications',
    );

    expect(statusCode).toBe(HttpStatus.OK);

    expect(body).toEqual([]);
  });
});
