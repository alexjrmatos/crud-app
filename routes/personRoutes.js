const router = require("express").Router();
const Person = require("../models/Person");

router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json({
            data: people
        });
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const personById = await Person.findById(id);
        res.status(200).json({
            data: personById
        });
    } catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({
                message: "Não foi encontrado nenhum dado para o id informado"
            })
        } else res.status(400).json({
            error: error
        });
    }
})

router.post("/", async (req, res) => {
    const {
        name,
        salary,
        approved
    } = req.body;

    if (!name || !salary || !approved) {
        res.status(422).json({
            message: "Dados obrigatórios não recebidos (nome, salary ou approved)"
        });
    };

    const person = {
        name,
        salary,
        approved,
        created_at: new Date()
    };

    try {
        await Person.create(person);
        res.status(201).json({
            message: "Pessoa inserida com sucesso."
        });

    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const {
        name,
        salary,
        approved
    } = req.body;

    const person = {
        name,
        salary,
        approved
    };

    if (!name || !salary || !approved) {
        res.status(422).json({
            message: "Dados obrigatórios não recebidos, nenhuma atualização realizada (nome, salary ou approved)"
        });
    };

    try {
        const updatedPerson = await Person.updateOne({
            _id: id
        }, person);

        res.status(200).json({
            success: true,
            data: person
        })
    } catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({
                message: "Não foi encontrado nenhum dado para o id informado"
            })
        } else res.status(400).json({
            error: error
        });
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Person.deleteOne({
            _id: id
        });

        res.status(200).json({
            message: "Usuário deletado com sucesso"
        })
    } catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({
                message: "Não foi encontrado nenhum dado para o id informado"
            })
        } else res.status(400).json({
            error: error
        });
    }

});

module.exports = router;