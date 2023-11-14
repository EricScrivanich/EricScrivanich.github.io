const btnQ = document.querySelector('#js-new-quote');
const btnA = document.querySelector('#js-tweet');
const answerTxt = document.querySelector('#js-answer-text');

let answer;



const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';
getQuote();


btnQ.addEventListener(`click`,getQuote);
btnA.addEventListener(`click`,displayAnswer);


async function getQuote()
{
    try
    {
        const response = await fetch(endpoint);
        if (!response.ok)
        {
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json['question']);
        answer = json['answer'];
        console.log(json);


    }

    

    catch(err)
    {
        console.log(err);
        arguments;ErrorEvent('Failed to get quote');
    }
    
}

function displayQuote(q)
{
    const questionTxt = document.querySelector('#js-quote-text');

    questionTxt.textContent = q;
    answerTxt.textContent = null;

}

function displayAnswer()
{
    
    answerTxt.textContent = answer;
    
}
