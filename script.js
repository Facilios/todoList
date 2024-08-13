document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading');

    // Função para adicionar uma tarefa
    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            return;
        }

        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-button" onclick="editTask(this)">Editar</button>
                <button onclick="removeTask(this)">Remover</button>
            </div>
        `;
        
        taskList.appendChild(listItem);
        taskInput.value = '';
    }

    // Função para remover uma tarefa
    function removeTask(button) {
        const taskList = document.getElementById('taskList');
        taskList.removeChild(button.parentElement.parentElement);
        selectedTask = null;
    }

    // Função para editar uma tarefa
    function editTask(button) {
        const taskInput = document.getElementById('taskInput');
        const listItem = button.parentElement.parentElement;
        const taskText = listItem.querySelector('span').innerText;
        taskInput.value = taskText;
        selectedTask = listItem;
    }

    // Variável para armazenar a tarefa selecionada
    let selectedTask = null;

    // Função para manipular eventos de teclado
    function handleKeyEvents(event) {
        if (event.key === 'Enter') {
            addTask();
            event.preventDefault(); // Evita o comportamento padrão de submissão de formulário
        } else if (event.key === 'Delete' && selectedTask) {
            removeTask(selectedTask.querySelector('button'));
            event.preventDefault(); // Evita o comportamento padrão
        }
    }

    // Inicializa os eventos ao carregar a página
    document.querySelector('button').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', handleKeyEvents);
    document.addEventListener('keydown', handleKeyEvents);

    // Remove o overlay de loading quando o conteúdo da página estiver pronto
    window.addEventListener('load', () => {
        loadingOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restaura o comportamento normal do overflow
    });
});
