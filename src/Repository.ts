import { IRepository } from "@/interfaces"

export class Repository implements IRepository {

  private database: string | "@/database.json";
  private colletions?: string;

  setConfig(config: { database: string, colletions?: string }) {
    this.database = config.database
    this.colletions = config.colletions
  }

  getDatabase(): string {
    return this.database
  }

}
export const repository = new Repository()
