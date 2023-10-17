// array that holds all of the cards
const cards = ['d-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9', 'd-10', 'd-11', 'd-12', 'd-13', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-13', 'c-1', 'c-2', 'c-3', 'c-4', 'c-5', 'c-6', 'c-7', 'c-8', 'c-9', 'c-10', 'c-11', 'c-12', 'c-13', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7', 's-8', 's-9', 's-10', 's-11', 's-12', 's-13'];

// element that the output is printed to
const result = document.getElementById('result')
const result2 = document.getElementById('result2');

// element that the winner is printed to
const winner = document.getElementById('winner');

// function that will return one random card
function getRandomCard(){
    return Math.floor(Math.random() * cards.length)
}

// array that holds the user's and the dealer's cards, respectively
var userCards = [];
var dealersCards = [];

var usersEmail;

// starts the game, deals cards to the user and then the dealer
async function deal(userEmail) {
    await fetch(`/users/addGame/${userEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    })
    usersEmail = userEmail
    console.log(userEmail)
    userCards = []
    // gets two random cards, checks if they have been used already, and then adds them to the user's deck
    for(let i = 0; i < 2; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index])){
            userCards.push(cards[index])
            i++
        }
    }
    // sets the html element to the user's deck
    result.innerHTML = `User's Hand: <img src="./images/cards/PNG-cards-1.3/${userCards.join('.png" alt="face down card" class="card"><img src="./images/cards/PNG-cards-1.3/')}.png" alt="face down card" class="card">`
    console.log(userCards)

    dealersCards = []
    // gets two random cards, checks if they have been used already, and then adds them to the dealers's deck
    for(let i = 0; i < 2; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index]) && !dealersCards.includes(cards[index])){
            dealersCards.push(cards[index])
            i++
        }
    }
    // sets the html element to the dealer's deck
    result2.innerHTML = `Dealer's Hand: <img src="./images/cards/PNG-cards-1.3/${dealersCards[0]}.png" alt="face down card" class="card"><img src="./images/facedown.png" alt="face down card" class="card">`
    console.log(dealersCards)
}


// deal();

async function hit(){
    if(userCards.length < 5){
        for(let i = 0; i < 1; i){
            let index = getRandomCard();
            if(!userCards.includes(cards[index]) && !dealersCards.includes(cards[index])){
                userCards.push(cards[index])
                i++
            }
        }
        result.innerHTML = `User's Hand: <img src="./images/cards/PNG-cards-1.3/${userCards.join('.png" alt="face down card" class="card"><img src="./images/cards/PNG-cards-1.3/')}.png" alt="face down card" class="card">`
        console.log(userCards)
    }
}

// function to hit the dealer, once the user stands
function dealerHit(){
    var dealerAce = false;
    let dealerFinal = 0;
    for(let i = 0; i < dealersCards.length; i++){
        let value = Number(dealersCards[i].split('-')[1])
        if(value == 1){
            dealerAce=true;
            value = 11
        }else if(value >= 10){
            value = 10
        }
        dealerFinal+=value
        
    }
    // if their is an ace and the final is greater than 21, it will make the ace worth 1 point
    if(dealerFinal >21 && dealerAce){
        dealerFinal -= 10;
    }


    // the dealer will hit until the total is 17 or higher, and then after that the game is over, and the winner is calculated
    if(dealerFinal < 17){
        console.log('adding card')
        for(let i = 0; i < 1; i){
            let index = getRandomCard();
            if(!userCards.includes(cards[index]) && !dealersCards.includes(cards[index])){
                dealersCards.push(cards[index])
                i++
            }
        }
        // prints the cards to the dealer
        result2.innerHTML = `Dealer's Hand: <img src="./images/cards/PNG-cards-1.3/${dealersCards.join('.png" alt="face down card" class="card"><img src="./images/cards/PNG-cards-1.3/')}.png" alt="face down card" class="card">`
        dealerHit(dealerFinal)
    }
}

// function that flips the turned over card
function flip(){
    $('#flipBoxInner').addClass('flipped')
}

// game end function, tallies up the numbers and decides a winner
function stand(){
    // sets the dealer's hand to the flipped over card, so that it can have the animation of flipping over, and so that you can't use inspect element to see what the dealer has
    result2.innerHTML = `Dealer's Hand: <img src="./images/cards/PNG-cards-1.3/${dealersCards[0]}.png" alt="face down card" class="card"><div class="flip-box">
            <div class="flip-box-inner" id="flipBoxInner">
                <div class="flip-box-front">
                    <img src="./images/facedown.png" alt="">
                </div>
                <div class="flip-box-back">
                    <img src="./images/cards/PNG-cards-1.3/${dealersCards[1]}.png" alt="face down card" class="card">
                </div>
            </div>
        </div>`
    console.log($('#flipBoxInner'))
    // flips the card a millisecond later, so that the animation plays correctly
    setTimeout(flip, 1)

    // function on set timeout so that it plays after the card finished its animation of flipping over
    setTimeout(function(){
        dealerHit()
        getResults(dealerFinal, userFinal)
    }, 801)
    
    let userAce = false;
    let userFinal = 0;

    // iterates through the user's cards, sees if their is an ace, and makes any face card worth 10 points
    for(let i = 0; i < userCards.length; i++){
        let value = Number(userCards[i].split('-')[1])
        if(value == 1){
            userAce=true;
            value = 11
        }else if(value >= 10){
            value = 10
        }
        userFinal+=value
        
    }
    // if their is an ace and the final is greater than 21, it will make the ace worth 1 point
    if(userFinal >21 && userAce){
        userFinal -= 10;
    }
    // prints the user's score to the page
    // result.innerHTML+= `User's Score: ${userFinal}`;
    console.log(userFinal)

    // Dealer section
    let dealerAce = false;
    let dealerFinal = 0;

    // iterates through the dealer's cards, sees if their is an ace, and makes any face card worth 10 points
    for(let i = 0; i < dealersCards.length; i++){
        let value = Number(dealersCards[i].split('-')[1])
        if(value == 1){
            dealerAce=true;
            value = 11
        }else if(value >= 10){
            value = 10
        }
        dealerFinal+=value
        
    }
    // if their is an ace and the final is greater than 21, it will make the ace worth 1 point
    if(dealerFinal >21 && dealerAce){
        dealerFinal -= 10;
    }
    
    
    

    
}

async function getResults(dealerFinal, userFinal){
    var gameResult = "";

    // Checks the scores to see who wins the game
    if(dealerFinal > 21 && userFinal > 21 || userFinal == dealerFinal){
        gameResult = 'tie'
    }else if(dealerFinal > 21 && userFinal <= 21){
        gameResult = "user wins"
        await fetch(`/users/winGame/${usersEmail}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        })
    }else if(userFinal > 21 && dealerFinal <= 21){
        gameResult = 'dealer wins'
    }else if(userFinal <= 21 && dealerFinal <= 21){
        if(userFinal > dealerFinal){
            gameResult = 'user wins'
            await fetch(`/users/winGame/${usersEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}
            })
        }else{
            gameResult = 'dealer wins'
        }
    }
    // prints the winner result to the page
    console.log(dealerFinal + " " + userFinal)
    winner.textContent = gameResult
}

// stand()

