const levelNumber = document.querySelector('.level');
const hitsNumber = document.querySelector('.number-hits');
const card = document.querySelectorAll('.card');
const skipLevel = document.querySelector('.skip-level');
const endGameWrapper = document.querySelector('.wrapper-end-game');
const btnResetGame = document.querySelector('.reset-game');

let level = 1;
let hits = 0;
let clickBlocked = false;
let drawnCard = getNewRandomCard();

addEventListener('DOMContentLoaded', function () {
    levelNumber.innerHTML = level;
    hitsNumber.innerHTML = hits;
});

function getNewRandomCard() {
    const drawCard = Math.random();
    let drawnNumber;

    if (drawCard < 1 / 3) {
        drawnNumber = 0;
    } else if (drawCard < 2 / 3) {
        drawnNumber = 1;
    } else {
        drawnNumber = 2;
    }

    return card[drawnNumber];
}

function resetCards() {
    card.forEach(e => {
        e.classList.remove('correct');
        e.classList.remove('incorrect');
        e.classList.remove('selected');
        e.classList.add('start-game');
        skipLevel.classList.remove('active');
    });
}

function getResultsSelectedCard() {
    card.forEach(e => {
        e.addEventListener('click', function () {
            if (clickBlocked) {
                return;
            }

            card.forEach(cardItem => {
                e.classList.add('selected');

                cardItem.classList.remove('start-game');

                if (cardItem === drawnCard) {
                    cardItem.classList.add('correct');
                    if (e == cardItem) {
                        skipLevel.classList.add('active');
                        clickBlocked = true;
                    }

                } else if (cardItem !== drawnCard) {
                    cardItem.classList.add('incorrect');
                    if (e !== drawnCard) {
                        clickBlocked = true;
                        setTimeout(() => {
                            drawnCard = getNewRandomCard();
                            resetCards();
                            clickBlocked = false;
                        }, 1000);
                    }
                }
            });
        });
    });
}


skipLevel.addEventListener('click', function () {
    if (clickBlocked) {
        card.forEach(cardItem => {
            if (cardItem.classList.contains('selected') && cardItem.classList.contains('correct')) {
                hits++;
                level++;
                function skipLevelClicked() {
                    if (level < 6) {
                        levelNumber.innerHTML = level;
                    }
                    hitsNumber.innerHTML = hits;
                    drawnCard = getNewRandomCard();
                    resetCards();
                    clickBlocked = false;
                }
                skipLevelClicked();
                if (level === 6) {
                    endGameWrapper.classList.remove('hidden');
                    btnResetGame.addEventListener('click', function () {
                        level = 1;
                        skipLevelClicked();
                        endGameWrapper.classList.add('hidden');
                    });
                }
            }
        });
    }

});

getResultsSelectedCard();