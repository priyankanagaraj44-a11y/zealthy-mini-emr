import express from "express"
import {db} from "./db"

const router = express.Router()

router.get("/",(req,res)=>{

 db.all("SELECT * FROM patients",(err,rows)=>{

  if(err){
   res.status(500).json(err)
   return
  }

  res.json(rows)

 })

})

router.post("/",(req,res)=>{

 const {name,email,password} = req.body

 if(!name || !email || !password){
  return res.status(400).json({error:"All fields required"})
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

 if(!emailRegex.test(email)){
  return res.status(400).json({error:"Invalid email format"})
 }

 const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/

 if(!passwordRegex.test(password)){
  return res.status(400).json({
   error:"Password must contain letters and numbers and be 6+ characters"
  })
 }

 db.run(
  "INSERT INTO patients(name,email,password) VALUES(?,?,?)",
  [name,email,password],
  function(err){

   if(err){
    res.status(500).json(err)
    return
   }

   res.json({id:this.lastID})

  }

 )

})

export default router