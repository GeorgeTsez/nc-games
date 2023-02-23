const handlePsql = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad Request!" });
  } else if ((err.msg = "Doesn't Exist")) {
    response.status(404).send({ msg: "Doesn't Exist" });
  } else {
    next(err);
  }
};

const handle500 = (err, request, response, next) => {
  console.log(err);
  response.status(500).send("Server Error!");
};

module.exports = { handle500, handlePsql };
