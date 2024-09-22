document.addEventListener('DOMContentLoaded', function () {
    const loading = document.getElementById('loading');
    const visual = document.getElementById('visual');
    const textContainer = document.getElementById('text-container');
    const frame = document.getElementById('frame'); // frame要素の取得を追加
    const svg = document.querySelector('svg');
    const background = document.getElementById('background');
    const outerContainer = document.getElementById('outer-container');
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.header-wrapper ul li a');
    
    outerContainer.style.display = 'none',
    // document.body.style.overflow = 'hidden';
    svg.style.display = 'none';
    loading.style.display = 'none',

    setTimeout(() => {
        // Kのアニメーション定義と実行
        loading.style.display = 'block',
            loading.animate([
                { transform: 'translateY(30%)' }, // 下から出現
                { transform: 'translateY(-50%)' }, // 小さく跳ねる
                { transform: 'translateY(0)' },    // 元の位置に戻る
            ], {
                duration: 500, // アニメーションの持続時間
                fill: 'forwards' // アニメーション終了後のスタイルを維持
            }).onfinish = function () {
                setTimeout(() => {
                    // Kのアニメーション完了後にVisualの表示とアニメーションを開始
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
                            svg.addEventListener('click', function () {
                                // outer-containerのフェードアウトアニメーションを設定（中央から透明になっていく）
                                outerContainer.animate([
                                    { transform: 'scaleY(1)', opacity: 1 }, // 元の大きさから開始
                                    { transform: 'scaleY(1)', opacity: 0 }  // 垂直方向に縮小しながら透明になる
                                ], {
                                    duration: 500,
                                    easing: 'ease-in-out',
                                    fill: 'forwards'
                                }).finished.then(() => {
                                    outerContainer.style.display = 'none';
                                    document.body.style.overflow = 'auto'; // ここでスクロールを有効にする
                                });
                            });
                        });

                    });
                }, 300); // 0.5秒の遅延
            };
    }, 1000)





    // document.body.style.overflow = 'auto'; 
    // アニメーションが完了したら表示を非表示にする




    window.addEventListener('scroll', function () {
        let currentSection = '';

        // 現在スクロールしているセクションを特定
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionID = section.getAttribute('id');
            let scrollOffset; // スクロールオフセットの初期化

            // セクションIDに基づいてオフセットを調整
            switch (sectionID) {
                case 'works':
                    scrollOffset = sectionHeight / 2; // Worksのための特別なオフセット
                    break;
                case 'testimonials':
                    scrollOffset = sectionHeight / 1.8; // TestimonialsとSNSのためのオフセット
                    break;
                    case 'sns':
                        scrollOffset = sectionHeight / 1.7; // TestimonialsとSNSのためのオフセット
                        break;
                        default:
                    scrollOffset = sectionHeight / 5; // 他のセクションのデフォルトのオフセット
            }
    
            if (window.pageYOffset >= sectionTop - scrollOffset) {
                currentSection = sectionID;
            }
        });

        // ボタンの色を更新
        navLinks.forEach(link => {
            link.classList.remove('active'); // 全てのボタンの色をリセット
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active'); // 現在のセクションのボタンだけ色を変更
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // ハンバーガーメニューボタンのクリックイベント
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションメニューの各リンクのクリックイベント
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            // メニューがアクティブな状態であれば非アクティブにする
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });




});
