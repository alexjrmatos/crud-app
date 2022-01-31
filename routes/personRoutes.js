const router = require("express").Router();
const Person = require("../models/Person");

router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json({ data: people });
    } catch(error) {
        res.status(400).json({ error: error });
    }
});

router.get("/id", async (req, res) => {
    const id = req.query.id;

    try {
        const personById = await Person.findById(id);
        res.status(200).json({ data: personById });
    } catch(error) {
        res.status(400).json({ error: error });
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
            message: "Dados obrigatórios não recebidos"
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

module.exports = router;