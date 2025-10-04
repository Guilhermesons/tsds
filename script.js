document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // envia puro, backend trata hash
    });

    const result = await response.json();

    if (result.success) {
      // redireciona de acordo com o role informado pelo backend
      if (result.role === "leitor-biologia") {
        window.location.href = "blog-biologia.html";
      } else if (result.role === "leitor-matematica") {
        window.location.href = "blog-matematica.html";
      } else {
        document.getElementById('error-message').textContent = "Papel de usuário não reconhecido.";
      }
    } else {
      document.getElementById('error-message').textContent = result.message || "Credenciais inválidas.";
    }
  } catch (error) {
    document.getElementById('error-message').textContent = "Erro ao conectar com o servidor.";
    console.error(error);
  }
});
