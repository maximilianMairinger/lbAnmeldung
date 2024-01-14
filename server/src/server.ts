import setup from "./setup"



setup("lbAnmeldung").then(async ({app, db}) => {

  
  app.post("/echo", (req, res) => {
    res.send(req.body)
  })
})
