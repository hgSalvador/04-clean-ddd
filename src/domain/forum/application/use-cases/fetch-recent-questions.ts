import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"


interface FetchRecentQuestionsUseCaseRequest {
    page: number
}

interface FetchRecentQuestionsUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        page,
    }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page })

        console.log('Use-case:', questions)
        return {
            questions
        }
    }
}