const guessButton = document.querySelector('#guessButton');
const guessInput = document.querySelector('#guessInput');
const response = document.querySelector('#response');
const score = document.querySelector('#score');
const time = document.querySelector('#time');
const highScore = document.querySelector('#high_score');
const resetbutton = document.querySelector('#reset');

guessedWords = [];
totalScore = 0;

guessButton.addEventListener('click', function(e){
    e.preventDefault();
    if (!guessInput.value){
    } else {
        makeRequest(guessInput.value);
    }
})

async function makeRequest(value){
    guess = { params: {'guess': value } }
    const res = await axios.get('http://127.0.0.1:5000/guess', guess);
    result = res.data.result;
        if (result === 'ok'){
            if (!guessedWords.includes(value)){
                guessedWords.push(value);
                totalScore += value.length;
                score.innerText = totalScore;
                guessInput.value = '';
                response.innerText = `${value} is a valid word!`;
            } else {
                guessInput.value = '';
                response.innerText = `${value} has already been guessed!`;
            }
        } else if (result == 'not-on-board'){
            guessInput.value = '';
            response.innerText = `${value} is not on the board!`;
        } else {
            guessInput.value = '';
            response.innerText = `${value} is not a valid word!`;
        }
}

function startTimer(seconds){
    let counter = seconds
    const interval = setInterval(() =>{
        time.innerText = counter + 's';
        counter--;

        if (counter < 0){
            clearInterval(interval);
            guessButton.disabled = true;
            guessInput.disabled = true;
            sendScore();
        }
    }, 1000)
}

async function sendScore(){
    const res = await axios.post('http://127.0.0.1:5000/score', {'totalScore': totalScore});
    highScore.innerText = res.data;
}


resetbutton.addEventListener('click', function(e){
    e.preventDefault();
    resetScore();
})

async function resetScore(){
    const res = await axios.post('http://127.0.0.1:5000/reset', {'totalScore': 0});
    highScore.innerText = res.data;
}

window.addEventListener('load', startTimer(30));