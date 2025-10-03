const usersDB = [
  {
    username: "joao",
    passwordHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // "password"
    role: "leitor-biologia"
  },
  {
    username: "maria",
    passwordHash: "3a9d60012c0c6582b189c1ef6d69c9c429c7e9b5143fcdf01d5a55c0db1e8372", // "mat123"
    role: "leitor-matematica"
  }
];

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const passwordHash = await hashPassword(password);

  const user = usersDB.find(u => u.username === username && u.passwordHash === passwordHash);

  if (user) {
    if (user.role === "leitor-biologia") {
      window.location.href = "blog-biologia.html";
    } else if (user.role === "leitor-matematica") {
      window.location.href = "blog-matematica.html";
    } else {
      document.getElementById('error-message').textContent = "Papel de usuário não reconhecido.";
    }
  } else {
    document.getElementById('error-message').textContent = "Credenciais inválidas.";
  }
});
