const Category = require('../models/categoryModel');
const AppError = require('../utils/AppError');

// Helper: category dhoondo, na mile to 404
const findOr404 = (id) => {
  const category = Category.getById(id);
  if (!category) throw new AppError(`Category with id ${id} not found`, 404);
  return category;
};

// Same naam ki doosri category na ho (apni id ko chhod kar)
const checkDuplicate = (name, ownId) => {
  const existing = Category.findByName(name);
  if (existing && existing.id !== Number(ownId)) {
    throw new AppError('Category with this name already exists', 400);
  }
};

exports.getAll = (req, res) => {
  const data = Category.getAll();
  res.status(200).json({ success: true, count: data.length, data });
};

exports.getOne = (req, res) => {
  res.status(200).json({ success: true, data: findOr404(req.params.id) });
};

exports.create = (req, res) => {
  const { name, description } = req.body;
  checkDuplicate(name);
  const data = Category.create(name, description);
  res.status(201).json({ success: true, message: 'Category created', data });
};

exports.update = (req, res) => {
  findOr404(req.params.id);
  const { name, description } = req.body;
  checkDuplicate(name, req.params.id);
  const data = Category.update(req.params.id, name, description);
  res.status(200).json({ success: true, message: 'Category updated', data });
};

exports.remove = (req, res) => {
  findOr404(req.params.id);
  Category.remove(req.params.id);
  res.status(200).json({ success: true, message: 'Category deleted' });
};
