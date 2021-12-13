import { Request, Response } from 'express';

class HabitOccurrenceController {
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

export default new HabitOccurrenceController();
