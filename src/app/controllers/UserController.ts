import { Request, Response } from 'express';

import { Hash } from '../libs';
import database from '../../database';

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    /**
     * Verifying duplicates
     */
    const userAlreadyExists = await database.client.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      return response.status(409).json({ message: 'Usuário já cadastrado' });
    }

    /**
     * Store and Response
     */
    const user = await database.client.user.create({
      data: {
        name,
        email,
        password: await Hash.generate(password),
      },
    });

    return response.status(201).json({
      id: user.id,
      name,
      email,
    });
  }
}

export default new UserController();
