export class PromotionError extends Error {
  code: string;
  status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = 'PromotionError';
    this.code = code;
    this.status = status;
  }
}
