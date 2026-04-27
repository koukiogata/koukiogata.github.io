# ポートフォリオサイト - 作品詳細ページ実装ガイド

## 📋 実装内容

ポートフォリオサイトの#designセクションで、WEBSITE作品をクリックすると詳細ページに遷移する仕組みを実装しました。

## 🗂️ ファイル構成

```
docs/
├── projectsData.js              # 作品情報の一元管理
├── index.html                   # メインページ（修正）
├── script.js                    # メインコンポーネント（修正）
└── works/
    ├── index.html               # 詳細ページテンプレート
    ├── project-detail.js        # 詳細ページのロジック
    └── style.css                # 詳細ページのスタイル
```

## 🔧 各ファイルの役割

### projectsData.js
- **目的**: 作品情報を一元管理
- **構造**: `projectsData` オブジェクトに作品IDをキーとした情報を格納
- **プロパティ**:
  - `id`: プロジェクト固有ID（URL用）
  - `title`: プロジェクト名
  - `category`: カテゴリ（WEBSITE/BANNER/FLYERなど）
  - `overview`: クライアント、役割、ツール、制作年
  - `challenge`: 事業課題の説明
  - `design`: 設計・コンセプト
  - `wireframe`: ワイヤーフレーム説明
  - `ui`: UI/デザイン説明
  - `figmaEmbed`: Figmaプロトタイプの埋め込みURL

### works/index.html
- **目的**: 詳細ページのテンプレート
- **機能**:
  - URLパラメータから作品ID取得
  - JavaScriptで動的にコンテンツ生成
  - Figma埋め込み対応
  - 関連プロジェクト表示

### works/project-detail.js
- **キー機能**:
  ```javascript
  getProjectData(projectId)  // 作品IDからデータ取得
  renderProjectDetails()     // 詳細情報の表示
  renderFigmaEmbed()         // Figmaプロトタイプの埋め込み
  renderRelatedProjects()    // 関連作品の表示
  ```

### works/style.css
- **レスポンシブ対応**:
  - デスクトップ（1200px以上）
  - タブレット（768px以上）
  - モバイル（500px以下）
- **Figma埋め込み特別対応**:
  ```css
  .figma-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;  /* 16:9アスペクト比 */
      overflow: hidden;
  }
  ```

## 🔗 ページ遷移フロー

### メインページ → 詳細ページ
```
/index.html#design
  ↓ (WEBSITEカテゴリーの「みる」をクリック)
/works/?id=shodo
/works/?id=takinoya
/works/?id=mizunowakusei
```

### 詳細ページ内のナビゲーション
```
詳細ページ
  ├─ [← ポートフォリオに戻る] → /index.html#design
  └─ 関連プロジェクト → /works/?id=xxx
```

## 📱 レスポンシブ対応

### 特別対応: Figma埋め込み
PCとモバイルで異なるアスペクト比を使用：
- **PC（768px以上）**: `padding-bottom: 56.25%` (16:9)
- **モバイル（768px以下）**: `padding-bottom: 100%` (より高い表示)

これにより、モバイルでみやすいサイズを確保できます。

## ➕ 新しい作品を追加する方法

### ステップ1: projectsData.jsに作品データを追加
```javascript
const projectsData = {
  'new-project-id': {
    id: 'new-project-id',
    title: '新規プロジェクト名',
    category: 'WEBSITE',
    image: 'image/new-img.png',
    description: '説明文...',
    overview: { ... },
    challenge: { description: '...' },
    design: { description: '...' },
    wireframe: { description: '...' },
    ui: { description: '...' },
    figmaEmbed: 'https://embed.figma.com/...'
  }
};
```

### ステップ2: メインページのHTMLで作品をリスト化
script.jsのWEBSITEセクションに新しい要素を追加：
```html
<div class="element">
    <img src="image/new-img.png" alt="">
    <div class="text">
        <h3>新規プロジェクト名</h3>
        <p>説明文...</p>
    </div>
    <a href="./works/?id=new-project-id">みる</a>
</div>
```

以上で、新しい作品は自動的に以下の機能が動作します：
- 詳細ページ表示
- 関連プロジェクト一覧（同じカテゴリーの他の作品）
- Figma埋め込み表示
- メタデータ表示

## 🎨 Figmaプロトタイプ埋め込みのカスタマイズ

### 埋め込みURLの取得方法
1. Figmaファイルを開く
2. 右上の「Share」ボタンをクリック
3. 「Prototype」→「Copy link」でリンク生成
4. projectsData.jsの `figmaEmbed` フィールドにURLを貼り付け

### 埋め込みサイズの調整
詳細ページで表示比率を変更したい場合：
- **works/style.css** の `.figma-wrapper` セクションを修正
- `padding-bottom` の値を変更（例: 100% = 正方形、 75% = 4:3）

## 🚀 デプロイメント

現在の実装はすべてクライアント側（HTML/CSS/JS）で動作するため：
- **特別なサーバー設定不要**
- **データベース不要**
- **キャッシュのクリアのみ推奨**（ブラウザキャッシュ）

## 📝 トラブルシューティング

### 問題: 詳細ページが表示されない
**確認項目**:
- URLパラメータが正しいか（`?id=xxxxx`）
- projectsData.js内にそのIDが存在するか
- ブラウザのコンソール（F12）でエラーを確認

### 問題: Figmaが埋め込まれない
**確認項目**:
- projectsData.jsの `figmaEmbed` URLが正確か
- FigmaもしくはFirewallの制限がないか
- iframeサンドボックス属性を確認

### 問題: モバイルで表示が崩れる
**確認項目**:
- works/style.cssのメディアクエリが機能しているか
- ビューポート設定（meta viewport）が正確か
- Figmaのピクセル値（800x450）が固定値になっていないか

## 📞 今後の拡張案

### 検討中の機能
- [ ] プロジェクトの検索・フィルター機能
- [ ] コメント・クライアントフィードバック機能
- [ ] 作品のタグシステム
- [ ] 画像ギャラリー機能の拡張
- [ ] プリント用スタイル対応

### パフォーマンス最適化
- [ ] 画像の遅延読み込み（Lazy Loading）
- [ ] WebP形式への移行
- [ ] CSSアニメーションのGPU最適化

---

**最終更新**: 2024年4月
**バージョン**: 1.0
