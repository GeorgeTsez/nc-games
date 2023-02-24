const handlePsql = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad Request!" });
  } else if ((err.code === '23502')) {
    response.status(404).send({ msg: "Doesn't Exist" });
    console.log(err)
  } else if ((err.code === '23503')) {
    response.status(400).send({msg: "Foreign key violation"})
  }
  else {
    next(err);
  }
};

const handleHTTP = (err, request, response, next) => {
  if (err.status === 404) {
    response.status(404).send({msg: "Doesn't Exist"})
  } else {
    next(err);
  }
}

const handle500 = (err, request, response, next) => {
  console.log(err);
  response.status(500).send("Server Error!");
};

module.exports = { handle500, handlePsql, handleHTTP };
