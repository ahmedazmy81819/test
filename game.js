const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// إعدادات اللعبة
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PLAYER_SPEED = 5;
const ENEMY_SPEED = 3;
const ENEMY_SPAWN_RATE = 60; // كل 60 إطار
const SCORE_PER_ENEMY = 10;

// اللاعب
const player = {
    x: WIDTH / 2 - 25,
    y: HEIGHT - 60,
    width: 50,
    height: 50,
    color: "green",
    score: 0,
};

// الأعداء
let enemies = [];

// التحكم في اللاعب
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= PLAYER_SPEED;
    }
    if (e.key === "ArrowRight" && player.x < WIDTH - player.width) {
        player.x += PLAYER_SPEED;
    }
});

// توليد الأعداء
function spawnEnemy() {
    const enemy = {
        x: Math.random() * (WIDTH - 50),
        y: 0,
        width: 50,
        height: 50,
        color: "red",
    };
    enemies.push(enemy);
}

// تحريك الأعداء
function moveEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += ENEMY_SPEED;
        if (enemies[i].y > HEIGHT) {
            enemies.splice(i, 1);
            player.score += SCORE_PER_ENEMY;
        }
    }
}

// رسم اللاعب
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// رسم الأعداء
function drawEnemies() {
    ctx.fillStyle = "red";
    enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// عرض النقاط
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`النقاط: ${player.score}`, 10, 30);
}

// تحديث اللعبة
function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT); // مسح الشاشة

    drawPlayer();
    drawEnemies();
    drawScore();

    moveEnemies();

    // توليد الأعداء بشكل عشوائي
    if (Math.random() < 1 / ENEMY_SPAWN_RATE) {
        spawnEnemy();
    }

    requestAnimationFrame(update);
}

// بدء اللعبة
update();
