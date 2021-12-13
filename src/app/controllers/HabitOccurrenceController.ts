import { Request, Response } from 'express';

import database from '../../database';

class HabitOccurrenceController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user } = response.locals;
    const { idHabit } = request.params;
    const { page = 1, amount = 10 } = request.query;

    /**
     * Search Data
     */
    const habit = await database.client.habit.findFirst({
      where: { id: parseInt(idHabit), idUser: user.id },
      include: {
        occurrences: {
          skip: (parseInt(page as string) - 1) * parseInt(amount as string),
          take: parseInt(amount as string),
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!habit) {
      return response.status(404).json({ message: 'Habito não encontrado' });
    }

    return response.status(200).json(habit.occurrences);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { user } = response.locals;
    const { measure } = request.body;
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
     * Store and Response
     */
    const habitOccurrence = await database.client.habitOccurrence.create({
      data: {
        measure,
        idHabit: habit.id,
      },
    });

    return response.status(201).json(habitOccurrence);
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { user } = response.locals;
    const { idHabit, idOccurrence } = request.params;

    /**
     * Search Data
     */
    const habit = await database.client.habit.findFirst({
      where: { id: parseInt(idHabit), idUser: user.id },
      include: {
        occurrences: {
          where: { id: parseInt(idOccurrence) },
        },
      },
    });

    if (!habit) {
      return response.status(404).json({ message: 'Habito não encontrado' });
    }

    if (habit.occurrences.length === 0) {
      return response.status(404).json({ message: 'Ocorrência não encontrada' });
    }

    /**
     * Remove and Response
     */
    await database.client.habitOccurrence.delete({
      where: {
        id: habit.occurrences[0].id,
      },
    });

    return response.status(204).json();
  }
}

export default new HabitOccurrenceController();
