import React from 'react';

const NotFound = () => {
  return (
    <>
      <div id="wrapper">
        {/* <!-- content begin --> */}
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section id="section-hero" className="jarallax text-light pt0 pb0 vertical-center" aria-label="section" style={{backgroundImage: `url(/oldassets/images/background/notfound-bg-img.jpg)`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h1>Oops! You're off the map.</h1>
                    <p className="text-white">
                      It looks like you've wandered off the beaten path, and this page is
                      nowhere to be found. But don't worry, we’re here to guide you back on
                      track!
                    </p>
                    <a href="/" className="btn-main">
                      Go Back
                    </a>
                    <div className="spacer-20"></div>
                    <ul className="list-unstyled text-white">
                      <li>
                        Head back to our <a href="/" style={{ color: '#1ECB15' }}>Homepage</a> to plan your next adventure.
                      </li>
                      <li>
                        Explore our <a href="/services" style={{ color: '#1ECB15' }}>Destinations</a> for exciting travel ideas.
                      </li>
                      <li>
                        Or, feel free to <a href="/contact" style={{ color: '#1ECB15' }}>Contact Us</a> our team is ready to help!
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 text-center">
                    <h1 className="s2">
                      <span className="c1 not-found-text">404</span>
                      <span className="spacer-single"></span>
                      <span className="c3">Not Found</span>
                    </h1>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* <!-- content close --> */}
      </div>
    </>
  );
}

export default NotFound;