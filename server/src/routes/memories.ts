import { FastifyInstance } from "fastify";
//zob library to validade memory ID
import {z} from 'zod'
import {prisma} from "../lib/prisma"

export async function memoriesRoutes(app: FastifyInstance) {
  //Confirm if the user is logged in before having access to any info
  app.addHook('preHandler', async (request) =>{
    await request.jwtVerify()
  })
  //List all memories
  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
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
  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(), 
    })

    const {id} = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if(!memory.isPublic && memory.userId != request.user.sub){
      return reply.status(401).send()
    }

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
        userId: request.user.sub,
      },
    })
    return memory
  })

  //Update a specific memory
  app.put('/memories/:id', async (request, reply) => {
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

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if(memory.userId != request.user.sub){
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
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
    app.delete('/memories/:id', async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(), 
      })
  
      const {id} = paramsSchema.parse(request.params)

      const memory = await prisma.memory.findFirstOrThrow({
        where :{
          id,
        }
      })
  
      if(memory.userId != request.user.sub){
        return reply.status(401).send()
      }
      
      await prisma.memory.delete({
        where: {
          id,
        },
      })
    })

}