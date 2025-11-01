// Loadingアニメーション用のコンポーネント
const LoadingComponent = {
    template: `
      <div id="outer-container">
        <div id="background" style="opacity: 0;"></div>
        <div id="loading-container">
          <div id="text-container">
            <div id="loading">K</div>
            <div id="visual-wrapper">
              <div id="visual">CREATE</div>
            </div>
          </div>
          <svg width="70vw" height="20vw" viewBox="0 0 500 100" preserveAspectRatio="xMidYMid meet"
              style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
              <rect id="frame" x="0" y="0" width="500" height="100" fill="white" stroke="black" stroke-width="3" />
          </svg>
        </div>
      </div>
    `,
    mounted() {
        // ローディングアニメーションを実行
        this.runLoadingAnimation();
    },
    methods: {
        runLoadingAnimation() {
            const loading = document.getElementById('loading');
            const visual = document.getElementById('visual');
            const textContainer = document.getElementById('text-container');
            const frame = document.getElementById('frame'); // frame要素の取得を追加
            const svg = document.querySelector('svg');
            const background = document.getElementById('background');
            const outerContainer = document.getElementById('outer-container');

            // outerContainer.style.display = 'none',
            document.body.style.overflow = 'hidden';
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
                                        duration: 1000,
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
                                            console.log('SVG clicked!');
                                            outerContainer.animate([
                                                { transform: 'scaleY(1)', opacity: 1 },
                                                { transform: 'scaleY(1)', opacity: 0 }
                                            ], {
                                                duration: 500,
                                                easing: 'ease-in-out',
                                                fill: 'forwards'
                                            }).finished.then(function () { // ここで function() に変更して、bind(this) が適用可能にする
                                                outerContainer.style.display = 'none';
                                                document.body.style.overflow = 'auto';
                                            });  // bind(this)で、外側の「this」をここでも使えるようにする
                                        });

                                    });
                                });
                            }, 300); // 0.5秒の遅延
                        };
                }, 1000)
        }
    }
};

// Vueアプリケーションの作成
// アプリケーションをマウント


