import { cache } from "../utils/cache"

export class ConfigService{
  static async clearCaches(){
    cache.flushAll()
    return {message: 'Caches deletados.'}
  }
}