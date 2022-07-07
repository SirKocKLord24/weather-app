const form = document.querySelector('form')
const messageOne = document.querySelector('.one')
const messageTwo = document.querySelector('.two')

form.addEventListener('submit',e=>{
    e.preventDefault()

    const location = form.location.value;
    console.log(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?location=${location}`)
    .then((response)=>{
        response.json()
        .then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            } else{
                messageOne.innerHTML = `Current Temperature: <span class="temp">${data.currentTemp}°C</span>`;
                messageTwo.innerHTML = `Feels Like: <span class="temp">${data.currentTemp}°C</span>`;
            }
        })
    })
    form.reset()
})