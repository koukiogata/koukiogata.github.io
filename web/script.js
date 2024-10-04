$('#hamburger-menu').click(function () {
  var delayTime = 0; // 開始の遅延時間を設定

  $('#nav-menu').toggleClass('show');
  $(this).toggleClass('active');

  if ($('#nav-menu').hasClass('show')) {
    $('#nav-menu ul li').each(function () {
      $(this).css('opacity', '0'); // 初期状態を透明に設定
      $(this).delay(delayTime).queue(function (next) {
        $(this).addClass('fade-in');
        next();
      });
      delayTime += 200; // 次の要素のアニメーション開始までの遅延を増やす
    });
  } else {
    $('#nav-menu ul li').removeClass('fade-in').css('opacity', '1'); // メニューを非表示にするときはフェードインクラスを削除
  }
});
$(document).ready(function () {
  function checkVisibility() {
    $('.reveal').each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < viewportBottom) {
        $(this).addClass('reveal-bg'); // 要素がビューポートに入ったら
        $(this).addClass('active'); // テキスト表示クラスを追加
      }
    });
    $('.fade-in').each(function () {
      var elementTop = $(this).offset().top; // 要素の上端
      var viewportBottom = $(window).scrollTop() + $(window).height(); // ビューポートの下端

      // 要素の上端がビューポートの下端より上にある場合
      if (elementTop < viewportBottom) {
        $(this).addClass('visible');
      }
    });
    $('#news ul li').each(function () {
      var elementTop = $(this).offset().top; // 要素の上端
      var viewportBottom = $(window).scrollTop() + $(window).height(); // ビューポートの下端

      if (elementTop < viewportBottom) {

        $(this).css('opacity', '0'); // 初期状態を透明に設定
        $(this).delay(delayTime).queue(function (next) {
          $(this).addClass('fade-in');
          next();
        });
        delayTime += 200; // 次の要素のアニメーション開始までの遅延を増やす
      }
    });
  }

  $(window).on('scroll', checkVisibility); // スクロールイベントでチェック
  checkVisibility(); // 初回チェック
});


