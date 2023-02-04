let canvas;
let ctx;

canvas = document.createElement("canvas"); //canvas생성
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

let gameOver = false; //게임오버 여부
let score = 0;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;


let bulletList = []; //총알리스트
function Bullet() {
    //Bullet Class
    this.x = 0;
    this.y = 0;
    this.alive = true //총알 살아있음 여부
    this.init = function () {
        this.x = spaceshipX + 20;
        this.y = spaceshipY;
        bulletList.push(this);
    }
    this.update = function () {
        this.y -= 7;
    }

    this.checkHit = function () {

        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x-20 && this.x <= enemyList[i].x + 40) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    }
}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
    //Math.random()은 0~1의 값을 반환함
}

let enemyList = [];

function Enemy() {
    //Enemy Class
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = generateRandomValue(0, canvas.width - 48);
        enemyList.push(this);
    }
    this.update = function () {
        this.y += 2;
        if (this.y > canvas.height - 48) {
            gameOver = true;
        }
    }
}

function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy();
        e.init();

    }, 1000);
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/배경.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/토리.png";

    bulletImage = new Image();
    bulletImage.src = "images/토끼똥.png";

    enemyImage = new Image();
    enemyImage.src = "images/비둘기.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.png";
}

let keysDown = {};

function setupKeyboardListener() {
    document.addEventListener("keydown", function (e) {
        keysDown[e.key] = true;
        console.log(keysDown);
    })
    document.addEventListener("keyup", function (e) {
        delete keysDown[e.key];

        if (e.key == " ") {
            //spacebar
            createBullet(); //총알생성
        }
    })
}


function createBullet() {
    let b = new Bullet();
    b.init();
}

function update() {
    if ('ArrowRight' in keysDown) {
        //right
        spaceshipX += 4;
    }
    if ('ArrowLeft' in keysDown) {
        spaceshipX -= 4;
    }

    if (spaceshipX < 0) {
        spaceshipX = 0;
    }
    if (spaceshipX > canvas.width - 64) {
        spaceshipX = canvas.width - 64;
    }

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();

        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render() {
    //ctx가 이미지를 그림

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.font="20px sans-serif";
    ctx.fillText(`Score: ${score}`, 20, 600);
    ctx.fillStyle = "white";


    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 64, 64);

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y, 20, 20);
        }
    }

    for (let i = 0; i < enemyList.length; i++) {

        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 40, 40);
    }
}

function main() {
    if (!gameOver) {
        render();
        update();
        requestAnimationFrame(main); //이미지를 계속 호출하기 위해 사용

    } else {
        ctx.drawImage(gameOverImage, 10, 100, 380, 380);
    }


}
loadImage();
setupKeyboardListener();
createEnemy();
main();
