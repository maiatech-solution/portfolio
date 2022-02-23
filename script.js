// ---- Hamburguer -------
let hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click",function(){
    document.querySelector(".container").classList.toggle("show-menu");
});

// -------- chamada da function para atualizar o preço ---------------------------
document.querySelector("#qtde").addEventListener("change", atualizarPreco); // capturar mudança no input da quantidade de página
document.querySelector("#js").addEventListener("change", atualizarPreco); // capturar mudança no checkbox se tem js.
document.querySelector("#layout-sim").addEventListener("change", atualizarPreco); // capturar mudança no input-radio se tem layout.
document.querySelector("#layout-nao").addEventListener("change", atualizarPreco); // capturar mudança no input-radio se nao tem layout.
document.querySelector("#prazo").addEventListener("change", function() {
    const prazo = document.querySelector("#prazo").value
    document.querySelector("label[for=prazo]").innerHTML = `Prazo: ${prazo} semana(s)`;
    atualizarPreco()
});

function atualizarPreco(){
    const qtde = document.querySelector("#qtde").value; // pega valor do input e adicionar na constante qtde
    const temJS = document.querySelector("#js").checked;// pega valor do checkbox se tiver marcado e adicionar na constante temJS
    const incluiLayout = document.querySelector("#layout-sim").checked;// pega valor do input radio se tiver selecionado e adicionar na constante temJS
    const prazo = document.querySelector("#prazo").value; // pega o valor por id da label de prazo
    let preco = qtde * 125; // multiplicar por 100 que é o valor por página páginas
    if(temJS)preco *= 1.2; // 1.1 significa que vai sempre pegar 10% do valor, que nesse caso seria 0.1 e muda o primeiro 0 para 1 que é o o 100% do meu valor (preço). Em outras palavras esse resumo seria: preco = preco + (preco * 10 / 100)
    if(incluiLayout)preco += 370; // verifica se foi selecionado que precisa de layout, caso sim, esta condição fica válida
    let taxaUrgencia = 1 - prazo*0.1; // cálculo da taxa única
    preco = preco + (preco * taxaUrgencia)
    document.querySelector("#preco").value = `R$ ${preco.toFixed(2).replace(".",",")}` // mostrar no html o novo valor (.replace() transforma de ponto para vírgula)
}

// ------------------- SliderShow ------------------------------------
let totalSlides = document.querySelectorAll('.card').length; // pega a quantidade de divs (cards)
let currentSlide = 0; //contador

document.querySelector('.slider--controls').style.height = 
    `${document.querySelector('.slider--width').clientHeight}px`; //centralizar botões de navegação dos cards no meio da div .slider--width

function goPrev(){ // se meu card atual for < que zero, ele avança para o ultimo
    currentSlide--; // dimunuindo contador
    if(currentSlide < 0){
        currentSlide = totalSlides -1;
    }
    updateMargin(); // chama a função de margin
}

function goNext(){ // se tiver card na frente do atual, ele avança para o próximo
    currentSlide++; // avançando contador
    if(currentSlide > (totalSlides -1)){
        currentSlide = 0;
    }
    updateMargin(); // chama a função de margin
}

function updateMargin(){ // função de margin
    let sliderItemWidth = document.querySelector('.card').clientWidth; // captura o tamanho de divs card
    let newMargin = (currentSlide * sliderItemWidth); //multiplica o contador com a quantidade de divs card
    document.querySelector('.slider--width').style.marginLeft = // atribui o valor do newMargin negativado (-newMargin) para a div .slider--width
        `${-newMargin}px`;
}

setInterval(goNext, 10000);

// ------------------ Scroll reveal -----------------

window.addEventListener("scroll", reveal); // adicionando evendo de scrol reveal

function reveal(){ // criando sua função
    var reveals = document.querySelectorAll(".reveal"); //colocando as class reveal na variável reveals

    for(var i = 0; i < reveals.length; i++){

        var windoheight = window.innerHeight; // adicionando na variável windoheight a altura em pix da janela de visualização
        var revealtop = reveals[i].getBoundingClientRect().top; //retorna o tamanho de um elemento e sua posição relativa ao viewport em relação ao topo
        var revealpoint = 150; // distancia para aparecer os itens

        if(revealtop < windoheight - revealpoint){
            reveals[i].classList.add("active"); // se tiver na distancia acima, adiciona a class 'active'
        }else{
            reveals[i].classList.remove("active"); //senão, remove a class 'active'
        }
    }
}