import { Request, Response } from 'express';

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    return response.status(501).json({ message: 'Not implemented yet' });
  }
}

export default new UserController();
