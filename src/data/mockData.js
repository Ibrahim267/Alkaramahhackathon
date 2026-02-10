export const classrooms = [
  { id: 1, name: "Class 1A", teacher: "Mr. Smith", students: 5 },
  { id: 2, name: "Class 2B", teacher: "Mrs. Johnson", students: 6 },
  { id: 3, name: "Class 3C", teacher: "Ms. Davis", students: 4 },
];

export const students = [
  {
    id: 1,
    name: "Ahmed Ali",
    age: 10,
    diagnosis: "Autism Level 2",
    guardian: "Fatima Ali",
    notes: "Requires visual aids for communication.",
    classroomId: 1,
  },
  {
    id: 2,
    name: "Sara Khan",
    age: 8,
    diagnosis: "Autism Level 1",
    guardian: "Yusuf Khan",
    notes: "Sensitive to loud noises.",
    classroomId: 1,
  },
  {
    id: 3,
    name: "Hassan Omar",
    age: 9,
    diagnosis: "Autism Level 1",
    guardian: "Omar Hassan",
    notes: "Needs frequent breaks.",
    classroomId: 2,
  },
  {
    id: 4,
    name: "Layla Ahmed",
    age: 7,
    diagnosis: "Autism Level 2",
    guardian: "Ahmed Layla",
    notes: "Uses PECS.",
    classroomId: 2,
  },
];

export const aetCategories = [
  { id: "comm", name: "Communication & Interaction" },
  { id: "semh", name: "Social, Emotional & Mental Health" },
  { id: "sensory", name: "Sensory & Physical" },
  { id: "cog", name: "Cognition & Learning" },
];

export const subjects = [
  "English",
  "Mathematics",
  "Science",
  "Art & Design",
  "Computing",
  "PE",
];

export const teacherResources = [
  { id: 1, title: "Classroom Visual Schedule", type: "PDF", date: "2023-10-25" },
  { id: 2, title: "Social Story: Going to Lunch", type: "DOCX", date: "2023-10-26" },
];
