"use server"

import { sql } from "@/lib/db"
import { Medicine, PatientRecord } from "./definitions"

export async function getMedicines() {
  try {
    const rows = (await sql`SELECT * FROM medicine`) as Medicine[]
    return rows
  } catch (error) {
    console.error("Error fetching medicines:", error)
    return []
  }
}

export async function getPatientRecords() { 
  try {
    const rows = (await sql`select p.id as patient_id, p.name as patient_name, m.id as medicine_id, m.name as medicine_name, 
      ms.time_label as time, ms.dose as dose, ms.quantity_text as count, CURRENT_DATE from medication_schedule ms 
      join medicine m on ms.medicine_id = m.id
      join patient p on ms.patient_id = p.id
      where start_date <= CURRENT_DATE and end_date >= CURRENT_DATE`) as PatientRecord[]
    return rows
  } catch (error) {
    console.error("Error fetching patient records:", error)
    return []
  }
}