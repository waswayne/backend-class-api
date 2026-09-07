import express, {
    type Express,
    type Request,
    type Response
} from "express"
import type { studentInput } from "./types.js"
import { addStudent, getStudents, getStudentById, updateStudent, deleteStudent} from "./studentService.js"
import { validateStudentInput } from "./validation.js"


const app :Express = express()
const port = 4000

app.use(express.json()) 

//add a new student
app.post("/students", (request: Request, response: Response) => {
    const result = validateStudentInput(request.body)
    if (!result.success) {
        response.status(400).json({ message: result.message })
        return //do not continue if validation fails
    }

    const student = addStudent(result.data)
    response.status(201).json(student)
    
    // const input: studentInput = request.body
    // const student = addStudent(input)
    // response.status(201).json(student)
})


//get all students
app.get("/students", (request: Request, response: Response) => {
    const students = getStudents()
    response.status(200).json(students)
})

//get a student by id
app.get("/students/:id", (request: Request, response: Response) => {
   const id = Number(request.params.id) 
   const student = getStudentById(id)  

   if (!student) {
    response.status(404).json({ message: "Student not found" })
    return
   }
   response.status(200).json(student)
})

//update a student by id
app.put("/students/:id", (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const input: studentInput = request.body
    const student = updateStudent(id, input) 
    
    if (!student) {
        response.status(404).json({ message: "Student not found" })
        return
    }
    response.status(200).json(student)
})

//deleted student
app.delete("/students/:id", (request: Request, response: Response) => { 
    const id = Number(request.params.id)
    const student = deleteStudent(id)

    if (!student) {
        response.status(404).json({ message: "Student not found" })
        return
    }
    response.status(200).json({
        message: "Student deleted successfully",
        student: student
    })
})




app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Server is running very well")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})