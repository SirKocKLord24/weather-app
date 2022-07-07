const form = document.querySelector('form')
const messageOne = document.querySelector('.one')
const card = document.querySelector('.card')
const place = document.querySelector('.location')
const temp = document.querySelector('.temp')
const feels = document.querySelector('.feels')
const forecast = document.querySelector('.forecast')
const img = document.querySelector('img')


form.addEventListener('submit',e=>{
    e.preventDefault()

    const location = form.location.value;
    console.log(location);

    messageOne.classList.remove('none')
    card.classList.add('none')
    messageOne.textContent = 'Loading...';
   
    fetch(`/weather?location=${location}`)
    .then((response)=>{
        response.json()
        .then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            } else{
                if(data.isDay ==='yes'){
                    img.setAttribute('src','/img/day.svg')
                } else{
                    img.setAttribute('src','/img/night.svg')
                }
                messageOne.classList.add('none')
                card.classList.remove('none')
                place.innerHTML = `${data.location}`;
                temp.innerHTML = `Temperature: ${data.currentTemp}`;
                feels.innerHTML = `FeelsLike: ${data.currentFeels}`;
                forecast.innerHTML = `Forecast: ${data.description}`

                // messageOne.innerHTML = `Current Temperature: <span class="temp">${data.currentTemp}°C</span>`;
                // messageTwo.innerHTML = `Feels Like: <span class="temp">${data.currentTemp}°C</span>`;
                // messageThree.innerHTML = `${data.location}`;
            }
        })
    })
    form.reset()
})