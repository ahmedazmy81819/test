// فتح نافذة الإعدادات
document.getElementById('settings').addEventListener('click', function () {
    document.getElementById('settings-modal').style.display = 'block';
});

// إغلاق نافذة الإعدادات
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('settings-modal').style.display = 'none';
});

// عرض الأزرار الجديدة عند الضغط على "ابدء اللعب"
document.getElementById('start-game').addEventListener('click', function () {
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('game-options').style.display = 'flex';
});

// بدء لعبة جديدة
document.getElementById('new-game').addEventListener('click', function () {
    localStorage.removeItem('gameProgress'); // حذف التقدم المحفوظ
    window.location.href = 'game.html'; // الانتقال إلى صفحة اللعبة
});

// استئناف اللعبة
document.getElementById('resume-game').addEventListener('click', function () {
    const progress = JSON.parse(localStorage.getItem('gameProgress'));
    if (progress) {
        window.location.href = 'game.html';
    } else {
        alert('لا يوجد تقدم محفوظ!');
    }
});

// غرفة التدريب (مؤقتًا بدون وظيفة)
document.getElementById('training-room').addEventListener('click', function () {
    alert('غرفة التدريب قريبًا!');
});

// تغيير الوضع الداكن
document.getElementById('dark-mode').addEventListener('click', function () {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
});

// تغيير الوضع الفاتح
document.getElementById('light-mode').addEventListener('click', function () {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
});

// تحميل الوضع المحفوظ عند فتح الصفحة
window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
