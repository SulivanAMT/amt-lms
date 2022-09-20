import { repoGetExamByCourse, repoGetQuestionByExam, repoGetQuestionExamById } from "../repositories/ExamRepository.js";
import { repoGetLessonByCourse } from "../repositories/LessonRepository.js";
import { repoGetQuestionByQuiz, repoGetQuestionQuizById, repoGetQuizByCourse } from "../repositories/QuizRepository.js";
import multer from "multer";
import { repoGetQuestionByQuizContest, repoGetQuestionQuizContestById } from "../repositories/QuizContestRepository.js";

export const errMsg = (msg) => {
    return JSON.stringify(msg) === '{}' ? msg.stack : msg;
}

export const lower = (str) => {
    return str.toLowerCase();
}

export const getProgress = async(courseId) => {
    const lessons = await repoGetLessonByCourse(courseId);
    const quiz = await repoGetQuizByCourse(courseId);
    const exams = await repoGetExamByCourse(courseId);
    let countLesson = 0;
    if(lessons){
        lessons.forEach((item, index) => {
            lessons[index].lessons_details.forEach(() => {
                countLesson ++;
            });
        });
    }
    let progress = 100 / (countLesson + quiz.length + exams.length);
    return parseFloat(progress.toFixed(2));
}

export const calculatePointQuestion = async(questionId, questionType, type) => {
    const passMultiple = 70; // % an utk pg
    const passEsay = 30; // % an utk essay
    const passAll = 100; // % an utk semua jika hanya ada soal pg tidak ada essay begitu juga sebaliknya
    let question, allQuestion;
    if(type == 'Exam'){
        question = await repoGetQuestionExamById(questionId);
        allQuestion = await repoGetQuestionByExam(question.exam_id);
    }
    else if(type == 'Quiz') {
        question = await repoGetQuestionQuizById(questionId);
        allQuestion = await repoGetQuestionByQuiz(question.quiz_id);
    }
    else if(type == 'Quiz Contest') {
        question = await repoGetQuestionQuizContestById(questionId);
        allQuestion = await repoGetQuestionByQuizContest(question.quiz_contest_id)   
    }
    let multipleTotal = 0;
    let essayTotal = 0;
    let calcPoint;
    allQuestion.forEach((item, index) => {
        if(allQuestion[index].question_type == 'Multiple Choice'){
            multipleTotal++;
        }else{
            essayTotal++;
        }
    });
    const passPoint = questionType == 'Multiple Choice' ? passMultiple : passEsay;
    const passQuestion = questionType == 'Multiple Choice' ? multipleTotal : essayTotal;
    calcPoint = passAll / passQuestion;
    if(multipleTotal > 0 && essayTotal > 0){
        calcPoint = passPoint / passQuestion;
    }
    return calcPoint;
}