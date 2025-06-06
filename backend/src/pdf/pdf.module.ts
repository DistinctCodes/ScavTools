import { Module } from '@nestjs/common';
import { MarkdownToPdfService } from './services/markdown-to-pdf.service';
import { PdfController } from './controllers/pdf.controller';
import { PdfService } from './services/pdf.service';
import { HtmlToPdfService } from './services/html-to-pdf.service';
import { AuthModule } from './../userAuth/auth.module';

@Module({
	imports: [AuthModule],
	controllers: [PdfController],
	providers: [PdfService, HtmlToPdfService, MarkdownToPdfService],
	exports: [PdfService],
})
export class PdfModule {}
