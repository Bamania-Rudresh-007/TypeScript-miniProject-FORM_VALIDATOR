const students = [
    { id: 1, name: "Alice", score: [85, 90, 78], letterGrade: '' },
    { id: 2, name: "Bob", score: [92, 88, 95], letterGrade: '' },
    { id: 3, name: "Charlie", score: [70, 75, 80], letterGrade: '' },
    { id: 4, name: "Jack", score: [40, 55, 20], letterGrade: '' },
];
// Takes an array of test scores and returns the average number.
function calculateAverage(score) {
    if (score.length === 0)
        return 0;
    let sum = 0;
    for (const currentScore of score) {
        sum += currentScore;
    }
    return sum / score.length;
}
// Loops through your students, calculates their average score, determines their letter grade (A for >=90, B for >=80, etc.), updates the student's letterGrade property, and returns the updated list.
function assignLetterGrades(student) {
    student.forEach((s) => {
        const average = calculateAverage(s.score);
        if (average >= 90) {
            s.letterGrade = 'A';
        }
        else if (average >= 80) {
            s.letterGrade = 'B';
        }
        else if (average >= 70) {
            s.letterGrade = 'C';
        }
        else if (average >= 60) {
            s.letterGrade = 'D';
        }
        else if (average >= 40) {
            s.letterGrade = 'E';
        }
        else if (average < 40) {
            s.letterGrade = 'F';
        }
    });
    return student;
}
// Filters and returns a brand new array containing only the students who got an 'F'.
function getFailingStudents(students) {
    const filterStudents = students.filter((e) => e.letterGrade === 'F');
    if (filterStudents.length === 0) {
        console.log("No students found with F grade.");
    }
    return filterStudents;
}
// This function must loop through the students, find the single student with the highest average score, and return that specific student object. If the list is empty, return the string "No students available"
function getTopStuent(student) {
    if (student.length === 0) {
        return "No students available";
    }
    let highest = 0;
    let detail = {};
    student.forEach((e) => {
        const avg = calculateAverage(e.score);
        if (avg > highest) {
            highest = avg;
            detail = {};
            detail = e;
        }
    });
    return detail;
}
function getGradeDistribution(student) {
    const grades = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
        'F': 0
    };
    const withGradesStudents = assignLetterGrades(student);
    withGradesStudents.forEach((s) => {
        if (s.letterGrade) {
            grades[s.letterGrade] += 1;
        }
    });
    return grades;
}
// log all the details...
console.log("All Students list: ");
console.log(students);
console.log("\n\nAverage of alice: ", calculateAverage(students[0]?.score ?? []));
console.log("\n\nStudents with there letterGrade: \n", assignLetterGrades(students));
console.log("\n\nStudents who are failed: \n", getFailingStudents(students));
console.log("\n\nHeighest Average score: \n", getTopStuent(students));
console.log("\n\nDistributed Grades: \n", getGradeDistribution(students));
export {};
//# sourceMappingURL=index.js.map