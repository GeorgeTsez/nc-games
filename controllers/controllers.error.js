const handle500 = (err, request, response, next) => {
    console.log(err);
    response.status(500).send("Server Error!");
  };
  
  module.exports = { handle500 };