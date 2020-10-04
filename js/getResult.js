import getHTML from "./getHTML.js"
export default function geResult($main, questionsRight, nQuestions, array, myAnwers){
    
    getHTML({
        url:"result_trivia.html",
        success: (html) => {
        $main.innerHTML = html;
        document.querySelector(".card-body").innerHTML = `<h5 class="card-title">Please wait results...</h5><img src='tail-spin.svg' />`;
    
        setTimeout(() => {
          document.querySelector(".card-body").innerHTML = `<h5 class="card-title recuento">RESULTS:</h5>
                                                              <div class="rating">
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
            let percent = (questionsRight/nQuestions)*100;                     
            let intpercent = Math.round(percent);
            
            document.querySelector(".totalQuestions").textContent = `${nQuestions}`;
            document.querySelector(".score").textContent = `${intpercent}%`;
            document.querySelector(".correctAnswers").textContent = `${questionsRight}/${nQuestions}`;


            const $template = document.getElementById("card-template").content;
            const $fragment = document.createDocumentFragment();

            array.forEach((el, i) => {
              
              el.correct_answer === myAnwers[i]
              ? $template.querySelector(".resume").classList.add("right")
              : $template.querySelector(".resume").classList.add("wrong");

              $template.querySelector(".category").innerHTML = `Category: <strong>${el.category}</strong>`;
              $template.querySelector(".difficulty").innerHTML = `Difficulty: <strong>${el.difficulty}</strong>`;
              $template.querySelector(".question").innerHTML = `Question: <strong>${el.question}</strong>`;
              $template.querySelector(".correctAnswer").innerHTML = `Correct answer: <strong>${el.correct_answer}</strong>`;
              $template.querySelector(".myAnswer").innerHTML = `Your answer: <strong>${myAnwers[i] || "-"}</strong>`;

              let $clone = document.importNode($template, true);
              $fragment.appendChild($clone);

              $template.querySelector(".resume").classList.remove("right")
              $template.querySelector(".resume").classList.remove("wrong");

            });
           
            document.querySelector(".resumes").appendChild($fragment);

            if (intpercent === 0) {
              return
            }
            else if (intpercent <= 20) {
              document.getElementById("r5").checked = true;
            }
            else if (intpercent > 20 && intpercent <= 40) {
              document.getElementById("r4").checked = true;
            } 
            else if (intpercent > 40 && intpercent <= 60) {
              document.getElementById("r3").checked = true;
            }
            else if (intpercent > 60 && intpercent <=80) {
              document.getElementById("r2").checked = true;
            }
            else {
              document.getElementById("r1").checked = true;
            } 
          }, 500);
        }, 3000);
      },
    
        error: (err) => $main.innerHTML = `<h1>${err}</h1>`
    });
}