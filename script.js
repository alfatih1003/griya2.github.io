
// DATA ANGGOTA GRIYA
const members = [
    { name: "Al Fatih", school: "Al Wildan 22 Makassar", emoji: "😎" },
    { name: "Aizher", school: "SD Inpres Unggulan BTN Pemda", emoji: "🔥" },
    { name: "Althaf", school: "SMPN 6 Makassar", emoji: "⚡" },
    { name: "Alby", school: "SMP Telkom Makassar", emoji: "🎮" },
    { name: "Ghazy", school: "MTsN 1 Kota Makassar", emoji: "🦁" },
    { name: "Akhtar", school: "SMPN 13 Kota Makassar", emoji: "💫" },
    { name: "Rio", school: "SD Negeri Komplek IKIP", emoji: "🚀" },
    { name: "Fadil", school: "Sekolah belum ditambahkan", emoji: "🎯" },
    { name: "Zahran", school: "Athirah 1 Makassar", emoji: "👑" }
];

// DATA TIKTOK
const tiktokAccounts = [
    { name: "Al Fatih", accounts: ["alfatih26561"] },
    { name: "Aizher", accounts: ["tutor.ml04", "aizhersaja"] },
    { name: "Althaf", accounts: ["altap151515", "deedataltap15"] },
    { name: "Alby", accounts: ["alby.rafif6"] },
    { name: "Ghazy", accounts: [] },
    { name: "Akhtar", accounts: ["akhtarsyariq"] },
    { name: "Rio", accounts: ["daredevill26"] },
    { name: "Fadil", accounts: ["fadilxyz76"] },
    { name: "Zahran", accounts: ["za_rrr1"] }
];

// REGISTRASI
const registerPage = document.getElementById("registerPage");
const mainWebsite = document.getElementById("mainWebsite");
const visitorName = document.getElementById("visitorName");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", enterWebsite);

visitorName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") enterWebsite();
});

function enterWebsite() {
    const name = visitorName.value.trim();

    if (!name) {
        alert("Masukkan nama kamu terlebih dahulu");
        visitorName.focus();
        return;
    }

    registerPage.classList.add("hidden");
    mainWebsite.classList.remove("hidden");

    document.getElementById("welcomeText").textContent =
        `Halo ${name}, selamat datang di Griya Panakkukang`;

    window.scrollTo(0, 0);
}

// TAMPILKAN ANGGOTA
const memberList = document.getElementById("memberList");

members.forEach((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card";

    card.innerHTML = `
    <div class="member-emoji">${member.emoji}</div>
    <h3>${member.name}</h3>
    <p>Griya Member #${index + 1}</p>
  `;

    memberList.appendChild(card);
});

// TAMPILKAN SEKOLAH
const schoolList = document.getElementById("schoolList");

members.forEach(member => {
    const card = document.createElement("article");
    card.className = "school-card";

    card.innerHTML = `
    <div class="school-emoji">🏫</div>
    <h3>${member.name}</h3>
    <p>${member.school}</p>
  `;

    schoolList.appendChild(card);
});

// TAMPILKAN TIKTOK
const tiktokList = document.getElementById("tiktokList");

tiktokAccounts.forEach(person => {
    const card = document.createElement("article");
    card.className = "tiktok-card";

    const accountHTML = person.accounts.length
        ? person.accounts.map(username =>
            `<a href="https://www.tiktok.com/@${username}" target="_blank" rel="noopener noreferrer">@${username}</a>`
        ).join("<br>")
        : "<p>Belum ada akun yang ditambahkan</p>";

    card.innerHTML = `
    <div class="big-emoji">🎵</div>
    <h3>${person.name}</h3>
    ${accountHTML}
  `;

    tiktokList.appendChild(card);
});

// GANTI TEMA
document.querySelectorAll("[data-theme]").forEach(button => {
    button.addEventListener("click", () => {
        document.body.dataset.theme = button.dataset.theme;
    });
});

// MINI GAME GRIYA RUNNER
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");
const startButton = document.getElementById("startGame");
const jumpButton = document.getElementById("jumpGame");

let player;
let obstacles;
let score;
let running = false;
let gameFrame;
let speed;

function resetGame() {
    player = {
        x: 75,
        y: 185,
        width: 35,
        height: 35,
        velocityY: 0,
        jumping: false
    };

    obstacles = [];
    score = 0;
    speed = 5;
    scoreText.textContent = score;
}

function drawPlayer() {
    ctx.font = "32px Arial";
    ctx.fillText("🏃", player.x, player.y + 30);
}

function drawObstacles() {
    ctx.font = "30px Arial";

    obstacles.forEach(obstacle => {
        ctx.fillText("🪨", obstacle.x, obstacle.y + 28);
    });
}

function drawGround() {
    ctx.strokeStyle = "#168cff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 220);
    ctx.lineTo(canvas.width, 220);
    ctx.stroke();
}

function jump() {
    if (!running || player.jumping) return;

    player.velocityY = -12;
    player.jumping = true;
}

function gameLoop() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PLAYER MOVEMENT
    player.y += player.velocityY;
    player.velocityY += 0.55;

    if (player.y >= 185) {
        player.y = 185;
        player.velocityY = 0;
        player.jumping = false;
    }

    // SPAWN OBSTACLES
    if (Math.random() < 0.025) {
        obstacles.push({
            x: canvas.width,
            y: 190,
            width: 30,
            height: 30
        });
    }

    // MOVE OBSTACLES
    obstacles.forEach(obstacle => {
        obstacle.x -= speed;
    });

    obstacles = obstacles.filter(obstacle => obstacle.x > -40);

    // COLLISION CHECK
    for (const obstacle of obstacles) {
        const playerLeft = player.x + 5;
        const playerRight = player.x + 30;
        const playerTop = player.y + 5;
        const playerBottom = player.y + 30;

        const obstacleLeft = obstacle.x + 5;
        const obstacleRight = obstacle.x + 28;
        const obstacleTop = obstacle.y;
        const obstacleBottom = obstacle.y + 30;

        const hit =
            playerRight > obstacleLeft &&
            playerLeft < obstacleRight &&
            playerBottom > obstacleTop &&
            playerTop < obstacleBottom;

        if (hit) {
            running = false;
            cancelAnimationFrame(gameFrame);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, 105);
            ctx.font = "16px Arial";
            ctx.fillText("Tekan START GAME untuk bermain lagi", canvas.width / 2, 135);
            ctx.textAlign = "left";
            return;
        }
    }

    score++;
    scoreText.textContent = score;

    if (score % 500 === 0) speed += 0.5;

    drawGround();
    drawPlayer();
    drawObstacles();

    gameFrame = requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", () => {
    if (running) return;

    cancelAnimationFrame(gameFrame);
    resetGame();
    running = true;
    gameLoop();
});

jumpButton.addEventListener("click", jump);

document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});

// TAMPILAN AWAL GAME
resetGame();
drawGround();
drawPlayer();
