import { google } from "googleapis";
import path from "path";
import { cache } from "./cache";

export async function googleSheets() {

  if(cache.has('googleSheets')){
    const guests:any = cache.get('googleSheets')
    return guests
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('google.json'),
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const { spreadsheets } = google.sheets({ version: 'v4', auth })

  const { data } = await spreadsheets.values.get({
    spreadsheetId: '1bGJaKQ-6Dns9jHXerVCX8Wcwtse4mborStESrZzW35w',
    range: 'all'
  })

  const guests = sheetsToArrayObjects(data.values)

  cache.set('googleSheets', guests)

  return guests
}


export function sheetsToArrayObjects(data: any[][] | undefined | null) {

  if (!data) return []
  const headers: string[] = data[0]

  const array = data
    .filter((_, i) => i > 0)
    .map(row => {
      const object: any = {}

      headers.forEach((header, i) => {
        object[header] = row[i]
      })

      return object
    })
  return array
}