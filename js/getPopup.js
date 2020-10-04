export default function getPopup(selectCategory) {
    
     return document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
}