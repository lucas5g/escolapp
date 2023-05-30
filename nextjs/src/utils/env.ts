import 'dotenv/config'
export const env = {
  spreadSheetId: process.env.SPREAD_SHEET_ID,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),

}