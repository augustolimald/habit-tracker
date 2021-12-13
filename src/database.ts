import { PrismaClient } from '@prisma/client';

class Database {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  connect() {
    return this.client.$connect();
  }

  disconnect() {
    return this.client.$disconnect();
  }
}

export default new Database();
