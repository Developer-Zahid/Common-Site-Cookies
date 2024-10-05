const commonCookiesButton = document.querySelectorAll('[data-cookies-btn]');
const allowCookiesButton = document.querySelector('[data-cookies-btn="allow"]');
const declineCookiesButton = document.querySelector('[data-cookies-btn="decline"]');
const cookiesElement = document.querySelector('[data-element="cookies"');
let cookiesShowStatus = localStorage.getItem("cookiesShowStatus");
const cookiesShowTimeDelay = 1500;
const googleTagManagerID = 'G-Dummy';

// Function to load scripts based on consent
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    return script;
}

// Function to load Google Analytics
function loadAnalytics() {
    const analyticsScript = loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerID}`);
    analyticsScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', googleTagManagerID);
    };
}

// Function to load Jquery script
function loadJquery() {
    const jqueryScript = loadScript('https://code.jquery.com/jquery-3.7.1.min.js');
    jqueryScript.onload = function() {
        const selectedCookiesTextWithJquery = $('[data-element="cookies"]').find('.cookies__body__text').text();
        console.log(selectedCookiesTextWithJquery);
    }
}

// Hide Cookies Element Function
function hideCookiesElement() {
    // Add the class disable to the cookies Element
    cookiesElement.classList.remove("show");
    // Update cookiesStatus in the localStorage
    localStorage.setItem("cookiesShowStatus", "false");
};

function allAllowedCookiesDependencyFunctions(){
    loadAnalytics();
    loadJquery();
}

if(localStorage.getItem('cookieConsentAccepted') === 'true') {
    // If consent was previously given, load all dependency allowed cookies functions
    allAllowedCookiesDependencyFunctions();
};

commonCookiesButton.forEach(item=>{
    item.addEventListener("click", function(){
        if(!cookiesShowStatus){
            hideCookiesElement();
        }
    });
});

allowCookiesButton.addEventListener("click", function(){
    if(!cookiesShowStatus){
        hideCookiesElement();
        allAllowedCookiesDependencyFunctions();
        localStorage.setItem('cookieConsentAccepted', 'true');
    }
});

// Check localStorage cookiesStatus value
window.addEventListener("load", function(){
    if(!cookiesShowStatus){
        setTimeout(
            ()=> cookiesElement.classList.add("show"),
            cookiesShowTimeDelay
        );
    }
});