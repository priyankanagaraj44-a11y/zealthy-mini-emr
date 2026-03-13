import express from "express";
import cors from "cors";

import patientRoutes from "./patientRoutes";
import appointmentRoutes from "./appointmentRoutes";
import prescriptionRoutes from "./prescriptionRoutes";
import medicationRoutes from "./medicationRoutes";
import authRoutes from "./authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/medications", medicationRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});