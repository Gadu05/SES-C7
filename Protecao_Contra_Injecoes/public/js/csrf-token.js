
// Função para pegar o valor de um cookie pelo nome
/*
function getCookieValue(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
} 
*/

// Inserir o token CSRF no input hidden do formulário
window.addEventListener('DOMContentLoaded', () => {

  fetch('/csrf')
    .then(res => res.json())
    .then(data => {
        const csrfInput = document.getElementById('csrf');
        if (csrfInput) {
            csrfInput.value = data.csrfToken;
        }
    })
    .catch(err => {
        console.error('Erro ao obter o token CSRF:', err);
    });

});





/*
document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/csrf-token', {
        credentials: 'include'  // essa linha é crucial para enviar cookies da sessão
    })
    .then(res => res.json())
    .then(data => {
        const csrfInput = document.getElementById('csrf');
        if (csrfInput) {
            csrfInput.value = data.csrfToken;
        }
    })
    .catch(err => {
        console.error('Erro ao obter o token CSRF:', err);
    });

});*/