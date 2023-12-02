interface InsertQuestion {
  content: string;
  createdBy: string;
  replyId?: number;
  courseId: number;
  replied: boolean;
}

export const Questions: InsertQuestion[] = [
  {
    content:
      "Como a conectividade entre dispositivos na Internet das Coisas facilita o nosso cotidiano?",
    createdBy: "Julia Ruiz",
    courseId: 1,
    replied: false,
  },
  {
    content:
      "Qual é a diferença entre contabilidade financeira e contabilidade gerencial? Como essas duas áreas se diferenciam em termos de propósito, audiência e métodos de relatórios financeiros?",
    createdBy: "Enzo Henrico",
    courseId: 2,
    replied: false,
  },
  {
    content:
      "Como a implementação de frameworks como o COBIT (Control Objectives for Information and Related Technologies) ou o ITIL (Information Technology Infrastructure Library) pode melhorar a eficiência e a qualidade dos processos de TI em uma organização? Quais são os principais desafios na adoção desses frameworks?",
    createdBy: "Julia Ruiz",
    courseId: 3,
    replied: false,
  },
  {
    content: "Quais tipos de dispositivo existem?",
    createdBy: "Enzo Henrico",
    courseId: 1,
    replied: false,
  },
  {
    content:
      "A contabilidade é aplicavel somente em empresas ou também no nosso dia a dia?",
    createdBy: "Julia Ruiz",
    courseId: 2,
    replied: false,
  },
  {
    content:
      "E essencial a inclusão de toda a equipe de TI, até mesmo os menos experientes, tomada de decisões sobre novas tecnologias no projeto da empresa em um contexto de escalabilidade?",
    createdBy: "Enzo Henrico",
    courseId: 3,
    replied: false,
  },
];
