import { Request, Response, NextFunction } from 'express';
import { Cache, Token } from '../libs';

export async function Authentication(request: Request, response: Response, next: NextFunction) {
  /**
   * Header verification
   */
  const header = request.headers.authorization;
  if (!header) {
    return response.status(401).json({ message: 'Informe um token' });
  }

  const [_, token] = header.split(' ');
  if (!token) {
    return response.status(401).json({ message: 'Informe um token no formato bearer' });
  }

  /**
   * Validating token
   */
  let tokenData = null;
  try {
    tokenData = Token.validate(token);
  } catch (error) {
    return response.status(401).json({ error: 'Informe um token válido' });
  }

  /**
   * Verifying token in Cache
   */
  const cacheData = await Cache.get(`token:${token}`);
  if (!cacheData) {
    return response.status(401).json({ error: 'Sua sessão expirou' });
  }

  /**
   * Checking data
   */
  if (tokenData.id !== cacheData.id) {
    return response.status(401).json({ error: 'Token inválido' });
  }

  response.locals.token = token;
  response.locals.user = cacheData;
  return next();
}
