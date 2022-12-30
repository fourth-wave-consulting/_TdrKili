{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<!-- begin Footer template -->

<div class="ecommerce-footer">
    <div class="ecommerce-footer-links grid-x">
        <div class="small-12 medium-12 large-12 cell">
            <div class="grid-x ecommerce-footer-links-block">
                <div class="small-6 medium-4 cell">
                    <h5>Categories</h5>
                    <ul class="menu vertical">
						<li><a href="https://tdr.fourthwc.net/" title="Home">Home</a></li>
						<li><a href="https://tdr.fourthwc.net/Company-Info/" title="Company">Company</a></li>
						<li><a href="https://tdr.fourthwc.net/Technology/Cameras/" title="Cameras">Cameras</a></li>
						<li><a href="https://tdr.fourthwc.net/Technology/Camcorders_2/" title="Camcorders">Camcorders</a></li>
						<li><a href="https://tdr.fourthwc.net/Company-Info/" title="Company">Company</a></li>
						<li><a href="https://tdr.fourthwc.net/blog/" title="Blog">Blog</a></li>
					</ul>
                </div>
                <div class="small-6 medium-4 cell">
                    <h5>About</h5>
                    <ul class="menu vertical">
					<li><a href="https://tdr.fourthwc.net/Company-Info/About-Us.html" title="About Us">About Us</a></li>
					<li><a href="https://tdr.fourthwc.net/Company-Info/Returns_2.html" title="Returns">Returns</a></li>
					<li><a href="https://tdr.fourthwc.net/Company-Info/Warranty_2.html" title="Warranty">Warranty</a></li>
					<li><a href="https://tdr.fourthwc.net/Company-Info/Privacy-Policy_2.html" title="Privacy Policy">Privacy Policy</a></li>
					<li><a href="<NLCUSTOMERCENTERURL>" title="My Account">My Account</a></li>
					<li><a href="https://www.fourthwc.com/contact-fourth-wave-consulting" title="Contact Us" target="_blank">Contact Us</a></li>
					<li><NLUSERINFO2> </li>
					</ul>
                </div>
                <div class="small-6 medium-4 cell">
                    <h5>Social</h5>
                    <ul class="menu">
                        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <div class="ecommerce-footer-bottom-bar grid-x">
        <div class="small-12 medium-3 cell ecommerce-footer-logomark">
            <a class="logo" href="<%=getCurrentAttribute('site','homepageurl')%>" title="Ramsey, Inc."><h1>Ramsey Inc.</h1></a>
        </div>
        <div class="small-12 medium-9 cell">
            <div class="bottom-copyright">
                <span>©2021 Fourth Wave Consulting, LLC. All rights reserved.</span>
            </div>
        </div>
    </div>
</div>
    <script src="https://cdn.jsdelivr.net/gh/manucaralmo/GlowCookies@3.0.1/src/glowCookies.min.js"></script>
    <script>
        // On Document Ready and if glowCookies exists
        $(document).ready(function() {
            if (typeof glowCookies !== 'undefined') {
                glowCookies.start('en', { 
                    analytics: 'UA-42573868-1', 
                    policyLink: 'https://google.com',
                    style: 2,
                    hideAfterClick: true,
                    border: 'none',
                    bannerHeading: '<h2>🍪 Accept cookies & privacy policy?</h2>',
                    acceptBtnText: 'Accept Cookies'
                    
                });
            }
        });
    </script>
<GAUFOOT>
    <GOOGLYTICSFOOT>
        <!-- end Footer template -->