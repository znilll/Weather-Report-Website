const url = ''
const key = ''

const getResult = (CityName) => {
    let query = `${url}weather?q=${CityName}&appid=${key}&units=metric&lang=en`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}
const getResultfor = (CityName) => {
    let query = `${url}forecast?q=${CityName}&appid=${key}&units=metric&lang=en`
    fetch(query)
    .then(forecast=> {
        return forecast.json()
    })
    .then(displayResultfor)
}
const displayResultfor = (result) => {
    console.log(result);

    const temps = document.getElementsByClassName("temp")
    for(i=1; i<temps.length; i++){
        temps[i].innerText = `${Math.round(result.list[i*7].main.temp)}°C`
    }

    const descs = document.getElementsByClassName("desc")
    for(i=1; i<descs.length; i++){
        descs[i].innerText = result.list[i*7].weather[0].description
        const arr = descs[i].innerText.split(" ");
        for (var j = 0; j < arr.length; j++) {
            arr[j] = arr[j].charAt(0).toUpperCase() + arr[j].slice(1);
        }
        const str2 = arr.join(" ");
        descs[i].innerText = str2
    }

    const icons = document.getElementsByClassName("icon")
    for(i=1; i<icons.length; i++){
        icons[i].src = `http://openweathermap.org/img/wn/${result.list[i*7].weather[0].icon}@2x.png`;
    }
}
const displayResult = (result) => {
    console.log(result);
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.desc')
    let str = result.weather[0].description
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    desc.innerText = str2

    let icon = document.querySelector('.icon')
    icon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
}
const setQueryfor = (e) => {
    if(e.keyCode == '13')
        getResultfor(searchBar.value)
}
const setQuery = (e) => {
    if(e.keyCode == '13')
        getResult(searchBar.value)
}
const searchBarfor = document.getElementById("SearchBar")
searchBarfor.addEventListener('keypress', setQueryfor)

const searchBar = document.getElementById("SearchBar")
searchBar.addEventListener('keypress', setQuery)