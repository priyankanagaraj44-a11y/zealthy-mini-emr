import express from "express"
import { db } from "./db"

const router = express.Router()

// GET prescriptions for patient
router.get("/:patientId",(req,res)=>{

const patientId = req.params.patientId

db.all(
`SELECT * FROM prescriptions WHERE patientId=?`,
[patientId],
(err,rows)=>{

if(err){
return res.status(500).json(err)
}

res.json(rows)

})

})


// CREATE prescription
router.post("/",(req,res)=>{

const {
patientId,
medication,
dosage,
quantity,
refill_on,
refill_schedule
} = req.body

db.run(
`INSERT INTO prescriptions(patientId,medication,dosage,quantity,refill_on,refill_schedule)
VALUES(?,?,?,?,?,?)`,
[
patientId,
medication,
dosage,
quantity,
refill_on,
refill_schedule
],
function(err){

if(err){
return res.status(500).json(err)
}

res.json({
id: this.lastID,
patientId,
medication,
dosage,
quantity,
refill_on,
refill_schedule
})

})

})


// REFILL ALERTS
router.get("/refills/:patientId",(req,res)=>{

const patientId = req.params.patientId

db.all(
`SELECT * FROM prescriptions WHERE patientId=?`,
[patientId],
(err,rows)=>{

if(err){
return res.status(500).json(err)
}

const now = new Date()
const next = new Date()

next.setDate(now.getDate()+7)

const alerts = rows.filter((p:any)=>{

const refillDate = new Date(p.refill_on)

return refillDate >= now && refillDate <= next

})

res.json(alerts)

})

})
router.delete("/:id",(req,res)=>{

 const {id} = req.params

 db.run(
  "DELETE FROM prescriptions WHERE id=?",
  [id],
  function(err){

   if(err){
    res.status(500).json(err)
    return
   }

   res.json({success:true})

  }
 )

})

export default router