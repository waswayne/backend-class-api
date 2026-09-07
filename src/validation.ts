import type { studentInput } from "./types.js";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

type ValidationResult =
    | { success: true, data: studentInput }
    | { success: false; message: string }


export function validateStudentInput(value: unknown): ValidationResult {
    if (!isRecord(value)) {
        return { success: false, message: " body must be in json object" }
    }


    //reject unexpected keys
    const allowedKeys = ["name", "age", "email", "status", "course"]
    for (const key of Object.keys(value)) {
        if (!allowedKeys.includes(key)) {
            return { success: false, message: "unexpected field " + key }
        }
    }

    if (typeof value.name !== "string" || value.name.trim() === "") {
        return { success: false, message: "name must be a non-empty string" }
    }

    if (typeof value.age !== "number" || !Number.isInteger(value.age) || value.age < 1 || value.age > 60) {
        return { success: false, message: "age must be an integer between 1 and 60" }
    }

    if (value.email !== undefined) {
        if (typeof value.email !== "string" || value.email.trim() === "") {
            return { success: false, message: "email must be a non-empty string" }
        }
    }

    //approved object
    return { success: true, data: value as studentInput };

}
