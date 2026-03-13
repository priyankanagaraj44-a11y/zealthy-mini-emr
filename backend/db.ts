import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose()

export const db = new sqlite.Database("zealthy.db")

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS patients(
id INTEGER PRIMARY KEY,
name TEXT,
email TEXT,
password TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS appointments(
id INTEGER PRIMARY KEY,
patientId INTEGER,
provider TEXT,
datetime TEXT,
repeat TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS prescriptions(
id INTEGER PRIMARY KEY,
patientId INTEGER,
medication TEXT,
dosage TEXT,
quantity INTEGER,
refill_on TEXT,
refill_schedule TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS medications(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS dosages(
id INTEGER PRIMARY KEY AUTOINCREMENT,
value TEXT
)
`)

})