import Board from "./board.js";

let board = new Board(); // creates a new game board
var el = [];
var myflex = [];
var mybuttons = [];
var mytitle = document.getElementsByTagName("h1");
var newflex = document.createElement("div");
var newcontainer = document.createElement("div");
newcontainer.setAttribute('class', 'new-container');
document.body.appendChild(newcontainer);
newflex.setAttribute('class', 'container');

console.log(board.grid);

var reset = function(ev) {

    for (var k = 0; k < 9; k++) {
        for (var h = 0; h < 9; h++) {
          mybuttons[h * (k + 1)] = document.getElementById("" + k + h);
          mybuttons[h * (k + 1)].addEventListener("pointerdown", handler);
          mybuttons[h * (k + 1)].setAttribute('data-washit', 0);
          mybuttons[h * (k + 1)].setAttribute('class', 'battle-square');
          mybuttons[h * (k + 1)].innerHTML = '';
          };
        };
        newflex.innerHTML='';
        var resettitle = document.createElement('h1');
        resettitle.innerHTML = 'Battleship';
        newflex.appendChild(resettitle);
        board = new Board();
    }

var handler = function (ev) {
  var row = ev.target.dataset.row;
  var col = ev.target.dataset.col;
  if (board.makeHit(row, col)) {
    ev.target.setAttribute("class", "battle-square-hit");
    ev.target.innerHTML = board.grid[row][col];
    ev.target.removeEventListener("pointerdown", handler);
    ev.target.setAttribute("data-washit", 1);
    if (board.isGameOver()) {
      var gameover = document.createElement("h2");
      newflex.appendChild(gameover);
      gameover.innerHTML = "YOU WIN!";
      gameover.setAttribute("class", "you-win");
      gameover.setAttribute("id", "you-win");
      var myreset = document.createElement("button");
      myreset.addEventListener("click", reset);
      myreset.setAttribute('class', 'reset');
      myreset.innerHTML = 'RESET';
      newflex.appendChild(myreset);
      for (var k = 0; k < 9; k++) {
        for (var h = 0; h < 9; h++) {
          mybuttons[h * (k + 1)] = document.getElementById("" + k + h);
          if (mybuttons[h * (k + 1)].dataset.washit == 0) {
            mybuttons[h * (k + 1)].removeEventListener("pointerdown", handler);
          }
        }
      }
    }
  } else {
    ev.target.setAttribute("class", "battle-square-miss");
    ev.target.removeEventListener("pointerdown", handler);
  }
};

document.body.prepend(newflex);
newflex.appendChild(mytitle[0]);
newflex.setAttribute("class", "container");
newflex.setAttribute("id", "title-container");

for (var i = 0; i < 9; i++) {
  myflex[i] = document.createElement("div");
  myflex[i].setAttribute("id", "row" + i);
  myflex[i].setAttribute("class", "row");
  newcontainer.appendChild(myflex[i]);
  for (var j = 0; j < 9; j++) {
    el[j] = document.createElement("button");
    el[j].setAttribute("class", "battle-square");
    el[j].setAttribute("id", "" + i + j);
    el[j].setAttribute("data-row", i);
    el[j].setAttribute("data-col", j);
    el[j].setAttribute("data-washit", 0);
    el[j].addEventListener("pointerdown", handler);
    myflex[i].appendChild(el[j]);
  }
}
