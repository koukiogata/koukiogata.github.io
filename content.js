document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box'); // 複数のboxを取得

    function wrapElements(box) {
        const link = box.querySelector('a'); // box内のaタグ
        const img = box.querySelector('img'); // box内のimgタグ
        const contentGroup = box.querySelector('.content-group'); // box内のcontent-group

        if (window.innerWidth <= 500) {
            // img と content-group を a タグで囲む
            if (!link.contains(img)) { // 既に囲まれていない場合のみ実行
                link.innerHTML = ''; // aタグ内の元のテキストを消去
                link.appendChild(img); // imgをaタグに追加
                link.appendChild(contentGroup); // content-groupもaタグに追加
            }
        } else {
            // 元の状態に戻す
            if (link.contains(img) && link.contains(contentGroup)) {
                box.insertBefore(img, link); // imgをboxに戻す
                box.insertBefore(contentGroup, link); // content-groupをboxに戻す
                link.textContent = 'mora'; // aタグ内のテキストを元に戻す
            }
        }
    }

    function handleResize() {
        boxes.forEach(box => {
            wrapElements(box); // 全てのboxに対して処理を実行
        });
    }

    // ページ読み込み時とウィンドウサイズ変更時に実行
    window.addEventListener('resize', handleResize);
    handleResize(); // 初回実行

    document.getElementById('design-link').addEventListener('click', function() {
        window.open('https://xd.adobe.com/view/9bb2b6ed-0140-47a7-839b-e06d1daa0b50-cee1/grid', '_blank', 'noopener,noreferrer');
      });
});
