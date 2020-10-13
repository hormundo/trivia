import getHTML from "./getHTML.js";
import getResult from "./getResult.js";
import getPopup from "./getPopup.js";
import getToken from "./getToken.js";

let array = [];
let buttonsArray = [];
let myAnswers = [];
let categoryId;
let selectCategory;
let nQuestions;
let diffculty = "";
let url;
let $main = document.querySelector("main");
let questionsRight = 0;
let currentQuestion = 0;
let isAnswer = false;
let gameIsEnd = false;
let $progressBar;
let token;

const gameStart = () => {
let counter = setInterval(timer, 1000); 

    function timer() {
        if(!gameIsEnd) {
            $progressBar = document.getElementById("progress-bar");
            console.log($progressBar.value--);
        }

        if($progressBar.value <= 0) {
            myAnswers.push("");

            if(!isAnswer) {
                if (currentQuestion <= nQuestions) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: false,
                    });

                    Toast.fire({
                        icon: 'error',
                        title: 'Error'
                    });

                    nextQuestion();
                
                } else {
                    document.querySelector(".card").remove();
                    getResult($main, questionsRight, nQuestions, array, myAnswers);
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

const nextQuestion = () => {
    isAnswer = false;

    let card = `<div class="card col-12 mb-5"> 
                    <span class="badge badge-pill badge-primary">${++currentQuestion}/${nQuestions}</span>
                    <progress id="progress-bar" value="15" max="15"></progress>
                    <div class="card-body">
                    <div class="row">
                    <h6 class="card-title col-12 p-0">${array[currentQuestion-1].category}</h6>
                    <h6 class="card-title col-12 p-0">Diffculty: ${array[currentQuestion-1].difficulty}</h6>
                    </div> 
                    <p class="card-text">${array[currentQuestion-1].question}</p>
                    <div class="row buttons d-block">
                    </div>
                    </div>
                </div>
                <a href="index.html" class="btn btn-primary col-12" type="submit">Go to home</a>`;

    $main.innerHTML = card
                    
    for (let i = 0; i < buttonsArray[currentQuestion-1].length; i++) {
        document.querySelector(".buttons").appendChild(buttonsArray[currentQuestion-1][i]);
    }
}
          
document.addEventListener("DOMContentLoaded", async e => {
    
    try {
        let res = await fetch("https://opentdb.com/api_category.php");
        let json = await res.json();

        if (!res.ok) throw {status: res.status, statusText: res.statusText};

        let divsCat = document.querySelectorAll(".category");
        for (let i = 0; i < divsCat.length-1; i++) {
            divsCat[i+1].dataset.id = json.trivia_categories[i].id;
        };

    } catch(err) {
        let message = err.statusText || "Ocurrio un error";
        $main.innerHTML = `Error ${err.status} ${message}<br><a href="index.html" class="btn btn-primary col-12 mb-5 mt-1" type="submit">Back</a>`;
    }

    if(!token) {
        getToken();
    }

    fetch(`https://opentdb.com/api.php?amount=10&token=${token}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        if(json.response_code === 3) {
            getToken();
        }
    })
    .catch(err => {
        $main.innerHTML = `Error <br><a href="index.html" class="btn btn-primary col-12 mb-5 mt-1" type="submit">Retry again</a>`;
    })
})
  
document.addEventListener("click", e => {
    if(e.target.matches(".btn-question") || e.target.matches(".btn-question *")) {
        isAnswer = true;
        myAnswers.push(e.target.textContent)

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
                title: 'Nice!'
            });

            questionsRight++;

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
                title: 'Error!'
            });
        }

        setTimeout(() => {
            if(currentQuestion === nQuestions) {
            document.querySelector(".card").remove();
                gameIsEnd = true;
                
                getResult($main, questionsRight, nQuestions, array, myAnswers);
            } else {
                nextQuestion();
            }
        }, 1000);
    }

    if(e.target.matches(".category") || e.target.matches(".category *")) {
        categoryId = e.target.dataset.id || e.target.closest(".category").dataset.id;      
        selectCategory = e.target.innerText || e.target.nextElementSibling.innerText;
        
        getPopup(selectCategory);

        $('#exampleModalCenter').modal('show');
    }

    if(e.target.matches(".nQuestions") || e.target.matches(".category *")) {
        nQuestions = e.target.value;
    }

    if(e.target.matches(".diffculty") || e.target.matches(".category *")) {
        diffculty = e.target.value;
    }

    if(e.target.matches("#startGame")) {
        token = localStorage.getItem('token');

        if(!categoryId && !diffculty) {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}&token=${token}`;
        } else if (!diffculty) {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}&category=${categoryId}&token=${token}`;
        } else {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}&category=${categoryId}&difficulty=${diffculty}&token=${token}`;
        }
        
        $('#exampleModalCenter').modal('hide');

        fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            if(json.response_code === 4) {
                $main.innerHTML = `
                There are not enough questions  or you have already answered all the questions for the chosen category and difficulty, 
                press back to repeat the questions for the chosen category and difficulty<br><a href="index.html" class="btn btn-primary col-12 mb-5 mt-1" type="submit">Back</a>`;
                localStorage.removeItem('token');
                getToken();
            } else {
                array = JSON.parse(JSON.stringify(json.results)
                .replace(/&quot;/g, '\\"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&acute;/g, '`')
                .replace(/&eacute;/g, 'é')
                .replace(/&oacute;/g, 'ó')
                .replace(/&pound;/g, '£')
                .replace(/&aacute;/g, 'á')
                .replace(/&Aacute;/g, 'Á')
                .replace(/&ntilde;/g, 'ñ')
                .replace(/&rdquo;/g, '\\"')
                .replace(/&ouml;/g, 'ö')
                );
    
                array.forEach(e => {
                    let answers = [];
                    answers.push(e.correct_answer);
                    answers.push(...e.incorrect_answers);
        
                    const answerSort = (a, b) => {
                        return 0.5 - Math.random();
                    } 
        
                    let answerAleatory = answers.sort(answerSort);
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

                if(currentQuestion <= nQuestions) nextQuestion();
            }
        })
    }
})