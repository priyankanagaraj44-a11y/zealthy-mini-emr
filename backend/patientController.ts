import { db } from "./db"

export const getPatients=(req,res)=>{

db.all("SELECT * FROM patients",[],(err,rows)=>{
res.json(rows)
})

}

export const getPatient=(req,res)=>{

db.get(
`SELECT * FROM patients WHERE id=?`,
[req.params.id],
(err,row)=>res.json(row)
)

}

export const createPatient=(req,res)=>{

const {name,email,password}=req.body

db.run(
`INSERT INTO patients(name,email,password)
VALUES(?,?,?)`,
[name,email,password],
function(){

res.json({id:this.lastID})

})

}

export const updatePatient=(req,res)=>{

const {name,email,password}=req.body

db.run(
`UPDATE patients SET name=?,email=?,password=? WHERE id=?`,
[name,email,password,req.params.id]
)

res.send("updated")

}