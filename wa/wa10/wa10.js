const customName = document.getElementById('customname');
const customObject = document.getElementById('customobject');
const customAdj = document.getElementById('customadj');
const customPlace = document.getElementById('customplace');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let dropdownList = document.getElementById('select_box');



// random value
function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}


//variables to declare
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// event listener

randomize.addEventListener('click',result);
dropdownList.addEventListener('change',changeColor);

function changeColor() {
  let emotion = dropdownList.value;
  switch (emotion) {
    case "Scared":
    dropdownList.style.backgroundColor = "red";
    break;

    case "Happy":
    dropdownList.style.backgroundColor = "yellow";
    break;

    case "Bored":
    dropdownList.style.backgroundColor = "lightgray";
    break;


  }


}


//method

function result(){
  let emotion = dropdownList.value;
  
  console.log(emotion);

  if (emotion === "Scared")
  {
  
  
    storyText = `In the dead of night, :person's sleep was a distant memory. The walls of :place seemed to close in, suffocating in their silence. The only companion was a :object, a :adjective family heirloom that always seemed to hum with a strange energy after dark. It was a night like any other until the :object began to vibrate, its usual hum escalating into a frantic buzz.

    :person clutched the :object, the familiar coldness of its surface now a source of scant comfort. Shadows played across the room, puppeteered by the moonlight that filtered through the curtains. But one shadow was darker than the rest, a patch of night that seemed to suck in the light around it.
    
    The :object in :person's hand trembled, its vibration in sync with :person's quivering heart. The dark form began to move, inching closer with every one of :person's ragged breaths. The :adjective heirloom was no longer just an :object; it was a beacon, calling to the darkness that hungered for the fear within :place.`;

  }
  if (emotion === "Happy")
  {
    
    storyText =`The sun was high over :place, its rays like a benediction over the eager treasure hunter. :person's eyes were alight with the fire of long-held dreams, their hands steady on the metal detector, a tool that sang with potential. It was a melody of possibility that had whispered to them since childhood, a siren song of discovery.

    With each chirp of the detector, :person's heart leapt, the device a compass leading them through the familiar yet mysterious expanse of :place. This was no mere hunt; it was a pilgrimage to fulfill a yearning that had nestled in :person's soul since they were young. The detector's call crescendoed, a symphony that crescendoed as it announced a presence beneath the soft, yielding earth.
    
    :person dug with a reverence reserved for the most hallowed of quests, the metal detector now silent beside them. The ground gave way, revealing a :adjective box, ornate and inviting. With trembling hands, :person lifted the lid, and there it was—the :object. It was the embodiment of countless dreams, the companion of many imaginary adventures that had filled :person's youthful days. Holding the :object, a sense of completion washed over :person, as if a missing piece of their essence had been returned to them. Inside the box, nestled as if waiting for decades, was the :object—a tangible piece of :person's dreams, now a reality to be cherished in the heart of :place.`;
    
  }
  if (emotion === "Bored")
  {
 
    storyText =`:person sat at :place, "The :object"— a :adjective book—lying forgotten in their lap. The words had blurred into a monotonous rhythm, each sentence as dull as the one before. :place, usually a haven, now felt like a prison, "The :object", a symbol of the day's drudgery.

    The clock ticked, a slow, torturous sound that seemed to mock :person's boredom. They picked up the :object again, hoping to find some escape within its :adjective pages. But the words were just words, lifeless and flat.
    
    :person glanced around :place, seeking something, anything, that might break the monotony. The :object was a weight, its presence a reminder of the time that seemed to stretch out endlessly before them. In the vastness of :place, with the :adjective book in hand, :person found themselves wishing for an end to the day, for something to fill the void that the :object could not.`;
  }
let newStory = storyText;

// const xItem = randomValueFromArray(insertX);
// const yItem = randomValueFromArray(insertY);
// const zItem = randomValueFromArray(insertZ);

// newStory = newStory.replaceAll(':insertx',xItem);
// newStory = newStory.replaceAll(':inserty',yItem);
// newStory = newStory.replaceAll(':insertz',zItem);


if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll(':person',name);
}
if(customObject.value !== '') {
  const object = customObject.value;
  newStory = newStory.replaceAll(':object',object);
}
if(customAdj.value !== '') {
  const adj = customAdj.value;
  newStory = newStory.replaceAll(':adjective',adj);
}
if(customPlace.value !== '') {
  const place = customPlace.value;
  newStory = newStory.replaceAll(':place',place);
}

// if(document.getElementById("uk").checked) {
//     const weight = Math.round(300/2.205) + " kilos";
//     const temperature =  `${Math.round(94 * 5/9)} celcius`;
//     newStory = newStory.replaceAll('300 pounds',weight);
// newStory = newStory.replaceAll('94 fahrenheit',temperature);

//   }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}