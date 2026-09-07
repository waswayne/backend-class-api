export type StudentStatus = "active" | "inactive" | "suspended"


export interface Student {
    id: number,
    name: string,
    age: number,
    email?: string,
    status: StudentStatus,
    course: string
}

 export type studentInput = Omit<Student, "id">