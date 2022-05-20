export interface IAnswer {
  id: string;
  question: string;
  userAnswers: string[];
  isCorrect?: boolean;
  userPoints: number;
  questionPoints: number;
  creationDate: Date;
  user: string;
  test: string;
  correctAnswers: string[];
  required: boolean;
  answerFeedback?: string;
}
