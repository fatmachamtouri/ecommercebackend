const express = require('express');
const router = express.Router();
const SCategorie = require("../models/scategorie")

// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat,categorieID } = req.body;
    const newSCategorie = new SCategorie({
        nomscategorie: nomscategorie,
        imagescat: imagescat,
        categorieID:categorieID
    })
    //ou bien const newCategorie = new Categorie(req.body) //
    //ou bien const newCategorie = new Categorie(req.body.nomcategorie,req.body.imagecategorie)
    try {
        await newSCategorie.save();
        res.status(200).json(newSCategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//********GET
// afficher la liste des categories.
router.get('/', async (req, res) => {
    try {
        const scat = await SCategorie.find({}, null, { sort: { '_id': -1 } })
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//*************suppression */
// Supprimer une catégorie
router.delete('/:scategorieId', async (req, res) => {
    try {
        const id = req.params.scategorieId;
        await SCategorie.findByIdAndDelete(id);
        res.json({ message: "scategorie deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: "probleme de suppression" });
    }
});
// chercher une scatégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await SCategorie.findById(req.params.scategorieId);
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier une scatégorie
router.put('/:scategorieId', async (req, res) => {
    try {
        const scat1 = await SCategorie.findByIdAndUpdate(
            req.params.scategorieId,
            { $set: req.body }, //{$set: nomcategorie:req.body.nomcategorie}
            { new: true }
        );
        res.status(200).json(scat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



module.exports = router;
