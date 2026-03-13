import { db } from "./db"

export const getAppointments=(req,res)=>{

db.all(
`SELECT * FROM appointments WHERE patientId=?`,
[req.params.patientId],
(err,rows)=>res.json(rows)
)

}

export const createAppointment=(req,res)=>{

const {patientId,provider,datetime,repeat}=req.body

db.run(
`INSERT INTO appointments(patientId,provider,datetime,repeat)
VALUES(?,?,?,?)`,
[patientId,provider,datetime,repeat]
)

res.send("created")

}

export const updateAppointment=(req,res)=>{

const {provider,datetime,repeat}=req.body

db.run(
`UPDATE appointments SET provider=?,datetime=?,repeat=? WHERE id=?`,
[provider,datetime,repeat,req.params.id]
)

res.send("updated")

}

export const deleteAppointment=(req,res)=>{

db.run(
`DELETE FROM appointments WHERE id=?`,
[req.params.id]
)

res.send("deleted")

}