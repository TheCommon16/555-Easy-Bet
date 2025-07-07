function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var check = 0;
async function meccanismo(){
    


    if(check == 0){

        check = 1;

        
        betsizeselected = document.getElementById("betsizevalue").innerHTML = sizebet[sizebetposition];;
        moneytot = document.getElementById("money").textContent.trim();
        moneytot = Number(moneytot);
        
        if(moneytot < betsizeselected){

            check = 0;
            return;
        }
        else{
          
            $.ajax({
                url: "/spin",
                data: {userbetsize: betsizeselected, slottype: 2},
                xhrFields: {  withCredentials: true },
                crossDomain: true,
                type: "POST",
                success:async function(result){

                    console.log(result);


                    document.getElementById("money").innerHTML = moneytot-betsizeselected;

                    document.getElementById("levabutton").disabled = true;
                    document.getElementById("betsizeminus").disabled = true;
                    document.getElementById("betsizeplus").disabled = true;
            
                    
                    //console.log(moneytot);
            
                    rollosoundjs = document.getElementById("rollsound");
                   
                    jackpotsoundjs = document.getElementById("jackpotsound");
            
                    
            
                    document.getElementById("winspace").innerHTML = "<img id='winimage' src='/slot2/img2/cyan.png' width='95%' height='80%' draggable='false'>";
            
                    rollosoundjs.currentTime = 0;
                    rollosoundjs.play();
                    
            
            
            
                    //Meccanismo
                    conta = 0;
            
                
            
                    for(let conta = 0; conta < 33; conta++){
                        if(conta < 25){
                            num1 = Math.floor(Math.random() * 16) + 1;
                            document.getElementById("space1").innerHTML = "<img src='/slot2/img2/" + num1 + ".png'' width='100%' height='100%' draggable='false'>";
                            //console.log("num1: "+num1);
                            if(conta == 24){
                                document.getElementById("space1").innerHTML = "<img src='/slot2/img2/" + result.first + ".png'' width='100%' height='100%' draggable='false'>";
                                
                            }
                        }
                        

                        if(conta < 28){
                            num2 = Math.floor(Math.random() * 16) + 1;
                            document.getElementById("space2").innerHTML = "<img src='/slot2/img2/" + num2 + ".png' ' width='100%' height='100%' draggable='false'>";
                        // console.log("num2: "+num2);
                            if(conta == 27){
                                document.getElementById("space2").innerHTML = "<img src='/slot2/img2/" + result.second + ".png'' width='100%' height='100%' draggable='false'>";
                            
                            }
                        }
                       
            
                        num3 = Math.floor(Math.random() * 16) + 1;
                        document.getElementById("space3").innerHTML = "<img src='/slot2/img2/" + num3 + ".png' ' width='100%' height='100%' draggable='false'>";
                        //console.log("num3= "+num3);
                        if(conta == 32){
                            document.getElementById("space3").innerHTML = "<img src='/slot2/img2/" + result.third + ".png'' width='100%' height='100%' draggable='false'>";
                            
                        }
                        await sleep(100);
                    }   
                    num1 = result.first;
                    num2 = result.second;
                    num3 = result.third;
                    //
                    
                    //Win
            
                  
            
                    if(num1 == num2 && num2 == num3){
                        
                        jackpotsoundjs.play();
            
                        document.getElementById("winspace").innerHTML = "<img id='winimage' src='/slot2/img2/jackpot.png'  width='95%' height='80%' draggable='false'>";
                        console.log("win");
            
                        
                        moneytot = result.moneywin;
                    
                        document.getElementById("money").innerHTML = Number(moneytot);
                    
                        
             
                    }
                    else if(num1 == num3){
            
                        moneytot = result.moneywin;
                    
                        document.getElementById("money").innerHTML = Number(moneytot);
                    
                        
       
                    }
                    else if(num1 == num2){
                        
                        moneytot = result.moneywin;
                    
                        document.getElementById("money").innerHTML = Number(moneytot);
                    
                        
               
            
                    }
                    else if(num2 == num3){
                        moneytot = result.moneywin;
                    
                        document.getElementById("money").innerHTML = Number(moneytot);
                    
                        
                
            
            
                    }
                    else{
                        
            
                    }
                    
                    
                    moneytot = result.moneywin;
              
                    moneytot = document.getElementById("money").innerHTML;
                    moneytot = Number(moneytot);

                    
                    await sleep(400);
                    
                    document.getElementById("levabutton").disabled = false;
                    document.getElementById("betsizeminus").disabled = false;
                    document.getElementById("betsizeplus").disabled = false;
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
        else if (event.key === 'ArrowRight' ) {
             upbetsize();
        }
        else if (event.key === 'ArrowLeft' ) {
            downbetsize();
        }
        else {

        }
            
    
    }
};






var checkauto = 0;
async function autoroll(){

    if(checkauto == 1){
        checkauto = 0;
        document.getElementById("autorollimg").src="img2/autorollbutton.png";
    }
    else if(checkauto == 0){
        checkauto = 1;
        document.getElementById("autorollimg").src="img2/autorollpressed.png";
    }

    while(checkauto == 1){
        
        await meccanismo();
        await sleep(1000);

        
    }

}


var sizebetposition = 1;
var sizebet = [0.5, 1, 5, 10, 25, 50, 100, 250, 1000,10000,100000];

async function upbetsize(){
    moneytot = document.getElementById("money").textContent.trim();
    moneytot = Number(moneytot);

    sizebetposition = sizebetposition + 1;
    if(sizebetposition + 1 > sizebet.length){
        sizebetposition = sizebetposition - 1
    }
        
        
    console.log(sizebetposition);
    
    document.getElementById("betsizevalue").innerHTML = sizebet[sizebetposition];
}

async function downbetsize(){

    sizebetposition = sizebetposition - 1;
    if(sizebetposition  < 0){
        sizebetposition = sizebetposition + 1
    }
    console.log(sizebetposition);
    
    document.getElementById("betsizevalue").innerHTML = sizebet[sizebetposition];
}








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

                num1 = Math.floor(Math.random() * 16) + 1;
                document.getElementById("space1").innerHTML = "<img src='/slot2/img2/" + num1 + ".png'' width='100%' height='100%' draggable='false'>";
                num2 = Math.floor(Math.random() * 16) + 1;
                document.getElementById("space2").innerHTML = "<img src='/slot2/img2/" + num2 + ".png'' width='100%' height='100%' draggable='false'>";
                num3 = Math.floor(Math.random() * 16) + 1;
                document.getElementById("space3").innerHTML = "<img src='/slot2/img2/" + num3 + ".png'' width='100%' height='100%' draggable='false'>";

            }


        });
 
    
    document.getElementById("betsizevalue").innerHTML  = sizebet[sizebetposition];
}


async function returnhome() {
    window.location.href = "/index.html";
}

