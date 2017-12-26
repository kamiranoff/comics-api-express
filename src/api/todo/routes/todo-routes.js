import TodoController from '../controller/todo-controller';

class TodoRoutes {
    static init(router) {
      router
        .route('/api/todos')
        .get(TodoController.getAll)
        .post(TodoController.createTodo);

      router
        .route('/api/todos/:id')
        .delete(TodoController.deleteTodo);
    }
}

export default TodoRoutes;
