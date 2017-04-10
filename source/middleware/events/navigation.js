module.exports = (next, relay) => {
  const logo       = document.querySelector('.logo');
  const content    = document.querySelector('.content');
  if (window.location.pathname === '/') {
    logo.classList.remove('compact');
    content.classList.remove('compact');
  } else {
    logo.classList.add('compact');
    content.classList.add('compact');
  }

  function resize() {
    document.querySelector('.animations').style.height = 0;
    document.querySelector('.animations').style.height = document.querySelector('body').scrollHeight + 'px';
  }

  window.resize = () => {
    resize();
  };
  resize();

  // const body    = document.querySelector('body');
  // const content = document.querySelector('.content');
  // const logo    = document.querySelector('.logo');
  // const logoImg = document.querySelector('.logo img');
  // let cars      = [].slice.call(document.querySelectorAll('.car'));
  // let clouds    = [].slice.call(document.querySelectorAll('.cloud'));
  // const media   = {
  //   desktop : {
  //     content : {
  //       home  : { marginTop : '500px' },
  //       other : { marginTop : '100px' }
  //     },
  //     logo : {
  //       home  : { top : '300px', width: '250px', marginLeft : '-370px' },
  //       other : { top : '20px', marginLeft: '-50px', width: '100px' }
  //     },
  //     logoImg : {
  //       home  : { width : '100%' },
  //       other : { width : '100%' }
  //     }
  //   },
  //   tablet : {
  //     max : 1000,
  //     content : {
  //       home  : { marginTop : '500px' },
  //       other : { marginTop : '100px' }
  //     },
  //     logo : {
  //       home  : { top : '300px', width: '250px', marginLeft : '-125px' },
  //       other : { top : '50px', marginLeft: '-50px', width: '100px' }
  //     },
  //     logoImg : {
  //       home  : { width : '100%' },
  //       other : { width : '100%' }
  //     }
  //   },
  //   mobile : {
  //     max : 568,
  //     content : {
  //       home  : { marginTop : '250px' },
  //       other : { marginTop : '100px' }
  //     },
  //     logo : {
  //       home  : { top : '150px', width: '250px', marginLeft : '-125px' },
  //       other : { top : '20px', marginLeft: '-50px', width: '100px' }
  //     },
  //     logoImg : {
  //       home  : { width : '150px' },
  //       other : { width : '100%' }
  //     }
  //   }
  // }
  //
  // function sky() {
  //   if (clouds.length > 0) {
  //     const cloud      = clouds.shift();
  //     const top        = Math.round(dimensions.height * Math.random()) - cloud.clientHeight;
  //     cloud.style.left = -cloud.clientWidth + 'px';
  //     cloud.style.top  = top + 'px';
  //     const duration   = dimensions.width * Math.round(Math.random() * 4 + 9); // higher is slower
  //     const complete   = function() {
  //       clouds.push(cloud);
  //     }
  //     velocity(cloud, { left : dimensions.width, top : top - 500 + 'px' }, { duration, complete, easing : 'linear' });
  //   }
  // }
  //
  // function drive() {
  //   const car      = cars.shift();
  //   const duration = dimensions.height * Math.round(Math.random() * 3 + 3); // higher is slower
  //   const distance = dimensions.height +  150 + 'px'// so the car is offscreen
  //   const complete = function() {
  //     car.style.top = '-150px';
  //     cars.push(car);
  //     drive();
  //   }
  //   velocity(car, { top : distance }, { duration, complete, easing : 'linear' });
  // }
  //
  // function getDimensions() {
  //   let width   = body.clientWidth;
  //   let height  = body.clientHeight;
  //   let current = media.desktop;
  //   if (width <= media.mobile.max) {
  //     current = media.mobile;
  //   } else if (width <= media.tablet.max) {
  //     current = media.tablet;
  //   }
  //   return { width, height, media : current };
  // }
  //
  // let dimensions = getDimensions();
  //
  // window.onresize = () => {
  //   dimensions = getDimensions();
  // }
  //
  // if (window.location.pathname === '/') {
  //   velocity(content, dimensions.media.content.home, { easing: 'spring', duration : 1000 });
  //   velocity(logo, dimensions.media.logo.home, { easing: 'spring', duration : 1000 });
  //   velocity(logoImg, dimensions.media.logoImg.home, { easing: 'spring', duration : 1000 });
  //   logo.classList.remove('minimal');
  // } else {
  //   velocity(content, dimensions.media.content.other, { easing: 'spring', duration : 1000 });
  //   velocity(logo, dimensions.media.logo.other, { easing: 'spring', duration : 1000 });
  //   velocity(logoImg, dimensions.media.logoImg.other, { easing: 'spring', duration : 1000 });
  //   logo.classList.add('minimal');
  // }

  // if (init) {
  //   drive();
  //   setInterval(sky, 4000);
  //   init = false;
  // }
  next();
}
