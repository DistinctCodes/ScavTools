import {
	Controller,
	Post,
	Body,
	Res,
	HttpStatus,
	Logger,
	ValidationPipe,
	UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from '../services/pdf.service';
import { GeneratePdfDto } from '../dto/generate-pdf.dto';

@Controller('pdf')
export class PdfController {
	private readonly logger = new Logger(PdfController.name);

	constructor(private readonly pdfService: PdfService) {}

	@Post('generate')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async generatePdf(
		@Body() generatePdfDto: GeneratePdfDto,
		@Res() res: Response
	) {
		try {
			// Validate that exactly one field is provided
			generatePdfDto.validate();

			let result;
			const startTime = Date.now();

			if (generatePdfDto.html) {
				this.logger.log('Generating PDF from HTML');
				result = await this.pdfService.generateFromHtml(generatePdfDto.html);
			} else if (generatePdfDto.markdown) {
				this.logger.log('Generating PDF from Markdown');
				result = await this.pdfService.generateFromMarkdown(
					generatePdfDto.markdown
				);
			}

			const totalTime = Date.now() - startTime;

			this.logger.log(
				`PDF generated successfully - Size: ${result.metadata.size} bytes, ` +
					`Pages: ${result.metadata.pages}, Time: ${totalTime}ms`
			);

			// Set response headers
			res.set({
				'Content-Type': 'application/pdf',
				'Content-Length': result.metadata.size.toString(),
				'Content-Disposition': 'inline; filename="document.pdf"',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'X-PDF-Pages': result.metadata.pages.toString(),
				'X-Generation-Time': result.metadata.generationTime.toString(),
			});

			res.status(HttpStatus.OK).send(result.buffer);
		} catch (error) {
			this.logger.error('PDF generation failed', error.stack);

			if (
				error.message.includes('required') ||
				error.message.includes('Provide either')
			) {
				res.status(HttpStatus.BAD_REQUEST).json({
					error: 'Validation failed',
					message: error.message,
					statusCode: HttpStatus.BAD_REQUEST,
				});
			} else if (
				error.message.includes('parsing') ||
				error.message.includes('sanitization')
			) {
				res.status(HttpStatus.BAD_REQUEST).json({
					error: 'Input processing failed',
					message: error.message,
					statusCode: HttpStatus.BAD_REQUEST,
				});
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					error: 'PDF generation failed',
					message: 'An internal server error occurred during PDF generation',
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				});
			}
		}
	}
}
