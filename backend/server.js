const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   LISTAR PRODUTOS
========================= */
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos_artur', (err, result) => {
        if (err) {
            console.error('Erro ao listar:', err);
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

/* =========================
   CADASTRAR PRODUTO
========================= */
app.post('/produtos', (req, res) => {
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || !preco) {
        return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    const sql = `
        INSERT INTO produtos_artur (nome, categoria, preco)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nome, categoria, preco], (err) => {
        if (err) {
            console.error('Erro ao cadastrar:', err);
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Produto cadastrado com sucesso!" });
    });
});

/* =========================
   DELETAR PRODUTO
========================= */
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM produtos_artur WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                console.error('Erro ao deletar:', err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Produto não encontrado!" });
            }

            res.json({ mensagem: "Produto apagado com sucesso!" });
        }
    );
});

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});