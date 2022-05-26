import {Response} from 'express';

export class AppError extends Error {
  constructor(
    /**
     * @description error message
     */
    readonly message: string,
    /**
     * @description name of the method / function
     */
    readonly method: string,
    /**
     * @description the object that was used for the method's execution
     */
    readonly payload?: Record<string, any> | any[]
  ) {
    super(message);

    console.error({
      message: this.message,
      method: this.method,
      payload: this.payload,
      timestamp: new Date().toISOString(),
    });
  }
}

export class HTTPError extends AppError {
  constructor(
    /**
     * @description error message
     */
    readonly message: string,
    /**
     * @description name of the HTTP verb
     */
    readonly method: string,
    /**
     * @description status coe
     */
    readonly statusCode: number,
    /**
     * @description Pass the res parameter to automatically send http response
     */
    readonly response: Response,
    /**
     * @description the object that was used for the method's execution
     */
    readonly payload?: Record<string, any> | any[]
  ) {
    super(message, method, payload);

    response.status(this.statusCode).json({
      message: this.message,
      error: this.stack,
    });
  }
}
