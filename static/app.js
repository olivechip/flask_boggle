const $guessButton = document.querySelector('#guessButton')
const $guessValue = document.querySelector('#guessValue')

$guessButton.addEventListener('click', function(e){
    e.preventDefault();
    makeRequest();
})

async function makeRequest(){
    guess = { params: {'guess': $guessValue } }
    const res = await axios.get('https://127.0.0.1:5000/guess/', guess);
    console.log(res);
}