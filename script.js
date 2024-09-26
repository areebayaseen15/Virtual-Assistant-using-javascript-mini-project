let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Dear")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Dear")
    }else{
        speak("Good Evening Dear")
    }
}

// Weather API endpoint
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?';

// API key
const weatherApiKey = 'e7bdce96c739023a6df01df3fd170eea';

// Function to get weather data
function getWeather(city) {
  const url = `${weatherApi}?q=${city}&units=metric&appid=${weatherApiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      speak(`The weather in ${city} is ${weather.description} with a temperature of ${temperature} degrees Celsius and humidity of ${humidity}%`);
    })
    .catch(error => speak(`Error fetching weather data for ${city}`));
}
// Joke API
const jokeApi = fetch('https://icanhazdadjoke.com/',{
    headers:{
        'Accept': 'application/json'
    }
} )
function tellJoke() {
jokeApi.then(response => response.json())
  jokeApi.then(data => speak(data.value));
}


let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey") || message.includes("Hello , areeba")
         || message.includes("hey , areeba")){
        speak(`hello and ${wishMe()},what can i help you?`)
    }
    else if(message.includes("Assalam-o-alaikum") || message.includes("Assalom-o-Alaikum Areeba") || message.includes("assalam walekum")){
        speak(`Walaikum Assalam dear , How can I help you?`)
    }
    else if(message.includes("Hello areeba how are you?")){
        speak(`hello dear , I am Good`)
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Mam Areeba Yaseen")
    }
    else if(message.includes("open Linkdin")){
        speak("Opening Linkdin.....")
        window.open("https://www.linkedin.com/")
    }
    else if(message.includes("open ChatGpt")){
        speak("Opening chatgpt.....")
        window.open("https://chatgpt.com/")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
      else if (message.includes('joke')) {
        tellJoke();
      }

      else if (message.includes('weather')) {
        const city = message.split(' ').pop();
        getWeather(city);
      }
    
    else{
        let finalText="this is what i found on internet regarding" + message.replace("areeba","") || message.replace("areeba","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("areeba","")}`,"_blank")
    }
}


