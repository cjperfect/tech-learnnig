import { ApiResponse } from '../interfaces/response.interface';

export class ResponseDto<T = any> implements ApiResponse<T> {
  code: number;
  msg: string;
  data: T;

  static success<T>(data?: T, msg: string = 'success'): ResponseDto<T> {
    return {
      code: 200,
      msg,
      data: data || null,
    };
  }

  static error(msg: string = 'error', code: number = 500): ResponseDto {
    return {
      code,
      msg,
      data: null,
    };
  }

  static unauthorized(msg: string = 'Unauthorized'): ResponseDto {
    return {
      code: 401,
      msg,
      data: null,
    };
  }

  static forbidden(msg: string = 'Forbidden'): ResponseDto {
    return {
      code: 403,
      msg,
      data: null,
    };
  }

  static notFound(msg: string = 'Not Found'): ResponseDto {
    return {
      code: 404,
      msg,
      data: null,
    };
  }

  static badRequest(msg: string = 'Bad Request'): ResponseDto {
    return {
      code: 400,
      msg,
      data: null,
    };
  }
}
