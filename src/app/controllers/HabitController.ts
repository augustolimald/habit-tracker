import { Request, Response } from 'express';

import database from '../../database';

class HabitController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user } = response.locals;

    const habits = await database.client.habit.findMany({
      where: { idUser: user.id },
    });

    return response.status(200).json(habits);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { user } = response.locals;

    const habit = await database.client.habit.create({
      data: {
        name,
        idUser: user.id,
      },
    });

    return response.status(201).json(habit);
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { user } = response.locals;
    const { idHabit } = request.params;

    /**
     * Search Data
     */
    const habit = await database.client.habit.findFirst({
      where: { id: parseInt(idHabit), idUser: user.id },
    });

    if (!habit) {
      return response.status(404).json({ message: 'Habito não encontrado' });
    }

    /**
     * Remove and Response
     */
    await database.client.habit.delete({ where: { id: habit.id } });

    return response.status(204).json();
  }
}

export default new HabitController();
