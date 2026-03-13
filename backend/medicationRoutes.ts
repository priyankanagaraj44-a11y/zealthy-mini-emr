import express from "express"
import { db } from "./db"

const router = express.Router()


router.get("/", (req, res) => {

  db.all(
    "SELECT * FROM medications",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err)
      }

      res.json(rows)

    }
  )

})


router.get("/dosages", (req, res) => {

  db.all(
    "SELECT * FROM dosages",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err)
      }

      res.json(rows)

    }
  )

})

export default router