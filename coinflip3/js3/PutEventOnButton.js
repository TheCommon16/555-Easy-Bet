document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded (aspetta che tutta la pagina carichi)
    putbutton("flipbutton");
    putbutton("corceimg");
});


function putbutton(buttonId) {
  let button = document.getElementById(buttonId);

  if (button && buttonId == "flipbutton") {
    button.addEventListener("click",meccanismo);
  }

  if(button && buttonId == "corceimg"){
    button.addEventListener("click",returnhome);
  }


}