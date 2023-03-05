import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { routes } from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 8000, () => {console.log(`\nRUN API - http://localhost:${process.env.PORT}\n`)})

