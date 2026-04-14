"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createMedicationRecord, getMedicines, getPatients } from "@/lib/actions";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Page() {
    const router = useRouter();
    const [patients, setPatients] = React.useState<Record<string, any>[]>([]);
    const [medicines, setMedicines] = React.useState<Record<string, any>[]>([]);
    const [patientId, setPatientId] = React.useState("");
    const [medicationId, setMedicationId] = React.useState("");
    const [dose, setDose] = React.useState("");
    const [time, setTime] = React.useState("");
    const [dateFrom, setDate] = React.useState<Date | undefined>(new Date());
    const [dateTo, setDateTo] = React.useState<Date | undefined>(new Date());

    React.useEffect(() => {
        getPatients().then(setPatients)
        getMedicines().then(setMedicines)
    }, []);

    return (
        <div className="min-h-screen bg-background px-6 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                    Create Medication Record
                </h1>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Create Medication Record </CardTitle>
                        <CardDescription>Form for creating a new medication record will be implemented here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="create-medication-form" action={createMedicationRecord}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <label htmlFor="patient" className="w-24 text-sm font-medium text-foreground">Patient:</label>
                                    <Select name="patient_id" required value={patientId} onValueChange={setPatientId}>
                                        <SelectTrigger className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {patients.map((patient) => (
                                                    <SelectItem key={patient.id} value={String(patient.id)}>{patient.name}</SelectItem>
                                                ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="medication" className="w-24 text-sm font-medium text-foreground">Medication:</label>
                                    <Select name="medication_id" required value={medicationId} onValueChange={setMedicationId}>
                                        <SelectTrigger className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select medication" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {medicines.map((medicine) => (
                                                    <SelectItem key={medicine.id} value={String(medicine.id)}>{medicine.name}</SelectItem>
                                                ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="quantity" className="w-24 text-sm font-medium text-foreground">Date from:</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button type="button" variant="outline">{dateFrom ? format(dateFrom, "yyyy-MM-dd") : "Select Date"}</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar mode="single" selected={dateFrom} onSelect={setDate} defaultMonth={dateFrom} />
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" name="date_from" value={dateFrom ? format(dateFrom, "yyyy-MM-dd") : ""} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="quantity" className="w-24 text-sm font-medium text-foreground">Date to:</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button type="button" variant="outline">{dateTo ? format(dateTo, "yyyy-MM-dd") : "Select Date"}</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} defaultMonth={dateTo} />
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" name="date_to" value={dateTo ? format(dateTo, "yyyy-MM-dd") : ""} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="dose" className="w-24 text-sm font-medium text-foreground">Dose:</label>
                                    <input type="text" id="dose" name="dose" value={dose} onChange={(e) => setDose(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="time" className="w-24 text-sm font-medium text-foreground">Time:</label>
                                    <Select name="time" required value={time} onValueChange={(value) => setTime(value)}>
                                        <SelectTrigger className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="morning">Morning</SelectItem>
                                                <SelectItem value="evening">Evening</SelectItem>
                                                <SelectItem value="allDay">All Day</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="flex gap-2">
                            <button form="create-medication-form" type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
                                Create Record
                            </button>
                            <button type="button" className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary" onClick={() => {
                                router.back();
                            }}>
                                Cancel
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}