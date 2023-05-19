import 'dotenv/config'

import fastity from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastity()

app.register(cors,{
    origin: true,
})
app.register(authRoutes)
app.register(memoriesRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
})

 