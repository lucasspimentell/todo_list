//seleção de elementos

const produtoInput = document.querySelector("#nomeProduto");
const btnAdd = document.querySelector("#add");
const todoContain = document.querySelector("#todo-contain");
const itemContain = document.querySelector(".item-contain");
const fundoLista = document.querySelector("#fundo");

let tarefaConcluida; // vareavel para receber o valor true ou false que vai ser usada na localStorage

let lista = [] // array criado para manipulação do funod se baseando de quando tem item ou não dentro dela

//Funções

function fundoList() { //função que remove o icone de fundo quando não tem nenhuma tarefa baseada no tamanho do array lista
    if (lista.length > 0) {
        fundoLista.classList.add("ocultarFundo");
    } else {
        fundoLista.classList.remove("ocultarFundo");
    }
};

//função de criação de tarefa com parametros que recebe o nome da tarefa e duas do banco de dados localStorage se ela esta conluida ou não e de salvar assim que for criada  
const creatItem = (nome, tarefaConcluida = false, save = true) => {

    lista.push(nome)

    // criando um elemento HTML em texto para depois converter para HTML
    const template = `<div class="item-contain">
                <p class="item-name naoConcluida"><span>${nome}</span></p>
                <button class="concluida" id ="verificar"><img src="img/quadrado.png" alt="quadrado" width="20px"></button>
                <button class="apagar" id = "lixeira"><img src="img/lixeira-xmark.png" alt="lixeira" width="20px"></button>
            </div>`;


    // convertendo o texto em html
    const parser = new DOMParser();
    const htmlTemplate = parser.parseFromString(template, "text/html");

    //selecionando a div item-contain para depois na linha de baixo adicionala dentro do container todoContain
    const itemContain = htmlTemplate.querySelector(".item-contain");
    todoContain.appendChild(itemContain);

    // selecionando os itens dentro da div item-contain
    const btnApagar = itemContain.querySelector(".apagar");
    const btnConcluir = itemContain.querySelector(".concluida");
    const itemName = itemContain.querySelector(".item-name");
    const imgConcluir = itemContain.querySelector(".concluida img");

    //Eventos


    // evento no botão concluir
    btnConcluir.addEventListener("click", () => {

        //manipulando o css do DOM
        btnConcluir.classList.toggle("verificado")


        if (itemName.classList.contains('naoConcluida')) {
            imgConcluir.src = "img/verificar.png"

            itemName.classList.remove("naoConcluida")
            itemName.classList.add("tarefaConcluida")
            itemContain.classList.add("tarefaConcluida")

        } else {
            imgConcluir.src = "img/quadrado.png"
            itemName.classList.add("naoConcluida")
            itemName.classList.remove("tarefaConcluida")
            itemContain.classList.remove("tarefaConcluida")
        }

        //chamndo a função concluir que ira mandar o dado para localstorage e lá esta como concluido para quando for chamado pela função load
        concluirTodosLocalStorage(nome)
    });

    // evento do botão apagar
    btnApagar.addEventListener("click", () => {
        itemContain.remove();

        const id = lista.indexOf(nome);
        if (id >= 0) {
            console.log(lista.splice(id, 1) + ": foi removido");
        }
        console.log(lista);

        //chamndo a função remover que ira mandar o dado para localstorage e lá esta como removido para quando for chamado pela função load
        removeTodosLocalStorage(nome)

        //aplicando a função de tirar e colocar o fundo
        fundoList();

    });

    // utilizando os dados, Ele LÊ os dados que vieram do LocalStorage (através da função loadTodos) e APLICA o visual no HTML
    if (tarefaConcluida) {
        itemContain.classList.add("tarefaConcluida");
        imgConcluir.src = "img/verificar.png"
        itemName.classList.remove("naoConcluida")
        itemName.classList.add("tarefaConcluida")
        btnConcluir.classList.add("verificado")
    }
    /* Este sim MANDA os dados para o LocalStorage.
    Ele usa a função saveTodosLocalStorage para gravar o nome e o status da tarefa no banco de dados do navegador. */
    if (save) {
        saveTodosLocalStorage({ nome, tarefaConcluida })
    }



};





//Evento

btnAdd.addEventListener("click", (e) => { // evento de adicionar o nome da tarefa e assim adicionando ao parametro da função creatItem
    e.target = "enter"
    const nomeProduto = produtoInput.value;
    creatItem(nomeProduto);
    console.log("Adicionado:" + lista)
    produtoInput.value = "";
   
    fundoList();
});

const botaoEnter = () =>{
    produtoInput.addEventListener("keyup",(e)=>{
       if( e.key === "Enter"){

        btnAdd.click()
       }
    });
}




// LocalStorage

// pega os dados da LocalStorage para que possamos trabalhar
/* usa o JSON.parse para transformar esse texto de volta em um Array de Objetos que o JavaScript consegue entender e manipular. */
const gettodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todo")) || [];

    return todos
}

//Carregar tarefa

const loadTodos = () => {
    const todos = gettodosLocalStorage();
    todos.forEach((todo) => {
        creatItem(todo.nome, todo.tarefaConcluida, false)

    });

    fundoList();
}

const saveTodosLocalStorage = (todo) => {
    const todos = gettodosLocalStorage();
    todos.push({ nome: todo.nome, tarefaConcluida: todo.tarefaConcluida })

    localStorage.setItem("todo", JSON.stringify(todos))
}


//Apagar no local storage

const removeTodosLocalStorage = (todoNome) => {
    const todos = gettodosLocalStorage();
    const filterTodos = todos.filter((todo) => todo.nome !== todoNome);

    localStorage.setItem("todo", JSON.stringify(filterTodos))
}

const concluirTodosLocalStorage = (todoNome) => {
    const todos = gettodosLocalStorage();
    const filterConcluidas = todos.map((todo) => {
        if (todo.nome === todoNome) {
            todo.tarefaConcluida = todo.tarefaConcluida === false ? true : false;
        }

        return todo
    });


    localStorage.setItem("todo", JSON.stringify(filterConcluidas))


}

//Ativamos a função ao carregar o script

botaoEnter();
loadTodos();
