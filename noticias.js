const API_URL = "http://127.0.0.1:8000/api/noticias";

const listaNoticias = document.querySelector("#lista-noticias");


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

        listaNoticias.innerHTML = "";


        // =================================================
        // NENHUMA NOTÍCIA
        // =================================================

        if (noticias.length === 0) {

            listaNoticias.innerHTML = `
                <div class="estado-vazio">

                    <span
                        class="icone-estado"
                        aria-hidden="true"
                    >
                        📰
                    </span>

                    <h2>Nenhuma notícia publicada</h2>

                    <p>
                        Novas notícias serão exibidas aqui
                        quando estiverem disponíveis.
                    </p>

                </div>
            `;

            return;
        }


        // =================================================
        // CRIAR CARDS
        // =================================================

        noticias.forEach((noticia) => {

            const card = document.createElement("article");

            card.className = "noticia-publica";

            card.innerHTML = `
                <div class="noticia-conteudo">

                    <span class="noticia-categoria">
                        NOTÍCIA
                    </span>

                    <h2>
                        ${noticia.titulo}
                    </h2>

                    <p>
                        ${noticia.conteudo}
                    </p>

                </div>
            `;

            listaNoticias.appendChild(card);

        });

    } catch (erro) {

        console.error(erro);

        listaNoticias.innerHTML = `
            <div class="estado-vazio">

                <span
                    class="icone-estado"
                    aria-hidden="true"
                >
                    ⚠️
                </span>

                <h2>Não foi possível carregar as notícias</h2>

                <p>
                    Tente novamente mais tarde.
                </p>

            </div>
        `;

    }

}


// =====================================================
// INICIAR
// =====================================================

carregarNoticias();