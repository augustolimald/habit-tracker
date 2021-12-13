import { Request, Response } from 'express';

class HabitController {
  async index(request: Request, response: Response): Promise<Response> {
    return response.status(501).json({ message: 'Not implemented yet' });
  }

  async store(request: Request, response: Response): Promise<Response> {
    return response.status(501).json({ message: 'Not implemented yet' });
  }

  async remove(request: Request, response: Response): Promise<Response> {
    return response.status(501).json({ message: 'Not implemented yet' });
  }
}

export default new HabitController();
