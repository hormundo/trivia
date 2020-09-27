import getHTML from "./getHTML.js"

export default function geResult($main, questionsRight){
    
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
