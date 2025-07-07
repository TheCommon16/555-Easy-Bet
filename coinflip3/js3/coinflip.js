function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var check = 0;

async function meccanismo(){
    


    if(check == 0){

        check = 1;

   
        var betsizeselected = Number(document.getElementById("betsize").value);
        console.log("Puntata: " + betsizeselected);
        moneytot = document.getElementById("money").textContent.trim();
        moneytot = Number(moneytot);
        
        if(moneytot < betsizeselected || betsizeselected == 0){

            check = 0;
            return;
        }
        else{
 
            $.ajax({
                url: "/coinflip",
                data: {userbetsize: betsizeselected, slottype: 3},
                xhrFields: {  withCredentials: true },
                crossDomain: true,
                type: "POST",
                success:async function(result){
                  
                    console.log(result);

                    //audio
                    
                    

                    
                    document.getElementById("money").innerHTML = moneytot-betsizeselected;
                    
                
                    //togli robba prima
                   
                    const moneta = document.getElementById("moneta");
                    moneta.classList.remove("vitasopra", "mortesopra");
                    
                     const morte = document.getElementsByClassName("morte")[0];
                    const vita = document.getElementsByClassName("vita")[0];

                    coinflipsoundjs = document.getElementById("coinflipsound");
                    coinflipsoundjs.currentTime = 0;
                    coinflipsoundjs.play();




                    //metti rotazione giusta
                   if (result.first === 2) {
                        moneta.classList.add("mortesopra");
                        console.log("morte");
                        morte.style.transform = "rotateY(0deg)";
                            vita.style.transform = "rotateY(180deg)";
                    } else if (result.first === 1) {
                        moneta.classList.add("vitasopra");
                         morte.style.transform = "rotateY(0deg)";
                            vita.style.transform = "rotateY(180deg)";
                         console.log("vita");
                    }
            





                    
                    if(result.first === 2){
                        await sleep(1000);
                    }
                    else if (result.first === 1) {
                        await sleep(1500);
                    }


            
                    
                    moneytot = result.moneywin;
                    moneytot = Number(moneytot);
                    
                   document.getElementById("money").innerHTML = moneytot;
                    
                    console.log(result.moneywin);
                   

                  
                        if (result.first === 2) {
                            moneta.classList.remove("mortesopra");
                            morte.style.transform = "rotateY(0deg)";
                            vita.style.transform = "rotateY(180deg)";
                        } else if (result.first === 1) {
                            moneta.classList.remove("vitasopra");
                            morte.style.transform = "rotateY(180deg)";
                            vita.style.transform = "rotateY(0deg)";
                        }
                    

                    check = 0;
                    
                },
                error: function(xhr, status, error) {
                    console.error("AJAX error:", status, error);
                    check = 0; // Reset check
                }
                
        
        
                
            });
        
        }
    
    }   
}

window.onkeydown = function(event) {
    if (event.key == 'Shift'){
        autoroll();
    }

    if(check == 0){
        if (event.key === 'Enter' ) {
            meccanismo();
        }
        else {

        }
            
    
    }
};





/*
var checkauto = 0;
async function autoroll(){


    while(checkauto == 1){
        
        await meccanismo();
        await sleep(1000);

        
    }

}
*/









window.onload = startpageslot;

async function startpageslot(){
    
    var useridjs = localStorage.getItem("userid");
    
    console.log(useridjs);

        $.ajax({
            url: "/slotdata",
            xhrFields: {  withCredentials: true },
            crossDomain: true,
            type: "POST",
            success:function(result){
                console.log(result.usermoney);

                document.getElementById("money").innerText = result.usermoney;

                document.getElementById("betsize").value  =1;

            }


        });
 
    

}


async function returnhome() {
    window.location.href = "/index.html";
}


