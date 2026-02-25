const client = require("../database/connection");

exports.getUsuarios = async (req, res) => {
    try {
        const resultado = await client.query("SELECT * FROM usuarios");
        res.json(resultado.rows);
    }   catch (error) {
        res.status(500).json({ erro: "Erro ao buscar usuários"});
    }
};

exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const resultado = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (resultado.rows.lenght === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json(resultado.rows[0]);
    }   catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};

exports.createUsuario = async (req, res) => {
    const { nome, email } = req.body;

    // Validação
    if (!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios"
        });
    }

    // Validação simples de email
    if (!email.includes("@")) {
        return res.status(400).json({
            erro: "Email inválido"
        })
    }

    try {
        const result = await client.query(
            "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *",
            [nome, email]
        );

        res.status(201).json(result.rows[0]);

    } catch (erro) {
        res.status(500).json({
            erro: "Erro interno no servidor"
        });
    }
};

exports.deleUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client. query(
            "DELETE FROM usuarios WHERE id = $1",
            [id]
        );
        
        if (result.rowCount ===0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido"
            });
        }

        res.json({
            mensagem: "Usuário deletado com sucesso"
        });

    } catch (erro) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno no servidor"
        });
    } 
};

exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    
    try {
        await client.query("DELETE FROM usuarios WHERE id = $1", [id]);
        res.json({ mensagem: "Usuário deletado com sucesso" });
     } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar usuário" });
        }
};

exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
            erro: "ID inválido"
        });
    }

        if (!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios"
        });
    }

    try {
        const result = await client.query(
            "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3",
            [nome, email, id]
        );

        if (result.rowCount ===0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json({
        mensagem: "Usuário atualizado com sucesso"
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno no servidor"
        });
    }

};