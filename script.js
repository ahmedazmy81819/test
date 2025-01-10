// فتح نافذة الإعدادات
document.getElementById('settings').addEventListener('click', function() {
    document.getElementById('settings-modal').style.display = 'block';
});

// إغلاق نافذة الإعدادات
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('settings-modal').style.display = 'none';
});

// بدء اللعبة
document.getElementById('start-game').addEventListener('click', function() {
    window.location.href = 'game.html';
});

// استئناف اللعبة
document.getElementById('resume-game').addEventListener('click', function() {
    const progress = JSON.parse(localStorage.getItem('gameProgress'));
    if (progress) {
        window.location.href = 'game.html';
    } else {
        alert('لا يوجد تقدم محفوظ!');
    }
});

// تغيير الوضع الداكن/الفاتح
document.getElementById('theme').addEventListener('change', function() {
    if (this.value === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#000';
    }
});
