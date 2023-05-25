import { google } from "googleapis";
import path from "path";

export async function googleSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('google.json'), 
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const { spreadsheets } = google.sheets({version:'v4', auth})

  const { data } = await spreadsheets.values.get({
    spreadsheetId: '17mMrsxHf5WnmFRHToxrCJgmTqvRTB1Fb-c9nV5qzFPQ',
    range: 'ALUNOS BH 2023'
  })

  return sheetsToArrayObjects(data.values)
  
}


export function sheetsToArrayObjects(data: any[][] | undefined | null ) {
  
  if(!data)return []
  const headers:string[] = data[0]

  const array = data
    .filter((_, i) => i > 0)
    .map(row => {
      const object:any = {}

      headers.forEach((header, i) => {
        object[header] = row[i]
      })

      return object
    })

  return array
}