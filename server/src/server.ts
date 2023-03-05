import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { routes } from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 8000
app.listen(port, () =>  console.log(`\nRUN API - http://localhost:${port}\n`))
  .on('error', console.log)

  
//   (error:any) => {
//   if(error){
//     console.log(error)
//     return 
//   }
//  

// })

