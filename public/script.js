function pasteFromClipboard() {
    navigator.clipboard.readText()
      .then((text) => {
        document.querySelector('input[name="url"]').value = text;
      })
      .catch((err) => {
        console.error('Erro ao colar do clipboard: ', err);
      });
  }
  
  // Adicione mais funções JavaScript personalizadas aqui, se necessário
  