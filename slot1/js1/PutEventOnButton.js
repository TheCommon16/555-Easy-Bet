document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded (aspetta che tutta la pagina carichi)
    putbutton("levabutton");
    putbutton("autorollbutton");
    putbutton("betsizeminus");
    putbutton("betsizeplus");
    putbutton("corceimg");
});


function putbutton(buttonId) {
  let button = document.getElementById(buttonId);

  if (button && buttonId == "levabutton") {
    button.addEventListener("click",meccanismo);
  }

  if(button && buttonId == "autorollbutton"){
    button.addEventListener("click",autoroll);
  }

  if(button && buttonId == "betsizeminus"){
    button.addEventListener("click",downbetsize);
  }

  if(button && buttonId == "betsizeplus"){
    button.addEventListener("click",upbetsize);
  }

  if(button && buttonId == "corceimg"){
    button.addEventListener("click",returnhome);
  }


}