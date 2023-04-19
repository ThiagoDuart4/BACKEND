import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()


const db = mysql.createConnection({
    host:"198.91.81.11",
    user:"zkkgnjys_admin",
    password:"admin",
    database: "zkkgnjys_carteira"

});

app.use(express.json());
app.use(cors());

app.get("/todos", (req, res)=>{
    const q = "SELECT * FROM gastos"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/notificacao", (req, res)=>{
    const q = "select count(id) AS notificacao from gastos; "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/ValorEntrada", (req, res)=>{
    const q = "SELECT * FROM gastos WHERE tipo = 'entrada'"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/ValorSaida", (req, res)=>{
    const q = "SELECT * FROM gastos WHERE tipo = 'saida'"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.get("/saida", (req, res)=>{
    const q = "SELECT SUM(ValorSaida) AS  ValorSaida FROM gastos "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/entrada", (req, res)=>{
    const q = "SELECT SUM(ValorEntrada) AS  ValorEntrada FROM gastos "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.get("/total", (req, res)=>{
    const q = "SELECT SUM(ValorEntrada) - SUM(ValorSaida) AS ValorTotal FROM gastos"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/gastos", (req,res)=>{
    const q = "INSERT INTO gastos ( `descricao`, `ValorEntrada`, `ValorSaida`,`tipo`) VALUES (?)"
    const values = [
   
        req.body.descricao,
        req.body.ValorEntrada,
        req.body.ValorSaida,
        req.body.tipo
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu cadastro foi criado com sucesso!")
    })
})


app.delete("/todos/:id", (req, res)=>{
    const DataId = req.params.id;
    const q = "DELETE FROM gastos  WHERE id = ?"

    db.query(q,[DataId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Sua consulta foi deletado com sucesso!")
    })
})

app.listen(8800, ()=>{
    console.log("Backend conectado!!!")
});