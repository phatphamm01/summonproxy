const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors("*"));
app.use(express.json({ limit: "25mb" }));

axios.defaults.baseURL =
  "http://summonapi-env-1.eba-ifipdfqg.ap-southeast-1.elasticbeanstalk.com/api/v1";

app.post("/", async (req, res) => {
  let { headers, body } = req;
  let { method, url, data } = body;

  const token = headers?.authorization;
  try {
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        Authorization: token,
      },
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response.status).send(error?.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
