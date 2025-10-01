// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", function() {
  inicializarFormulario();
  ativarScrollSuave();
  inicializarCarousels();
  inicializarEventListeners();
});

// Inicializar todos os carousels
function inicializarCarousels() {
  // Inicializar todos os carousels da página
  $('.carousel').carousel();
  
  // Configuração específica para cada carousel
  $('#carouselHorarios').carousel({
    interval: 6000,
    pause: 'hover'
  });
  
  $('#carouselProfessores').carousel({
    interval: 5000,
    wrap: true
  });
  
  $('#carouselNoticias').carousel({
    interval: 4500
  });
  
  $('#carouselArquivo').carousel({
    interval: 5500
  });
}

// Inicializar event listeners adicionais
function inicializarEventListeners() {
  // Fechar modais com a tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      fecharTodosModais();
    }
  });
  
  // Fechar modais clicando fora deles
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      $(e.target).modal('hide');
    }
  });
  
  // Botão de pautas
  const btnPautas = document.querySelector('#pautas .btn-primary');
  if (btnPautas) {
    btnPautas.addEventListener('click', function() {
      alert('Sistema em desenvolvimento. Em breve disponível para alunos e encarregados de educação.');
    });
  }
}

// ===== FUNÇÕES DE MODAL =====
// Professores - Modal
function abrirModalProfessor(nome, cargo, imagem, biografia) {
  document.getElementById("profNome").textContent = nome;
  document.getElementById("profCargo").textContent = cargo;
  document.getElementById("profImg").src = imagem;
  document.getElementById("profImg").alt = `Foto de ${nome}`;
  document.getElementById("profBio").textContent = biografia;
  $('#modalProfessor').modal('show');
  registrarEvento('Modal Professor', `Aberto: ${nome}`);
}

// Notícias - Modal
function abrirModalNoticia(titulo, imagem, texto) {
  document.getElementById("noticiaTitulo").textContent = titulo;
  document.getElementById("noticiaImagem").src = imagem;
  document.getElementById("noticiaImagem").alt = `Imagem: ${titulo}`;
  document.getElementById("noticiaTexto").textContent = texto;
  $('#modalNoticia').modal('show');
  registrarEvento('Modal Notícia', `Aberto: ${titulo}`);
}

// Arquivo - Modal
function abrirModalArquivo(titulo, imagem, texto) {
  document.getElementById('arquivoTitulo').textContent = titulo;
  document.getElementById('arquivoImagem').src = imagem;
  document.getElementById('arquivoImagem').alt = `Imagem: ${titulo}`;
  document.getElementById('arquivoTexto').textContent = texto;
  $('#modalArquivo').modal('show');
  registrarEvento('Modal Arquivo', `Aberto: ${titulo}`);
}

// Ranking - Modal
function abrirModalAluno(nome, turma, media, trimestre) {
  document.getElementById('modalNome').textContent = nome;
  document.getElementById('modalTurma').textContent = turma;
  document.getElementById('modalMedia').textContent = media;
  document.getElementById('modalTrimestre').textContent = trimestre;
  $('#modalAluno').modal('show');
  registrarEvento('Modal Aluno', `Aberto: ${nome} - ${turma}`);
}

// Comunidade - Modal
function abrirModalComunidade(titulo, imagem, descricao) {
  document.getElementById("comunidadeTitulo").textContent = titulo;
  document.getElementById("comunidadeImagem").src = imagem;
  document.getElementById("comunidadeImagem").alt = `Imagem: ${titulo}`;
  document.getElementById("comunidadeTexto").textContent = descricao;
  $('#modalComunidade').modal('show');
  registrarEvento('Modal Comunidade', `Aberto: ${titulo}`);
}

// Provas e Exames - Modal
function abrirModalProva(titulo, data, descricao) {
  document.getElementById("provaTitulo").textContent = titulo;
  document.getElementById("provaData").textContent = data;
  document.getElementById("provaDescricao").textContent = descricao;
  $('#modalProva').modal('show');
  registrarEvento('Modal Prova', `Aberto: ${titulo}`);
}

// Projetos - Modal
function abrirModalProjeto(titulo, imagem, descricao) {
  document.getElementById("projetoTitulo").textContent = titulo;
  document.getElementById("projetoImagem").src = imagem;
  document.getElementById("projetoImagem").alt = `Imagem: ${titulo}`;
  document.getElementById("projetoTexto").textContent = descricao;
  $('#modalProjeto').modal('show');
  registrarEvento('Modal Projeto', `Aberto: ${titulo}`);
}

// Biblioteca - Modal
function abrirModalBiblioteca(titulo, imagem, descricao, pdfUrl) {
  document.getElementById("bibliotecaTitulo").textContent = titulo;
  document.getElementById("bibliotecaImagem").src = imagem;
  document.getElementById("bibliotecaImagem").alt = `Imagem: ${titulo}`;
  document.getElementById("bibliotecaTexto").textContent = descricao;
  document.getElementById("bibliotecaPdf").href = pdfUrl || '#';
  $('#modalBiblioteca').modal('show');
  registrarEvento('Modal Biblioteca', `Aberto: ${titulo}`);
}

