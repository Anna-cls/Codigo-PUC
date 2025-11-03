// Dados iniciais para Ordens de Serviço (OS)
const initialOrders = [
  {
    id: "2025-OS-022",
    title: "Troca de lâmpadas queimadas no hall",
    category: "Elétrica",
    status: "Aberta",
    priority: "Média",
    occurrence: "Ocorrência 145",
    dateSuggested: "27/09/2025",
    responsible: "João Pereira",
    local: "Bloco A – Hall de entrada",
    description: "Substituir 3 lâmpadas queimadas no teto do hall principal."
  },
  {
    id: "2025-OS-023",
    title: "Manutenção do portão eletrônico",
    category: "Elétrica",
    status: "Concluída",
    priority: "Alta",
    occurrence: "",
    dateSuggested: "20/09/2025",
    responsible: "Maria Silva",
    local: "Portão Principal",
    description: "Ajustar sensores e lubrificar mecanismos."
  },
  {
    id: "2025-OS-024",
    title: "Revisão da iluminação da garagem",
    category: "Elétrica",
    status: "Concluída",
    priority: "Média",
    occurrence: "",
    dateSuggested: "22/09/2025",
    responsible: "Carlos Andrade",
    local: "Garagem",
    description: "Verificar e trocar lâmpadas queimadas e instalar sensores."
  },
  {
    id: "2025-OS-025",
    title: "Troca de disjuntor",
    category: "Elétrica",
    status: "Concluída",
    priority: "Alta",
    occurrence: "",
    dateSuggested: "18/09/2025",
    responsible: "João Pereira",
    local: "Quadro elétrico geral",
    description: "Substituir disjuntor com defeito."
  },
  {
    id: "2025-OS-026",
    title: "Instalação de refletores externos",
    category: "Elétrica",
    status: "Concluída",
    priority: "Média",
    occurrence: "",
    dateSuggested: "19/09/2025",
    responsible: "Carlos Andrade",
    local: "Área externa",
    description: "Colocar refletores de LED na área do jardim."
  },
  {
    id: "2025-OS-027",
    title: "Verificação de curto-circuito",
    category: "Elétrica",
    status: "Concluída",
    priority: "Alta",
    occurrence: "",
    dateSuggested: "12/09/2025",
    responsible: "Maria Silva",
    local: "Apartamento 307",
    description: "Investigar causas e corrigir curto."
  },
  {
    id: "2025-OS-028",
    title: "Revisão de tomadas queimadas",
    category: "Elétrica",
    status: "Concluída",
    priority: "Média",
    occurrence: "",
    dateSuggested: "10/09/2025",
    responsible: "João Pereira",
    local: "Salão de festas",
    description: "Substituir tomadas queimadas na área comum."
  },
];

// Dados iniciais para ocorrências
let occurrencesData = [
  {
    id: 1,
    title: "Lâmpada queimada no corredor do 5º andar (Bloco A)",
    date: "28/09/2025",
    status: "Pendente"
  },
  {
    id: 2,
    title: "Troca de disjuntor",
    date: "18/09/2025",
    status: "Resolvido"
  },
  {
    id: 3,
    title: "Portão da garagem não fechou automaticamente",
    date: "05/08/2025",
    status: "Resolvido"
  },
  {
    id: 4,
    title: "Instalação de refletores externos",
    date: "19/09/2025",
    status: "Resolvido"
  },
  {
    id: 5,
    title: "Revisão de tomadas queimadas",
    date: "10/09/2025",
    status: "Resolvido"
  },
  {
    id: 6,
    title: "Verificação de curto-circuito",
    date: "12/09/2025",
    status: "Resolvido"
  }
];

// Estado global da aplicação
let appState = {
  currentUser: {
    name: 'João Pereira',
    role: 'Eletricista',
    avatar: 'https://img.icons8.com/ios-filled/100/000000/user-male-circle.png'
  },
  loggedIn: false,
  currentView: 'login', // login | orders | occurrence
  selectedOS: null
};

// Função para formatar status com color
function statusToHtml(status) {
  if (status.toLowerCase() === 'concluída' || status.toLowerCase() === 'resolvido') {
    return `<span style="color:green;">${status}</span>`;
  } else if (status.toLowerCase() === 'aberta' || status.toLowerCase() === 'pendente') {
    return `<span style="color:#1d67a4;">${status}</span>`;
  } else if (status.toLowerCase() === 'em andamento') {
    return `<span style="color:#f4a261;">${status}</span>`;
  }
  return status;
}

// Função para atualizar a tabela Ordem de serviços
function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = '';

  initialOrders.forEach((order, idx) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.title}</td>
      <td>${order.category}</td>
      <td>${statusToHtml(order.status)}</td>
      <td class="priority">${order.priority}</td>
      <td><button class="ver-btn" data-index="${idx}">Ver</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Adicionar eventos aos botões Ver
  document.querySelectorAll('.ver-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = Number(e.target.dataset.index);
      openOSDetails(idx);
    });
  });
}

// Abrir modal de OS com dados preenchidos e abrir a tela modal
function openOSDetails(index) {
  appState.selectedOS = initialOrders[index];
  const os = appState.selectedOS;

  // Preenche campos do formulário
  document.getElementById('osNumber').value = os.id;
  document.getElementById('osPriority').value = os.priority;
  document.getElementById('osTitle').value = os.title;
  document.getElementById('osOccurrence').value = os.occurrence || '';
  document.getElementById('osDateSuggested').value = os.dateSuggested;
  document.getElementById('osResponsible').value = os.responsible;
  document.getElementById('osLocal').value = os.local;
  document.getElementById('osDescription').value = os.description;

  // Mostrar modal
  document.getElementById('modalOSDetails').classList.add('active');
}

