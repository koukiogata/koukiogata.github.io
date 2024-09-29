// スケール変換の有効/無効を管理するフラグ
let scaleEnabled = true; // 初期状態はスケール変換を有効

// 売上、降水量、パーセンテージのデータ
const salesData = [1200000, 3000000, 5000000, 7000000, 9000000, 10000000];
const rainfallData = [1500, 1600, 1700, 1800, 1900, 2000];
const percentageData = [30, 45, 60, 75, 85, 95];

// スケール変換関数: データの桁数に応じてスケール変換を行う
function scaleDataBasedOnDigits(value, minValue, maxValue) {
  if (scaleEnabled) { // スケール変換が有効な場合のみ実行
    const numDigits = Math.floor(Math.log10(Math.abs(value))) + 1; // 桁数を計算
    if (numDigits >= 5) {
      // 売上データは万円単位に変換し、小数点以下を切り捨て
      return Math.floor(normalize(value / 10000, minValue / 10000, maxValue / 10000, 10000)); // 万円単位でスケール変換
    } else {
      return normalize(value, minValue, maxValue, 100); // その他のデータは通常のスケール変換
    }
  }
  return value; // スケール変換が無効な場合は元の値を返す
}
// 正規化関数: データを指定した範囲内に収める
function normalize(value, minValue, maxValue, targetRange) {
  return ((value - minValue) / (maxValue - minValue)) * targetRange;
}

// 座標取得関数: データを元にSVG座標を計算
function getCoordinates(data, chartHeight, chartWidth, padding, targetRange) {
  return data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding); // x座標を計算
    const y = chartHeight - padding - (value / targetRange) * (chartHeight - 2 * padding); // y座標を計算
    return { x, y };
  });
}

// ツールチップを表示する関数
function showTooltip(event, value, unit) {
  const tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'block'; // ツールチップを表示
  tooltip.style.left = event.pageX + 10 + 'px'; // ツールチップの位置を設定
  tooltip.style.top = event.pageY - 10 + 'px';
  tooltip.textContent = `${value} ${unit}`; // 値と単位を表示
}

// ツールチップを非表示にする関数
function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'none'; // ツールチップを非表示
}

// ライン描画関数: データを元にパスを生成しアニメーションを設定
function createLinePath(data, lineId, targetRange, unit, showTooltips) {
  const coordinates = getCoordinates(data, 400, 600, 50, targetRange); // 座標を取得
  const pathData = `M${coordinates.map(coord => `${coord.x},${coord.y}`).join(' ')}`; // パスデータを生成
  animateLine(lineId, pathData, coordinates, data, unit, showTooltips); // アニメーションを適用
}

// パスにアニメーション追加
function animateLine(lineId, pathData, coordinates, data, unit, showTooltips) {
  const path = document.getElementById(lineId); // パス要素を取得
  path.setAttribute('d', pathData); // パスの描画データを設定
  const pathLength = path.getTotalLength(); // パスの全長を取得

  path.style.strokeDasharray = pathLength; // アニメーション用にパスの全長を設定
  path.style.strokeDashoffset = pathLength; // パス全体を見えない状態に

  // 各屈折点に丸を追加し、ホバーイベントを設定
  addDots(coordinates, lineId.replace('line', 'dots'), data, unit, showTooltips);

  // アニメーション開始
  path.getBoundingClientRect(); // 描画の準備を行う
  path.style.transition = 'stroke-dashoffset 2s ease'; // アニメーションの動作を設定
  path.style.strokeDashoffset = '0'; // パスをアニメーションで描画

  // 屈折点の表示タイミングを調整
  coordinates.forEach((coord, index) => {
    const delay = (coord.x / pathLength) * 2000; // x座標に基づいて表示タイミングを決定
    setTimeout(() => {
      document.querySelector(`#dots${lineId.replace('line', '')} circle:nth-child(${index + 1})`).style.opacity = 1; // 屈折点を表示
    }, delay);
  });
}

// 屈折点に丸を追加し、ホバーイベントを設定
function addDots(coordinates, dotGroupId, data, unit, showTooltips) {
  const dotGroup = document.getElementById(dotGroupId);
  dotGroup.innerHTML = ''; // 再描画時に前の丸を削除
  coordinates.forEach((coord, index) => {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', coord.x); // x座標を設定
    dot.setAttribute('cy', coord.y); // y座標を設定
    dot.setAttribute('r', 6); // 丸の半径を設定
    dot.setAttribute('class', 'dot');

    // 選択されたデータのみツールチップを表示
    if (showTooltips) {
      dot.addEventListener('mouseover', (event) => {
        showTooltip(event, data[index], unit); // ツールチップに値と単位を表示
      });
      dot.addEventListener('mouseout', hideTooltip); // ホバーが外れたらツールチップを非表示
    }

    dotGroup.appendChild(dot); // 丸をSVGに追加
  });
}


