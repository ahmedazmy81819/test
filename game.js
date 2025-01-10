document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const wordsContainer = document.getElementById('words');
    const userInput = document.getElementById('user-input');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScoreElement = document.getElementById('final-score');
    const retryButton = document.getElementById('retry');
    const goHomeButton = document.getElementById('go-home');
    const shareButton = document.getElementById('share-button');
    const scoreImage = document.getElementById('score-image');
    const scoreText = document.getElementById('score-text');
    const dateText = document.getElementById('date-text');

    let score = 0;
    let level = 1;
    let gameSpeed = 2000;
    let levels = [
        // ... (بقية المستويات)
    ];
    let activeWords = [];

    function normalizeText(text) {
        return text
            .normalize('NFKD')
            .replace(/[\u064B-\u065F]/g, '')
            .replace(/[أإآ]/g, 'ا')
            .replace(/[ة]/g, 'ه')
            .replace(/[ى]/g, 'ي');
    }

    function startGame() {
        loadProgress();
        userInput.value = '';
        userInput.focus();
        gameOverModal.style.display = 'none';
        wordsContainer.innerHTML = '';
        activeWords = [];
        generateWord();
        setInterval(moveWords, 50);
    }

    function generateWord() {
        const sentence = levels[level - 1];
        const words = sentence.split(' ');
        let delay = 0;

        words.forEach((wordText, index) => {
            setTimeout(() => {
                const word = document.createElement('div');
                word.classList.add('word');
                word.textContent = wordText;
                word.style.left = `${Math.random() * (gameContainer.offsetWidth - 100)}px`;
                word.style.top = '0px';
                wordsContainer.appendChild(word);
                activeWords.push(word);
            }, delay);

            delay += 1000;
        });
    }

    function moveWords() {
        activeWords.forEach(word => {
            const top = parseInt(word.style.top) || 0;
            word.style.top = `${top + 2}px`;

            if (top + word.offsetHeight > gameContainer.offsetHeight) {
                endGame();
            }
        });
    }

    function updateScore() {
        scoreElement.textContent = `النقاط: ${score}`;
    }

    function updateLevel() {
        levelElement.textContent = `المستوى: ${level}`;
        if (level > levels.length) {
            alert("لقد أكملت جميع المستويات!");
            endGame();
        } else {
            wordsList = levels[level - 1].split(' ');
        }
    }

    function endGame() {
        gameOverModal.style.display = 'block';
        finalScoreElement.textContent = `النقاط النهائية: ${score}`;

        // إظهار زر المشاركة إذا تجاوز المستوى 3 أو 4
        if (level >= 3) {
            shareButton.style.display = 'block';
        }
    }

    // وظيفة مشاركة الهاي سكور على الواتساب
    shareButton.addEventListener('click', function () {
        // تحديث النص في صورة الهاي سكور
        scoreText.textContent = `النقاط: ${score}`;
        dateText.textContent = `التاريخ: ${new Date().toLocaleString()}`;

        // إنشاء صورة الهاي سكور
        html2canvas(scoreImage).then(canvas => {
            const image = canvas.toDataURL('image/png');

            // تحويل الصورة إلى ملف Blob
            canvas.toBlob(function (blob) {
                const file = new File([blob], "highscore.png", { type: "image/png" });

                // إنشاء رابط لفتح الواتساب مع الصورة
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent("هاي سكور جديد!")}`;
                const formData = new FormData();
                formData.append('file', file);

                // فتح نافذة جديدة مع رابط الواتساب
                const newWindow = window.open(whatsappUrl, '_blank');

                // إرسال الصورة عبر الواتساب
                if (newWindow) {
                    newWindow.onload = function () {
                        const input = newWindow.document.querySelector('input[type="file"]');
                        if (input) {
                            input.files = createFileList(file);
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    };
                }
            }, 'image/png');
        });
    });

    // دالة مساعدة لإنشاء FileList
    function createFileList(file) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        return dataTransfer.files;
    }

    userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const inputWord = normalizeText(userInput.value.trim());
            let wordFound = false;

            activeWords.forEach(word => {
                const wordText = normalizeText(word.textContent);
                if (wordText === inputWord) {
                    word.remove();
                    activeWords = activeWords.filter(w => w !== word);
                    score += 10;
                    updateScore();
                    wordFound = true;
                }
            });

            if (wordFound) {
                userInput.value = '';
                if (activeWords.length === 0) {
                    level++;
                    gameSpeed -= 200;
                    updateLevel();
                    generateWord();
                }
            }
        }
    });

    retryButton.addEventListener('click', startGame);

    goHomeButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    function loadProgress() {
        const progress = JSON.parse(localStorage.getItem('gameProgress'));
        if (progress) {
            level = progress.level;
            score = progress.score;
            updateScore();
            updateLevel();
        }
    }

    window.addEventListener('beforeunload', function () {
        localStorage.setItem('gameProgress', JSON.stringify({ level: level, score: score }));
    });

    startGame();
});
