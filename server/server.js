import React from 'react';
import App from '../src/App'
const path=require('path');
const fs=require('fs');
const express=require('express');
const ReactDOMServer=require('react-dom/server');

const PORT = 8080
const app = express()
const router = express.Router()

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(React.createElement(App))}</div>`
      )
    )
  })
}
router.use('^/$', serverRenderer)

router.use(
  express.static(path.resolve(__dirname, '..', 'build'))
)

app.use(router)
app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500).render('error');
  res.send(500);
});

app.use((req, res, next) => {
  if (req.url.startsWith("/v1") || req.url.startsWith("/api")) {
    console.log("URL ", req.url);
    res.sendStatus(404);
  } else {
    res.status(404);
  }
});


app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})