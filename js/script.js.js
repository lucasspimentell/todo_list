//seleção de elementos

const produtoInput = document.querySelector("#nomeProduto");
const btnAdd = document.querySelector("#add");
const todoContain = document.querySelector("#todo-contain");
const itemContain =document.querySelector(".item-contain");
const fundoLista = document.querySelector("#fundo");

//Funções

function fundoList(){
    if(lista.length > 0){
    fundoLista.classList.add("ocultarFundo");
    }else{
        fundoLista.classList.remove("ocultarFundo");
    }
};

const creatItem =(nome)=>{

    const template = `<div class="item-contain">
                <p class="item-name naoConcluida"><span>${nome}</span></p>
                <button class="concluida" id ="verificar"><img src="img/quadrado.png" alt="quadrado" width="20px"></button>
                <button class="apagar" id = "lixeira"><img src="img/lixeira-xmark.png" alt="lixeira" width="20px"></button>
            </div>`;

    lista.push(nome);

    const parser = new DOMParser();
    const htmlTemplate = parser.parseFromString(template,"text/html");
    const itemContain = htmlTemplate.querySelector(".item-contain");
    todoContain.appendChild(itemContain);

    
    const btnApagar = itemContain.querySelector(".apagar");
    const btnConcluir = itemContain.querySelector(".concluida");
    const itemName = itemContain.querySelector(".item-name");
    const imgConcluir = itemContain.querySelector(".concluida img");
    
    btnConcluir.addEventListener("click",()=>{
        
       btnConcluir.classList.toggle("verificado")
          
         
         if(itemName.classList.contains('naoConcluida')){
            imgConcluir.src = "img/verificar.png"

            itemName.classList.remove("naoConcluida")
            itemName.classList.add("tarefaConcluida")
         }else{
            imgConcluir.src = "img/quadrado.png"
            itemName.classList.add("naoConcluida")
            itemName.classList.remove("tarefaConcluida")
         }
        
    });
    
    btnApagar.addEventListener("click", ()=>{
    itemContain.remove();

    const id = lista.indexOf(nome);
    if(id>=0){
    console.log(lista.splice(id,1) + ": foi removido");
    }
    console.log(lista);

    fundoList();
    
});



};
let lista = [];


//Eventos

btnAdd.addEventListener("click", () =>{
    
    const nomeProduto = produtoInput.value;
    creatItem(nomeProduto);
    console.log("Adicionado:" + lista)
    produtoInput.value = "";
    fundoList();
});