const HeaderComponent = {
    // コンポーネントのテンプレート部分。ここにHTML構造を記述。
    template: `
      <div class="hamburger-menu">
        <button class="hamburger" aria-label="メニューを開く">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    <header id="header" class="nav-menu">
        <div class="header-wrapper">
            <ul>
                <li><a href="#top" id="top-btn">TOP</a></li>
                <li><a href="#about" id="about-btn">ABOUT</a></li>
                <li><a href="#works" id="works-btn">WORKS</a></li>
                <li><a href="#design" id="design-btn">DESIGN</a></li>
                <li><a href="#sns" id="sns-btn">SNS</a></li>
            </ul>
        </div>
    </header>
    `,
    mounted() {
        // ハンバーガーメニューとナビゲーションメニューのDOM要素を取得
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // ハンバーガーメニューボタンのクリックイベント
        hamburger.addEventListener('click', function () {
            event.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // ナビゲーションメニューの各リンクのクリックイベント
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function () {
                // メニューがアクティブな状態であれば非アクティブにする
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        document.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
};

// メインコンポーネントの定義
const MainComponent = {
    template: `
      <main id="top" class="scroll-section">
        <div class="top-contenir">
            <div class="top-wrapper">
                <h1>K-CREATE</h1>
                <p class="top-text-line">Designing the Future</p>
            </div>
        </div>
        <section id="about" class="scroll-section">
            <div id="about-flex">
                <div class="about-wrapper">
                    <div class="about-contenir">
                        <div class="about-text">
                            <div class="text-letter">
                                <h2>KOUKI</h2>
                                <p>2002/03/05</p>
                            </div>
                        </div>
                        <img src="image/tobias-rademacher-uTjbuFbhTug-unsplash 1.jpg" alt="デザイナーKOUKIのポートレート画像">
                    </div>
                    <div class="about-paragraph">
                        <p>こんにちは、koukiと申します。WEBデザインのお仕事にしてから2年が経ちました。この期間の中で、多様なクライアントの要望に応える機会をいただき、数々の発見とともに失敗から学ぶ貴重な経験をしてきました。
                        </p>
                    </div>
                </div>

            </div>
            <div id="about-flex">
                <div class="about-wrapper skli">
                    <p>HTML、CSS、JavaScriptをはじめ、最新のフレームワークやライブラリ（React、Vue.jsなど）にも精通しています。
また、Adobe Photoshop、Illustrator、XDを使用したデザイン制作の経験があり、バナー制作やECサイトのデザインカンプ作成も行ってきました。
常にレスポンシブデザインとクロスブラウザ対応を意識し、ユーザーにとって快適な閲覧体験を追求しています。
                    </p>
                    <div class="skli-sheet">
                        <div></div>
                        <div class="sklli-level">
                            <ul>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Javascript</li>
                                <li>Adobe Photshop</li>
                                <li>Adobe Illustrator</li>
                                <li>Adobe XD</li>
                            </ul>
                        </div>
                        <div></div>
                    </div>
                </div>
        </section>
        <section id="works" class="scroll-section">
            <div class="container">
                <div class="box">
                    <div class="triangle">
                    </div>
                    <img src="image/works-image1.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                    <div class="content-group">
                        <h2>Vue.js企業プロジェクトの自主製作</h2>
                        <p>●ポイント<br />最新のVue.jsを使用して再利用可能なコンポーネントを設計し、それにより各デバイスに対応しました。</p>
                        <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                    </div>
                    <a href="https://koukiogata.github.io/hotel" target="_blank">見る</a>
                </div>
                <div class="box">
                    <div class="triangle">
                    </div>
                    <img src="image/works-image2.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                    <div class="content-group">
                        <h2>株式会社タカヤコミュニケーションズ</h2>
                        <p>●ポイント<br />JavaScriptを使用して、SVG内に動的な折れ線グラフを実装、データの範囲に応じたスケール変換を実装</p>
                        <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                    </div>
                    <a href="https://koukiogata.github.io/digital" target="_blank">見る</a>
                </div>
                <div class="box">
                    <div class="triangle">
                    </div>
                    <img src="image/works-image3.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                    <div class="content-group">
                        <h2>HTML CSS JQuery基礎フレームワーク</h2>
                        <p>●ポイント<br /> デバイスの画面サイズに応じたレイアウト調整。CSSの @keyframes を使った滑らかなアニメーション</p>
                        <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                    </div>
                    <a href="./web/index.html" target="_blank">見る</a>
                </div>
            </div>
        </section>
        <section id="design" class="scroll-section">
            <div class="container">
                <div class="designbox">
                    <h2>FLYER</h2>
                    <div class="elbox">
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image1.png" alt="">
                            <div class="text">
                                <h3>外構工事サービス</h3>
                                <p>地域の住宅リフォーム会社「創栄ホーム」が提供する外構工事サービスを、チラシで効果的に訴求するために制作しました。</p>
                                </div>
                                <a href="#" class="openModal" data-target="modal1">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image2.png" alt="">
                            <div class="text">
                                <h3>にぎり墨体験</h3>
                                <p>奈良県橿原市で行われる「新書写書道展」イベント内の体験企画「にぎり墨体験」を、子ども・保護者に向けてわかりやすく告知するために制作。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal2">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image3.png" alt="">
                            <div class="text">
                                <h3>外壁・屋根塗装</h3>
                                <p>奈良県を中心に住宅リフォームを行う「創栄ホーム」の外壁・屋根塗装サービスを地域住民に向けて告知するチラシ</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal3">みる</a>
                        </div>
                    </div>
                </div>
                <div class="designbox">
                    <h2>BANNER</h2>
                    <div class="elbox">
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image4.png" alt="">
                            <div class="text">
                                <h3>OWL OSASKA</h3>
                                <p>大阪のナイトクラブ「OWL OSAKA」のDJイベント告知用バナーを制作</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal4">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image5.png" alt="">
                            <div class="text">
                                <h3>terrace coffee</h3>
                                <p>都心で開催される期間限定テラスカフェイベントの告知バナーを制作。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal5">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image6.png" alt="">
                            <div class="text">
                                <h3>やきいも大会</h3>
                                <p>地域イベント「やきいも大会」のSNS告知用バナーを制作。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal6">みる</a>
                        </div>
                    </div>
                </div>
                <div class="designbox">
                    <h2>WEBSITE</h2>
                    <div class="elbox">
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image7.png" alt="">
                            <div class="text">
                                <h3>尾方習字教室</h3>
                                <p>子どもから大人まで通える「尾う習字教室」のWebサイトデザインカンプを制作。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal7">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image8.png" alt="">
                            <div class="text">
                                <h3>大滝屋旅館</h3>
                                <p>老舗温泉旅館「大滝屋旅館」のWebサイトデザインカンプを制作。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal8">みる</a>
                        </div>
                        <div class="element">
                            <div class="triangle">
                            </div>
                            <img src="image/design_image9.png" alt="">
                            <div class="text">
                                <h3>MIZUNOWAKUSEI</h3>
                                <p>ホテルの企画・開発・プロデュースを行うMIZUNOWAKUSEIのコーポレートサイトをデザイン。</p>
                            </div>
                            <a href="#" class="openModal" data-target="modal9">みる</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modalsection">
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 1.png" alt="作品1拡大画像">
                    </div>
                </div>
                <div id="modal2" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 2.png" alt="作品2拡大画像">
                  </div>
                </div>
                <div id="modal3" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 3.png" alt="作品3拡大画像">
                    </div>
                </div>
                <div id="modal4" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 4.png" alt="作品1拡大画像">
                    </div>
                </div>
                <div id="modal5" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 5.png" alt="作品2拡大画像">
                  </div>
                </div>
                <div id="modal6" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="image/Group 6.png" alt="作品3拡大画像">
                    </div>
                </div>
                <div id="modal7" class="modal">
                    <div class="modal-content-height">
                        <span class="close">&times;</span>
                        <img src="image/Group 7.png" alt="作品1拡大画像">
                    </div>
                </div>
                <div id="modal8" class="modal">
                    <div class="modal-content-height">
                        <span class="close">&times;</span>
                        <img src="image/Group 8.png" alt="作品2拡大画像">
                  </div>
                </div>
                <div id="modal9" class="modal">
                    <div class="modal-content-height">
                        <span class="close">&times;</span>
                        <img src="image/Group 9.png" alt="作品3拡大画像">
                    </div>
                </div>
            </div>
        </section>
    </main>
    `,
    // ここにメインコンポーネントに関連するデータやメソッドを追加することができます
};

// フッターコンポーネントの定義
const FooterComponent = {
    template: `
      <footer id="sns" class="scroll-section">
        <div class="sns-container">
            <div class="sns-content">
                <div class="sns-message">
                    <p>これからも学び続けることを心掛け、さらに多くのプロジェクトにチャレンジしていく所存です。あなたのビジョンを形にするための一助となれれば幸いです。</p>
                </div>
                <div class="sns-links">
                    <div class="social-icons">
                        <a href="https://x.com/kouki10BassSlut" target="_blank"><img src="image/kjinoicevcXXX 1.png" alt="KOUKIのSNSリンクアイコン2"></a>
                        <a href="https://www.instagram.com/_kxxzy/" target="_blank"><img src="image/kjinoicevc 1.png" alt="githubのSNSリンクアイコン"></a>
                    </div>
                    <div class="brand-logo">
                        <img src="image/knkjn 1.png" alt="KOUKIのブランドロゴ">
                    </div>
                </div>

            </div>
        </div>
    </footer>
    `,
    // フッターに関連するロジックやデータもここで追加可能
};

// Vueアプリケーションの作成。各コンポーネントを使用してページ全体を構成。
const app = Vue.createApp({
    components: {
        'loading-component': LoadingComponent,
        'header-component': HeaderComponent,
        'main-component': MainComponent,
        'footer-component': FooterComponent,
    },
    data() {
        return {
            isLoading: true,
            currentSection: '',  // 現在のセクション
            sections: [],  // スクロールセクションの配列
            navLinks: []  // ナビゲーションリンクの配列
        };
    },
    mounted() {
        const headerHeight = document.querySelector('.header-wrapper ul').offsetHeight;
        // DOM要素の取得
        this.sections = Array.from(document.querySelectorAll('.scroll-section'));
        this.navLinks = Array.from(document.querySelectorAll('.header-wrapper ul li a'));


        // スクロールイベントのリスナー設定
        window.addEventListener('scroll', this.handleScroll.bind(this, headerHeight));

        const svg = document.querySelector('svg');
        if (svg) {
            svg.addEventListener('click', function () {
                this.$emit('loading-complete');
            }.bind(this));
        }
    },
    methods: {
        onLoadingComplete() {
            this.isLoading = false;
        },
        handleScroll() {
            let currentSection = '';
            const viewportMiddle = window.pageYOffset + (window.innerHeight / 2); // 画面の中央位置

            // 現在スクロールしているセクションを特定
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionMiddle = sectionTop + (sectionHeight / 2); // セクションの中央位置

                // 画面中央がセクション中央を通過したかを判定
                if (viewportMiddle >= sectionTop && viewportMiddle <= sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');  // セクションIDを更新
                }
            });

            // 現在のセクションが変更された場合に更新
            if (this.currentSection !== currentSection) {
                this.currentSection = currentSection;
                this.updateNavLinks();
            }
        },
        updateNavLinks() {
            // ナビゲーションリンクのアクティブ状態を更新
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === this.currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }
});

app.mount('#app');

