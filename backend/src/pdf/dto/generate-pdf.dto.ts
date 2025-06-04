import {
	IsString,
	IsNotEmpty,
	IsOptional,
	ValidateIf,
	MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GeneratePdfDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(1024 * 1024)
	@ValidateIf((o) => !o.markdown)
	html?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(1024 * 1024)
	@ValidateIf((o) => !o.html)
	markdown?: string;

	@Transform(({ obj }) => {
		const hasHtml = !!obj.html;
		const hasMarkdown = !!obj.markdown;

		if (!hasHtml && !hasMarkdown) {
			throw new Error('Either html or markdown field is required');
		}

		if (hasHtml && hasMarkdown) {
			throw new Error('Provide either html or markdown, not both');
		}

		return obj;
	})
	validate() {
		return this;
	}
}
