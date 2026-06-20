type TaskType = "bug" | "feature" | "chore";
type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
    id: number,
    title: string,
    type: TaskType,
    status: TaskStatus,
}

let tasks: Task[] = [];

type ValidationSuccess = {
    success: true;
    data: Task;
};

type ValidationError = {
    success: false;
    error: string[];
};

type ValidationResult = ValidationSuccess | ValidationError;

function isTaskInput(input: any): input is Task{
    return(
        input !== null && 
        typeof input === "object" &&
        typeof input.id === "number" &&    
        typeof input.title === "string" &&    
        (input.type === "bug" || input.type === "feature" || input.type === "chore") &&
        (input.status === "todo" || input.status === "in-progress" || input.status === "done")
    );
}

function validateTask(input: unknown): ValidationResult{
    if(!isTaskInput(input)){
        return {
            success: false,
            error: ["Invalid data structure or missing fields."],
        }
    }
    
    const error: string[] = [];

    if (input.title.trim() === "") {
        error.push("Title cannot be empty.");
    }

    if (error.length > 0) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
        data: input
    }
}

function addTask(input: unknown): void{
    const result = validateTask(input);

    if(result.success){
        console.log("Task created successfully, ", result.data.title);
        tasks.push(result.data);
    }
    else{
        console.log("Validation error: ", result.error.join(", "));
    }   
}

function updateStatus(id: number, newStatus: TaskStatus): void {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        console.log("Task not found.");
        return;
    }

    switch (newStatus) {
        case "todo":
        case "in-progress":
        case "done":
            task.status = newStatus;
            console.log(`Task status updated to ${newStatus}`);
            break;
        default:
            const _exhaustiveCheck: never = newStatus;
            console.error("Unhandled status");
    }
}

function getTaskByType(type: TaskType): Task[]{
    return tasks.filter((d) =>  d.type === type);
}