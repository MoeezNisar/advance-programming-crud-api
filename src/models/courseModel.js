// In-memory storage: data array mein rehta hai (server restart par reset)
const Category = require('./categoryModel');

let courses = [];
let nextId = 1;

// Har course ke saath category ka naam bhi bhejta hai
const withCategory = (course) => ({
  ...course,
  category_name: Category.getById(course.category_id)?.name,
});

exports.getAll = () => courses.map(withCategory);

exports.getById = (id) => courses.find((c) => c.id === Number(id));

exports.create = (title, description, categoryId) => {
  const course = {
    id: nextId++,
    title: String(title).trim(),
    description: description || null,
    category_id: Number(categoryId),
    created_at: new Date().toISOString(),
  };
  courses.push(course);
  return course;
};

exports.update = (id, title, description, categoryId) => {
  const course = exports.getById(id);
  course.title = String(title).trim();
  course.description = description || null;
  course.category_id = Number(categoryId);
  return course;
};

exports.remove = (id) => {
  courses = courses.filter((c) => c.id !== Number(id));
};

exports.removeByCategory = (categoryId) => {
  courses = courses.filter((c) => c.category_id !== categoryId);
};
