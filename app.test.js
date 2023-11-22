const request = require('supertest');
const app = require('./app');

describe('CRUD operations', () => {
  let todoId;

  test('POST /todos - Create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: 'Buy groceries' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', 'Buy groceries');

    todoId = todos.length - 1; // Save the todo ID for later use
  });

  test('GET /todos - Read todos', async () => {
    const response = await request(app).get('/todos');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('title', 'Buy groceries');
  });

  test('PUT /todos/:id - Update a todo', async () => {
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: 'Buy vegetables' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Buy vegetables');
  });

  test('DELETE /todos/:id - Delete a todo', async () => {
    const response = await request(app).delete(`/todos/${todoId}`);

    expect(response.statusCode).toBe(204);

    // Verify that the todo is deleted
    const getResponse = await request(app).get('/todos');
    expect(getResponse.body.length).toBe(0);
  });
});