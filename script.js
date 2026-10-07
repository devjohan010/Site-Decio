const themeButton = document.querySelector("#alternar-tema");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "decio-site-theme";
let savedTheme = null;

try {
	const storedTheme = localStorage.getItem(themeStorageKey);
	if (storedTheme === "light" || storedTheme === "dark") {
		savedTheme = storedTheme;
	}
} catch {
}

let followsSystemTheme = savedTheme === null;

function applyTheme(theme) {
	document.documentElement.dataset.theme = theme;

	if (themeButton) {
		const darkThemeEnabled = theme === "dark";
		themeButton.setAttribute(
			"aria-label",
			darkThemeEnabled ? "Ativar modo claro" : "Ativar modo escuro",
		);
		themeButton.setAttribute("aria-pressed", String(darkThemeEnabled));
		themeButton.querySelector("span").textContent = darkThemeEnabled
			? "☀️ Modo claro"
			: "🌙 Modo escuro";
	}
}

applyTheme(savedTheme ?? (systemTheme.matches ? "dark" : "light"));

themeButton?.addEventListener("click", () => {
	const nextTheme =
		document.documentElement.dataset.theme === "dark" ? "light" : "dark";
	followsSystemTheme = false;
	applyTheme(nextTheme);

	try {
		localStorage.setItem(themeStorageKey, nextTheme);
	} catch {
	}
});

systemTheme.addEventListener("change", (event) => {
	if (followsSystemTheme) {
		applyTheme(event.matches ? "dark" : "light");
	}
});

document.addEventListener("DOMContentLoaded", () => {

	const chatbotHTML = `
		<button id="chatbot-btn" aria-label="Abrir assistente">
			💬
		</button>

		<div id="chatbot">

			<div class="chatbot-header">
				<span>🤖 Assistente-Décio</span>

				<button id="fechar-chat" aria-label="Fechar assistente">
					×
				</button>
			</div>

			<div id="mensagens">
				<div class="mensagem bot">
					Olá! Como posso ajudar?
				</div>
			</div>

			<div id="chatbot-input">

				<input
					type="text"
					id="mensagem-input"
					placeholder="Digite sua pergunta..."
				>

				<button id="enviar-mensagem">
					Enviar
				</button>

			</div>

		</div>
	`;

	document.body.insertAdjacentHTML("beforeend", chatbotHTML);

const chatbotButton = document.querySelector("#chatbot-btn");
const chatbot = document.querySelector("#chatbot");
const fecharChat = document.querySelector("#fechar-chat");

chatbotButton.addEventListener("click", () => {
    chatbot.classList.add("ativo");
});

fecharChat.addEventListener("click", () => {
    chatbot.classList.remove("ativo");
});

});						  


document.addEventListener("DOMContentLoaded", () => {
    const footerHTML = `
        <footer class="site-footer">

            <div class="footer-top-decoration"></div>

            <div class="footer-container">

                <div class="footer-brand">

                    <a href="index.html" class="footer-logo">
                        <img
                            src="imagens/logo.png"
                            alt="Logo da EE Professor Dr. Décio Ferraz Alvim"
                        >
                    </a>

                    <p class="footer-description">
                        EE Professor Dr. Décio Ferraz Alvim,
                        promovendo educação, conhecimento e oportunidades
                        para transformar caminhos.
                    </p>

                    <div class="footer-social">

                        <a
                            href="https://www.instagram.com/decioferrazalvim/"
                            class="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram da escola"
                        >
                            IG
                        </a>

                        <a
                            href="#"
                            class="social-link"
                            aria-label="Facebook da escola"
                        >
                            f
                        </a>

                    </div>

                </div>

                <div class="footer-column">

                    <h3>Navegação</h3>

                    <ul>
                        <li><a href="index.html">Início</a></li>
                        <li><a href="escola.html">Sobre a escola</a></li>
                        <li><a href="noticias.html">Notícias</a></li>
                        <li><a href="agenda.html">Agenda</a></li>
                        <li><a href="projetos.html">Projetos</a></li>
                    </ul>

                </div>

                <div class="footer-column">

                    <h3>Acesso rápido</h3>

                    <ul>
                        <li><a href="contato.html">Contato</a></li>
                        <li><a href="contato.html#localizacao">Localização</a></li>
                        <li><a href="noticias.html">Comunicados</a></li>
                        <li><a href="agenda.html">Eventos</a></li>
                        <li><a href="projetos.html">Projetos escolares</a></li>
                    </ul>

                </div>

                <div class="footer-column footer-contact">

                    <h3>Contato</h3>

                    <a href="tel:+551129192287" class="footer-contact-item">
                        <span class="footer-contact-icon">☎</span>
                        <span>(11) 2919-2287</span>
                    </a>

                    <a
                        href="mailto:E003128A@EDUCACAO.SP.GOV.BR"
                        class="footer-contact-item"
                    >
                        <span class="footer-contact-icon">✉</span>
                        <span>E003128A@EDUCACAO.SP.GOV.BR</span>
                    </a>

                    <a
                        href="contato.html"
                        class="footer-contact-item"
                    >
                        <span class="footer-contact-icon">●</span>
                        <span>Fale com a escola</span>
                    </a>

                </div>

                <div class="footer-location">

                    <h3>Localização</h3>

                    <div class="footer-map-card">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.47120933109915!2d-46.46281652453689!3d-23.62084815690465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6894bd1ae121%3A0xb67de9dcbb89bdc0!2sEE%20Professor%20Dr.%20D%C3%A9cio%20Ferraz%20Alvim!5e0!3m2!1spt-BR!2sbr!4v1791312503199!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="180"
                            style="border:0;"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="strict-origin-when-cross-origin"
                            title="Localização da EE Professor Dr. Décio Ferraz Alvim">
                        </iframe>

                    </div>

                    <a
                        href="contato.html#localizacao"
                        class="footer-location-link"
                    >
                        Ver localização →
                    </a>

                </div>

            </div>

            <div class="footer-bottom">

                <div class="footer-bottom-container">

                    <p>
                        © 2026 EE Professor Dr. Décio Ferraz Alvim.
                        Todos os direitos reservados.
                    </p>

                    <p>
                        Site institucional
                    </p>

                </div>

            </div>

        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
