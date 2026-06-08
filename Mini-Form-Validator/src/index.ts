type FormInput = {
    name: string;
    email: string;
    age: number;
};

type ValidationSuccess = {
    success: true;
    data: FormInput;
};

type ValidationError = {
    success: false;
    error: string[];
};

type ValidationResult = ValidationSuccess | ValidationError;

function isFormInput(input: any): input is FormInput {
    return (
        input !== null &&
        typeof input === "object" &&
        typeof input.name === "string" &&
        typeof input.email === "string" &&
        typeof input.age === "number"
    );
}

function validateInput(input: unknown): ValidationResult {
    if (!isFormInput(input)) {
        return {
            success: false,
            error: ["Invalid data structure or missing fields."],
        };
    }

    const error: string[] = [];
    if (input.name.trim() === "") error.push("Name cannot be empty.");
    if (!input.email.includes("@") || input.email !== input.email.toLowerCase()) error.push("Invalid email format.");
    if (input.age < 18) error.push("Must be at least 18 years old.");

    if (error.length > 0) {
        return {
            success: false,
            error,
        };
    }

    return { success: true, data: input };
}

function validate(input: unknown): void {
    const result = validateInput(input);

    if (result.success) {
        console.log("Success! Registered user:", result.data.name);
    } else{
        console.error("Validation Failed:", result.error.join(", "));
    }

}

validate({name: "Rudresh", email : "bamaniarudresh2008@gmail.com", age: 18});
validate({name: "", email : "Example@gmail.com", age: 16});
validate("Not an object");
validate({name: "Dharmik", email: "dharmik@test.com"});