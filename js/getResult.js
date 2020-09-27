import getHTML from "./getHTML.js"

export default function geResult($main, questionsRight, $nQuestions){
    
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
}
