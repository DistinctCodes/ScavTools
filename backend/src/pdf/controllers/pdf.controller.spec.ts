import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { PdfModule } from '../pdf.module';
import { JwtAuthGuard } from 'src/userAuth/guards/jwt-auth.guard';
import { PdfService } from '../services/pdf.service';

// Mock PdfService for isolation
describe('PDF Generator Auth (e2e)', () => {
  let app: INestApplication;
  let pdfService = { generateFromHtml: jest.fn(), generateFromMarkdown: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PdfModule],
    })
      .overrideProvider(PdfService)
      .useValue(pdfService)
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: (ctx) => { 
        const req = ctx.switchToHttp().getRequest();
        // Simulate valid token if header present
        if (req.headers['authorization'] === 'Bearer validtoken') return true;
        throw { status: 401, response: { message: 'Unauthorized' } };
      }})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should reject requests without Authorization header', async () => {
    const res = await request(app.getHttpServer())
      .post('/pdf/generate')
      .send({ html: '<h1>Test</h1>' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should reject requests with invalid token', async () => {
    const res = await request(app.getHttpServer())
      .post('/pdf/generate')
      .set('Authorization', 'Bearer invalidtoken')
      .send({ html: '<h1>Test</h1>' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should allow requests with valid token', async () => {
    pdfService.generateFromHtml.mockResolvedValue({ metadata: { size: 123, pages: 1 }, buffer: Buffer.from('PDF') });
    const res = await request(app.getHttpServer())
      .post('/pdf/generate')
      .set('Authorization', 'Bearer validtoken')
      .send({ html: '<h1>Test</h1>' });
    expect(res.status).not.toBe(401);
    expect(res.body).not.toHaveProperty('message', 'Unauthorized');
  });
});
