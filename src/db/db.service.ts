import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DbService {
  private readonly logger = new Logger(DbService.name);
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.debug(`Executing query: ${queryText} (${values})`);
    const result = await this.pool.query(queryText, values);
    this.logger.debug(`Executed query, result size ${result.rows.length}`);
    return result.rows;
  }
}
