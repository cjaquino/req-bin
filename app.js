const { json } = require('express');
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
const bins = {}

// STATIC FILES
app.use(express.json())
app.use(express.static('public'))
app.use('/js', express.static(__dirname + 'public/js'))

// SET VIEWS
app.set('views', './views')
app.set('view engine', 'ejs')

//
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let hash = req.body.hash
  bins[hash] = []
  console.log(bins)
  res.send()
})

// const parseRequest = (req) => {
//   const headers = JSON.stringify(req.headers)
//   const queryParams = JSON.stringify(req.query);
//   const body = JSON.stringify(req.body)
  
//   return `Headers: ${headers}\nQuery Params: ${queryParams}\nBody: ${body}`
// }

app.get('/bins', (req, res) => {
  res.send(Object.keys(bins))
})

app.get('/:id', (req, res) => {
  let id = req.params.id
  let query = req.query
  if (Object.keys(bins).includes(id)) {
    let requests = bins[id]
    if (query.inspect != undefined) {
      res.render("bin", {requests: requests})
    } else {
      bins[id].push(req.headers)
      res.send("Requesting...")
    }
  } else {
    res.status(404).send("Sorry, we couldn't find that bin")
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});