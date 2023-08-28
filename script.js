const numRows = 6;
const numCols = 6;
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
const gameBoard = document.getElementById('game-board');
gameBoard.style.gridTemplateColumns = `repeat(${numCols},100px)`
let cells = []
let imgs = ['/imgs/arvore.jpg', '/imgs/davi.jpg', '/imgs/gabarito.jpg', '/imgs/geraldo.jpg', '/imgs/giaco.jpg', '/imgs/sopa.jpg', '/imgs/tept.jpg', '/imgs/tigas.jpg']


for (let row = 1; row <= numRows; row++) {
    for (let col = 1; col <= numCols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        cell.style.backgroundImage = `url(${getRandomImage()})`
        cell.style.backgroundColor = getRandomColor();

        cell.addEventListener('click', () => {
            handleCellClick(cell);
        });

        cells.push(cell)

        gameBoard.appendChild(cell);
    }
}

let selectedCell = null;

function getRandomImage(){
    const randomIndex = Math.floor(Math.random() * imgs.length);
    return imgs[randomIndex];
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function handleCellClick(cell) {
    if (selectedCell === null) {
        selectedCell = cell;
        cell.style.borderColor = 'orange';
    } else {
        swapColors(selectedCell, cell);
        selectedCell.style.borderColor = 'initial';
        selectedCell = null;
    }
}

function closeSquares(cell1, cell2) {
    const row1 = parseInt(cell1.getAttribute('data-row'));
    const col1 = parseInt(cell1.getAttribute('data-col'));
    const row2 = parseInt(cell2.getAttribute('data-row'));
    const col2 = parseInt(cell2.getAttribute('data-col'));

    return (
        (Math.abs(row1 - row2) === 1 && col1 === col2) ||
        (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
}


function swapColors(cell1, cell2) {
    const image1 = cell1.style.backgroundImage;
    const image2 = cell2.style.backgroundImage;

    if (closeSquares(cell1, cell2)) {

        cell1.style.backgroundImage = image2;
        cell2.style.backgroundImage = image1;

    }

}