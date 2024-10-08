document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');

    function wrapElements(box) {
        let link = box.querySelector('a');
        const img = box.querySelector('img');
        const h2 = box.querySelector('h2');
        const contentGroup = box.querySelector('.content-group');

        if (window.innerWidth <= 500) {
            // 500px以下の場合、a タグのテキストを消去
            if (link) {
                link.textContent = ''; // aタグのテキストを消去
                if (!link.contains(img)) {
                    link.appendChild(img); // imgをaタグに追加
                }
                if (!link.contains(h2)) {
                    link.appendChild(h2); // h2をaタグに追加
                }
            }
        } else {
            // 500pxを超える場合、元のテキストをaタグに設定
            if (link) {
                if (link.contains(img)) {
                    box.insertBefore(img, link); // imgをboxに戻す
                }
                if (link.contains(h2)) {
                    contentGroup.insertBefore(h2, contentGroup.firstChild); // h2をcontentGroupの最初に戻す
                }
                link.textContent = 'mora'; // aタグにテキストを設定
            }
        }
    }

    function handleResize() {
        boxes.forEach(box => {
            wrapElements(box); // 各boxに対してwrapElements関数を実行
        });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初回実行
});