// Centro de Formação - Modal
function abrirModalFormacao(titulo, imagem, descricao) {
  document.getElementById("formacaoTitulo").textContent = titulo;
  document.getElementById("formacaoImagem").src = imagem;
  document.getElementById("formacaoImagem").alt = `Imagem: ${titulo}`;
  document.getElementById("formacaoTexto").textContent = descricao;
  $('#modalFormacao').modal('show');
  registrarEvento('Modal Formação', `Aberto: ${titulo}`);
}

// Fechar todos os modais
function fecharTodosModais() {
  $('.modal').modal('hide');
}

// ===== RANKING =====
function filtrarRanking() {
  const turma = document.getElementById('filtroTurma').value;
  const trimestre = document.getElementById('filtroTrimestre').value;
  const linhas = document.querySelectorAll('#corpoRanking tr');
  let resultadosVisiveis = 0;

  linhas.forEach(linha => {
    const t = linha.dataset.turma;
    const tri = linha.dataset.trimestre;

    const mostrar = (turma === 'todos' || turma === t) &&
                    (trimestre === 'todos' || trimestre === tri);

    linha.style.display = mostrar ? '' : 'none';
    if (mostrar) resultadosVisiveis++;
  });

  // Mostrar mensagem se não houver resultados
  const mensagemSemResultados = document.getElementById('mensagemSemResultados');
  if (!mensagemSemResultados && resultadosVisiveis === 0) {
    const tr = document.createElement('tr');
    tr.id = 'mensagemSemResultados';
    tr.innerHTML = `<td colspan="7" class="text-center py-4">Nenhum resultado encontrado para os filtros selecionados.</td>`;
    document.querySelector('#corpoRanking').appendChild(tr);
  } else if (mensagemSemResultados && resultadosVisiveis > 0) {
    mensagemSemResultados.remove();
  }

  registrarEvento('Filtro Ranking', `Turma: ${turma}, Trimestre: ${trimestre}, Resultados: ${resultadosVisiveis}`);
}

function exportarPDF() {
  // Criar uma versão impressa otimizada
  const elementosOcultar = document.querySelectorAll('.navbar, .btn, .hero, footer, #filtroTurma, #filtroTrimestre');
  const exibicaoOriginal = [];
  
  // Ocultar elementos não necessários para impressão
  elementosOcultar.forEach(el => {
    exibicaoOriginal.push(el.style.display);
    el.style.display = 'none';
  });
  
  // Adicionar título para impressão
  const tituloImpressao = document.createElement('h2');
  tituloImpressao.textContent = 'Ranking Trimestral - IPPLN-EIE';
  tituloImpressao.className = 'text-center mb-3';
  tituloImpressao.style.display = 'none';
  document.body.appendChild(tituloImpressao);
  tituloImpressao.style.display = 'block';
  
  // Configurações de impressão
  const configImpressao = `
    <style>
      @media print {
        body * {
          visibility: hidden;
        }
        #ranking, #ranking * {
          visibility: visible;
        }
        #ranking {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .table {
          font-size: 12px;
        }
        h2 {
          text-align: center;
          margin-bottom: 15px;
        }
      }
    </style>
  `;
  
  // Adicionar estilos de impressão
  document.head.insertAdjacentHTML('beforeend', configImpressao);
  
  // Imprimir
  window.print();
  
  // Restaurar elementos após impressão
  setTimeout(() => {
    elementosOcultar.forEach((el, index) => {
      el.style.display = exibicaoOriginal[index] || '';
    });
    tituloImpressao.remove();
    
    // Remover estilos de impressão
    const estilosImpressao = document.querySelector('style[media="print"]');
    if (estilosImpressao) {
      estilosImpressao.remove();
    }
  }, 100);
  
  registrarEvento('Exportar PDF', 'Ranking exportado para PDF');
}

// ===== FORMULÁRIO DE CONTACTO =====
function inicializarFormulario() {
  const form = document.getElementById("form-contacto");
  if (!form) return;

  // Adicionar validação em tempo real
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const mensagemInput = document.getElementById("mensagem");

  if (nomeInput) nomeInput.addEventListener('input', validarNome);
  if (emailInput) emailInput.addEventListener('input', validarEmailEmTempoReal);
  if (mensagemInput) mensagemInput.addEventListener('input', validarMensagem);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (!validarFormulario(nome, email, mensagem)) {
      return;
    }

    enviarMensagem(nome, email, mensagem);
  });
}

function validarNome() {
  const nomeInput = document.getElementById("nome");
  const nome = nomeInput.value.trim();
  
  if (nome.length < 2) {
    nomeInput.classList.add('is-invalid');
    return false;
  } else {
    nomeInput.classList.remove('is-invalid');
    return true;
  }
}

function validarEmailEmTempoReal() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  
  if (!validarEmail(email)) {
    emailInput.classList.add('is-invalid');
    return false;
  } else {
    emailInput.classList.remove('is-invalid');
    return true;
  }
}

