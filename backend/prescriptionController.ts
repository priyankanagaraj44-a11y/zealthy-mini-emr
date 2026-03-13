import { db } from "./db"

export const getPrescriptions=(req,res)=>{

db.all(
`SELECT * FROM prescriptions WHERE patientId=?`,
[req.params.patientId],
(err,rows)=>res.json(rows)
)

}

export const createPrescription=(req,res)=>{

const {
patientId,
medication,
dosage,
quantity,
refill_on,
refill_schedule
}=req.body

db.run(
`INSERT INTO prescriptions(patientId,medication,dosage,quantity,refill_on,refill_schedule)
VALUES(?,?,?,?,?,?)`,
[patientId,medication,dosage,quantity,refill_on,refill_schedule]
)

res.send("created")

}

export const updatePrescription=(req,res)=>{

const {
medication,
dosage,
quantity,
refill_on,
refill_schedule
}=req.body

db.run(
`UPDATE prescriptions
SET medication=?,dosage=?,quantity=?,refill_on=?,refill_schedule=?
WHERE id=?`,
[
medication,
dosage,
quantity,
refill_on,
refill_schedule,
req.params.id
]
)

res.send("updated")

}

export const deletePrescription=(req,res)=>{

db.run(
`DELETE FROM prescriptions WHERE id=?`,
[req.params.id]
)

res.send("deleted")

}