import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    units: { type: Number, required: true },
    hospitalName: { type: String, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", bloodRequestSchema);