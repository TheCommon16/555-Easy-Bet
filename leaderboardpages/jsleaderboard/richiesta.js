document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded (aspetta che tutta la pagina carichi)
    richiestadati();
    putbutton("corceimg");
});


function putbutton(buttonId) {
  let button = document.getElementById(buttonId);

  if(button && buttonId == "corceimg"){
    button.addEventListener("click",returnhome);
  }

}

async function returnhome() {
    window.location.href = "/index.html";
}



function richiestadati() {
    $.ajax({
        url: "/leaderboardmoney",
        type: "GET",
        success: function (result) {
            const tbody = document.getElementById("moneyleaderboard");
            console.log(result.tabella);

            
            tbody.innerHTML = "<tr><th id='TitleTablle'>Most Goldì</th></tr>";
            posizione = 0;
            result.tabella.forEach(item => {
                posizione = posizione + 1;
                const tr = document.createElement("tr");

                const td = document.createElement("td");
                td.innerHTML = `
                    <div class="user-entry">
                        <div class="posizione">${posizione}</div>
                        <div class="username">${item.username}</div>
                        <div class="money">${item.money} €</div>
                    </div>
                `;

                tr.appendChild(td);
                tbody.appendChild(tr);
            });
        }
    });
}


