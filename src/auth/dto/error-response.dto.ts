// src/auth/dto/error-response.dto.ts
export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;
  timestamp?: string;
  path?: string;
}

export class SuccessResponseDto {
  statusCode: number;
  message: string;
  token: string;
} 