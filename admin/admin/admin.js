const API_URL = "http://127.0.0.1:8000/api/noticias";

const noticiasContainer = document.querySelector(".noticias-container");

const botaoNovaNoticia = document.querySelector(".btn-nova");

const formularioNoticia = document.querySelector("#formulario-noticia");

const formNoticia = document.querySelector("#form-noticia");

const botaoCancelar = document.querySelector("#cancelar-noticia");


// =====================================================
// EDITAR NOTÍCIA
// =====================================================

async function editarNoticia(id) {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar notícias.");
        }

        const noticias = await resposta.json();

        const noticia = noticias.find(
            (item) => item.id === id
        );

        if (!noticia) {
            alert("Notícia não encontrada.");
            return;
        }

        // Abre o formulário
        formularioNoticia.hidden = false;

        // Preenche os campos
        document.querySelector("#titulo").value = noticia.titulo;

        document.querySelector("#conteudo").value = noticia.conteudo;

        // Guarda o ID da notícia que está sendo editada
        formularioNoticia.dataset.editandoId = id;

        // Coloca o cursor no título
        document.querySelector("#titulo").focus();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível carregar a notícia.");

    }

}


// =====================================================
// CARREGAR NOTÍCIAS
// =====================================================

async function carregarNoticias() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar notícias.");
        }

        const noticias = await resposta.json();

        noticiasContainer.innerHTML = "";

        // Nenhuma notícia
        if (noticias.length === 0) {

            noticiasContainer.innerHTML = `
                <div class="vazia">
                    Nenhuma notícia cadastrada.
                </div>
            `;

            return;
        }

        // Criar os cards
        noticias.forEach((noticia) => {

            const card = document.createElement("article");

            card.className = "noticia-card";

            card.innerHTML = `
                <h3>${noticia.titulo}</h3>

                <p>${noticia.conteudo}</p>

                <div class="acoes">

                    <button
                        class="btn btn-editar"
                        onclick="editarNoticia(${noticia.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirNoticia(${noticia.id})"
                    >
                        Excluir
                    </button>

                </div>
            `;

            noticiasContainer.appendChild(card);

        });

    } catch (erro) {

        console.error(erro);

        noticiasContainer.innerHTML = `
            <div class="vazia">
                Não foi possível carregar as notícias.
            </div>
        `;

    }

}


// =====================================================
// EXCLUIR NOTÍCIA
// =====================================================

async function excluirNoticia(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta notícia?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir notícia.");
        }

        await carregarNoticias();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível excluir a notícia.");

    }

}


// =====================================================
// ABRIR FORMULÁRIO DE NOVA NOTÍCIA
// =====================================================

botaoNovaNoticia.addEventListener("click", () => {

    formularioNoticia.hidden = false;

    formNoticia.reset();

    // Garante que não estamos editando uma notícia
    delete formularioNoticia.dataset.editandoId;

    document.querySelector("#titulo").focus();

});


// =====================================================
// CANCELAR FORMULÁRIO
// =====================================================

botaoCancelar.addEventListener("click", () => {

    formularioNoticia.hidden = true;

    formNoticia.reset();

    // Remove o ID da edição
    delete formularioNoticia.dataset.editandoId;

});


// =====================================================
// CRIAR OU EDITAR NOTÍCIA
// =====================================================

formNoticia.addEventListener("submit", async (event) => {

    event.preventDefault();

    const titulo = document.querySelector("#titulo").value;

    const conteudo = document.querySelector("#conteudo").value;

    // Verifica se estamos editando uma notícia
    const idEditando = formularioNoticia.dataset.editandoId;

    try {

        let resposta;

        // =============================================
        // EDITAR
        // =============================================

        if (idEditando) {

            resposta = await fetch(
                `${API_URL}/${idEditando}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        titulo: titulo,
                        conteudo: conteudo
                    })
                }
            );

        }

        // =============================================
        // CRIAR
        // =============================================

        else {

            resposta = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    titulo: titulo,
                    conteudo: conteudo
                })

            });

        }

        if (!resposta.ok) {
            throw new Error("Erro ao salvar notícia.");
        }

        // Limpa o formulário
        formNoticia.reset();

        // Esconde o formulário
        formularioNoticia.hidden = true;

        // Remove o ID de edição
        delete formularioNoticia.dataset.editandoId;

        // Atualiza a lista
        await carregarNoticias();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível salvar a notícia.");

    }

});


// =====================================================
// INICIAR
// =====================================================

carregarNoticias();