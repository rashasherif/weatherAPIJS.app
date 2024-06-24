

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"];

var btnSearch=document.querySelector('#submit');

var inputSearch=document.querySelector('search');

async function search(a){
    
    var result= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=06a1ea9f36d84d15ac273727242006&q=${a}&days=7`);

    if (result.ok && 400 != result.status) {
        var a = await result.json();
        display(a.location, a.current),
        displayAnother(a.forecast.forecastday)
    }
    }

    search("cairo");

    function display(a,result){
        var cartona=``;
        if (null != result){
            var e = new Date(result.last_updated.replace(" ", "T"));
            cartona+=`
            <div class="card col-4 ">
            <h5 class="card-header">
                <div class="day float-start">${days[e.getDay()]}</div>
                    <div class="date float-end">${e.getDate() + monthNames[e.getMonth()]}</div>
            </h5>
            <div class="card-body">
                <div class="location mt-4">${a.name}</div>
                    <div class="degree">
                        <div class="num">${result.temp_c}
                            <sup>o</sup>
                            C
                        </div>
                        <div class="forecast-icon">
                        <img src="https:${result.condition.icon}" alt="" width=90>

                        </div>
                    
                    </div>
                    <div class="custem">${result.condition.text}</div>

                    <span>
                        <img src="images/icon-umberella.png" alt="">
                        20%
                    </span>
                    <span>
                        <img src="images/icon-wind.png" alt="">
                        18km/h
                    </span>
                    <span>
                        <img src="images/icon-compass.png" alt="">
                        East
                    </span>
            </div>
        </div>
            `;
            document.getElementById("forecast").innerHTML = cartona
        }
    }

function displayAnother(a) {
    var t = "";
    for (var e = 1; e < 3; e++)
        t += `
    
    <div class="card card-sec col-4  ">
                    <h5 class="card-header">
                        <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>
                    </h5>
                    <div class="card-body ">
                    
                        <div class="forecast-icon">
                        <img src="https:${a[e].day.condition.icon}" alt="" width=48>
                        </div>
                        <div class="degree">
                        ${a[e].day.maxtemp_c}
                            <sup>o</sup>
                            C
                        </div>
                        <small>${a[e].day.mintemp_c} <sup>o</sup>C</small>
                        <div class="custem">${a[e].day.condition.text}</div>
                    </div>
                </div>`;
    document.getElementById("forecast").innerHTML += t
}

document.getElementById("search").addEventListener("keyup", a=>{
    search(a.target.value)
});



btnSearch.addEventListener('keyup',function(){
    var searchWord=inputSearch.value
    search(searchWord);
})

