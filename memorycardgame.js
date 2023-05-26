let card = document.querySelector('.parent').querySelectorAll('div');
let cards = [...card];
let parent = document.querySelector('.parent');
// let cards = ["one", "two", "three", "four", "five"];

startGame();


function startGame() { 
    let shuffledCards = shuffleTheCards(cards);
    console.log(shuffledCards);
    for (let i = 0; i < shuffledCards.length; i++){
        [].forEach.call(shuffledCards, function(item){
          parent.appendChild(item);
        });
      }

    let pickedCards = []
    let hasClickedTwo = false;
    let matched = false;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.children[0].style.display = "block";
            card.children[1].style.display = "block";
            if(pickedCards.length < 2) pickedCards.push(card);
            if(pickedCards.length === 2) hasClickedTwo = true;
            console.log(pickedCards);
            console.log('hasClickedTwo', hasClickedTwo)
            if(hasClickedTwo) {
                if(pickedCards[0].children[0].alt === pickedCards[1].children[0].alt) {
                    console.log("It's a match");
                    matched = true;
                    pickedCards = []
                } else {
                    console.log("It's not a match");
                    matched = false;
                    setTimeout(() => {
                        pickedCards[0].childNodes[0].style.display = "none";
                        pickedCards[1].childNodes[0].style.display = "none";
                        
                        pickedCards[0].children[1].style.display = "none";
                        pickedCards[1].children[1].style.display = "none";
                        pickedCards[0].children[1].style.width = "0";
                        pickedCards[1].children[1].style.width = "0";
                        pickedCards = [];
                    }, 1000)
                }
            }
        })
    })
}

function shuffleTheCards(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  





  
  //     let pickedCards = [];
  //     let pickedCardsIMG = [];
  //     let correctlyGuessedCards = [];
  //     cards.forEach((card) => {
  //         card.addEventListener('click', (e) => {
  //             pickedCards.push(this);
  //             let len  = pickedCards.length
  //             if (len < 3) {
  //                 e.target.childNodes[0].style.display = "block";
  
  //                 pickedCardsIMG.push(e.target.childNodes[0]);
  //             }
  
  //             checkCards(len, pickedCards, pickedCardsIMG, correctlyGuessedCards);
  
  //             console.log("len", len);
  //             console.log("pickedCards", pickedCards);
  //             console.log("correctlyGuessedCards", correctlyGuessedCards);
  //             console.log("---------------------------------------------");
  //         });
  //     });
  // }
  
  // function checkCards(len, pickedCards, pickedCardsIMG, correctlyGuessedCards) {
  //     if (len === 2) {
  //         if(pickedCards[0] === pickedCards[1]) {
  //             console.log("the two cards are thesame");
  //             correctlyGuessedCards.push(pickedCards[0]);
  //             correctlyGuessedCards.push(pickedCards[1]);
  
  //             pickedCards.splice(0, 2);
  
  //             pickedCardsIMG.splice(0, 1);
  //             pickedCardsIMG.splice(0, 1);
  
  
  //         } else {
  //             console.log("the two cards are not thesame");
              
              
  //                 pickedCardsIMG[0].style.display = "none";
  //                 pickedCardsIMG[1].style.display = "none";
          
              
  //             pickedCards.splice(0, 1);
  //             pickedCards.splice(0, 1);
  
  //         }
  //     }
  // }