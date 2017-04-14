module.exports = (next, relay) => {
  const logo       = document.querySelector('.logo');
  const content    = document.querySelector('.content');
  function position() {
    if (window.location.pathname === '/') {
      logo.classList.remove('compact');
      content.classList.remove('compact');
    } else {
      logo.classList.add('compact');
      content.classList.add('compact');
    }
  }
  document.addEventListener('click', event => {
    position();
  });
  position();
  next();
}
