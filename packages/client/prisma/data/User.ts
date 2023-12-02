interface InsertUser {
  username: string;
  password: string;
  name: string;
  role: string;
}

export const Users: InsertUser[] = [
  {
    username: "enzo",
    password: "enzo123",
    name: "Enzo Henrico",
    role: "student",
  },
  {
    username: "julia",
    password: "julia123",
    name: "Julia Ruiz",
    role: "student",
  },
  {
    username: "maria",
    password: "maria123",
    name: "Maria Santos",
    role: "teacher",
  },
  {
    username: "joao",
    password: "joao123",
    name: "Joao Costa",
    role: "teacher",
  },
];
