import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { prisma } from './lib/db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: { name, email }
  })
  res.status(201).json({ user })
})

const connectDB = async () => {
  await prisma.$connect()
  console.log('Database connected ✓')
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await connectDB()
})