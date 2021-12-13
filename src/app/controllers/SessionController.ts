import { Request, Response } from 'express';

import database from '../../database';
import { Cache, Hash, Token } from '../libs';

class SessionController {
  async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    /**
     * Search User
     */
    const user = await database.client.user.findFirst({
      where: { email },
    });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!(await Hash.compare(password, user.password))) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    /**
     * Create Token
     */
    const token = Token.generate({ id: user.id, expiresIn: '24h' });
    await Cache.set(`token:${token}`, user, 24);

    return response.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      session: {
        token,
        expiresIn: '24h',
      },
    });
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { token } = response.locals;

    await Cache.remove(`token:${token}`);

    return response.status(204).json();
  }
}

export default new SessionController();
