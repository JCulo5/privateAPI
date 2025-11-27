import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { rm } from 'fs/promises';
import { join } from 'path';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Delete test database before each test
    try {
      await rm(join(__dirname, '..', 'db.test.sqlite'));
    } catch (err) {
      // Ignore if file doesn't exist
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles signup request', () => {
    const email = 'test1@example.com';

    return request(app.getHttpServer())
        .post('/auth/signup')
        .send({email, password: 'password'})
        .expect(201)
        .then((res)=>{
            const{id,email}=res.body;
            expect(id).toBeDefined();
            expect(email).toEqual(email);
        });
  });

  it('signup as a new user then get the currently logged in user',async()=>{
    const email='asdf@gmail.com';

    const res=await request(app.getHttpServer())
        .post('/auth/signup')
        .send({email, password: 'password'})
        .expect(201);

    const cookie=res.get('Set-Cookie');

    const {body}=await request(app.getHttpServer())
        .get('/auth/whoami')
        .set('Cookie', cookie)
        .expect(200)
        
        expect(body.email).toEqual(email);
  });

});
