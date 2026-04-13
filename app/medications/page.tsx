import { getMedicines, getPatientRecords } from "@/lib/actions"
import MedicationTabs from "@/components/medications/medication-tabs"

export default async function Page() {
  const patientRecords = await getPatientRecords()
  /*const [medicines, setMedicines] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    getMedicines().then(setMedicines)
  }, [])
console.log(medicines)*/
  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="space-y-4 rounded-3xl border border-border bg-card/90 p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
                Daily medication tracker
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Patient medicine schedule
              </h1>
            </div>
          </div>
        </section>

        <MedicationTabs patientRecords={patientRecords} />
      </div>
    </div>
  )
}
