import { Injectable } from '@nestjs/common';
import { HtmlToPdfService } from './html-to-pdf.service';
import { MarkdownToPdfService } from './markdown-to-pdf.service';
import { PDFGenerationOptions, PDFResult } from '../interfaces/pdf.types';

@Injectable()
export class PdfService {
	constructor(
		private readonly htmlToPdfService: HtmlToPdfService,
		private readonly markdownToPdfService: MarkdownToPdfService
	) {}

	async generateFromHtml(
		html: string,
		options: PDFGenerationOptions = {}
	): Promise<PDFResult> {
		return this.htmlToPdfService.convertHtmlToPdf(html, options);
	}

	async generateFromMarkdown(
		markdown: string,
		options: PDFGenerationOptions = {}
	): Promise<PDFResult> {
		return this.markdownToPdfService.convertMarkdownToPdf(markdown, options);
	}
}
