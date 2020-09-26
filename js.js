
let array = [];
let buttonsArray = [];
const d = document;
let $form = d.querySelector("form");
let $selectCategory = d.getElementById("selectCategory");
let $nQuestions = d.getElementById("nQuestions");
let url;
let $main = d.querySelector("main");
let questionsRight = 0;
let questionsWrong = 0;
let currentQuestion = 0;
let isAnswer = false;
let gameIsEnd = false;
let $progressBar
const gameStart = () => {
  let counter = setInterval(timer, 1000); 


    function timer() {
  if( !gameIsEnd) {
    
     $progressBar = d.getElementById("progress-bar");
  console.log($progressBar.value--);
  }
  

  if($progressBar.value <= 0) {

    if(!isAnswer) {
      if (currentQuestion <= parseInt($nQuestions.value)-1) {
      const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
    });

      Toast.fire({
      icon: 'error',
      title: 'Has fallado'
    });

      nextQuestion();
     
    } else {
      document.querySelector(".card").remove();

      getHTML({
          url:"result_trivia.html",
          success: (html) => {
          $main.innerHTML = html
          document.querySelector(".card-body").innerHTML = `<h5 class="card-title">Haciendo recuento...</h5><img src='tail-spin.svg' />`

          setTimeout(() => {
            document.querySelector(".card-body").innerHTML = `<h5 class="card-title recuento">Has acertado: ${questionsRight} respuestas.</h5><div class="rating">

            <input type="radio" name="rating" id="r1">
            <label for="r1"></label>

            <input type="radio" name="rating" id="r2">
            <label for="r2"></label>

            <input type="radio" name="rating" id="r3">
            <label for="r3"></label>

            <input type="radio" name="rating" id="r4">
            <label for="r4"></label>

            <input type="radio" name="rating" id="r5">
            <label for="r5"></label>

            </div>`;
          }, 3000);
        },

          error: (err) => $main.innerHTML = `<h1>${err}</h1>`
      });
    }
    
  } 
}

function StopFunction() {
  clearInterval(counter);
}

function ReStartFunction() {
    clearInterval(counter);
    window.counter=setInterval(timer, 1000); 
}
  }

  
} 

const getHTML = (options) => {
  
      let {url, success, error} = options;

      const xhr = new XMLHttpRequest;

      xhr.addEventListener("readystatechange", e => {
          if(xhr.readyState !== 4) return;

          if(xhr.status >= 200 && xhr.status < 300) {
              let html = xhr.responseText;
              success(html); 
          } else {
              let message = xhr.statusText || "Ocurrió un error";
              error(`Error ${xhr.status}: ${message}`);
          }
      });

      xhr.open("GET", url);
      xhr.setRequestHeader("Content-type","text/html; charset=utf-8;");
      xhr.send()
  }

const nextQuestion = () => {
  isAnswer = false;

  let card = `<div class="card col-10"> 
                <span class="badge badge-pill badge-primary">${++currentQuestion}/${$nQuestions.value}</span>
                <progress id="progress-bar" value="10" max="10"></progress>
                <div class="card-body">
                  <h5 class="card-title">${array[currentQuestion-1].category}</h5>
                  <p class="card-text">${array[currentQuestion-1].question}</p>
                  <div class="row buttons d-block">
                  </div>
                </div>
              </div>
              <a href="index.html" class="btn btn-primary col-9" type="submit">Ir a inicio</a>`;

  $main.innerHTML = card
                
  for (let i = 0; i < buttonsArray[currentQuestion-1].length; i++) {
    document.querySelector(".buttons").appendChild(buttonsArray[currentQuestion-1][i]);
  }
}

d.addEventListener("DOMContentLoaded", e => {
  fetch("https://opentdb.com/api_category.php")
  .then(res => res.json())
  .then(res => {
    res.trivia_categories.forEach(e => {
        const $option = d.createElement("option");
        $option.value = e.id; 
        $option.textContent = e.name;

        $selectCategory.appendChild($option);
    });
  })
})

