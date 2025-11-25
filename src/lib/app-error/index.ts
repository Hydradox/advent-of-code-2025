import { HTTP, HTTPStatus } from './HTTP';

export class AppError extends Error {

  private readonly _code: number;
  private readonly _status: string;
  private readonly _description: string;
  private readonly _details: string[];

  constructor(code: HTTP, description: string, details?: string[]);
  constructor(error: Error);

  constructor(codeOrError: HTTP | Error, description: string = '', details: string[] = []) {

    if (codeOrError instanceof Error) {

      super(codeOrError.message);
      this._code = HTTP.INTERNAL_SERVER_ERROR;
      this._status = HTTPStatus[HTTP.INTERNAL_SERVER_ERROR];
      this._description = codeOrError.message;
      this._details = details;
      this.name = codeOrError.name;
      this.stack = codeOrError.stack;

    }
    else {

      super(`Error ${codeOrError}: ${description}`);
      this._code = codeOrError;
      this._status = HTTPStatus[codeOrError];
      this._description = description;
      this._details = details;
      this.name = 'AppError';

    }
  }

  /**
   * Converts the error to a string representation.
   * @returns A string containing the error details.
   */
  toString(): string {
    let response = `${this.name}: ${this._code} (${this._status}): ${this._description}`;

    if (this._details.length > 0) {
      response += `\nDetails:\n\t${this._details.join('\n\t')}`;
    }

    if (this.stack) {
      response += `\nStack Trace:\n${this.stack.split('\n').slice(1).join('\n')}`;
    }

    return response;
  }

  /**
   * Converts the error to a JSON representation.
   * @returns An object containing the error details.
   */
  toJSON() {
    return {
      error: {
        code: `${this._code} ${this._status}`,
        description: this._description,
        details: this._details.length > 0 ? this._details : undefined,
      },
    };
  }

}
