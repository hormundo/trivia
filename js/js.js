import getHTML from "./getHTML.js";
import getResult from "./getResult.js";

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
                        title: 'Has fallado'
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
          
document.addEventListener("DOMContentLoaded", e => {
    fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then(res => {
        let divsCat = document.querySelectorAll(".category");
        
        for (let i = 0; i < divsCat.length-1; i++) {
            divsCat[i+1].dataset.id = res.trivia_categories[i].id;
        };
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
                title: 'Correcto'
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
                title: 'Has fallado'
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
        
        document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">${selectCategory}</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                <div class="flex flex-column">
                                                                    <p><p>Select total number of a questions.</p></p>
                                                                    <form class="d-flex p-0">
                                                                    <label><input class="nQuestions" type="radio" name="nQ" value=10 checked><span>10</span></label>
                                                                    <label><input class="nQuestions" type="radio" name="nQ" value=20><span>20</span></label>
                                                                    <label><input class="nQuestions" type="radio" name="nQ" value=30><span>30</span></label>
                                                                    <label><input class="nQuestions" type="radio" name="nQ" value=40><span>40</span></label>
                                                                    <label><input class="nQuestions" type="radio" name="nQ" value=50><span>50</span></label>
                                                                    </form>
                                                                </div>
                                                                
                                                                <div class="flex flex-column">
                                                                    <p><p>Select diffculty.</p></p>
                                                                    <form class="d-flex p-0">
                                                                    <label><input class="diffculty" type="radio" name="diffculty" value="any" checked><span>Any</span></label>
                                                                    <label><input class="diffculty" type="radio" name="diffculty" value="easy"><span>Easy</span></label>
                                                                    <label><input class="diffculty" type="radio" name="diffculty" value="medium"><span>Medium</span></label>
                                                                    <label><input class="diffculty" type="radio" name="diffculty" value="hard"><span>Hard</span></label>
                                                                    </form>
                                                                </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                <button id="startGame" type="button" class="btn btn-primary">Start game!</button>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>`);
        $('#exampleModalCenter').modal('show');
    }

    if(e.target.matches(".nQuestions") || e.target.matches(".category *")) {
        nQuestions = e.target.value;
    }

    if(e.target.matches(".diffculty") || e.target.matches(".category *")) {
        diffculty = e.target.value;
    }

    if(e.target.matches("#startGame")) {
        if(!categoryId && !diffculty) {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}`;
        } else if (!diffculty) {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}&category=${categoryId}`;
        } else {
            if(!nQuestions) nQuestions = 10;
            url = `https://opentdb.com/api.php?amount=${nQuestions}&category=${categoryId}&difficulty=${diffculty}`;
        }
        
        $('#exampleModalCenter').modal('hide');

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
            nextQuestion();
        });
    }
})