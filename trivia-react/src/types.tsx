export interface APIQuestionResponse {
  questions: DataType;
}

export type DataType = string[][];

export interface SubmitRequestBody {
  group: number;
  answer: string[];
}
export interface SubmitResponse {
  secret: string;
  verdict: boolean[];
}

export type Question = {
  question: string;
  correctAnswer: string;
  background: string;
};

export type QuestionGroup = {
  group: number;
  questions: Question[];
};

