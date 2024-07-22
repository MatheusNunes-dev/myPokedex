/* Fazer um requisição  fetch(url), o fetch irá retornar uma promise (promessa de um resultado),
    processamento assíncrono, nao tenho uma resposta de imediato, (executa o resto do código neese período de tempo)
    utilizase método .then quando pego uma promise com sucesso (caso a promise tenha sucesso, será retornada no método then)
    catch promise sem sucesso ( logo utilizamos o catch para manipular o fracasso)
    finally , requisao concluida idenpendente do sucesso ou do fracasso
    body é o conteúdo da api
    => arrow se a funcao so tiver uma linha nao precisa declarar
    emxemplo : .then((response) =>  response.json()) o (response) é o argumento da função e response.json() é o return da funcao
    SREMPRE O QUE VAI PARA O PRIMEIRA THEN É O RETORNO DA PROMISE
    SEMPRE O RETURNO DO PRIMEIRO THEN VAI PARA O SEGUNDO THEN E ASSIM POR DIANTE
    A PROMISE É O BODY, PARA MANIPULAR ELA É NECESSÁRIA DAR UM FORMATO A ELA COMO: JSON, TEXT. BLOB...
    Quando arrow so tem uma linha, pode tirar o corpo da função
    */

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const openPageStats = document.getElementById('pokemonList')
const id_stats = document.getElementById('statsPokemon')
const limit = 10;
let offset = 0;
const maxRecords = 151;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="pokemon${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
      </li >
    `
}

function convertPokemonToDetailsPage(pokemon, num) {
    return `
        <div class="content-details">
            <div class="detalhes-superior">
                <div class="cabecalho-pokemon-details">
                    <span class="nome-pokemon">${pokemon.name}</span>
                    <span class="numero-pokemon">${pokemon.number}</span>
                </div>
                <div>
                    <ul>
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ul>
                </div>
                <div>
                    <img class="${pokemon.photo}" src="${pokemon.name}">
                </div>
            </div>
            <div class="detalhes-inferior">
                <div class="category-details">
                    <span class="text-base-status">Base Status</span>
                </div>
                <div class="powers-level">
                    <ul class="power-name">
                        <li class="nome-habilidade">HP</li>
                        <li class="nome-habilidade">Attack</li>
                        <li class="nome-habilidade">Defense</li>
                        <li class="nome-habilidade">Sp.Atk</li>
                        <li class="nome-habilidade">Sp.Def</li>
                        <li class="nome-habilidade">Speed</li>
                        <li class="nome-habilidade">Total</li>
                    </ul>
                    <ul class="power-number">
                        // ${pokemon.stats.map((stat) => `<li class="quantidade-habilidade">${stat}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
    `

}





        

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    // const listItems = []
    // pokemons.map()
    // for (let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     listItems.push(convertPokemonToLi(pokemon))
    // }
    // pokemonList.innerHTML += convertPokemonToLi(pokemon) 
})
}


loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit
    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
    
})




// openPageStats.addEventListener('click', () => {
//     openPageStatsTeste()
// })

// function openPageStatsTeste() {
//     pokeApi.getPokemons(1, 1).then((pokemons) => {
//         id_stats.innerHTML = convertPokemonToDetailsPage(pokemons)
//     })
//     window.open('assets/html/pokemon-detail.html')
// }