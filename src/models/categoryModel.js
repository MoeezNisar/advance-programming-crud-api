// In-memory storage: data array mein rehta hai (server restart par reset)
const categories = [];
let nextId = 1;

const courseModel = () => require('./courseModel'); // circular import se bachne ke liye

exports.getAll = () => categories;

exports.getById = (id) => categories.find((c) => c.id === Number(id));

exports.findByName = (name) =>
  categories.find((c) => c.name.toLowerCase() === String(name).trim().toLowerCase());

exports.create = (name, description) => {
  const category = {
    id: nextId++,
    name: String(name).trim(),
    description: description || null,
    created_at: new Date().toISOString(),
  };
  categories.push(category);
  return category;
};

exports.update = (id, name, description) => {
  const category = exports.getById(id);
  category.name = String(name).trim();
  category.description = description || null;
  return category;
};

exports.remove = (id) => {
  const index = categories.findIndex((c) => c.id === Number(id));
  categories.splice(index, 1);
  courseModel().removeByCategory(Number(id)); // category delete ho to uske courses bhi delete
};
