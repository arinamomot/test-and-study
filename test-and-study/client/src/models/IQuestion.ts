export interface IQuestion {
  id: string;
  test: string;
  questionText: string;
  questionType: string;
  note: string;
  options: string[];
  points: number;
  topic: string;
  correctAnswer: string[];
  required: boolean;
  open?: boolean;
  answer?: boolean;
  answerFeedback?: string;
}
