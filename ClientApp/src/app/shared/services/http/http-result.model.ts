export class HttpResult {
  isOk: boolean;
  data: any | null;
  message: string;

  constructor (_isOk: boolean = false, _data: any = null, _message: string = '') {
    this.isOk = _isOk;
    this.data = _data;
    this.message = _message;
  }

  /**
   * Handles HTTP errors and generates a proper HttpResult.
   * @param {any} error - The error object caught during the HTTP request.
   * @param {string} defaultMessage - A default message to use for the error.
   * @returns {HttpResult} A formatted error result.
   */
  public handleError(error: any, defaultMessage: string): HttpResult {
    const errorMessage = error?.message || defaultMessage;
    console.error('API Error:', error); // Log detailed error for debugging
    return new HttpResult(false, null, `${defaultMessage} 😥\n${errorMessage}`);
  }
}