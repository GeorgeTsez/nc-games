const app = require('./app.js');
const { PORT = 5050 } = process.env;

app.listen(PORT, ()=> console.log(`listening on ${PORT}...`))