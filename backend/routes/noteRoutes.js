const { Router } = require('express')
const {protect} = require("../middlewares/authMiddleware");
const {getNotes, createNote, updateNote, getNoteById, deleteNote} = require("../controllers/noteControllers");

const router = Router()


router.route('/').get(protect, getNotes)
router.route('/create').post(protect, createNote)
router.route('/:id').get(getNoteById).put(protect, updateNote).delete(protect, deleteNote)



module.exports = router;