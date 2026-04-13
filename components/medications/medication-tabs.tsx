import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientRecord, TimeLabel } from "@/lib/definitions"

const patientRecords = [
  {
    id: "john-doe",
    name: "John Doe",
    description: "Type 2 Diabetes · Hypertension",
    summary: "Take the medicines with breakfast and dinner.",
    medicines: [
      {
        name: "Metformin",
        dose: "500 mg",
        count: "2 tablets",
        time: "Morning",
      },
      { name: "Lisinopril", dose: "10 mg", count: "1 tablet", time: "Evening" },
      { name: "Aspirin", dose: "81 mg", count: "1 tablet", time: "All day" },
    ],
  },
  {
    id: "mary-smith",
    name: "Mary Smith",
    description: "Asthma · Vitamin D deficiency",
    summary: "Keep the inhaler handy and take vitamin later in the afternoon.",
    medicines: [
      { name: "Budesonide", dose: "200 mcg", count: "1 puff", time: "Morning" },
      { name: "Albuterol", dose: "100 mcg", count: "2 puffs", time: "Evening" },
      {
        name: "Vitamin D",
        dose: "1000 IU",
        count: "1 capsule",
        time: "All day",
      },
    ],
  },
  {
    id: "alex-lee",
    name: "Alex Lee",
    description: "Migraine prevention · Sleep support",
    summary: "Use the night dose before bedtime; keep water available.",
    medicines: [
      {
        name: "Propranolol",
        dose: "40 mg",
        count: "1 tablet",
        time: "Morning",
      },
      { name: "Melatonin", dose: "3 mg", count: "1 tablet", time: "Evening" },
      { name: "Magnesium", dose: "250 mg", count: "1 tablet", time: "All day" },
    ],
  },
]


function timeLabelClass(time: TimeLabel) {
  switch (time) {
    case "Morning":
      return "bg-amber-100 text-amber-900 dark:bg-amber-200/20 dark:text-amber-100"
    case "Evening":
      return "bg-slate-100 text-slate-900 dark:bg-slate-800/80 dark:text-slate-100"
    case "All day":
      return "bg-emerald-100 text-emerald-900 dark:bg-emerald-200/20 dark:text-emerald-100"
    default:
      return "bg-muted text-foreground"
  }
}

export default function MedicationTabs({patientRecords}: {patientRecords: PatientRecord[]}) {  
    console.log(patientRecords)
    const uniquePatientRecords = patientRecords.reduce((acc, record) => {
        const key = record.patient_id
        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(record)
        return acc
    })
    /*const uniquePatientRecords = Array.from(new Set(patientRecords.map(record => record.patient_id)))
      .map(id => patientRecords.find(record => record.patient_id === id)!)
      .map(record => ({
        id: record.patient_id,
        name: record.patient_name,
        description: "",
        summary: "",
        medicines: patientRecords
          .filter(r => r.patient_id === record.patient_id)
          .map(r => ({
            name: r.medicine_name,
            dose: r.dose,
            count: r.count,
            time: r.time,
          })),
      }))*/
    return (
        <Tabs
          defaultValue={patientRecords[0].id}
          className="flex-col gap-4"
          orientation="vertical"
        >
          <TabsList className="scrollbar-hide flex min-h-[64px] w-full flex-col justify-start gap-2 overflow-x-auto pb-1 md:flex-row md:gap-0 md:overflow-visible">
            {patientRecords.map((patient) => (
              <TabsTrigger
                key={patient.id}
                value={patient.id}
                className="min-h-[56px] w-full flex-col gap-1 rounded-3xl px-4 py-3 text-left md:w-auto group-data-vertical/tabs:justify-center"
              >
                <span className="text-sm font-semibold text-foreground">
                  {patient.name}
                </span>
                {/*
                <span className="text-xs text-muted-foreground">
                  {patient.description}
                </span>*/}
              </TabsTrigger>
            ))}
          </TabsList>

          {patientRecords.map((patient) => (
            <TabsContent
              key={patient.id}
              value={patient.id}
              className="space-y-6"
            >
              <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Patient
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-foreground">
                        {patient.name}
                      </h2>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                      Daily record
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {patient.summary}
                  </p>
                </div>

                <div className="grid gap-3 rounded-3xl border border-border bg-card/90 p-6 shadow-sm">
                  <div className="rounded-3xl bg-muted/60 p-4">
                    <p className="text-xs tracking-[0.24em] text-muted-foreground uppercase">
                      Total medicines
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {patient.medicines.length}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-muted/60 p-4">
                    <p className="text-xs tracking-[0.24em] text-muted-foreground uppercase">
                      Primary schedule
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground">
                      Morning, evening, and all-day medicines shown in cards
                      below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {patient.medicines.map((medicine) => (
                  <div
                    key={medicine.name}
                    className="rounded-3xl border border-border bg-card/90 p-5 shadow-sm transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Medicine
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-foreground">
                          {medicine.name}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                          timeLabelClass(medicine.time as TimeLabel)
                        )}
                      >
                        {medicine.time}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">
                          Dose:
                        </span>{" "}
                        {medicine.dose}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Count:
                        </span>{" "}
                        {medicine.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
    )
}