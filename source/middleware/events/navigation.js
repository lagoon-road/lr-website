const velocity = require('velocity-animate');

module.exports = (next, relay) => {
  const content = document.querySelector('#content');
  if (window.location.pathname === '/') {
    velocity(content, { marginTop : '42%' }, { easing: 'spring', duration : 1000 });
  } else {
    velocity(content, { marginTop : '100px' }, { easing: 'spring', duration : 1000 });
  }
  next();
}
