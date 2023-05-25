
import { googleSheets } from '../utils/googleSheets'
export class SheetService {
  
  static async findMany() {  
    const guests = await googleSheets() 
    // return guests
    return guests.filter((guest:any) => guest.father.includes('ANDER'))
  }
}