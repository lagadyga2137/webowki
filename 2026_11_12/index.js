import express from 'express'
const app = express()
app.use(express.urlencoded({ extended: true }))
import { PrismaClient } from "./generated/prisma/index.js";
const prisma = new PrismaClient()
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.post('/', (req, res) => {
  async function main()
  {
    const cPost = await prisma.post.create({
      data: {
        content: req.body.message,
        author: {connect: {id: Number(req.body.username)}},
      },
      include: {author: true}
      })
    console.log(cPost)
  }
  main().then(async () => {
    res.send("XD?")
  })
})
app.get('/:id', (req, res) => {
  async function main(){
    const gPost = await prisma.post.findMany({
      where: { id: Number(req.params.id) }
    })
    res.send(JSON.stringify(gPost, 2, null))
  }
  main()
})
app.get('/create-user', (req, res) => {
  res.sendFile(__dirname + '/create-user.html')
})
app.post('/create-user', (req, res) => {
  async function main() {
    const cAuthor = await prisma.author.create({
      data: {
        username: req.body.username,
      },
    })
    console.log(cAuthor)
  }
  main().then(async () => {
    res.send("XD?")
  })
})
app.get('/display-posts', (req, res) => {
  res.sendFile(__dirname + '/display-post.html')
})
app.post('/display-posts', (req, res) => {
  async function main() {
    const cComm = await prisma.comment.create({
      data: {
        content: req.body.message,
        author: { connect: { id: Number(req.body.username) } },
        post: { connect: { id: Number(req.body.id) } }
      },
      include: { author: true }
    })
    console.log(cComm)
  }
  main().then(async () => {
    res.send('XD?')
  })
})
app.get('/get-comment/:id', (req, res) => {
  async function main() {
    const gComment = await prisma.comment.findMany({
      where: { postId: Number(req.params.id) },
      include: { post: true,
      author: true},
    })
    res.send(JSON.stringify(gComment, 2, null))
  }
  main()
})
app.listen(6767, () => {
  console.log('App is running on http://localhost:6767')
})