d.addEventListener("submit", e => {      
  e.preventDefault();
  $form.classList.add("none");

  if($selectCategory.value === "any") {
      url = `https://opentdb.com/api.php?amount=${$nQuestions.value}`;
  } else {
      url = `https://opentdb.com/api.php?amount=${$nQuestions.value}&category=${$selectCategory.value}`;
  }

  fetch(url)
  .then(res => res.json())
  .then(res => {
    array = res.results;
    
    res.results.forEach(e => {
      let answers = [];
      answers.push(e.correct_answer);
      answers.push(...e.incorrect_answers);

      const answerSort = (a, b) => {
        return 0.5 - Math.random();
      } 

      answerAleatory = answers.sort(answerSort);
      let buttons = [];
      
      for (let i = 0; i < answers.length; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "btn-question","col-12")
        button.textContent = answerAleatory[i]
        if(answerAleatory[i] === e.correct_answer) {
          button.dataset.question = "true";
        } else {
          button.dataset.question = "false";
        }
        buttons.push(button)
      }
      buttonsArray.push(buttons);
    });

    gameStart();

    nextQuestion();
  });
});

d.addEventListener("click", e => {
  
  if(e.target.matches(".btn-question") || e.target.matches(".btn-question *")) {

    isAnswer = true;
    
    document.querySelectorAll(".btn-question").forEach(e => {
      e.disabled = true;
    })

    if(e.target.dataset.question === "true" || e.target.closest(".btn-question").dataset.question === "true") {
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
      });

        Toast.fire({
        icon: 'success',
        title: 'Correcto'
      });
      
      console.log(`Respues acertadas ${++questionsRight}`)

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
      });

        Toast.fire({
        icon: 'error',
        title: 'Has fallado'
      });

      console.log(`Respues falladas ${++questionsWrong}`)
    }

    setTimeout(() => {
      if(currentQuestion === parseInt($nQuestions.value)) {
      document.querySelector(".card").remove();
        gameIsEnd = true;
      getHTML({
          url:"result_trivia.html",
          success: (html) => {
            $main.innerHTML = html
            document.querySelector(".card-body").innerHTML = `<h5 class="card-title">Haciendo recuento...</h5><img src='tail-spin.svg' />`

            setTimeout(() => {
              document.querySelector(".card-body").innerHTML = `<h5 class="card-title recuento">Has acertado: ${questionsRight} respuestas.</h5><div class="rating">

              <input type="radio" name="rating" id="r1" disabled>
              <label for="r1"></label>

              <input type="radio" name="rating" id="r2" disabled>
              <label for="r2"></label>

              <input type="radio" name="rating" id="r3" disabled>
              <label for="r3"></label>

              <input type="radio" name="rating" id="r4" disabled>
              <label for="r4"></label>

              <input type="radio" name="rating" id="r5" disabled>
              <label for="r5"></label>

              </div>`;
              
              setTimeout(() => {
                let percent = (questionsRight/parseInt(($nQuestions).value))*100;
                                              
              let intpercent = Math.round(percent);
              
              if (intpercent === 0) {
                return
              }
              else if (intpercent <= 20) {
                d.getElementById("r5").checked = true;
              }
              else if (intpercent > 20 && intpercent <= 40) {
                d.getElementById("r4").checked = true;
              } 
              else if (intpercent > 40 && intpercent <= 60) {
                d.getElementById("r3").checked = true;
              }
              else if (intpercent > 60 && intpercent <=80) {
                d.getElementById("r2").checked = true;
              }
              else {
                d.getElementById("r1").checked = true;
              }
              }, 500);
              

            }, 3000);
          },
          error: (err) => $main.innerHTML = `<h1>${err}</h1>`
      });
    } else {
      nextQuestion();
    }
    }, 1000);

  }
})

$form.addEventListener("keyup", e => {
  (parseInt($nQuestions.value) < 1 || $nQuestions.value === "")  ? d.getElementById("startGame").disabled = true : d.getElementById("startGame").disabled = false;
})

