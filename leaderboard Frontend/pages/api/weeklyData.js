import axios from "axios";

export default async function handler(req, res) {

  if (req.method === "POST") {
    try {
    
      var config = {
        method: "post",
        url: "http://localhost:5000/api/v1/auth/getweeklydata",
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
