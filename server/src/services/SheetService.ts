
import { googleSheets } from '../utils/googleSheets'
export class SheetService {
  
  static async findMany() {  
    return await googleSheets()
  }
}