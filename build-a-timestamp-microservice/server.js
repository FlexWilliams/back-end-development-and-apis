import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line


app.get('/api', (req, res) => {
  const date = new Date();

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/:date', (req, res) => {
  console.log(`req.params.date: ${req.params.date}`);

  const timestamp = Number(req.params.date);

  const date = isNaN(timestamp) ? new Date(req.params.date ? req.params.date : null) : new Date(timestamp);

  console.log(`date: ${date}`);

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }


});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
