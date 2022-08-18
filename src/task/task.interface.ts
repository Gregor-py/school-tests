import { AnswerModel } from '../answer/model/answer.model';
import { Ref } from '@typegoose/typegoose';

export type TaskType = TaskOneFromMany | TaskManyFromMany | TaskWrittenAnswer | TaskNumberAnswer;

export interface TaskOneFromMany {
  answerVariants: Ref<AnswerModel>[];
  correctAnswer: Ref<AnswerModel> | null;
}

export interface TaskManyFromMany {
  answerVariants: Ref<AnswerModel>[];
  correctAnswer: Ref<AnswerModel>[] | null;
}

export interface TaskWrittenAnswer {
  correctAnswer: string;
}

export interface TaskNumberAnswer {
  correctAnswer: number;
}
