const router = require('express').Router();
const c = require('../controllers/courseController');
const { requireFields } = require('../middlewares/validate');

router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', requireFields('title', 'category_id'), c.create);
router.put('/:id', requireFields('title', 'category_id'), c.update);
router.delete('/:id', c.remove);

module.exports = router;
