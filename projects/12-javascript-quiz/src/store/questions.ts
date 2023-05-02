import { create } from "zustand";
import { type Question } from "../types";
import { persist } from "zustand/middleware";
import confetti from 'canvas-confetti'
interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit:number) => Promise<void>
    selectAnswer: (questionId:number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}


export const useQuestionStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit:number) => {
            const res =  await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId:number, answerIndex: number) => {
            const { questions } = get()
            //Clonamos el objeto con el structuredClone
            const newQuestions = structuredClone(questions)
            //Encontramos el índice de la pregunta cuyo id sea el que recibe por parametro
            const questionIndex = newQuestions.findIndex((q: { id: number; }) => q.id === questionId)
            //Obtenemos la información de la pregunta, 4 opciones posibles
            const questionInfo = newQuestions[questionIndex]
            //Averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if(isCorrectUserAnswer) confetti()
            //Cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            //Actualizar el estado
            set({questions: newQuestions})
        },
        goNextQuestion: () => {
            const { currentQuestion, questions} = get()
            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length){
                set({currentQuestion: nextQuestion})
            }
        },
        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if(previousQuestion >= 0){
                set({currentQuestion: previousQuestion})
            }
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [] })
        }
    }
}, {
        name: 'questions'
    
}))