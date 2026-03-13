import express from "express"
import cors from "cors"

import authRoutes from "./authRoutes"
import patientRoutes from "./patientRoutes"
import appointmentRoutes from "./appointmentRoutes"
import prescriptionRoutes from "./prescriptionRoutes"
import medicationRoutes from "./medicationRoutes"   // ADDED

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",authRoutes)

app.use("/patients",patientRoutes)

app.use("/appointments",appointmentRoutes)

app.use("/prescriptions",prescriptionRoutes)

app.use("/medications",medicationRoutes)   // ADDED

app.listen(4002,()=>{
console.log("Server running on port 4002")
})