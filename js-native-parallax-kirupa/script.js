
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
 
var transforms = ["transform",
                  "msTransform",
                  "webkitTransform",
                  "mozTransform",
                  "oTransform"];

var transformProperty = getSupportedPropertyName(transforms);

var imageContainer = document.querySelector("#parallaxContainer");

var scrolling = false;
var mouseWheelActive = false;

var count = 0;
var mouseDelta = 0;

//
// vendor prefix management
//
function getSupportedPropertyName(properties) {
    for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
            return properties[i];
        }
    }
    return null;
}
 
function setup() {
    window.addEventListener("scroll", setScrolling);

    // deal with the mouse wheel
    window.addEventListener("mousewheel", mouseScroll, { passive: false });
    window.addEventListener("DOMMouseScroll", mouseScroll, { passive: false });

    animationLoop();
}
setup();

function mouseScroll(e) {
    mouseWheelActive = true;

    // cancel the default scroll behavior
    if (e.preventDefault) {
        e.preventDefault();
    }

    // deal with different browsers calculating the delta differently
    if (e.wheelDelta) {
        mouseDelta = e.wheelDelta / 320;
    } else if (e.detail) {
        mouseDelta = -e.detail / 3;
    }
}

//
// Called when a scroll is detected
//
function setScrolling() {
    scrolling = true;
}

//
// Cross-browser way to get the current scroll position
//
function getScrollPosition() {
    if (document.documentElement.scrollTop == 0) {
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}

//
// A performant way to shift our image up or down
// transform: translate3d(0px, 100px, 0)
function setTranslate3DTransform(element, yPosition) {
    var value = "translate3d(0px" + ", " + yPosition + "px" + ", 0)";
    element.style[transformProperty] = value;
}

function animationLoop() {
    // adjust the image's position when scrolling
    if (scrolling) {
        setTranslate3DTransform(imageContainer, 
                                -1 * getScrollPosition() / 2);
        scrolling = false;
    }

    // scroll up or down by 10 pixels when the mousewheel is used
    if (mouseWheelActive) {
        window.scrollBy(0, -mouseDelta * 10);
        count++;
         
        // stop the scrolling after a few moments
        if (count > 20) {
            count = 0;
            mouseWheelActive = false;
            mouseDelta = 0;
        }
    }

    requestAnimationFrame(animationLoop);
}
