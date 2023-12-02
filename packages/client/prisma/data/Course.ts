interface InsertCourse {
  title: string;
  description: string;
  teacherId: number;
  lengthInHours: number;
}

export const Courses: InsertCourse[] = [
  {
    title: "Introdução a IoT",
    description:
      "Introdução aos conceito de Internet das coisas e desenvolvimento de programas para dispositivs embarcados.",
    teacherId: 3,
    lengthInHours: 60,
  },
  {
    title: "Administração de processos de TI",
    description:
      "Conceitos avançados de administração para equipes de TI em desenvolvimento no mercado.",
    teacherId: 3,
    lengthInHours: 60,
  },
  {
    title: "Contabilidade",
    description: "Do básico ao avançado no mundo da contabilidade.",
    teacherId: 4,
    lengthInHours: 60,
  },
];
