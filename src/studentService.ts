import type { Student, studentInput } from "./types.js";

const students: Student[] = [];
let nextId = 1;

export const addStudent = (input: studentInput): Student => {
    const student: Student = {
        id: nextId,
        ...input
    }
    nextId++;
    students.push(student);
    return student;
}

export const getStudents = (): Student[] => {
    return students.map(student => ({ ...student }));
}

// export const getssStudents = (): Student[] => {
//     return students
// }

export const getStudentById = (id: number): Student | undefined => {
    const student = students.find((currentStudent) => currentStudent.id === id);
    return student ? { ...student } : undefined;
}

export const updateStudent = (id: number, input: studentInput): Student | undefined => {
    const student = students.find((currentStudent) => currentStudent.id === id);

    if (!student) {
        return undefined;
    }

    Object.assign(student, input);
    return student;
}
