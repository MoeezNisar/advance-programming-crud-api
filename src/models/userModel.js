// In-memory storage: data array mein rehta hai (server restart par reset)
const users = [];
let nextId = 1;

exports.findByEmail = (email) => users.find((u) => u.email === email);

exports.create = (name, email, hashedPassword) => {
  const user = { id: nextId++, name, email, password: hashedPassword };
  users.push(user);
  return { id: user.id, name, email };
};
