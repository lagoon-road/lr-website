module.exports = (next, relay) => {
  const logo       = document.querySelector('.logo');
  if (window.location.pathname === '/') {
    logo.classList.remove('compact');
  } else {
    logo.classList.add('compact');
  }
  next();
}
