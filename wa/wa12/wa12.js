const btn = document.querySelector('button');
const h3 = document.querySelector('h3');
let newData = true;
let newOwner;
let newDate;
let newNumber;
let beat = new Audio('ching.mp3');
let playSound = false;




let answer;



const endpoint = 'https://fakerapi.it/api/v1/credit_cards?_quantity=2';
const endpointYE = "https://api.kanye.rest/"
changeData()





btn.addEventListener(`click`,changeData);



async function changeData()
{
   
    if (newData)
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
        displayData((json['data'][0]['owner']),(json['data'][0]['expiration']),(json['data'][0]['number']));
        newOwner = (json['data'][1]['owner']);
        newDate = (json['data'][1]['expiration']);
        newNumber = (json['data'][1]['number']);
        newData = false
        playSound = true;
    }

    catch(err)
    {
        console.log(err);
        arguments;ErrorEvent('Failed to get data');
    }
    }
    else 
    {
        // displayData((json['data'][1]['owner']),(json['data'][1]['expiration']),(json['data'][1]['number']));
        displayData(newOwner,newDate,newNumber);
        newData = true;
    }
    try
    {
        const responseK = await fetch(endpointYE);
        if (!responseK.ok)
        {
            throw Error(responseK.statusText);
        }
        const jsonK = await responseK.json();
        console.log(jsonK);
        displayQuote(jsonK['quote'])
      
    }

    catch(err)
    {
        console.log(err);
        arguments;ErrorEvent('Failed to get kanye quote');
    }
}

function displayQuote(a)
{
    h3.textContent = `"${a}"`;

}
function displayData(o,d,n)
{
    if (playSound)
    {
        beat.load();
        beat.play();
    }
   
  
    const owner = document.querySelector('.owner');
    const date = document.querySelector('.date');
    const number = document.querySelector('.number');

    owner.textContent = o;
    date.textContent = d;

    let formattedNumber = '';

    if (n.length < 16)
    {
        let x = 16 - n.length
        
        for(let i = 0; i < x; i++)
        {
            let y = Math.floor(Math.random() * 10);
            n += `${y}`;
            
        }
        
    }

    for (let i = 0; i < n.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedNumber += ' ';
        }
        formattedNumber += n[i];
    }

    number.textContent = formattedNumber;

}




