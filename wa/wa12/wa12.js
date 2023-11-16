const btnQ = document.querySelector('#js-new-quote');
const btnA = document.querySelector('#js-tweet');
const answerTxt = document.querySelector('#js-answer-text');

let answer;



const endpoint = 'https://fakerapi.it/api/v1/credit_cards?_quantity=2';

// https://api.kanye.rest/



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
   
        console.log(json);
        console.log(json['data'][0]['owner']);
        displayQuote(json['data'][0]['owner']);
      


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
