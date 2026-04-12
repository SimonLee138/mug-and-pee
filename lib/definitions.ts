export type Medicine = {
  id: number
  created_at: Date
  patient_id: number
  medicine_id: number
  effective_date: Date
}

export type Patient = {
  id: number
  name: string
  img_src: string
  created_at: Date
}

export type MedicationScheduleEntry = {
  patient_name: string
  medicine_name: string
  effective_date: Date
  taken: boolean
  img_src: string
}

export type DailyMedicationSchedule = {
  effective_date_string: string
  pets: {
    patient_name: string
    img_src: string
    medicines: {
      medicine_name: string
      taken: boolean
    }[]
  }[]
}
