const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { response } = require('express');
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com banco");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine','ejs');
app.use(express.static('public'));
//decotificar para javaScript
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

app.get("/",(req, res) =>{
    Pergunta.findAll({raw : true, order: [
        ['id', 'DESC']//ordem decrescente
    ]}).then(perguntas=> {
        res.render("index",{
            perguntas: perguntas
        });
    });
});
app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});

app.post("/saveAsk",(req, res) =>{
    var title = req.body.titulo;
    var description = req.body.pergunta;
    //salvar os dados pegar o model e criar o create
    Pergunta.create({
        titulo:  title,// o campo titulo recebe o dados da variavel 
        descricao : description
    }).then(() => { //caso aconteça ele vai redirecionar
        res.redirect("/");
    }) ;
});

app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        body: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/perguntar/" + perguntaId);
    });
});
app.get("/perguntar/:id",(req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id}

    }).then((pergunta) => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta : pergunta,
                    respostas : respostas
                });
            });
        } else {
            res.redirect("/");
        }
    });
});
app.listen(8080,(erro) => {
    if(erro){
        console.log("Ocorreu errro");
    }else{
        console.log("Iniciando o servidor");
    }
})