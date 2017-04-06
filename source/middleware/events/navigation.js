const velocity = require('velocity-animate');

module.exports = (next, relay) => {
  const content = document.querySelector('#content');
  const logo    = document.querySelector('.logo');
  const logoImg = document.querySelector('.logo img');
  const media   = {
    desktop : {
      content : {
        home  : { marginTop : '500px' },
        other : { marginTop : '100px' }
      },
      logo : {
        home  : { top : '300px', width: '250px', marginLeft : '-370px' },
        other : { top : '50px', marginLeft: '-50px', width: '100px' }
      },
      logoImg : {
        home  : { width : '100%' },
        other : { width : '100%' }
      }
    },
    tablet : {
      max : 1000,
      content : {
        home  : { marginTop : '500px' },
        other : { marginTop : '100px' }
      },
      logo : {
        home  : { top : '300px', width: '250px', marginLeft : '-125px' },
        other : { top : '50px', marginLeft: '-50px', width: '100px' }
      },
      logoImg : {
        home  : { width : '100%' },
        other : { width : '100%' }
      }
    },
    mobile : {
      max : 568,
      content : {
        home  : { marginTop : '250px' },
        other : { marginTop : '100px' }
      },
      logo : {
        home  : { top : '150px', width: '250px', marginLeft : '-125px' },
        other : { top : '20px', marginLeft: '-50px', width: '100px' }
      },
      logoImg : {
        home  : { width : '150px' },
        other : { width : '100%' }
      }
    }
  }

  function getDimensions() {
    let width   = window.innerWidth;
    let height  = window.innerHeight;
    let current = media.desktop;
    if (width <= media.mobile.max) {
      current = media.mobile;
    } else if (width <= media.tablet.max) {
      current = media.tablet;
    }
    return { width, height, media : current };
  }

  let dimensions = getDimensions();

  window.onresize = () => {
    dimensions = getDimensions();
  }

  if (window.location.pathname === '/') {
    velocity(content, dimensions.media.content.home, { easing: 'spring', duration : 1000 });
    velocity(logo, dimensions.media.logo.home, { easing: 'spring', duration : 1000 });
    velocity(logoImg, dimensions.media.logoImg.home, { easing: 'spring', duration : 1000 });
    logo.classList.remove('minimal');
  } else {
    velocity(content, dimensions.media.content.other, { easing: 'spring', duration : 1000 });
    velocity(logo, dimensions.media.logo.other, { easing: 'spring', duration : 1000 });
    velocity(logoImg, dimensions.media.logoImg.other, { easing: 'spring', duration : 1000 });
    logo.classList.add('minimal');
  }
  next();
}
