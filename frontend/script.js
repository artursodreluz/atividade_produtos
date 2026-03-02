const API = "http://localhost:3333/produtos";

/* =========================
   LISTAR PRODUTOS
========================= */
const lista = document.getElementById("lista");

if (lista) {
    fetch(API)
        .then(res => res.json())
        .then(produtos => {
            lista.innerHTML = "";

            produtos.forEach(produto => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h3>${produto.nome}</h3>
                    <p>Categoria: ${produto.categoria}</p>
                    <p>Preço: R$ ${produto.preco}</p>
                    <button class="btn-apagar">Apagar</button>
                `;

                const botao = card.querySelector(".btn-apagar");

                botao.addEventListener("click", () => {
                    if (confirm("Tem certeza que deseja apagar?")) {
                        fetch(`${API}/${produto.id}`, {
                            method: "DELETE"
                        })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error("Erro ao apagar");
                            }
                            return res.json();
                        })
                        .then(() => {
                            alert("Produto apagado com sucesso!");
                            card.remove(); // remove da tela sem reload
                        })
                        .catch(err => {
                            console.error(err);
                            alert("Erro ao apagar produto!");
                        });
                    }
                });

                lista.appendChild(card);
            });
        })
        .catch(err => console.error("Erro ao listar:", err));
}

/* =========================
   CADASTRAR PRODUTO
========================= */
const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const produto = {
            nome: document.getElementById("nome").value,
            categoria: document.getElementById("categoria").value,
            preco: document.getElementById("preco").value
        };

        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao cadastrar");
            }
            return res.json();
        })
        .then(() => {
            alert("Produto cadastrado com sucesso!");
            window.location.href = "index.html";
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao cadastrar!");
        });
    });
}