export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.expose = true;
    this.type = "urn:problem:invalid-request";
    this.title = "Bad Request";
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.expose = true;
    this.type = "urn:problem:unauthorized";
    this.title = "Unauthorized";
  }
}
