import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()


const db = mysql.createConnection({
    host:"ofo.h.filess.io",
    user:"carteira_wrappedwar",
    password:"0f6bc4cfe5786e6bbe3ea181686d9bf89d550d2c",
    database: "carteira_wrappedwar",
    port : "3307"
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
    const q = "SELECT valor FROM gastos WHERE tipo = 'entrada'"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/ValorSaida", (req, res)=>{
    const q = "SELECT valor FROM gastos WHERE tipo = 'saida'"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.get("/saida", (req, res)=>{
    const q = "SELECT SUM(valor) AS  ValorSaida FROM gastos WHERE tipo = 'saida' "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/entrada", (req, res)=>{
    const q = "SELECT SUM(valor) AS  ValorEntrada FROM gastos WHERE tipo = 'entrada' "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.get("/total", (req, res)=>{
    const q = "SELECT ((SELECT sum(valor) FROM gastos WHERE tipo = 'entrada') - (SELECT SUM(valor) from gastos WHERE tipo = 'saida')) as total from gastos group by total"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/todos", (req,res)=>{
    const q = "INSERT INTO gastos ( `descricao`,`valor`,`tipo`) VALUES (?)"
    const values = [
   
        req.body.descricao,
        req.body.Valor,
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