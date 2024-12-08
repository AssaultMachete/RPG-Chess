let legalSquares = [];
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();

function setupBoardSquares() {
  for (let i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener("dragover", allowDrop);
    boardSquares[i].addEventListener("drop", drop);
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row; // Assigning unique ID to each square (e.g., a8, b8)
  }
}

function setupPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", true);
    pieces[i].id =
      pieces[i].className.split(" ")[1] + pieces[i].parentElement.id; // Giving unique ID to pieces
  }
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", false); // Prevent <img> from being draggable
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  const piece = ev.target;
  ev.dataTransfer.setData("text", piece.id);
  localStorage.setItem("draggedPiece", piece.id);
  ev.dataTransfer.setData("text", piece.id);
}

function drop(ev) {
  ev.preventDefault();
  const draggedPieceId = localStorage.getItem("draggedPiece");
  const draggedPiece = document.getElementById(draggedPieceId);
  const destinationSquare = ev.currentTarget;
  destinationSquare.appendChild(draggedPiece);
  localStorage.removeItem("draggedPiece");
}
