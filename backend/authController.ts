import { db } from "./db"

export const login=(req,res)=>{

const {email,password}=req.body

db.get(
`SELECT * FROM patients WHERE email=? AND password=?`,
[email,password],
(err,row)=>{

if(row) res.json(row)

else res.status(401).send("Invalid credentials")

})

}