// ガイド線ラベルの要素を取得
const yLabels = [
    document.getElementById('y-label-1'),
    document.getElementById('y-label-2'),
    document.getElementById('y-label-3'),
    document.getElementById('y-label-4'),
    document.getElementById('y-label-5')
  ];
  
  // ガイド線を更新する関数
  function updateGuideLines(dataType) {
    let minValue, maxValue, unit;
  
    if (dataType === 'sales') {
      // 売上データの場合
      minValue = 0;
      maxValue = 10000; // 1億円
      unit = '万円';
    } else if (dataType === 'rainfall') {
      // 降水量データの場合
      minValue = 0;
      maxValue = 2000; // 2000mm
      unit = 'mm';
    } else if (dataType === 'percentage') {
      // パーセンテージデータの場合
      minValue = 0;
      maxValue = 100; // 100%
      unit = '%';
    }
  
    // ガイド線ラベルを最小値から最大値まで設定
     // ガイド線ラベルを最大値から最小値に逆順で設定
  const step = (maxValue - minValue) / 4; // 4つのステップで区切る
  yLabels[4].textContent = `${minValue}${unit}`;      // 一番下（最小値）
  yLabels[3].textContent = `${minValue + step}${unit}`;
  yLabels[2].textContent = `${minValue + step * 2}${unit}`;
  yLabels[1].textContent = `${minValue + step * 3}${unit}`;
  yLabels[0].textContent = `${maxValue}${unit}`;      // 一番上（最大値）
  }
  
  
  // 座標取得関数: データを元にSVG座標を計算
  function getCoordinates(data, chartHeight, chartWidth, padding, targetRange) {
    return data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding); // x座標を計算
      const y = chartHeight - padding - (value / targetRange) * (chartHeight - 2 * padding); // y座標を計算
      return { x, y };
    });
  }
  



// データの描画: 各データのラインを描画し、選択されたデータのみアニメーションを動作
function drawChart(showLine) {
    updateGuideLines(showLine); 
  // 各ラインと屈折点をボタンに応じて透明度を変更
  document.getElementById('line1').style.opacity = showLine === 'sales' ? '1' : '0.5'; // 売上データ
  document.getElementById('line2').style.opacity = showLine === 'rainfall' ? '1' : '0.5'; // 降水量データ
  document.getElementById('line3').style.opacity = showLine === 'percentage' ? '1' : '0.5'; // パーセンテージデータ

  document.getElementById('dots1').style.opacity = showLine === 'sales' ? '1' : '0.5'; // 売上データの屈折点
  document.getElementById('dots2').style.opacity = showLine === 'rainfall' ? '1' : '0.5'; // 降水量データの屈折点
  document.getElementById('dots3').style.opacity = showLine === 'percentage' ? '1' : '0.5'; // パーセンテージデータの屈折点

  // 該当するラインを前面に移動（他のラインの上に表示）
  document.getElementById('sales-chart').appendChild(document.getElementById(`line${showLine === 'sales' ? 1 : showLine === 'rainfall' ? 2 : 3}`));
  document.getElementById('sales-chart').appendChild(document.getElementById(`dots${showLine === 'sales' ? 1 : showLine === 'rainfall' ? 2 : 3}`));

  // 該当するラインのみツールチップを表示
  if (showLine === 'sales') {
    createLinePath(salesData.map(value => scaleDataBasedOnDigits(value, 1200000, 10000000)), 'line1', scaleEnabled ? 10000 : 10000000, '万円', true); // 売上データ
  } else if (showLine === 'rainfall') {
    createLinePath(rainfallData.map(value => scaleDataBasedOnDigits(value, 1500, 2000)), 'line2', scaleEnabled ? 100 : 2000, '㎜', true); // 降水量データ
  } else if (showLine === 'percentage') {
    createLinePath(percentageData.map(value => scaleDataBasedOnDigits(value, 0, 100)), 'line3', scaleEnabled ? 100 : 100, '%', true); // パーセンテージデータ
  }
}


// 初期描画（売上データを表示）
document.addEventListener("DOMContentLoaded", function () {
  drawChart('sales');
});

// ボタンのクリックイベント: 売上、降水量、パーセンテージのいずれかを選択
document.getElementById('showSales').addEventListener('click', function() {
  drawChart('sales');
});
document.getElementById('showRainfall').addEventListener('click', function() {
  drawChart('rainfall');
});
document.getElementById('showPercentage').addEventListener('click', function() {
  drawChart('percentage');
});