function validarMensagem() {
  const mensagemInput = document.getElementById("mensagem");
  const mensagem = mensagemInput.value.trim();
  
  if (mensagem.length < 10) {
    mensagemInput.classList.add('is-invalid');
    return false;
  } else {
    mensagemInput.classList.remove('is-invalid');
    return true;
  }
}

function validarFormulario(nome, email, mensagem) {
  let valido = true;

  if (nome === "") {
    document.getElementById("nome").classList.add('is-invalid');
    valido = false;
  }

  if (email === "" || !validarEmail(email)) {
    document.getElementById("email").classList.add('is-invalid');
    valido = false;
  }

  if (mensagem === "" || mensagem.length < 10) {
    document.getElementById("mensagem").classList.add('is-invalid');
    valido = false;
  }

  if (!valido) {
    mostrarNotificacao('Por favor, preencha todos os campos corretamente.', 'error');
    return false;
  }

  return true;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function enviarMensagem(nome, email, mensagem) {
  mostrarNotificacao('A enviar mensagem...', 'info');
  fetch('backend/enviar-contato.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&mensagem=${encodeURIComponent(mensagem)}`
  })
  .then(response => response.json())
  .then(res => {
    if (res.success) {
      mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contacto brevemente.', 'success');
      document.getElementById("form-contacto").reset();
      document.getElementById("nome").classList.remove('is-invalid');
      document.getElementById("email").classList.remove('is-invalid');
      document.getElementById("mensagem").classList.remove('is-invalid');
    } else {
      mostrarNotificacao(res.error || "Erro ao enviar mensagem.", 'error');
    }
  })
  .catch(() => {
    mostrarNotificacao('Erro ao enviar mensagem. Tente novamente.', 'error');
  });
}

function salvarMensagem(nome, email, mensagem) {
  try {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push({
      nome,
      email,
      mensagem,
      data: new Date().toISOString(),
      lida: false
    });
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    registrarEvento('Mensagem Contacto', `De: ${nome} (${email})`);
  } catch (e) {
    console.error('Erro ao salvar mensagem:', e);
  }
}

// ===== SCROLL SUAVE =====
function ativarScrollSuave() {
  const links = document.querySelectorAll('.navbar a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Ajuste para navbar fixa
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        
        // Atualizar URL sem recarregar a página
        history.pushState(null, null, targetId);
        
        registrarEvento('Navegação', `Scroll para: ${targetId}`);
      }
    });
  });
}

// ===== UTILITÁRIOS =====
function mostrarNotificacao(mensagem, tipo = 'info') {
  // Criar notificação (pode ser substituído por uma biblioteca como Toastify)
  const notification = document.createElement('div');
  notification.className = `alert alert-${tipo} alert-dismissible fade show`;
  notification.setAttribute('role', 'alert'); // MELHORIA: acessibilidade para leitores de tela
  notification.style.position = 'fixed';

  // MELHORIA: permite empilhar várias notificações
  const allNotifications = document.querySelectorAll('.alert[role="alert"]');
  const offset = 20 + allNotifications.length * 70;
  notification.style.top = `${offset}px`;
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.minWidth = '300px';
  notification.innerHTML = `
    ${mensagem}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;

  document.body.appendChild(notification);

  // Auto-remover após 5 segundos e ajustar outras notificações
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
      // Reposiciona as restantes
      const remaining = document.querySelectorAll('.alert[role="alert"]');
      remaining.forEach((n, idx) => {
        n.style.top = `${20 + idx * 70}px`;
      });
    }
  }, 5000);
}

function registrarEvento(categoria, acao) {
  // Simular tracking de eventos (substituir por Google Analytics ou similar)
  if (typeof gtag !== 'undefined') {
    gtag('event', acao, {
      'event_category': categoria,
      'event_label': 'IPPLN-EIE Website'
    });
  }
  
  console.log(`[Evento] ${categoria}: ${acao}`);
}

// ===== CARREGAMENTO DE IMAGENS =====
// Adicionar loading lazy para melhor performance
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    img.addEventListener('error', function() {
      // ===== MELHORIA 3: Fallback de imagem leve usando SVG =====
      this.src = 'data:image/svg+xml;utf8,<svg width="160" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="%23ddd"/><text x="50%" y="50%" font-size="14" fill="%23999" dominant-baseline="middle" text-anchor="middle">Imagem não disponível</text></svg>';
      this.alt = 'Imagem não disponível';
    });
  });
});

// ===== OTIMIZAÇÕES DE PERFORMANCE =====
// Debounce para funções que podem ser chamadas frequentemente
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce ao filtro de ranking
const filtrarRankingDebounced = debounce(filtrarRanking, 300);
document.getElementById('filtroTurma').addEventListener('change', filtrarRankingDebounced);
document.getElementById('filtroTrimestre').addEventListener('change', filtrarRankingDebounced);

// ===== MELHORIA 2: Outline de acessibilidade para foco =====
(function() {
  const styleOutline = document.createElement('style');
  styleOutline.innerHTML = `
    a:focus, button:focus, .btn:focus {
      outline: 2px solid #00ffff !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(styleOutline);
})();