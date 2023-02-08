fetch('http://localhost:3000/toys')
.then((response) => response.json())
.then((data) =>{
  createCard(data)
})

//variables that point to Dom elements
const toyCollection = document.querySelector('#toy-collection');
const toyForm = document.querySelector('form.add-toy-form')

function createCard(toys){
  toys.forEach(toy => {
    const card = document.createElement('div');
    card.classList = 'card'
    toyCollection.append(card);
    
    let cardId = document.createElement('p');
    cardId.innerText = toy.id;

    let cardToyName = document.createElement('h2');
    cardToyName.textContent = toy.name
    
    

    let cardImg = document.createElement('img');
    cardImg.src = toy.image; 
    cardImg.classList = 'toy-avatar'

    
    let cardLikes = document.createElement('p');
    cardLikes.innerText = toy.likes;

    let cardButton = document.createElement('button');
    cardButton.classList = 'like-btn';
    cardButton.id = toy.id
    cardButton.innerHTML = 'Likes' + ' &#x1F354'
    

    card.append(cardId, cardToyName, cardImg, cardLikes, cardButton)

    cardButton.addEventListener('click', (e) =>{
      debugger
      cardLikes += 1;
      fetch(`http://localhost:3000/toys${cardId}`)
    })
  });
}

//posting a new toy from the user generated form 
//add an event listener to the button 
toyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  debugger 

  fetch('http://localhost:3000/toys', {
    method: 'POST', 
    headers: {
      "Content-type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      "name" : event.target[0].value,
      "image" : event.target[1].value,
      "likes" : 0 
    })
  })
})

//click on a like button to 1. patch to :id, updating num of likes
//2.like count updated in DOM w/o refreshing 



let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


