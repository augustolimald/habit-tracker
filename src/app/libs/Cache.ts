import Redis from 'ioredis';

class Cache {
  private client: Redis.Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL, { keyPrefix: 'cache:' });
  }

  async set(key: string, value: any, hours?: number): Promise<any> {
    return this.client.set(
      key,
      JSON.stringify(value),
      hours ? 'EX' : undefined,
      hours ? 60 * 60 * hours : undefined,
    );
  }

  async get(key: string): Promise<any> {
    const cached = await this.client.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async remove(key: string): Promise<number> {
    return this.client.del(key);
  }
}

export default new Cache();
