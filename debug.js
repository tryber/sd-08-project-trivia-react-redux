const axios = require('axios');
const fs = require('fs');

const DEF_QUESTION_AMOUNT = 5;

const aaaa = {
  category: '',
  type: '',
  question: '',
  answers: [
    {
      answer: 'Psychoanalysis',
      isCorrect: true,
    },
    //---------
    {
      answer: 'Psychoanalysis',
      isCorrect: false,
    },
  ],
};

const retriveApiToken = async () => {
  const response = await axios.get(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { data } = response;
  return data.token;
};

const parseQuestion = async (question) => ({
  category: question.category,
  type: question.type,
  question: question.question,
  answers: [{
    answer: question.correct_answer,
    isCorrect: true,
  },
  ...question.incorrect_answers.map((i) => ({
    answers: i,
    isCorrect: false,
  })),
  ],
});

const getQuestions = async (amount = DEF_QUESTION_AMOUNT) => {
  const token = await retriveApiToken();
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { data } = response;
  return Promise.all(data.results.map((question) => parseQuestion(question)));
};

const debug = async () => {
  const res = await getQuestions(200);
  fs.writeFileSync('questions.json', JSON.stringify(res));
  // console.log(JSON.stringify(res));
};

debug();
