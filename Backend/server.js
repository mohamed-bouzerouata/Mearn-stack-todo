const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();
const todoRoutes = express.Router();


app.use('/todos',  todoRoutes);
// this endpoint will delivering all available todos items :
todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
        }
    });  
});
//  this is the second endpoint 
//  we retrieve todos by providinf an ID .
todoRoutes.route('/id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo)=> {
        res.json(todo);
    });
});



app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection is ready')
})

app.listen(PORT, () => {
    console.log(`the server start on the port ${PORT}`)
})