const btn = document.querySelector('button');
let newData = true;
let newOwner;
let newDate;
let newNumber;




let answer;



const endpoint = 'https://fakerapi.it/api/v1/credit_cards?_quantity=2';
changeData()

// https://api.kanye.rest/



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
    }

    catch(err)
    {
        console.log(err);
        arguments;ErrorEvent('Failed to get quote');
    }
    }
    else 
    {
        // displayData((json['data'][1]['owner']),(json['data'][1]['expiration']),(json['data'][1]['number']));
        displayData(newOwner,newDate,newNumber);
        newData = true;

    }
    
}

function displayData(o,d,n)
{
    const owner = document.querySelector('.owner');
    const date = document.querySelector('.date');
    const number = document.querySelector('.number');

    owner.textContent = o;
    date.textContent = d;

    let formattedNumber = '';

    for (let i = 0; i < n.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedNumber += ' ';
        }
        formattedNumber += n[i];
    }

    number.textContent = formattedNumber;

}


