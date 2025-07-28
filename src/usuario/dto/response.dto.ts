// src/usuario/dto/response.dto.ts
export class SuccessResponseDto {
  success: boolean;
  message: string;
  uid?: string;
  username?: string;
  usuarios?: any[];
}

export class ErrorResponseDto {
  success: boolean;
  message: string;
  error?: string;
} 