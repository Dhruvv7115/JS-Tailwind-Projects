document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const questionContainer = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const optionsList = document.getElementById('options-list');
  const resultContainer = document.getElementById('result-container');
  const scoreDisplay = document.getElementById('score');

  const questions = [
    {
      question: 'What is the capital of India?',
      options: ['Lahore', 'Mumbai', 'New Delhi', 'Punjab'],
      answer: 'New Delhi'
    },
    {
      question: 'Which of the following is a dwarf planet?',
      options: ['Mars', 'Jupiter', 'Saturn', 'Pluto'],
      answer: 'Pluto'
    }, 
    {
      question: 'Who wrote the song of ice and fire?',
      options: ['George R.R Martin', 'Shakespeare', 'Franz Kafka', 'Robert Frost'],
      answer: 'George R.R Martin'
    }, 
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', () => {
    const listItems = document.querySelectorAll('li');
    listItems.forEach((listItem) => {
      if(listItem.classList.contains('selected')){
        compareOption(listItem.textContent);
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
          showQuestions();
        }else{
          showResult();
        }
      }
    });
    
  });
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
  });

  optionsList.addEventListener('click', () => {

  });

  function startQuiz(){
    startBtn.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    questionContainer.classList.add('flex');
    resultContainer.classList.add('hidden');
    showQuestions();
  }

  function showQuestions(){
    nextBtn.classList.add('hidden');
    questionText.textContent = questions[currentQuestionIndex].question;
    optionsList.innerHTML = '';
    let ids = 0;
    questions[currentQuestionIndex].options.forEach((option) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.id = ids;
      ids++;
      li.addEventListener('click', () => {
        highlightOption(li.id);
      });
      optionsList.appendChild(li);
      nextBtn.classList.remove('hidden');
    });
  }
  function compareOption(opt){
    const correctAnswer = questions[currentQuestionIndex].answer;
    if(opt === correctAnswer){
      score++;
    }
  }

  function showResult(){
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('flex');
    scoreDisplay.textContent = `${score} out of ${questions.length}`
  }

  function highlightOption(ID){
    const listItems = document.querySelectorAll('li');
    listItems.forEach((li) => {
      if(li.id === ID){
        li.classList.add('selected');
      }else{
        li.classList.remove('selected')
      }
    })
  }
});