import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { EditAnswerUseCase } from "./edit-answer"
import { UniqueEntityID } from "@/core/entities/unique.entity-id"

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase


describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
        authorId: new UniqueEntityID('author-1')
    }, 
    new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-1',
        content:'Conteudo teste'
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
        content: 'Conteudo teste'
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
        authorId: new UniqueEntityID('author-1')
    }, 
    new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
        return sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: 'author-2',
            content:'Conteudo teste'
        })
    }).rejects.toBeInstanceOf(Error)
  })
})