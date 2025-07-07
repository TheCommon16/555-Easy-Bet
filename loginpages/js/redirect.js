document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded (aspetta che tutta la pagina carichi)
    RedirectToAnotherPage("leaderboardbutton");
    AttachGameClickHandlers();
});

function RedirectToAnotherPage(buttonId) {
  let button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener("click",redirectfunction);
  }
}

function AttachGameClickHandlers() {
  let games = document.querySelectorAll(".game");

  games.forEach(function (gameDiv) {
    gameDiv.addEventListener("click",redirectfunction);
  });
}


function redirectfunction(event){
    let targetElement = event.currentTarget;
    let pageselected = targetElement.getAttribute("name");
  

        $.ajax({
          url: "/slotredirect",
          type: "POST",
          data: { pagesel: pageselected },
          xhrFields: { withCredentials: true }, 
         crossDomain: true,
          success: function (result) {
            if (result.redirect != "nologin") {
              window.location.href = result.redirect;
            }
            else{
              loginpopup();
            }
          }
        });
 
}




