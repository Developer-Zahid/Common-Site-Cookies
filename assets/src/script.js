$(document).ready(function() {
    // Function to load scripts based on consent
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        return script;
    }

    // Function to load Google Analytics
    function loadAnalytics() {
        const analyticsScript = loadScript('https://www.googletagmanager.com/gtag/js?id=MY_ID'); // Replace MY_ID
        analyticsScript.onload = function() {
            console.log('analyticsScript script loaded');
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Update settings based on consent
            if (localStorage.getItem('analyticsConsent') === 'true') {
                gtag('config', 'MY_ID', {
                    'allow_google_signals': true,
                    'allow_ad_personalization_signals': true,
                    'send_page_view': true
                });
                console.log('analyticsScript accepted');
            } else {
                window['ga-disable-MY_ID'] = true; // Disable Google Analytics
                console.log('analyticsScript not accepted');
            }
        };
    }

    // Function to load Clarity script
    function loadClarity() {
        loadScript('https://cdn.jsdelivr.net/npm/clarity-js@0.7.47/build/clarity.min.js');
    }

    // Check if the user has already accepted cookies
    if (localStorage.getItem('cookieConsentAccepted')) {
        // Load scripts based on consent
        if (localStorage.getItem('analyticsConsent') === 'true') {
            loadAnalytics();
            loadClarity(); // Load Clarity when accepted
            console.log('analyticsConsent Code Run');
        }
        if (localStorage.getItem('marketingConsent') === 'true') { console.log('marketingConsent Code Run'); }
        if (localStorage.getItem('personalizationConsent') === 'true') { console.log('personalizationConsent Code Run'); }
        $('#cookieConsent').hide();
    }

    // When the user clicks the "Accept" button
    $('#acceptCookies').on('click', function() {
        $('#cookieConsent').hide();
        localStorage.setItem('cookieConsentAccepted', 'true');
        localStorage.setItem('analyticsConsent', $('#analyticsConsent').is(':checked'));
        localStorage.setItem('marketingConsent', $('#marketingConsent').is(':checked'));
        localStorage.setItem('personalizationConsent', $('#personalizationConsent').is(':checked'));

        // Load scripts based on consent
        if (localStorage.getItem('analyticsConsent') === 'true') {
            loadAnalytics();
            loadClarity(); // Load Clarity when accepted
            console.log('analyticsConsent Code Run');
        }
        if (localStorage.getItem('marketingConsent') === 'true') { console.log('marketingConsent Code Run'); }
        if (localStorage.getItem('personalizationConsent') === 'true') { console.log('personalizationConsent Code Run'); }
    });
});