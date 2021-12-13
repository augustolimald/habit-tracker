import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';

interface ITokenGeneration extends SignOptions {
  id: number;
}

class Token {
  private secret: string;

  constructor() {
    this.secret = process.env.API_KEY || 'topcaixa';
  }

  public generate({ id, ...options }: ITokenGeneration): string {
    return sign({ id }, this.secret, options);
  }

  public validate(token: string): JwtPayload {
    return verify(token, this.secret) as JwtPayload;
  }
}

export default new Token();
