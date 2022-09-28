$("#search-city").on("click", function (event) {
    event.preventDefault();

    city = $("#input-group").val().trim().toUpperCase();
    console.log(city)
    let wAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=3c63a0dd5e51e96f081ed670e9c74ea9`
    rendercitylatlon(wAPI);
});
var rendercitylatlon = function (url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat
            long = data[0].lon
            rendercityUV(lat, long)
        });
}

var rendercityUV = function (lattitude, longitude) {
    let uvAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lattitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=3c63a0dd5e51e96f081ed670e9c74ea9`
    fetch(uvAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            $(`.card-title`).text(`${city} (${date})`);
            $(`#temperature`).text(`Temperature: ${data.current.temp}`);
            $(`#humidity`).text(`Humidity: ${data.current.humidity}`);
            $(`#uv`).text(`UV Index: ${data.current.uvi}`);
            $(`#wind`).text(`Wind Speed: ${data.current.wind_speed}`);
            
        });
}
var date = moment().format("LL");
function cityname() {
   

}


