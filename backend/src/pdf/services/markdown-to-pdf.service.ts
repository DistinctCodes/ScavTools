import { Injectable, Logger } from '@nestjs/common';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { HtmlToPdfService } from './html-to-pdf.service';
import { PDFGenerationOptions, PDFResult } from '../interfaces/pdf.types';

@Injectable()
export class MarkdownToPdfService {
	private readonly logger = new Logger(MarkdownToPdfService.name);
	private readonly md: MarkdownIt;

	constructor(private readonly htmlToPdfService: HtmlToPdfService) {
		this.md = new MarkdownIt({
			html: true,
			linkify: true,
			typographer: true,
			highlight: (str, lang) => {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(str, { language: lang }).value;
					} catch {}
				}
				return '';
			},
		});
	}

	async convertMarkdownToPdf(
		markdown: string,
		options: PDFGenerationOptions = {}
	): Promise<PDFResult> {
		try {
			const html = this.convertMarkdownToHtml(markdown);
			return await this.htmlToPdfService.convertHtmlToPdf(html, options);
		} catch (error) {
			this.logger.error('Markdown to PDF conversion failed', error);
			throw new Error(`Markdown conversion failed: ${error.message}`);
		}
	}

	private convertMarkdownToHtml(markdown: string): string {
		try {
			const htmlContent = this.md.render(markdown);

			return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
              }
              
              h1, h2, h3, h4, h5, h6 {
                margin-top: 24px;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
              }
              
              h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 10px; }
              h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 8px; }
              h3 { font-size: 1.25em; }
              
              p { margin-bottom: 16px; }
              
              ul, ol {
                margin-bottom: 16px;
                padding-left: 30px;
              }
              
              li { margin-bottom: 4px; }
              
              blockquote {
                margin: 16px 0;
                padding: 0 16px;
                color: #6a737d;
                border-left: 4px solid #dfe2e5;
              }
              
              code {
                background: #f6f8fa;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
                font-size: 85%;
              }
              
              pre {
                background: #f6f8fa;
                padding: 16px;
                border-radius: 6px;
                overflow-x: auto;
                margin-bottom: 16px;
              }
              
              pre code {
                background: none;
                padding: 0;
                font-size: 100%;
              }
              
              table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 16px;
              }
              
              th, td {
                border: 1px solid #dfe2e5;
                padding: 8px 12px;
                text-align: left;
              }
              
              th {
                background: #f6f8fa;
                font-weight: 600;
              }
              
              img {
                max-width: 100%;
                height: auto;
                border-radius: 6px;
              }
              
              a {
                color: #0366d6;
                text-decoration: none;
              }
              
              a:hover {
                text-decoration: underline;
              }
              
              /* Syntax highlighting */
              .hljs {
                background: #f6f8fa;
                color: #24292e;
              }
              
              .hljs-comment { color: #6a737d; }
              .hljs-keyword { color: #d73a49; }
              .hljs-string { color: #032f62; }
              .hljs-number { color: #005cc5; }
              .hljs-function { color: #6f42c1; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
		} catch (error) {
			throw new Error(`Markdown parsing failed: ${error.message}`);
		}
	}
}
