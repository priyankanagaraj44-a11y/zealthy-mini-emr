import express from "express"
import { db } from "./db"

const router = express.Router()

// GET appointments for patient
router.get("/:patientId", (req,res)=>{

const patientId = req.params.patientId

db.all(
`SELECT * FROM appointments WHERE patientId=?`,
[patientId],
(err,rows)=>{

if(err){
return res.status(500).json(err)
}

res.json(rows)

})

})


// CREATE appointment
router.post("/", (req,res)=>{

const { patientId, provider, datetime, repeat } = req.body

db.run(
`INSERT INTO appointments(patientId,provider,datetime,repeat)
VALUES(?,?,?,?)`,
[patientId, provider, datetime, repeat],
function(err){

if(err){
return res.status(500).json(err)
}

res.json({
id: this.lastID,
patientId,
provider,
datetime,
repeat
})

})

})
router.delete("/:id",(req,res)=>{

 const {id} = req.params

 db.run(
  "DELETE FROM appointments WHERE id=?",
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