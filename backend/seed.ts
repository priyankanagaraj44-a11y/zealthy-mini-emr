import fs from "fs"
import { db } from "./db"

const raw = fs.readFileSync("data.json","utf-8")

const data = JSON.parse(raw)

db.serialize(()=>{

data.users.forEach((user:any)=>{

db.run(
`INSERT INTO patients(id,name,email,password) VALUES(?,?,?,?)`,
[user.id,user.name,user.email,user.password]
)

user.appointments.forEach((a:any)=>{

db.run(
`INSERT INTO appointments(id,patientId,provider,datetime,repeat)
VALUES(?,?,?,?,?)`,
[a.id,user.id,a.provider,a.datetime,a.repeat]
)

})

user.prescriptions.forEach((p:any)=>{

db.run(
`INSERT INTO prescriptions(id,patientId,medication,dosage,quantity,refill_on,refill_schedule)
VALUES(?,?,?,?,?,?,?)`,
[
p.id,
user.id,
p.medication,
p.dosage,
p.quantity,
p.refill_on,
p.refill_schedule
]
)

})

})

data.medications.forEach((m:string)=>{
db.run(`INSERT INTO medications(name) VALUES(?)`,[m])
})

data.dosages.forEach((d:string)=>{
db.run(`INSERT INTO dosages(value) VALUES(?)`,[d])
})

})

db.run(
`INSERT INTO patients(name,email,password) VALUES(?,?,?)`,
["Admin","admin@test.com","123"]
)
console.log("Database seeded successfully")