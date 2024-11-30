const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.add("activeQuiz"); 
  showQuetions(0);
  queCounter(1); 
  startTimer(15); 
  startTimerLine(0); 
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const dashboard_quiz = result_box.querySelector(".buttons .dashboard");


restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); 
  result_box.classList.remove("activeResult"); 
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_numb); 
  clearInterval(counter); 
  clearInterval(counterLine); 
  startTimer(timeValue); 
  startTimerLine(widthValue); 
  timeText.textContent = "Time Left"; 
  next_btn.classList.remove("show");
};


dashboard_quiz.onclick = () => {
  window.location = "dashboard.html"; 
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++; 
    que_numb++; 
    showQuetions(que_count); 
    queCounter(que_numb);
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue);
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show"); 
  } else {
    clearInterval(counter); 
    clearInterval(counterLine); 
    showResult(); 
  }
};

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter); 
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Resposta correta.");
    console.log("Suas respostas corretas = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Resposta errada.");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct"); 
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Selecionado a opção correta.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show"); 
}

function cadastrarPontos(pontos) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO"); 
  sessionStorage.setItem("Pontos", pontos); 

  if (!idUsuario) {
    console.error("ID do usuário não encontrado.");
    return;
  }

  fetch("/quiz/cadastrarPontos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pontos: pontos, idUsuario: idUsuario }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta do servidor:", data);
      if (data.error) {
        console.error("Erro ao cadastrar pontos:", data.error);
      } else {
        console.log("Pontos cadastrados com sucesso:", data);
      }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar pontos:", error);
    });
}

function showResult() {
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult"); 
  const scoreText = result_box.querySelector(".score_text");
  if (userScore === 10) {
    let scoreTag =
      "<span>Parabéns Tricolor! Você gabaritou o quiz! <p>" + userScore + "</p> de <p>" + questions.length + "</p></span>";
    scoreText.innerHTML = scoreTag; 
  } else if (userScore >= 8) {
    let scoreTag =
      "<span>Parabéns São Paulino! Você acertou <p>" + userScore + "</p> de <p>" + questions.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 5) {
    let scoreTag =
      "<span>Parebéns Soberano! Você acertou <p>" + userScore + "</p> de <p>" + questions.length + "</p></span>"; 
      scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Parabéns Torcedor! Pode melhorar hein, você acertou <p>" + userScore + "</p> de <p>" + questions.length + "</p></span>";
    scoreText.innerHTML = scoreTag;
  }

  cadastrarPontos(userScore);
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; 
    time--; 
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; 
    }
    if (time < 0) {
      clearInterval(counter); //clear counter
      timeText.textContent = "O tempo acabou!"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Tempo acabou: Esta é a opção correta.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questões</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
