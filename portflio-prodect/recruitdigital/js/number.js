document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            console.log('Clicked:', targetId);  // デバッグ用にクリックされたidを表示

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log('Target section not found:', targetId);
            }
        });
    });



    const establishmentDate = new Date('1985-04-01');
    // 現在の日付を取得
    const currentDate = new Date();
    // 経過年数を計算
    const yearsSinceEstablishment = currentDate.getFullYear() - establishmentDate.getFullYear();

    document.getElementById('years-since-establishment').textContent = yearsSinceEstablishment;

});