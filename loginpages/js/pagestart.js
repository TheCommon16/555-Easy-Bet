
document.addEventListener("DOMContentLoaded", function() {

  pagestart();
});
function pagestart(){
    
   


    document.getElementById("userbalance").innerHTML = "Login";
    document.getElementById("balancediv").addEventListener("click",loginpopup);



        
    //console.log("useridjs:", useridjs, "type:", typeof useridjs);
    //if(useridjs && useridjs != 0){
        $.ajax({
            url: "/slotdata",
            //data: {userid: useridjs},
            xhrFields: {  withCredentials: true },
            crossDomain: true,
            type: "POST",
            success:function(result){
                if(result.usermoney != "error"){
           
                   

                    document.getElementById("userbalance").innerText = result.usermoney;

                    document.getElementById("balancediv").removeEventListener("click",loginpopup);
                }
                else{

                }
            }


        });
  
    //}
 


}




