const btn = document.querySelector('button');




let answer;



const endpoint = 'https://fakerapi.it/api/v1/credit_cards?_quantity=2';

// https://api.kanye.rest/



btn.addEventListener(`click`,changeData);



async function changeData()
{
    try
    {
        const response = await fetch(endpoint);
        if (!response.ok)
        {
            throw Error(response.statusText);
        }

        const json = await response.json();
   
       
       
        displayData((json['data'][0]['owner']),(json['data'][0]['expiration']),(json['data'][0]['number']));

       
      


    }

    

    catch(err)
    {
        console.log(err);
        arguments;ErrorEvent('Failed to get quote');
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


