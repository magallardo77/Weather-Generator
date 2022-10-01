var date = moment().format("LL");
let fivedate = [];
let fivetemp = [];
let fivehumidity = [];
let fivewind = [];
// let storeCity = document.getElementByID("#storeCity")
// let storeDate = document.getElementByID("#storeDate");
// let storeTemp = document.getElementByID("#storeTemp");
// let storeWind = document.getElementByID("#storeWind");
// let storeHumidity = document.getElementByID("#storeHumidity")
// let storeUVIndex = document.getElementByID("#storeUVIndex")
// let storeIcon = document.getElementByID("#storeIcon")
// let storeFiveTemp = document.getElementByID("#storeFiveTemp")
// let storeFiveDate = document.getElementByID("#storeFiveDate")
// let storeFiveWind = document.getElementByID("#storeFiveWind")
// let storeFiveHumidity = document.getElementByID("#storeFiveHumidity")
// let storeFiveIcon = document.getElementByID("#storeFiveICon")
let sumbitCity = [];
let localSearch = [];
let btncontainer = document.querySelector(".button-container");

function renderSearch() {
    btncontainer.innerHTML = "";
    // if (localStorage.length===0) {
    //     return;
    // }
    for (i=localSearch.length - 1; i >= 0; i--) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("history-btn");
        btn.setAttribute("data-search", localSearch[i]);
        // btn.textContent = localSearch[i];
        btn.innerHTML = localSearch[i];
        btncontainer.append(btn)
       
        console.log(localSearch)
        // $sumbitCity = JSON.parse((localStorage.getItem(localStorage.key(i)))).storeCity; $('#citylist').append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info searchHistory">${sumbitCity}</a>`)
    }
}

function addHistory(city) {
    if (localSearch.length === -1) {
        return;
    } 
    localSearch.push(city);
    localStorage.setItem("search-history", JSON.stringify(localSearch));
    renderSearch();
}

function initSearch() {
    var saveSearch = localStorage.getItem("search-history");
    if (saveSearch) {
        localSearch = JSON.parse(saveSearch);
    }
    renderSearch();
}

$("#search-city").on("click", function (event) {
    event.preventDefault();

    city = $("#input-group").val().trim().toUpperCase();
    console.log(city)
    let wAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=3c63a0dd5e51e96f081ed670e9c74ea9`
    rendercitylatlon(city);
});
var rendercitylatlon = function (city) {
    let wAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=3c63a0dd5e51e96f081ed670e9c74ea9`
    fetch(wAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat
            long = data[0].lon
            rendercityUV(lat, long)
        });
        addHistory(city)
}

var rendercityUV = function (lattitude, longitude) {
    let uvAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lattitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=3c63a0dd5e51e96f081ed670e9c74ea9`
    fetch(uvAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            $(`#bigCard`).text(`${city} (${date})`);
            $(`#temperature`).text(`Temperature: ${data.current.temp}`);
            $(`#humidity`).text(`Humidity: ${data.current.humidity}`);
            $(`#uv`).text(`UV Index: ${data.current.uvi}`);
            $(`#wind`).text(`Wind Speed: ${data.current.wind_speed}`);

            for (i = 0; i < 5; i++) {
                fivedate[i] = moment(data.daily[i + 1].dt, 'X').format("LL");
                fivetemp[i] = data.daily[i + 1].temp.day;
                fivehumidity[i] = data.daily[i + 1].humidity;
                fivewind[i] = data.daily[i + 1].wind_speed;
            }
// TODO: if local storage has data, get it and store it in a variable else make the variable equal an empty array For every search, we store the user's search into the array Then after we store it, we set that array into the local storage This way for every city the user searches, it keeps storing a city into the array

            // if (localStorage(data).getItem() = localInput = []
            // ) 
            // localStorage.setItem('key', JSON.stringify({
                    
            // }))
            // //     storeCity: sumbitCity,
            // //     storeDate: date,
            //     storeTemp: $(`#temperature`).text(),
            //     storeWind: $(`#wind`),
            //     storeHumidity: $(`#humidity`), 
            //     storeUVIndex: $(`#uv`),
            //     storeIconURL: 'test',
            //     storeFiveTemp: fivetemp,
            //     storeFiveDate: fivedate,
            //     storeFiveWind: fivewind,
            //     storeFiveHumidity: fivehumidity,
            //     storeFiveIcon: 'test'
            // 

            for (i = 0; i < 5; i++) {
                $(`#fiveCard`).append(`
                <div class="card col-3" style="width: 14rem;" id="info">
                <div class="card-body">
                <h5 class="card-title">${fivedate[i]}</h5>
                </div>
                <p class="list-group-item" >Temperature:${fivetemp[i]}</p>
                <p class="list-group-item" >Humidity:${fivehumidity[i]}</p>
                <p class="list-group-item" >Wind Speed:${fivewind[i]}</p>
                </div>`); 
            }
            
        });
       
    

};


