
document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded (aspetta che tutta la pagina carichi)
    loadloginRegistpopup();
    disconectaddfunction();
    divloginaddevent();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function disconectaddfunction(){
    let disc = document.getElementById("disconettiimg");
    if(disc){
        disc.addEventListener("click", disconetti);    
    }
}

function divloginaddevent(){
    let divlogin =  document.getElementById("balancediv");

    if(divlogin){
        divlogin.addEventListener("click", loginpopup);
    }
}

function loadloginRegistpopup(){
    //regist popup
    let button1 = document.getElementById("FormAccessRegistLoginpopup");
    let button2 = document.getElementById("FormAccessRegistButton");
    let closebutton1 = document.getElementById("closexregister");

    //login popup
    let button3 = document.getElementById("FormAccessLoginRegistpopup");
    let button4 = document.getElementById("FormAccessLoginButton");
    let closebutton2 = document.getElementById("closexlogin");

    if (button1) {
        button1.addEventListener("click", loginpopup);    
    }

    if (button2) {
        button2.addEventListener("click", userregister);    
    }

    if (button3) {
        button3.addEventListener("click", registpopup);    
    }

    if (button4) {
        button4.addEventListener("click", userlogin);   
    }

    if (closebutton1) {
        closebutton1.addEventListener("click", popupclose);
    }

    if (closebutton2) {
        closebutton2.addEventListener("click", popupclose);
    }
}


function loginpopup(){
     document.getElementById("pupregister").style.display = "none";
    document.getElementById("puplogin").style.display = "inline";

}


function registpopup(){
    document.getElementById("puplogin").style.display = "none";
    document.getElementById("pupregister").style.display = "inline";


}


function popupclose(){
    document.getElementById("puplogin").style.display = "none";
    document.getElementById("pupregister").style.display = "none";
}



var logincheck = 0;
async function userlogin(){
    if(logincheck == 0){
        logincheck = 1;
    
 console.log($("#FormAccessLogin").serialize());
            
 useralldata =   $("#FormAccessLogin").serialize().split("&");

 nickname = useralldata[0].split("="); 
 nick = nickname[1];

 password = useralldata[1].split("=");
 pass = password[1];

 await sleep(500); 
 $.ajax(
     {
         url: "/login",
         data: {usernick: nick, userpass:pass },
         xhrFields: { withCredentials: true }, 
         crossDomain: true,
         type:"POST",
         success:function(result)
         {
            logincheck = 0;
           
             resultt = result.respond.split(":");
             if(resultt[1] != 0){

                 
                 document.getElementById("userbalance").innerHTML = Number(resultt[3]);

                 document.getElementById("balancediv").removeEventListener("click",loginpopup);
                 
                 
                 popupclose();

                 
             }
             
     
             

             
         },
        error: function(xhr, status, error) {
                console.error("AJAX error:", status, error);
                logincheck = 0; // Reset check
        }
         




     });
     
    }
    else{

    }

}

function userregister(){
    console.log($("#FormAccessRegist").serialize().split("&"));
    useralldata =  $("#FormAccessRegist").serialize().split("&");

    nomeuser = useralldata[0].split("="); 
    nome = nomeuser[1];

    cognomeuser = useralldata[1].split("=");
    cognome = cognomeuser[1];

    nickname = useralldata[2].split("="); 
    nick = nickname[1];

    password = useralldata[3].split("=");
    pass = password[1];

    $.ajax(
        {
            url: "/regist",
            data: {username:nome, usercognome:cognome, usernick: nick, userpass:pass },
            type:"POST",
            xhrFields: { withCredentials: true }, 
            crossDomain: true,
            success:function(result)
            {
                    console.log(result);
                    realustt = result.respond.split(":");
                    if(realustt != 0){
                        document.getElementById("userbalance").innerHTML = 100;

                        document.getElementById("balancediv").removeEventListener("click",loginpopup);
                        popupclose();
                    }
                    else{

                    }
                    
                
            }




        });
}







function disconetti(){
    $.ajax(
        {
            url: "/disconect",
            type:"POST",
            xhrFields: { withCredentials: true }, 
            crossDomain: true,
            success:function(result)
            {

                document.getElementById("userbalance").innerHTML = "Login";
                document.getElementById("balancediv").addEventListener("click",loginpopup);
                console.log("Disconesso");
            }




        });
    
}