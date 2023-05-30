import { googleSheets } from "@/libs/google-sheets";

export class StudentRepository{
  static async findMany(){
    return googleSheets({range:'all!a:e'})

  }
}