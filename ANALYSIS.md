# 「戻るボタン」後にポートフォリオが表示されない原因分析

## 🔴 重大な問題：index.html の条件分岐

### 現在のコード（❌ 間違い）
```html
<loading-component v-if="isLoading"></loading-component>

<!-- ローディング完了後に表示するコンテンツ -->
<div v-if="isLoading">
    <header-component></header-component>
    <main-component></main-component>
    <footer-component></footer-component>
</div>
```

### 問題点
| 状態 | isLoading | 表示される内容 |
|------|-----------|------------|
| **ページ初回読み込み** | `true` | ✅ ローディング画面 |
| **ローディング完了後** | `false` | ❌ **何も表示されない** |
| **戻るボタンから遷移** | `false` | ❌ **何も表示されない** |

### なぜこんなことが起こるのか？
```javascript
<!-- v-if="isLoading" は、isLoading が true の場合だけ表示 -->
<!-- つまり: -->
<!-- isLoading = true  → ヘッダー・メイン・フッター表示 -->
<!-- isLoading = false → ヘッダー・メイン・フッター非表示 -->
```

## 🔴 ローディング画面が画面に残っている可能性

### CSS での z-index 構成
```css
#outer-container {
    position: fixed;
    z-index: 999;        /* ← 最前面 */
    width: 100vw;
    height: 100vh;
    display: flex;       /* ← 表示されたまま */
}
```

### 現在の状態
1. `isLoading = false` に設定される
2. Vueのコンテンツは表示されない （`v-if="isLoading"` が false）
3. ローディング画面の HTML は消えない
4. ローディング画面が画面を覆ったままになる

## 🔴 戻るボタンの処理フロー

```
詳細ページ
   ↓ 戻るボタンクリック
   ├─ sessionStorage.setItem('skipLoading', 'true') ✅
   ├─ window.location.href = '../#design' ✅
   ↓
メインページ読み込み
   ↓
Vueアプリケーション初期化
   ├─ data: { isLoading: true } ✅
   ├─ mounted() 実行
   │   └─ skipLoading フラグを確認して isLoading = false に設定 ✅
   ↓
レンダリング処理
   ├─ <loading-component v-if="isLoading"> → 表示（isLoading = false なので非表示）✅
   └─ <div v-if="isLoading"> → 非表示 ❌❌❌ コンテンツが表示されない！
```

## 📊 検査項目

### 1. console.log による確認
ブラウザの開発者ツール（F12）でコンソールを確認してください：
- `skipLoading = 'true'` が設定されているか
- `isLoading = false` に変更されているか
- Vueがマウントされているか

### 2. Elements（HTML構造）から確認
- `<div v-if="isLoading">` がレンダリングされているか
- `#outer-container` が画面に残っていないか
- `display: none` が適用されているか

### 3. Network タブで確認
- ページがきちんと遷移しているか（全く読み込まれていない可能性）
- `script.js` が正しく読み込まれているか

## 🎯 根本的な修正方法

### 対策1：index.html の条件を逆にする
```html
<!-- ✅ 修正後 -->
<div v-if="!isLoading">  <!-- ← NOT を追加 -->
    <header-component></header-component>
    <main-component></main-component>
    <footer-component></footer-component>
</div>
```

### 対策2：ローディング画面を完全に隠す
script.js の mounted() に直接的な DOM 操作を追加：
```javascript
if (skipLoading === 'true') {
    this.isLoading = false;
    // ローディング画面を直接隠す
    const outerContainer = document.getElementById('outer-container');
    if (outerContainer) {
        outerContainer.style.display = 'none';
    }
}
```

### 対策3：ローディング完了時の処理を確保
SVG クリック後に必ず実行される処理：
```javascript
svg.addEventListener('click', function () {
    this.$emit('loading-complete');  // → onLoadingComplete() 実行
}.bind(this));
```

## 🔍 確認手順

1. **ブラウザ開発ツールで確認**
   - F12キーを押す
   - Console タブで以下を確認
     ```javascript
     sessionStorage.getItem('skipLoading')  // 'true' が返される
     document.body.style.overflow          // 'auto' か 'hidden' か
     ```

2. **Elements タブで確認**
   - `<div id="outer-container">` を検索
   - `style="display: none"` が付いているか
   - `v-if="!isLoading"` のコンテンツが作成されているか

3. **ネットワーク遅延をシミュレート**
   - DevTools → Network → Slow 3G に設定
   - 戻るボタンをクリック
   - ローディング画面が数秒表示された後、コンテンツが出るか確認

