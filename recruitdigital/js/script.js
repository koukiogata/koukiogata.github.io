document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.fade-in-section');

  const config = {
    'number1': { max: 40, speed: 50 },
    'number2': { max: 80, speed: 40 },
    'number3': { max: 5, speed: 80 },
    'number4': { max: 100, speed: 30 },
    'number5': { max: 125, speed: 20 },
    'number6': { max: 60, speed: 40 },
    'number7': { max: 70, speed: 20 },
    'number8': { max: 5, speed: 80 },
    'number8': { max: 5, speed: 80 },
  };

  function animateNumber(element, maxNumber, intervalSpeed) {
    let currentNumber = 0;
    const interval = setInterval(function () {
      currentNumber++;
      element.textContent = currentNumber;

      if (currentNumber === maxNumber) {
        clearInterval(interval);
      }
    }, intervalSpeed);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in');

          const numberElement = entry.target.querySelector('.number-display');
          if (numberElement) {
            const elementId = numberElement.id;
            if (config[elementId]) {
              const { max, speed } = config[elementId];
              animateNumber(numberElement, max, speed);
            }
          }
        }, index * 200); // 遅延フェードイン

        observer.unobserve(entry.target); // フェードイン後に監視解除
      }
    });
  }, {
    rootMargin: '0px 0px -70px 0px',
    threshold: 1
  });

  sections.forEach(section => {
    observer.observe(section);
  });



  const svgRects = document.querySelectorAll('.detail-pages rect'); // pictogram-section内のrect要素を取得

  window.addEventListener('scroll', function() {
    svgRects.forEach(rect => {
      const rectTop = rect.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (rectTop < windowHeight) {
        rect.style.width = rect.getAttribute('data-width'); // 元の幅にする
      }
    });
  });



  var accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var content = this.nextElementSibling;

      var allItems = document.querySelectorAll(".accordion-item");
      allItems.forEach(function (item) {
        if (item !== button.parentElement) {
          item.classList.remove("active"); // アクティブクラスを外す
          item.querySelector(".accordion-content").style.maxHeight = "0"; // 閉じてコンテンツの高さを0にする
        }
      });

      button.parentElement.classList.toggle("active");
      if (button.parentElement.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px"; // 開くときに高さを設定

        button.parentElement.scrollIntoView({
          behavior: 'smooth', // スムーズにスクロール
          block: 'center' // 画面の上部に表示されるようにスクロール
        });
      } else {
        content.style.maxHeight = "0";
      }
    });
  });
  

  const backToTopButton = document.getElementById('back-to-top');
  const entrySection = document.querySelector('.entry-section');

  window.addEventListener('scroll', function () {
    const entrySectionTop = entrySection.getBoundingClientRect().top;

    if (entrySectionTop <= 0) {
      backToTopButton.style.display = 'block'; // entry-sectionより下なら表示
    } else {
      backToTopButton.style.display = 'none'; // entry-sectionより上なら非表示
    }
  });
});


