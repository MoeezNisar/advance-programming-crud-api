const router = require('express').Router();
const c = require('../controllers/categoryController');
const { requireFields } = require('../middlewares/validate');

router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', requireFields('name'), c.create);
router.put('/:id', requireFields('name'), c.update);
router.delete('/:id', c.remove);

module.exports = router;
