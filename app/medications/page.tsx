import { getMedicines, getPatientRecords } from "@/lib/actions"
import MedicationTabs from "@/components/medications/medication-tabs"
import { PencilLine, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

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
        <div className="md:hidden gap-2 flex-none rounded-3xl border border-border bg-card/90 p-3 shadow-sm w-fit h-fit flex">
          <Plus className="w-6 h-6" />
          <PencilLine className="w-6 h-6" />
          <Trash2 className="w-6 h-6" />
        </div>
        <section className="space-y-4 rounded-3xl border border-border bg-card/90 p-6 shadow-sm flex">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between grow">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
                Daily medication tracker
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Patient medicine schedule
              </h1>
            </div>
          </div>
          <div className="hidden md:flex gap-2 flex-none">
            <div className="rounded-3xl border border-border bg-card/90 p-3 shadow-sm w-fit h-fit">
              <Link href="/medications/create">
                <Plus className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-card/90 p-3 shadow-sm w-fit h-fit">
              <PencilLine className="w-4 h-4" />
            </div>
            <div className="rounded-3xl border border-border bg-card/90 p-3 shadow-sm w-fit h-fit">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>

        </section>
        <MedicationTabs patientRecords={patientRecords} />
      </div>
    </div>
  )
}
