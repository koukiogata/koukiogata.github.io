document.addEventListener('DOMContentLoaded', function () {
    const loading = document.getElementById('loading');
    const visual = document.getElementById('visual');
    const textContainer = document.getElementById('text-container');
    const frame = document.getElementById('frame'); // frame要素の取得を追加
    const svg = document.querySelector('svg');
    const background = document.getElementById('background');


    svg.style.display = 'none';


    // Kのアニメーション定義と実行
    loading.animate([
        { transform: 'translateY(100%)' }, // 下から出現
        { transform: 'translateY(-10%)' }, // 小さく跳ねる
        { transform: 'translateY(0)' }     // 元の位置に戻る
    ], {
        duration: 500, // アニメーションの持続時間
        fill: 'forwards' // アニメーション終了後のスタイルを維持
    }).onfinish = function () {
        // Kのアニメーション完了後にVisualの表示とアニメーションを開始
        setTimeout(() => {
            visual.style.display = 'block'; // Visualを表示
            visual.animate([
                { transform: 'translateX(-100%)', opacity: 0 }, // スライドイン開始位置（左端から）
                { transform: 'translateX(0%)', opacity: 1 }     // 終了位置（Kの右隣）
            ], {
                duration: 600, // アニメーションの時間
                fill: 'forwards' // アニメーション終了後のスタイルを維持
            });

            // KとVisualを一緒に左に30pxスライド
            textContainer.animate([
                { transform: 'translateX(0px)' },
                { transform: 'translateX(-25vw)' }
            ], {
                duration: 600, // アニメーションの時間
                fill: 'forwards' // アニメーション終了後のスタイルを維持
            }).finished.then(() => {
                svg.style.display = 'block';
                // textContainerアニメーション完了後にframeのアニメーションを開始
                frame.animate([
                    { strokeDashoffset: 1200 },
                    { strokeDashoffset: 0 }
                ], {
                    duration: 2000,
                    fill: 'forwards'
                }).finished.then(() => {
                    frame.setAttribute('fill', 'black');
                    frame.setAttribute('stroke', 'white');
                    loading.style.color = 'white';
                    visual.style.color = 'white';
                    // SVGアニメーション完了後に背景のオパシティを1に変更
                    background.style.opacity = 1;
                    background.animate([
                        { transform: 'scaleY(0)' }, // 中央から始まる拡大
                        { transform: 'scaleY(1)' } // 画面全体をカバー
                    ], {
                        duration: 500,
                        fill: 'forwards'
                    });
                });

            });
        }, 1000); // 0.5秒の遅延
    };
});
