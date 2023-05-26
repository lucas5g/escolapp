import { google } from "googleapis";
import path from "path";
import { cache } from "./cache";
import { env } from "./env";


export async function googleSheets() {

  if (cache.has('googleSheets')) {
    return cache.get('googleSheets')
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('google.json'),
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  try {

    const { spreadsheets } = google.sheets({ version: 'v4', auth })

    const { data } = await spreadsheets.values.get({
      spreadsheetId: env.spreadSheetId,
      range: 'all!a:g'
    })

    const values = sheetsToArrayObjects(data.values)

    cache.set('googleSheets', values)

    return values
  }catch(error){
    console.log(error)
  }
}


export function sheetsToArrayObjects(data: any[][] | undefined | null) {

  if (!data) return []
  const headers: string[] = data[0]

  const array = data
    .filter((_, i) => i > 0)
    .map(row => {
      const object: any = {}

      headers.forEach((header, i) => {
        const cell = isNaN(row[i]) ? row[i] : Number(row[i])
        object[header] = cell 
      })

      return object
    })
  return array
}