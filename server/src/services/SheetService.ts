import { google } from 'googleapis'
import path from 'path'
// import fs from 'fs'
// const sheet = new GoogleSpreadsheet('')
export class SheetService {
  
  static async findMany() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve('google.json'),
      scopes: 'https://www.googleapis.com/auth/spreadsheets'

    })
    const client = await auth.getClient()

    const googleSheets = await google.sheets({version:'v4', auth:client})

    // const rows = await googleSheets.spreadsheets.get({
    //   auth,
    //   spreadsheetId:'17mMrsxHf5WnmFRHToxrCJgmTqvRTB1Fb-c9nV5qzFPQ'
    // })

    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId: '17mMrsxHf5WnmFRHToxrCJgmTqvRTB1Fb-c9nV5qzFPQ',
      range: 'Funcionários EPSA'
    })
    
    // console.log(auth, clien)
    console.log(rows.data.values)
    // const keyFile = path.resolve('google.json')  
    // const keys = JSON.parse(fs.readFileSync(keyFile, 'utf8'))
    // const keys = fs.readFileSync(keyFile, 'utf8')
    
    // const client = new google.auth.OAuth2(
    //   keys.web.client_id,
    //   keys.web.client_secret,
    //   // keys.web.redirect_uris[0]
    // )

    // const sheets = google.sheets({ version: 'v4', auth: client })
    // const test = await sheets.spreadsheets.values.get({
    //   // auth: client,
    //   spreadsheetId: '17mMrsxHf5WnmFRHToxrCJgmTqvRTB1Fb-c9nV5qzFPQ',
    //   range: 'Funcionários EPSA'
    // })

    // console.log({
    //   test
    // })

    return 'qwe'
  }
}