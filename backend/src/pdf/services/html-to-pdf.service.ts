import { Injectable, Logger } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { PDFGenerationOptions, PDFResult } from '../interfaces/pdf.types';

@Injectable()
export class HtmlToPdfService {
	private readonly logger = new Logger(HtmlToPdfService.name);
	private browser: Browser | null = null;

	async onModuleInit() {
		await this.initBrowser();
	}

	async onModuleDestroy() {
		await this.closeBrowser();
	}

	private async initBrowser(): Promise<void> {
		try {
			this.browser = await puppeteer.launch({
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-gpu',
					'--disable-web-security',
					'--disable-features=VizDisplayCompositor',
				],
			});
			this.logger.log('Puppeteer browser initialized');
		} catch (error) {
			this.logger.error('Failed to initialize browser', error);
			throw error;
		}
	}

	private async closeBrowser(): Promise<void> {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
			this.logger.log('Puppeteer browser closed');
		}
	}

	async convertHtmlToPdf(
		html: string,
		options: PDFGenerationOptions = {}
	): Promise<PDFResult> {
		const startTime = Date.now();

		if (!this.browser) {
			await this.initBrowser();
		}

		let page: Page | null = null;

		try {
			page = await this.browser!.newPage();

			// Set timeout
			page.setDefaultTimeout(options.timeout || 30000);

			// Inject custom CSS if provided
			if (options.css && options.css.length > 0) {
				for (const cssUrl of options.css) {
					await page.addStyleTag({ url: cssUrl });
				}
			}

			// Set content with error handling for malformed HTML
			try {
				await page.setContent(this.sanitizeHtml(html), {
					waitUntil: ['networkidle2', 'domcontentloaded'],
					timeout: options.timeout || 30000,
				});
			} catch (error) {
				throw new Error(`Failed to load HTML content: ${error.message}`);
			}

			// Generate PDF
			const pdfBuffer = await page.pdf({
				format: options.format || 'A4',
				landscape: options.orientation === 'landscape',
				margin: {
					top: options.margins?.top || '1cm',
					right: options.margins?.right || '1cm',
					bottom: options.margins?.bottom || '1cm',
					left: options.margins?.left || '1cm',
				},
				headerTemplate: options.header || '',
				footerTemplate: options.footer || '',
				displayHeaderFooter: !!(options.header || options.footer),
				scale: options.scale || 1,
				printBackground: true,
			});

			const generationTime = Date.now() - startTime;

			// Get page count (approximate)
			const pages = await this.estimatePageCount(page, options);

			return {
				buffer: Buffer.from(pdfBuffer),
				metadata: {
					pages,
					size: pdfBuffer.length,
					generationTime,
				},
			};
		} catch (error) {
			this.logger.error('PDF generation failed', error);
			throw new Error(`PDF generation failed: ${error.message}`);
		} finally {
			if (page) {
				await page.close();
			}
		}
	}

	private sanitizeHtml(html: string): string {
		try {
			// Basic HTML structure validation and wrapping
			const trimmedHtml = html.trim();

			if (!trimmedHtml.toLowerCase().includes('<html')) {
				return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
                h1, h2, h3, h4, h5, h6 { margin-top: 0; }
                img { max-width: 100%; height: auto; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
                code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
              </style>
            </head>
            <body>
              ${trimmedHtml}
            </body>
          </html>
        `;
			}

			return trimmedHtml;
		} catch (error) {
			throw new Error(`HTML sanitization failed: ${error.message}`);
		}
	}

	private async estimatePageCount(
		page: Page,
		options: PDFGenerationOptions
	): Promise<number> {
		try {
			const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
			const format = options.format || 'A4';

			// Approximate page heights in pixels (at 96 DPI)
			const pageHeights = {
				A4: 1123, // 297mm
				A3: 1587, // 420mm
				Letter: 1056, // 11 inches
				Legal: 1344, // 14 inches
			};

			const pageHeight = pageHeights[format] || pageHeights.A4;
			return Math.ceil(bodyHeight / pageHeight);
		} catch {
			return 1; // Default fallback
		}
	}
}
