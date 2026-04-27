// ポートフォリオ作品データ管理ファイル
const projectsData = {
  'shodo': {
    id: 'shodo',
    title: '尾方習字教室',
    category: 'WEBSITE',
    image: 'image/site-img1.jpg',
    description: '子どもから大人まで通える「尾方習字教室」のWebサイトデザインカンプを制作。',
    overview: {
      client: '尾方習字教室',
      role: 'UI/UXデザイン',
      tools: ['Adobe XD', 'Figma'],
      year: '2025'
    },
    challenge: {
      title: '事業課題',
      description: '習字教室の認知度を高め、生徒募集につなげるWebサイトが必要。子どもから大人まで幅広い層に訴求できるデザインが求められた。'
    },
    design: {
      title: '設計・コンセプト',
      description: 'シンプルで親しみやすみながら、書の美しさを引き立たせるデザイン。和の要素を取り入れながらモダンな印象を持たせ、年齢層を問わず訪問しやすいサイトを目指した。'
    },
    wireframe: {
      title: 'ワイヤーフレーム',
      description: 'ページ構成を各セクション（ヘッダー、体験レッスン、コース一覧、アクセスなど）に分け、ユーザーの行動フローを最適化。'
    },
    ui: {
      title: 'UI/デザイン',
      description: 'Adobe XDで高忠実度のデザインカンプを作成。フォント、色彩、アイコン、ボタンなど、すべての要素を詳細に設計。'
    },
    figmaEmbed: 'https://embed.figma.com/design/scK1BYYDrrNAsSJcwfujrg/%E7%84%A1%E9%A1%8C?node-id=0-1&embed-host=share'
  },
  'takinoya': {
    id: 'takinoya',
    title: '大滝屋旅館',
    category: 'WEBSITE',
    image: 'image/site-img2.png',
    description: '老舗温泉旅館「大滝屋旅館」のWebサイトデザインカンプを制作。',
    overview: {
      client: '大滝屋旅館',
      role: 'UI/UXデザイン',
      tools: ['Adobe XD', 'Figma'],
      year: '2024'
    },
    challenge: {
      title: '事業課題',
      description: '老舗温泉旅館の上質さと歴史を現代的に表現し、新規顧客層を開拓するサイトが必要。モバイルからの予約流入を増加させることが課題。'
    },
    design: {
      title: '設計・コンセプト',
      description: '温泉の癒やしと高級感を表現する落ち着いた色合い。自然の美しさを活かした写真レイアウトで、利用者に上質な体験をイメージさせる。'
    },
    wireframe: {
      title: 'ワイヤーフレーム',
      description: '施設紹介、客室ギャラリー、料金プラン、予約フローなどを最適化したページ配置。特に予約導線を簡潔にしました。'
    },
    ui: {
      title: 'UI/デザイン',
      description: '落ち着いた配色（深緑、濃紺など）を採用。温泉旅館の上質さを演出しながら、視認性と使いやすさのバランスを取った。'
    },
    figmaEmbed: 'https://embed.figma.com/design/8p32UymlB0E553EqPWgf3x/%E5%A4%A7%E6%BB%9D%E5%B1%8B%E6%97%85%E9%A4%A8UI%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3?node-id=0-1&embed-host=share'
  },
  'mizunowakusei': {
    id: 'mizunowakusei',
    title: 'MIZUNOWAKUSEI',
    category: 'WEBSITE',
    image: 'image/site-img3.png',
    description: 'ホテルの企画・開発・プロデュースを行うMIZUNOWAKUSEIのコーポレートサイトをデザイン。',
    overview: {
      client: 'MIZUNOWAKUSEI',
      role: 'UI/UXデザイン',
      tools: ['Adobe XD', 'Figma'],
      year: '2024'
    },
    challenge: {
      title: '事業課題',
      description: 'ホテル企画・開発企業としてのブランドイメージを確立し、BtoBパートナーシップ立ち上げを促進するサイトが必要。企業の専門性と信頼性を視覚化することが重要。'
    },
    design: {
      title: '設計・コンセプト',
      description: 'プロフェッショナルで洗練されたデザイン。企業のビジョンと実績を効果的に伝える情報構成。パートナー企業へのアピール。'
    },
    wireframe: {
      title: 'ワイヤーフレーム',
      description: '企業紹介、プロジェクト実績、サービス一覧、お問い合わせフローを戦略的に配置。特にポートフォリオセクションを充実させた。'
    },
    ui: {
      title: 'UI/デザイン',
      description: 'ミニマルで高級感のあるデザイン。大きな画像とホワイトスペースを活かし、プロフェッショナルなイメージを構築。'
    },
    figmaEmbed: 'https://embed.figma.com/design/OTlaYVLoYZywQKpyLD605R/%E7%84%A1%E9%A1%8C?node-id=3-2&embed-host=share'
  }
};

// プロジェクトデータを取得する関数
function getProjectData(projectId) {
  return projectsData[projectId] || null;
}
