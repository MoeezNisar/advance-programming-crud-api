const Course = require('../models/courseModel');
const Category = require('../models/categoryModel');
const AppError = require('../utils/AppError');

const findOr404 = (id) => {
  const course = Course.getById(id);
  if (!course) throw new AppError(`Course with id ${id} not found`, 404);
  return course;
};

// Course ki category_id valid honi chahiye, warna 400
const checkCategory = (categoryId) => {
  if (!Category.getById(categoryId)) {
    throw new AppError(`category_id ${categoryId} does not exist`, 400);
  }
};

exports.getAll = (req, res) => {
  const data = Course.getAll();
  res.status(200).json({ success: true, count: data.length, data });
};

exports.getOne = (req, res) => {
  res.status(200).json({ success: true, data: findOr404(req.params.id) });
};

exports.create = (req, res) => {
  const { title, description, category_id } = req.body;
  checkCategory(category_id);
  const data = Course.create(title, description, category_id);
  res.status(201).json({ success: true, message: 'Course created', data });
};

exports.update = (req, res) => {
  findOr404(req.params.id);
  const { title, description, category_id } = req.body;
  checkCategory(category_id);
  const data = Course.update(req.params.id, title, description, category_id);
  res.status(200).json({ success: true, message: 'Course updated', data });
};

exports.remove = (req, res) => {
  findOr404(req.params.id);
  Course.remove(req.params.id);
  res.status(200).json({ success: true, message: 'Course deleted' });
};
