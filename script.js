const rows = 7;
const columns = 7;
var score = 0;
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
const gameBoard = document.getElementById('game-board');
gameBoard.style.gridTemplateColumns = `repeat(${columns},100px)`
let cells = []
let imgs = ['./imgs/arvore.jpg', './imgs/davi.jpg', './imgs/gabarito.jpg', './imgs/geraldo.jpg', './imgs/giaco.jpg', './imgs/sopa.jpg', './imgs/tept.jpg', './imgs/tigas.jpg']

window.onload = function () {
    startGame()

    window.setInterval(function () {
        crushCell();
        slideCell();
        generateCell();
    }, 100)
}

function startGame() {
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const cell = document.createElement('img');
            cell.classList.add('cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.src = getRandomImage()
            cell.style.backgroundColor = getRandomColor();

            cell.addEventListener('click', () => {
                handleCellClick(cell);
            });

            cells.push(cell)

            gameBoard.appendChild(cell);
        }
    }
}


let selectedCell = null;

function getRandomImage() {
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
        if (canSwap(selectedCell, cell)) {
            swapColors(selectedCell, cell);
            crushCell();
        }
        selectedCell.style.borderColor = 'initial';
        selectedCell = null;
    }
}

function canSwap(cell1, cell2) {

    const tempImage1 = cell1.src;
    const tempImage2 = cell2.src;

    cell1.src = tempImage2;
    cell2.src = tempImage1;

    const hasMatch = checkForMatches();

    cell1.src = tempImage1;
    cell2.src = tempImage2;

    return hasMatch;
}

function checkForMatches() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            if (c < columns - 2) {
                const cell1 = cells[r * columns + c];
                const cell2 = cells[r * columns + c + 1];
                const cell3 = cells[r * columns + c + 2];

                if (checkMatch(cell1, cell2, cell3)) {
                    return true;
                }
            }

            if (r < rows - 2) {
                const cell1 = cells[r * columns + c];
                const cell2 = cells[(r + 1) * columns + c];
                const cell3 = cells[(r + 2) * columns + c];

                if (checkMatch(cell1, cell2, cell3)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkMatch(cell1, cell2, cell3) {
    return (
        cell1.src === cell2.src &&
        cell2.src === cell3.src &&
        !cell1.src.includes("vazio-roxo")
    );
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
    const image1 = cell1.src;
    const image2 = cell2.src;

    if (closeSquares(cell1, cell2)) {
        cell1.src = image2;
        cell2.src = image1;
    }

}

function crushCell() {
    crushThree();
    document.getElementById("score").innerText = score
}


function crushThree() {
    //checa linhas
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let cell1 = cells[r * columns + c];
            let cell2 = cells[r * columns + c + 1];
            let cell3 = cells[r * columns + c + 2];

            if (cell1.src === cell2.src && cell2.src === cell3.src && !cell1.src.includes("vazio-roxo")) {
                cell1.src = './imgs/vazio-roxo.jpg';
                cell2.src = './imgs/vazio-roxo.jpg';
                cell3.src = './imgs/vazio-roxo.jpg';
                score += 30
            }
        }
    }

    //checa colunas
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let cell1 = cells[r * columns + c];
            let cell2 = cells[(r + 1) * columns + c];
            let cell3 = cells[(r + 2) * columns + c];

            if (cell1.src === cell2.src && cell2.src === cell3.src && !cell1.src.includes("vazio-roxo")) {
                cell1.src = './imgs/vazio-roxo.jpg';
                cell2.src = './imgs/vazio-roxo.jpg';
                cell3.src = './imgs/vazio-roxo.jpg';
                score += 30
            }
        }
    }
}


function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let cell1 = cells[r * columns + c];
            let cell2 = cells[r * columns + c + 1];
            let cell3 = cells[r * columns + c + 2];

            if (cell1.src === cell2.src && cell2.src === cell3.src && !cell1.src.includes("vazio-roxo")) {
                return true
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let cell1 = cells[r * columns + c];
            let cell2 = cells[(r + 1) * columns + c];
            let cell3 = cells[(r + 2) * columns + c];

            if (cell1.src === cell2.src && cell2.src === cell3.src && !cell1.src.includes("vazio-roxo")) {
                return true
            }
        }
    }
    return false
}

function slideCell() {
    for (let c = 0; c < columns; c++) {
        let index = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            const currentCell = cells[r * columns + c];
            if (!currentCell.src.includes("vazio-roxo")) {
                cells[index * columns + c].src = currentCell.src;
                index -= 1;
            }
        }
        for (let r = index; r >= 0; r--) {
                cells[r * columns + c].src = "./imgs/vazio-roxo.jpg";
        }
    }
}

function generateCell() {
    for (let c = 0; c < columns; c++) {
        if (cells[0 * columns + c].src.includes("vazio-roxo")) {
            cells[0 * columns + c].src = getRandomImage();
        }
    }
}

//cells é uma matriz unidimensional por isso a forma correta de acessar a celula é
//cells[linha * colunas + coluna]
//onde linha e coluna são indices da celula que voce deseja acessar


// function generateCell(){
//     for (let c = 0; c > columns; c++){
//         if(cells[0][c].src.includes("vazio-roxo")){
//             cells[0][c].src = getRandomImage()
//         }
//     }
// }
//formula para matriz bidimensional