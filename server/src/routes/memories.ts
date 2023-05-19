import { FastifyInstance } from "fastify";
//zob library to validade memory ID
import {z} from 'zod'
import {prisma} from "../lib/prisma"

export async function memoriesRoutes(app: FastifyInstance) {
  //List all memories
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      }
    })
    return memories.map(memory => {
      return{
        id: memory.id,
        coverUrl: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  //Get a specific memory
  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(), 
    })

    const {id} = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return memory
  })

  //Create new memory
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'a0ed0116-1564-48c5-8453-3e9d58f54d1f'
      },
    })
    return memory
  })

  //Update a specific memory
  app.post('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(), 
    })

    const {id} = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })

    //Remove a specific memory
    app.delete('/memories/:id', async (request) => {
      const paramsSchema = z.object({
        id: z.string().uuid(), 
      })
  
      const {id} = paramsSchema.parse(request.params)
  
      await prisma.memory.delete({
        where: {
          id,
        },
      })
    })

}