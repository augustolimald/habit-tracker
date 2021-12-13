const token = localStorage.getItem('token');

if (!token) {
  localStorage.clear();
  window.location.href = '/login';
} else if (window.location.pathname === '/') {
  window.location.href = '/habits';
}
