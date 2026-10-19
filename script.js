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
                                            console.log('🖱️ SVG clicked!');
                                            outerContainer.animate([
                                                { transform: 'scaleY(1)', opacity: 1 },
                                                { transform: 'scaleY(1)', opacity: 0 }
                                            ], {
                                                duration: 500,
                                                easing: 'ease-in-out',
                                                fill: 'forwards'
                                            }).finished.then(function () {
                                                outerContainer.style.display = 'none';
                                                document.body.style.overflow = 'auto';
                                                console.log('✅ ローディングアニメーション完了');

                                                // ← 重要：Vueに「ローディング完了」を通知
                                                // 親コンポーネントのイベントを発火させる
                                                // this スコープを失うため、outerContainer の data 属性を使用して通知
                                                window.dispatchEvent(new CustomEvent('loading-complete'));
                                            });
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
    <header id="header" class="nav-menu">
        <div class="header-wrapper">
            <ul>
                <li><a href="#top" id="top-btn">TOP</a></li>
                <li><a href="#about" id="about-btn">ABOUT</a></li>
                <li><a href="#works" id="works-btn">WORKS</a></li>
                <li><a href="#history" id="history-btn">HISTORY</a></li>
                <li><a href="#sns" id="sns-btn">SNS</a></li>
            </ul>
        </div>
    </header>
    `,
    // スマホではヘッダーを非表示にし、トップの .top-nav で移動する（ハンバーガーメニューは廃止）
};

// メインコンポーネントの定義
const MainComponent = {
    template: `
      <main id="top" class="scroll-section">
        <div class="top-contenir">
            <div class="top-wrapper">
                <!-- 浮遊アニメーション背景 -->
                <div class="background-animation" aria-hidden="true">
                    <ul>
                        <!-- 円 (circle) -->
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <!-- 四角 (square) -->
                        <li class="square"></li>
                        <li class="square"></li>
                        <li class="square"></li>
                        <li class="square"></li>
                        <!-- 三角 (triangle) -->
                        <li class="triangle"></li>
                        <li class="triangle"></li>
                        <li class="triangle"></li>
                        <li class="triangle"></li>
                    </ul>
                </div>
                <!-- コンテンツ（前面） -->
                <h1>K-CREATE</h1>
                <p class="top-text-line">Designing the Future</p>
                <!-- スマホ専用ナビ（CSSで770px以下のみ表示） -->
                <nav class="top-nav" aria-label="ページ内ナビゲーション">
                    <ul>
                        <li><a href="#about" id="top-nav-about">ABOUT</a></li>
                        <li><a href="#works" id="top-nav-works">WORKS</a></li>
                        <li><a href="#history" id="top-nav-history">HISTORY</a></li>
                        <li><a href="#sns" id="top-nav-sns">SNS</a></li>
                    </ul>
                </nav>
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
            </div>
        </section>
        <section id="works" class="scroll-section">
            <div class="container">
                <div class="facet-nav">
                    <ul>
                        <li><a href="#" class="active">すべて</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                        <li><a href="#">JavaScript</a></li>
                        <li><a href="#">React</a></li>
                        <li><a href="#">Vue.js</a></li>
                        <li><a href="#">jQuery</a></li>
                        <li><a href="#">Firebase</a></li>
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">Illustrator</a></li>
                        <li><a href="#">Photoshop</a></li>
                        <li><a href="#">Figma</a></li>
                    </ul>
                </div>
                <!-- スマホ用タブナビゲーション（開発 / 印刷物） -->
                <div class="works-mobile-tabs">
                    <button type="button" class="works-tab-btn" :class="{ active: currentWorksTab === 'devel' }" @click="currentWorksTab = 'devel'">
                        <span class="tab-ja">開発</span>
                        <span class="tab-en">DEVEL</span>
                    </button>
                    <button type="button" class="works-tab-btn" :class="{ active: currentWorksTab === 'prints' }" @click="currentWorksTab = 'prints'">
                        <span class="tab-ja">印刷物</span>
                        <span class="tab-en">PRINTS</span>
                    </button>
                </div>

                <!-- スマホ用作品一覧（カード画面フィット・写真＋タイトルリンクのみ） -->
                <div class="works-mobile-content">
                    <!-- DEVELタブ：開発案件実績 -->
                    <div v-show="currentWorksTab === 'devel'" class="works-mobile-grid">
                        <div class="works-mobile-card" v-for="item in develItems" :key="item.id">
                            <a :href="item.url" target="_blank" rel="noopener noreferrer" class="card-img-link">
                                <img :src="item.image" :alt="item.title" loading="lazy">
                            </a>
                            <h3 class="card-title">
                                <a :href="item.url" target="_blank" rel="noopener noreferrer" :title="item.title">
                                    {{ truncateTitle(item.title) }}
                                </a>
                            </h3>
                        </div>
                    </div>

                    <!-- PRINTSタブ：印刷物案件実績 -->
                    <div v-show="currentWorksTab === 'prints'" class="works-mobile-grid">
                        <div class="works-mobile-card" v-for="item in flyerItems" :key="item.id">
                            <a href="#" @click.prevent="openModal(item.image ? item.image.url : '')" class="card-img-link">
                                <img :src="item.image ? item.image.url + '?w=600' : ''" :alt="item.title" loading="lazy">
                            </a>
                            <h3 class="card-title">
                                <a href="#" @click.prevent="openModal(item.image ? item.image.url : '')" :title="item.title">
                                    {{ truncateTitle(item.title) }}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- PC用作品一覧（スマホでは非表示） -->
                <div class="works-desktop-content">
                    <div class="elbox">
                    <div class="box">
                        <img src="image/works-image4.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                        <div class="content-group">
                            <h2>習字教室のホームページHTML/CSS</h2>
                            <p>●ポイント<br /> デバイスの画面サイズに応じたレイアウト調整。CSSの @keyframes を使った滑らかなアニメーション</p>
                            <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                        </div>
                    <a href="https://ogata-shuuji.deca.jp/" target="_blank">見る</a>
                    </div>
                    <div class="box">
                        <img src="image/works-image1.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                        <div class="content-group">
                            <h2>Vue.js企業プロジェクトの自主製作</h2>
                            <p>●ポイント<br />最新のVue.jsを使用して再利用可能なコンポーネントを設計し、それにより各デバイスに対応しました。</p>
                            <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                        </div>
                        <a href="https://koukiogata.github.io/hotel" target="_blank">見る</a>
                    </div>
                    <div class="box">
                        <img src="image/works-image2.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                        <div class="content-group">
                            <h2>株式会社タカヤコミュニケーションズ</h2>
                            <p>●ポイント<br />JavaScriptを使用して、SVG内に動的な折れ線グラフを実装、データの範囲に応じたスケール変換を実装</p>
                            <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                        </div>
                        <a href="https://koukiogata.github.io/digital" target="_blank">見る</a>
                    </div>
                    <div class="box">
                        <img src="image/works-image3.png" alt="Vue.jsを使った架空の職業訓練サイトのスクリーンショット">
                        <div class="content-group">
                            <h2>HTML CSS JQuery基礎フレームワーク</h2>
                            <p>●ポイント<br /> デバイスの画面サイズに応じたレイアウト調整。CSSの @keyframes を使った滑らかなアニメーション</p>
                            <p>使用言語：HTML/CSS/Javascript<br>スタイル:SCSS</br><br>制作ツール：VisualStudioCode/Figma</p>
                        </div>
                        <a href="./web/index.html" target="_blank">見る</a>
                    </div>
                    <div class="box">
                        <img src="image/works-image5.png" alt="Grand Slamサイトのスクリーンショット">
                        <div class="content-group">
                            <h2>Grand Slam</h2>
                            <p>●ポイント<br /> モダンなデザインと滑らかなアニメーションを組み合わせたウェブサイト制作</p>
                            <p>使用言語：HTML/CSS/Javascript<br>制作ツール：VisualStudioCode/Figma</p>
                        </div>
                        <a href="https://grandslam.surge.sh/" target="_blank">見る</a>
                    </div>
                    </div><!-- /.elbox works -->
                    <div class="scroll-track"><div class="scroll-thumb"></div></div>
                    <!-- デザインコンテンツ -->
                    <div class="designbox">
                        <h2>FLYER</h2>
                        <div class="elbox">
                            <div class="element" v-for="item in flyerItems" :key="item.id">
                                <img :src="item.image ? item.image.url + '?w=600' : ''" :alt="item.title">
                                <div class="text">
                                    <h3>{{ item.title }}</h3>
                                    <p>{{ item.description }}</p>
                                </div>
                                <a href="#" class="openModal" @click.prevent="openModal(item.image ? item.image.url : '')">みる</a>
                            </div>
                        </div>
                        <div class="scroll-track"><div class="scroll-thumb"></div></div>
                    </div>
                    <div class="designbox">
                        <h2>BANNER</h2>
                        <div class="elbox">
                            <div class="element" v-for="item in bannerItems" :key="item.id">
                                <img :src="item.image ? item.image.url + '?w=600' : ''" :alt="item.title">
                                <div class="text">
                                    <h3>{{ item.title }}</h3>
                                    <p>{{ item.description }}</p>
                                </div>
                                <a href="#" class="openModal" @click.prevent="openModal(item.image ? item.image.url : '')">みる</a>
                            </div>
                        </div>
                        <div class="scroll-track"><div class="scroll-thumb"></div></div>
                    </div>
                    <div class="designbox">
                        <h2>UI/UX</h2>
                        <div class="elbox">
                            <div class="element" v-for="item in websiteItems" :key="item.id">
                                <img :src="item.image ? item.image.url + '?w=600' : ''" :alt="item.title">
                                <div class="text">
                                    <h3>{{ item.title }}</h3>
                                    <p>{{ item.text }}</p>
                                </div>
                                <a :href="'./works/?id=' + item.id">みる</a>
                            </div>
                        </div>
                        <div class="scroll-track"><div class="scroll-thumb"></div></div>
                    </div>
                </div><!-- /.works-desktop-content -->
            </div>
            <div class="modalsection">
                <div class="modal" v-if="isModalOpen" style="display: flex;" @click.self="closeModal">
                    <div class="modal-content">
                        <span class="close" @click="closeModal">&times;</span>
                        <img :src="selectedModalImage" alt="拡大画像">
                    </div>
                </div>
            </div>
        </section>
        <section id="history" class="scroll-section">
            <div class="history-container">
                <div class="history-header">
                    <h2>HISTORY</h2>
                    <p class="history-subtitle">経歴・キャリアの歩み</p>
                </div>
                <div class="career-timeline">
                    <div v-for="(item, index) in historyList" :key="index"
                         class="career-card" :class="{ 'is-current': item.isCurrent }">
                        <div class="career-node">
                            <span class="node-dot"></span>
                            <span class="node-line" v-if="index < historyList.length - 1"></span>
                        </div>
                        <div class="career-card-inner">
                            <div class="career-meta">
                                <span class="career-period">{{ item.period }}</span>
                                <span class="current-badge" v-if="item.isCurrent">CURRENT</span>
                            </div>
                            <h3 class="career-title">{{ item.title }}</h3>
                            <div class="career-role" v-if="item.role">
                                <span class="role-badge">{{ item.role }}</span>
                            </div>
                            <div class="career-skills" v-if="item.skills && item.skills.length">
                                <span class="skill-chip" v-for="skill in item.skills" :key="skill">{{ skill }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `,
    data() {
        return {
            currentWorksTab: 'devel',
            develItems: [
                {
                    id: 'shuji',
                    title: '習字教室のホームページHTML/CSS',
                    image: 'image/works-image4.png',
                    url: 'https://ogata-shuuji.deca.jp/'
                },
                {
                    id: 'hotel',
                    title: 'Vue.js企業プロジェクトの自主製作',
                    image: 'image/works-image1.png',
                    url: 'https://koukiogata.github.io/hotel'
                },
                {
                    id: 'takaya',
                    title: '株式会社タカヤコミュニケーションズ',
                    image: 'image/works-image2.png',
                    url: 'https://koukiogata.github.io/digital'
                },
                {
                    id: 'jquery',
                    title: 'HTML CSS JQuery基礎フレームワーク',
                    image: 'image/works-image3.png',
                    url: './web/index.html'
                },
                {
                    id: 'grandslam',
                    title: 'Grand Slam',
                    image: 'image/works-image5.png',
                    url: 'https://grandslam.surge.sh/'
                }
            ],
            flyerItems: [],
            bannerItems: [],
            websiteItems: [],
            isModalOpen: false,
            selectedModalImage: '',
            historyList: [
                {
                    period: '2023.03',
                    title: 'バンタンデザイン研究所 大阪校 卒業',
                    role: 'デザイン専攻',
                    desc: 'デザイン基礎・グラフィック表現の修得',
                    skills: ['デザイン基礎', 'グラフィック表現', 'Illustrator', 'Photoshop'],
                    isCurrent: false
                },
                {
                    period: '2023.03 – 2023.12',
                    title: '三和商事株式会社',
                    role: 'グラフィックデザイナー / ECサイト運用',
                    desc: '自社商品カタログ・チラシ・POPデザイン制作、ECサイト管理・商品画像制作、入出庫管理',
                    skills: ['Illustrator', 'Photoshop', 'EC運営', '販促物デザイン'],
                    isCurrent: false
                },
                {
                    period: '2024.01 – 2024.12',
                    title: 'Freelance & Skill Development',
                    role: 'フリーランスデザイナー / IT学習',
                    desc: 'デザイン制作案件の受託・納品、並行してWeb/IT開発スキルの習得',
                    skills: ['Webデザイン', 'UI設計', 'コーディング基礎'],
                    isCurrent: false
                },
                {
                    period: '2025.01 – 2025.12',
                    title: 'Y＆I group株式会社',
                    role: 'QAエンジニア（アプリ検証・品質管理）',
                    desc: 'ECアプリのテスト・デバッグ、仕様書に基づく動作検証、不具合報告、修正後の再テスト・品質保証',
                    skills: ['テスト設計・実行', '品質管理', 'バグトラッキング'],
                    isCurrent: false
                },
                {
                    period: '2026.01 – Present',
                    title: '株式会社ミライズ',
                    role: 'テクニカルサポート',
                    desc: 'PC初期設定・ハード/ソフトのトラブル対応、課題ヒアリングに基づく最適なソリューション提案',
                    skills: ['トラブルシューティング', 'ユーザーサポート', 'ヒアリング・提案'],
                    isCurrent: true
                }
            ]
        };
    },
    created() {
        const API_KEY = 'ZxBt8c9lECXDuzv4C6H07sWO87wCMZT2C7Ua';

        // FLYER & BANNER (design API)
        fetch('https://kouki.microcms.io/api/v1/design', {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        })
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (data.contents) {
                    this.flyerItems = data.contents.filter(item => item.category && item.category.includes('fryer'));
                    this.bannerItems = data.contents.filter(item => item.category && item.category.includes('banner'));
                }
            })
            .catch(err => console.error('Fetch error:', err));

        // WEBSITE (designmockup API)
        fetch('https://kouki.microcms.io/api/v1/designmockup', {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        })
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (data.contents) {
                    this.websiteItems = data.contents;
                }
            })
            .catch(err => console.error('Fetch error:', err));
    },
    methods: {
        truncateTitle(title, maxLen = 9) {
            if (!title) return '';
            return title.length > maxLen ? title.slice(0, maxLen) + '...' : title;
        },
        openModal(imageUrl) {
            this.selectedModalImage = imageUrl;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedModalImage = '';
        },
        initScrollTracks() {
            const elboxes = document.querySelectorAll('.elbox');
            elboxes.forEach(elbox => {
                const track = elbox.nextElementSibling;
                if (!track || !track.classList.contains('scroll-track')) return;
                const thumb = track.querySelector('.scroll-thumb');

                const update = () => {
                    const scrollable = elbox.scrollWidth - elbox.clientWidth;
                    if (scrollable <= 0) {
                        track.style.display = 'none';
                        return;
                    }
                    track.style.display = 'block';
                    const ratio = elbox.scrollLeft / scrollable;
                    const thumbW = Math.max(20, (elbox.clientWidth / elbox.scrollWidth) * 100);
                    thumb.style.width = thumbW + '%';
                    thumb.style.left = (ratio * (100 - thumbW)) + '%';
                };

                elbox.addEventListener('scroll', update, { passive: true });
                update();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => this.initScrollTracks(), 800);
        });
    },
};

// TOPに戻るボタン（TOPセクションを過ぎたら表示）
const BackToTopComponent = {
    template: `
      <button type="button" id="back-to-top" class="back-to-top" :class="{ 'is-visible': isVisible }"
          aria-label="ページの先頭（TOP）に戻る" @click="scrollToTop">
          <span class="back-to-top__arrow" aria-hidden="true"></span>
          <span class="back-to-top__label">TOP</span>
      </button>
    `,
    data() {
        return { isVisible: false };
    },
    mounted() {
        this.onScroll = () => {
            const top = document.querySelector('.top-contenir');
            // TOPセクションの高さの半分を超えてスクロールしたら表示
            const threshold = (top ? top.offsetHeight : window.innerHeight) * 0.5;
            this.isVisible = window.scrollY > threshold;
        };
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        scrollToTop() {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        }
    }
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

// オープニングアニメーションの有効/無効（true に戻すと再び表示されます）
const ENABLE_OPENING_ANIMATION = false;

// Vueアプリケーションの作成。各コンポーネントを使用してページ全体を構成。
const app = Vue.createApp({
    components: {
        'loading-component': LoadingComponent,
        'header-component': HeaderComponent,
        'main-component': MainComponent,
        'footer-component': FooterComponent,
        'back-to-top': BackToTopComponent,
    },
    data() {
        return {
            isLoading: ENABLE_OPENING_ANIMATION,
            currentSection: '',  // 現在のセクション
            sections: [],  // スクロールセクションの配列
            navLinks: []  // ナビゲーションリンクの配列
        };
    },
    mounted() {
        console.log('📍 Vueアプリケーション mounted() 実行開始');

        // sessionStorage でローディングスキップフラグを確認
        const skipLoading = sessionStorage.getItem('skipLoading');
        if (skipLoading === 'true') {
            console.log('⏭️ skipLoading フラグが検出されました');
            // ローディングをスキップして、すぐに表示
            this.isLoading = false;
            sessionStorage.removeItem('skipLoading'); // フラグをクリア

            // ローディング画面の HTML 要素を確実に隠す
            this.$nextTick(() => {
                const outerContainer = document.getElementById('outer-container');
                if (outerContainer) {
                    outerContainer.style.display = 'none';
                }
                document.body.style.overflow = 'auto';
            });

            console.log('✅ ローディングをスキップしました');
        } else {
            console.log('⏳ 通常のローディング画面を表示します');
        }

        console.log('📊 Vueの状態:');
        console.log('   - isLoading:', this.isLoading);

        // ローディング完了イベントをリッスン
        window.addEventListener('loading-complete', () => {
            console.log('📡 loading-complete イベント受信');
            this.onLoadingComplete();
        });

        // DOM 要素が確実にレンダリングされるまで待つ
        this.$nextTick(() => {
            console.log('🎨 $nextTick() 内: DOM レンダリング完了');

            const headerWrapperUl = document.querySelector('.header-wrapper ul');
            const headerHeight = headerWrapperUl ? headerWrapperUl.offsetHeight : 0;

            console.log('🔍 DOM要素確認:');
            console.log('   - .header-wrapper ul:', headerWrapperUl);
            console.log('   - headerHeight:', headerHeight);

            // DOM要素が存在する場合のみ処理を続行
            if (!headerWrapperUl) {
                console.log('⚠️ .header-wrapper ul が見つかりません。ローディング中の可能性があります。');
                return;
            }

            // DOM要素の取得
            this.sections = Array.from(document.querySelectorAll('.scroll-section'));
            this.navLinks = Array.from(document.querySelectorAll('.header-wrapper ul li a'));

            console.log('📋 取得した要素:');
            console.log('   - sections:', this.sections.length + '個');
            console.log('   - navLinks:', this.navLinks.length + '個');

            // スクロールイベントのリスナー設定
            window.addEventListener('scroll', this.handleScroll.bind(this, headerHeight));

            const svg = document.querySelector('svg');
            if (svg) {
                console.log('✅ SVG要素が見つかりました');
                svg.addEventListener('click', function () {
                    console.log('🖱️ SVGがクリックされました');
                    this.$emit('loading-complete');
                }.bind(this));
            } else {
                console.log('⚠️ SVG要素が見つかりません');
            }

            console.log('✅ mounted() 完了: isLoading=' + this.isLoading);
        });
    },
    methods: {
        onLoadingComplete() {
            console.log('🔄 onLoadingComplete() が呼び出されました');
            this.isLoading = false;

            // コンテンツ表示確認
            this.$nextTick(() => {
                console.log('✅ コンテンツレンダリング完了：');
                console.log('   - isLoading:', this.isLoading);
                console.log('   - header:', document.querySelector('header'));
                console.log('   - main:', document.querySelector('main'));
                console.log('   - footer:', document.querySelector('footer'));

                // DOM要素が存在するか確認
                const appContainer = document.querySelector('#app > div:nth-child(2)');
                if (appContainer) {
                    console.log('   - コンテンツ div:', appContainer);
                    console.log('   - コンテンツ div display:', window.getComputedStyle(appContainer).display);
                    console.log('   - コンテンツ div visibility:', window.getComputedStyle(appContainer).visibility);
                }

                // ← ローディング完了後に再度 DOM 要素を取得
                this.$nextTick(() => {
                    console.log('🔄 ローディング完了後の DOM 再取得開始');

                    const headerWrapperUl = document.querySelector('.header-wrapper ul');
                    const headerHeight = headerWrapperUl ? headerWrapperUl.offsetHeight : 0;

                    console.log('🔍 再取得した DOM要素確認:');
                    console.log('   - .header-wrapper ul:', headerWrapperUl);
                    console.log('   - headerHeight:', headerHeight);

                    // DOM要素の取得
                    this.sections = Array.from(document.querySelectorAll('.scroll-section'));
                    this.navLinks = Array.from(document.querySelectorAll('.header-wrapper ul li a'));

                    console.log('📋 再取得した要素:');
                    console.log('   - sections:', this.sections.length + '個');
                    console.log('   - navLinks:', this.navLinks.length + '個');

                    // スクロールイベントのリスナー設定（もしまだされていなければ）
                    if (this.sections.length > 0 && this.navLinks.length > 0) {
                        window.addEventListener('scroll', this.handleScroll.bind(this, headerHeight));
                        console.log('✅ スクロールイベントリスナー設定完了');
                    } else {
                        console.log('⚠️ DOM要素が不足しているため、スクロールイベントは設定できません');
                    }
                });
            });
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

