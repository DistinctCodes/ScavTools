export interface PDFGenerationOptions {
  format?: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  margins?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  header?: string;
  footer?: string;
  css?: string[];
  timeout?: number;
  scale?: number;
}

export interface PDFResult {
  buffer: Buffer;
  metadata: {
    pages: number;
    size: number;
    generationTime: number;
  };
}
