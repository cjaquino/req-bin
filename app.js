const { json } = require('express');
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
const ids = ['asdfa']

app.use(express.json())

app.get('/', (req, res) => {
  res.send('render homepage');
})

const parseRequest = (req) => {
  const headers = JSON.stringify(req.headers)
  const queryParams = JSON.stringify(req.query);
  const body = JSON.stringify(req.body)
  
  // console.log(`Headers: ${headers}\nQuery Params: ${queryParams}\nBody: ${body}`)
  return `Headers: ${headers}\nQuery Params: ${queryParams}\nBody: ${body}`
}

app.get('/:id', (req, res) => {
  let id = req.params.id
  if (id.length === 5) {
    // res.send(`Bucket: ${id}`)
    let result = `****GET REQUEST****\n ${parseRequest(req)}`
    res.send(result)
  } else {
    res.send("Invalid id")
  }
})

const validId = (id) => {
  return ids.includes(id)
}

app.post('/:id', (req, res) => {
  let id = req.params.id
  if (validId(id)) {
    // res.send(`Bucket: ${id}`)
    let result = `****POST REQUEST****\n ${parseRequest(req)}`
    res.send(result)
  } else {
    res.send("Invalid id")
  }
})

app.post('/', (req, res) => {
  const reqStr = parseRequest(req)
  console.log(reqStr)
})


// app.all('/*', (req, res) => {
//   parseRequest(req)

//   res.send('add to bucket')
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});