let field = {};
let horizontal = 0,
  vertikal = 0,
  win = 0,
  numbomb = 0,
  metka = 0;
let str = 'Чтобы проверить поле на наличие мин нажмите \nПРОБЕЛ, отметить место предполагаемого размещения бомбы - \nнажмите Ctrl',
  str2 = 'Осталось отметить бомб: ';
let r = 0.1; //меняя r меняем количество бомб на поле; чем больше, тем бомб больше; 0=ноль бомб
let kDRAW = 0; //счетчик бомб в kDRAW

function setup() {
  createCanvas(400, 500);
  //frameRate(1);
  for (let column = 0; column < 8; column++) {
    field[column] = [];
    for (let row = 0; row < 8; row++) {
      if ((column + row) % 2 === 0) {
        field[column][row] = {
          color: 'black',
          bomb: random(-r, 1),
          kolvorydom: 0,
          pokaz: open,
          otkr: 0
        };
      } else {
        field[column][row] = {
          color: 'white',
          bomb: random(-r, 1),
          kolvorydom: 0,
          pokaz: open,
          otkr: 0
        };
      }
    }
  }

  //Сколько всего бомб и записываем сколько бомб рядом?
  for (let column = 0; column < 8; column++) {
    for (let row = 0; row < 8; row++) {
      if (field[column][row].bomb < 0) {
        field[column][row].pokaz = close;
        plusodin(column - 1, row - 1);
        plusodin(column, row - 1);
        plusodin(column + 1, row - 1);
        plusodin(column - 1, row);
        plusodin(column + 1, row);
        plusodin(column - 1, row + 1);
        plusodin(column, row + 1);
        plusodin(column + 1, row + 1);
        numbomb++;
      }
    }
  }
  metka = numbomb;

}

function draw() {
  background(220);

  textSize(15);
  fill('red');
  text('Всего бомб: ' + numbomb, 5, 490);
  text(str, 5, 417);
  text(str2 + metka, 5, 472);
  for (let column = 0; column < 8; column++) {
    for (let row = 0; row < 8; row++) {
      if (field[column][row].color === "black") {
        fill("black");
      } else {
        if (field[column][row].color === "white") {
          fill("white");
        } else {
          if (field[column][row].color === "red") {
            fill("red");
          } else {
            if (field[column][row].color === "green") {
              fill("green");
            } else {
              if (field[column][row].color === "yellow") {
                fill("yellow");
              }
            }
          }
        }
      }
      rect(row * 50, column * 50, 50, 50);
      //показываю цифры, если вскрыли
      if (field[column][row].kolvorydom > 0 && field[column][row].otkr > 0) {
        fill(127, 255, 212);
        textSize(60);
        text(field[column][row].kolvorydom, row * 50 + 10, column * 50 + 47);
      }
      fill('#7CFC00');


      ellipse(horizontal * 50 + 25, vertikal * 50 + 25, 30);

    }
  }
  //Закрашиваем доску в случае победы
  if (numbomb === win && metka === 0) {
    fill(0, 255, 127, 200);
    rect(0, 0, 400, 400);
  }
  //Закрашиваем доску в случае поражения
  if (str === 'Вы проиграли =(') {
    fill(255, 69, 0, 200);
    rect(0, 0, 400, 400);
  }
  //text(mouseX+' '+mouseY,50,100);
}


function plusodin(v, h) {
  //добавляем в свойство kolvorydom по 1
  if (v > -1 && v < 8 && h > -1 && h < 8) {
    field[v][h].kolvorydom = field[v][h].kolvorydom + 1;

  }
}

function keyPressed() {

  //если нажали стрелку ВВЕРХ
  if (keyCode === 38) {
    if (vertikal < 1) {
      vertikal = 7;
    } else {
      vertikal--;
    }
  }
  //если нажали стрелку ВНИЗ
  if (keyCode === 40) {
    if (vertikal > 6) {
      vertikal = 0;
    } else {
      vertikal++;
    }
  }
  //если нажали стрелку ВЛЕВО
  if (keyCode === 37) {
    if (horizontal < 1) {
      horizontal = 7;
    } else {
      horizontal--;
    }
  }
  //если нажали стрелку ВПРАВО
  if (keyCode === 39) {
    if (horizontal > 6) {
      horizontal = 0;
    } else {
      horizontal++;
    }
  }
  //если нажали ПРОБЕЛ
  if (keyCode === 32) {
    if (field[vertikal][horizontal].bomb < 0) {
      field[vertikal][horizontal].color = "red";
      str = 'Вы проиграли =(';
    } else {
      saper2(vertikal, horizontal);
    }
  }
  //Если нажали левый Ctrl - ОТМЕЧАЕМ БОМБЫ
  if (keyCode === 17) {
    if (field[vertikal][horizontal].color === "yellow") {
      field[vertikal][horizontal].color = "black";
      metka++;
      if (field[vertikal][horizontal].bomb < 0) win--;
    } else {
      field[vertikal][horizontal].color = "yellow";
      metka--;
      if ((field[vertikal][horizontal].bomb < 0) && (field[vertikal][horizontal].color === "yellow")) win++;
    }

  }
  if (numbomb === win && metka === 0) str = 'Вы победили!';
  fill(255, 255, 0);
  textSize(15);
  text(str2 + win, 5, 472);
}

function saper2(v, h) {

  if (v > -1 && v < 8 && h > -1 && h < 8 && field[v][h].pokaz != close) {
    field[v][h].color = "green";
    field[v][h].pokaz = close;
    field[v][h].otkr = 1;
    if (field[v][h].kolvorydom === 0) {
      saper2(v - 1, h - 1);
      saper2(v, h - 1);
      saper2(v + 1, h - 1);
      saper2(v - 1, h);
      saper2(v + 1, h);
      saper2(v - 1, h + 1);
      saper2(v, h + 1);
      saper2(v + 1, h + 1);
    }
  }
}
//юзаю мышку
function mousePressed() {
  if ((mouseX < 400) && (mouseY < 400)) {
    if (mouseButton === LEFT) {
      if (field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].bomb < 0) {
        field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].color = "red";
        str = 'Вы проиграли =(';
      } else {
        saper2(round(mouseY / 50 - 0.5), round(mouseX / 50 - 0.5));
      }
    }

    if (mouseButton === RIGHT) {
      if (field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].color === "yellow") {
        field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].color = "black";
        metka++;
        if (field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].bomb < 0) win--;
      } else {
        field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].color = "yellow";
        metka--;
        if ((field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].bomb < 0) && (field[round(mouseY / 50 - 0.5)][round(mouseX / 50 - 0.5)].color === "yellow")) win++;
      }
    } 
    if (numbomb === win && metka === 0) str = 'Вы победили!';
    fill(255, 255, 0);
    textSize(15);
    text(str2 + win, 5, 472);
  }
}