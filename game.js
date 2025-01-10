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

    let score = 0;
    let level = 1;
    let gameSpeed = 2000;
    let levels = [
        "أنا ذهبت إلى الحفلة", // المستوى 1 (3 كلمات)
        "الطقس كان جميلًا اليوم", // المستوى 2 (4 كلمات)
        "قرأت كتابًا شيقًا في المساء", // المستوى 3 (5 كلمات)
        "ذهبت إلى المدرسة مع أصدقائي", // المستوى 4 (6 كلمات)
        "الشمس تشرق من الشرق كل صباح", // المستوى 5 (7 كلمات)
        "القطط الصغيرة تلعب في الحديقة الكبيرة", // المستوى 6 (8 كلمات)
        "الطفل الصغير يحب أن يأكل التفاح الأحمر", // المستوى 7 (9 كلمات)
        "ذهبت إلى السوق واشتريت فواكه طازجة ولذيذة", // المستوى 8 (10 كلمات)
        "الكتاب على الطاولة يحتوي على معلومات قيمة ومفيدة", // المستوى 9 (11 كلمات)
        "السيارة الجديدة تسير بسرعة على الطريق السريع", // المستوى 10 (12 كلمات)
        "الطالب المجتهد يحصل على درجات عالية في الامتحانات", // المستوى 11 (13 كلمات)
        "الحديقة الجميلة تحتوي على أزهار ملونة وأشجار عالية", // المستوى 12 (14 كلمات)
        "القطة البيضاء تجلس على السجادة الحمراء في الغرفة", // المستوى 13 (15 كلمات)
        "الرجل العجوز يمشي ببطء في الشارع الهادئ كل صباح", // المستوى 14 (16 كلمات)
        "الطفلة الصغيرة تلعب بالدمى في غرفتها المشرقة", // المستوى 15 (17 كلمات)
        "الطائرة الكبيرة تحلق في السماء الزرقاء الصافية", // المستوى 16 (18 كلمات)
        "الكتاب المفضل لدي يحتوي على قصص مشوقة ومثيرة", // المستوى 17 (19 كلمات)
        "السيارة القديمة تحتاج إلى إصلاحات عديدة وكثيرة", // المستوى 18 (20 كلمات)
        "الطالب المتفوق يذاكر بجد ويحضر جميع الدروس بانتظام", // المستوى 19 (21 كلمة)
        "الحديقة العامة مليئة بالأطفال الذين يلعبون ويمرحون", // المستوى 20 (22 كلمة)
        "القطة السوداء تقفز على الأسوار العالية بكل خفة", // المستوى 21 (23 كلمة)
        "الرجل الطويل يرتدي معطفًا أسودًا ويحمل حقيبة سوداء", // المستوى 22 (24 كلمة)
        "الطفل الصغير يركب دراجته الجديدة في الحديقة الكبيرة", // المستوى 23 (25 كلمة)
        "الطائرة الورقية تطير عاليًا في السماء الزرقاء الصافية", // المستوى 24 (26 كلمة)
        "الكتاب الكبير يحتوي على صور ملونة ومعلومات قيّمة", // المستوى 25 (27 كلمة)
        "السيارة السريعة تسير على الطريق السريع بكل أمان", // المستوى 26 (28 كلمة)
        "الطالب المجتهد يذاكر بجد ويحضر جميع الدروس بانتظام", // المستوى 27 (29 كلمة)
        "الحديقة الجميلة تحتوي على أزهار ملونة وأشجار عالية", // المستوى 28 (30 كلمة)
        "القطة البيضاء تجلس على السجادة الحمراء في الغرفة", // المستوى 29 (31 كلمة)
        "الرجل العجوز يمشي ببطء في الشارع الهادئ كل صباح", // المستوى 30 (32 كلمة)
    ];
    let activeWords = [];

    function normalizeText(text) {
        // توحيد الحروف المتشابهة
        return text
            .normalize('NFKD') // تفكيك الحروف المركبة
            .replace(/[\u064B-\u065F]/g, '') // إزالة التشكيل
            .replace(/[أإآ]/g, 'ا') // توحيد الألف بأشكالها (أ، إ، آ)
            .replace(/[ة]/g, 'ه') // تحويل التاء المربوطة إلى هاء
            .replace(/[ى]/g, 'ي'); // تحويل الألف المقصورة إلى ياء
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
        words.forEach(wordText => {
            const word = document.createElement('div');
            word.classList.add('word');
            word.textContent = wordText;
            word.style.left = `${Math.random() * (gameContainer.offsetWidth - 100)}px`;
            word.style.top = '0px';
            wordsContainer.appendChild(word);
            activeWords.push(word);
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
    }

    userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const inputWord = normalizeText(userInput.value.trim()); // نحول النص لشكل موحد
            let wordFound = false;

            activeWords.forEach(word => {
                const wordText = normalizeText(word.textContent); // نحول النص لشكل موحد
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
