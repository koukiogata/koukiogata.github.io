$(function(){
    $(".slider").slick({
        autoplay: true,
        slidesToShow:3,
        appendArrows: $(".index_about_btn"),
        prevArrow:"<img src='image/prev.png' alt=''>",
        nextArrow:"<img src='image/next.png' alt=''>"
    });

   
});
$(function () {
    let images = [
        "./image/tp.png", // First background image
        "./image/about-top-image.png", // Second background image
    ];

    let currentIndex = 0;
    const fadeDuration = 1000; // 1 second fade effect
    const displayDuration = 5000; // 5 seconds display time

    // Create two background layers
    let $wrapper = $(".index_wrapper");
    $wrapper.append('<div class="background-layer layer1"></div>');
    $wrapper.append('<div class="background-layer layer2"></div>');

    let $layer1 = $wrapper.find(".layer1");
    let $layer2 = $wrapper.find(".layer2");

    // Initialize the first layer
    $layer1.css({
        "background-image": `url(${images[0]})`,
        "background-size": "cover",
        "background-position": "center",
        "height": "100%"
    }).addClass("visible");

    function changeBackground() {
        // Decide which layer is visible and which is hidden
        let $currentLayer = $layer1.hasClass("visible") ? $layer1 : $layer2;
        let $nextLayer = $currentLayer.is($layer1) ? $layer2 : $layer1;

        // Set the background of the next layer
        $nextLayer.css({
            "background-image": `url(${images[currentIndex]})`,
            "background-size": "cover",
            "background-position": "center",
            "height": "100%"
        });

        // Fade out the current layer and fade in the next one
        $currentLayer.removeClass("visible").addClass("hidden");
        $nextLayer.removeClass("hidden").addClass("visible");

        // Move to the next image index
        currentIndex = (currentIndex + 1) % images.length;

        // Wait for the display duration before changing again
        setTimeout(changeBackground, displayDuration);
    }

    // Start the slideshow
    setTimeout(changeBackground, displayDuration);
});
