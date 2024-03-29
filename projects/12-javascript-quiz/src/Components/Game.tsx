import { Card, List, ListItem, ListItemButton, ListItemText, Typography , Stack, IconButton} from '@mui/material'
import { useQuestionStore } from '../store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from '../types'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'


 const getBackgroundColor = (info:QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    //usario no ha seleccionado nada todavia
    if(userSelectedAnswer == null) return 'transparent'
    //si ya selecciono y es incorrecta
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    //Si es correcta
    if(index == correctAnswer) return 'green'
    //Si no es correcta
    if(index == userSelectedAnswer) return 'red'

    //Si no es ninguna de las anteriores 
    return 'transparent'
}

const Question = ({ info }: { info: QuestionType}) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer)
    
    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

   
    return(
        <Card variant='outlined' sx={{bgcolor:'#222', p:2, textAlign:'left', marginTop:4}}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighlighter language='javascript' style={gradientDark} >
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: '#333'}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} divider>
                        <ListItemButton 
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(index)} 
                            sx={{
                                backgroundColor: getBackgroundColor(info, index)
                            }}
                        >
                            <ListItemText primary={answer} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
} 
export const Game = () => {
    const questions = useQuestionStore( state => state.questions)
    const currentQuestion = useQuestionStore( state=> state.currentQuestion)
    const questionInfo = questions[currentQuestion]
    const goNextQuestion = useQuestionStore( state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionStore( state => state.goPreviousQuestion)
    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={ currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>

                {currentQuestion + 1 } / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={ currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos/>
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}