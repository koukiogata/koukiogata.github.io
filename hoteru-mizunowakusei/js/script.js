const headerApp = Vue.createApp({
    components: {
        'header-component': {
            template: `
                <header :class="{ hidden: isHeaderHidden }">
                    <nav class="global-header-container">
                        <a href="index.html"><img src="image/header-rogo-image2.png" alt="ロゴ"></a>
                        <div class="hamburger" @click="toggleMenu">
                            <span :class="{ 'actiev': isMenuOpen }"></span>
                            <span :class="{ 'actiev': isMenuOpen }"></span>
                            <span :class="{ 'actiev': isMenuOpen }"></span>
                        </div>
                        <ul :class="{ 'menu-open': isMenuOpen }">
                            <li><a href="index.html">トップ</a></li>
                            <li><a href="about.html">水の惑星について</a></li>
                            <li><a href="service.html">サービス紹介</a></li>
                            <li><a href="news.html">ニュース</a></li>
                            <li><a href="contact.html">お問い合わせ</a></li>
                        </ul>
                    </nav>
                </header>
            `,
            data() {
                return {
                    isHeaderHidden: false,
                    isMenuOpen: false,
                    lastScrollPosition: 0
                };
            },
            methods: {
                toggleMenu() {
                    this.isMenuOpen = !this.isMenuOpen;
                },
                handleScroll() {
                    const currentScroll = window.scrollY;
                    
                    // ヘッダーを常時表示するかどうかのチェック
                    if (currentScroll === 0) {
                        // ページのトップにスクロールされた場合、ヘッダーを常時表示
                        this.isHeaderAlwaysVisible = true;
                        this.isHeaderHidden = false;
                    } else {
                        this.isHeaderAlwaysVisible = false;
                        
                        // スクロールの方向を確認してヘッダーを隠すか表示する
                        if (currentScroll > this.lastScrollPosition) {
                            // 下にスクロール中：ヘッダーを隠す
                            this.isHeaderHidden = true;
                        } else {
                            // 上にスクロール中：ヘッダーを表示
                            this.isHeaderHidden = false;
                        }
                    }
                    this.lastScrollPosition = currentScroll;
                }
            },
            mounted() {
                window.addEventListener('scroll', this.handleScroll);
            },
            beforeUnmount() {
                window.removeEventListener('scroll', this.handleScroll);
            }
        }
    }
}).mount('#header-app');

const mainApp = Vue.createApp({
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('scroll', this.handleScroll); // スクロールイベントを監視
            this.handleScroll(); // 初期表示でスクロール位置をチェック
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // コンポーネント破棄時にイベントリスナーを削除
    },
    methods: {
        handleScroll() {
            const fadeBoxes = document.querySelectorAll('.fade-box'); // fade-boxクラスを持つ全ての要素を取得
            fadeBoxes.forEach((box) => {
                const boxTop = box.getBoundingClientRect().top;
                const triggerPoint = window.innerHeight - 100;

                // ボックスが表示領域に入ったらクラスを追加
                if (boxTop < triggerPoint) {
                    box.classList.add('is-visible');
                }
            });
        }
    }
}).mount('#main-app');