// Fechar modal de OS detalhes
function closeOSDetails() {
  document.getElementById('modalOSDetails').classList.remove('active');
  appState.selectedOS = null;
}

// Funções botãoos modal OS (atualizadas)
function iniciarOS() {
  if (!appState.selectedOS) return;
  if (appState.selectedOS.status === 'Concluída') {
    alert('Esta OS já está concluída e não pode ser iniciada.');
    return;
  }
  appState.selectedOS.status = 'Em andamento';
  alert(`Ordem de serviço ${appState.selectedOS.id} iniciada. Status alterado para "Em andamento".`);
  renderOrdersTable(); // Atualiza a tabela
  closeOSDetails();
}
function voltarOS() {
  closeOSDetails();
}
function concluirOS() {
  if (!appState.selectedOS) return;
  if (appState.selectedOS.status !== 'Em andamento') {
    alert('Esta OS precisa ser iniciada antes de ser concluída.');
    return;
  }
  appState.selectedOS.status = 'Concluída';
  alert(`Ordem de serviço ${appState.selectedOS.id} concluída.`);
  renderOrdersTable(); // Atualiza a tabela
  closeOSDetails();
}

// Exibe seção Ordem de serviços e oculta as outras
function showOrdersView() {
  appState.currentView = 'orders';
  document.getElementById('ordersSection').style.display = 'block';
  document.getElementById('occurrenceSection').style.display = 'none';
  updateUserDisplay('João Pereira, Eletricista');
  setSidebarActive('btnOrders');
  closeOSDetails();
}

// Exibe seção Ocorrência
function showOccurrenceView() {
  appState.currentView = 'occurrence';
  document.getElementById('ordersSection').style.display = 'none';
  document.getElementById('occurrenceSection').style.display = 'block';
  updateUserDisplay('João Pereira, Eletricista');
  setSidebarActive('btnOccurrence');
  closeOSDetails();
  renderOccurrenceCards();
}

// Atualiza a exibição do usuário da direita
function updateUserDisplay(text) {
  document.getElementById('userName').textContent = text;
}

// Define botão ativo no sidebar
function setSidebarActive(btnId) {
  ['btnOrders','btnOccurrence'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) activeBtn.classList.add('active');
}

// Renderiza os cards de ocorrência na tela Ocorrência
function renderOccurrenceCards() {
  const container = document.getElementById('occurrenceCardsContainer');
  container.innerHTML = ''; // Limpa para atualizar

  occurrencesData.forEach(occ => {
    const card = document.createElement('div');
    card.className = 'occurrence-card';

    let statusClass = '';
    switch(occ.status.toLowerCase()) {
      case 'pendente':
        statusClass = 'status-pendente'; break;
      case 'resolvido':
        statusClass = 'status-resolvido'; break;
      case 'em andamento':
        statusClass = 'status-em-andamento'; break;
      default:
        statusClass = '';
    }

    card.innerHTML = `
      <strong>${occ.title}</strong>
      <small>Registrado em ${occ.date}</small>
      <span class="status-pill ${statusClass}">${occ.status}</span>
    `;

    container.appendChild(card);
  });
}

// Registrar nova ocorrencia via formulário
function handleOccurrenceSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('occTitle').value.trim();
  const category = document.getElementById('occCategory').value;
  const description = document.getElementById('occDescription').value.trim();

  if (!title || !category || !description) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Novo id incremental
  const newId = occurrencesData.length ? occurrencesData[occurrencesData.length - 1].id + 1 : 1;
  // Data atual formatada dd/mm/yyyy
  const now = new Date();
  const todayFormatted = now.toLocaleDateString('pt-BR');

  occurrencesData.push({
    id: newId,
    title: title,
    category: category,
    description: description,
    date: todayFormatted,
    status: 'Pendente'
  });

  // Limpa form
  document.getElementById('occurrenceForm').reset();

  // Atualiza lista
  renderOccurrenceCards();
}

// Apresentar tela login
function showLoginScreen(){
  appState.loggedIn = false;
  appState.currentView = 'login';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

// Apresentar tela principal app
function showAppScreen(){
  appState.loggedIn = true;
  appState.currentView = 'orders';
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  renderOrdersTable();
  showOrdersView();
}

// Eventos DOM completos
function setupEventListeners() {
  // Navegação sidebar
  document.getElementById('btnOrders').onclick = showOrdersView;
  document.getElementById('btnOccurrence').onclick = showOccurrenceView;

  // Botão Sair
  document.getElementById('btnLogout').onclick = () => {
    if (confirm('Deseja realmente sair?')) {
      showLoginScreen();
    }
  };

  // Botão login
  document.getElementById('btnLogin').onclick = () => {
    showAppScreen();
  };

  // Botões modal OS
  document.getElementById('startOSBtn').onclick = iniciarOS;
  document.getElementById('backOSBtn').onclick = voltarOS;
  document.getElementById('completeOSBtn').onclick = concluirOS;

  // Form ocorrencias
  document.getElementById('occurrenceForm').addEventListener('submit', handleOccurrenceSubmit);

  // Fechar modal click fora modal-content
  document.getElementById('modalOSDetails').onclick = (e) => {
    if (e.target === document.getElementById('modalOSDetails')) {
      closeOSDetails();
    }
  };

  // Botão Sair
document.getElementById('btnLogout').onclick = () => {
  if (confirm('Deseja realmente sair?')) {
    // Redireciona para a página externa na mesma aba
    window.location.href = 'login.html';  // Substitua pelo caminho da sua página externa
  }
};
}

// Inicialização
window.onload = () => {
  showLoginScreen();
  setupEventListeners();
};
