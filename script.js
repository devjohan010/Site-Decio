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
	  <button id="chatbot-btn" aria-label="abrir assistente">
	    💬
	  </button>

	  <div id="chatbot">
	    <div class="chatbot-header">
		  <span>Assistente Décio</span>
		  <button id="fechar-chat>x</button>
		</div>

	<div id="mensagens">
		  olá! como posso ajudar?
		</div>

		<div id="chatbot-input">
		    <input
		      type="text
			  id="mensagem input"
			  placeholder="Digite sua pergunta"
		    >

		    <button id="enviar-mensagem">
		      enviar
		    </button>
		</div>
	</div>
`;
document.body.insertAdjacentHTML("beforeend", chatbotHTML)
		
