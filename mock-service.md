completed-todo.service.ts
```
export interface ICompletedTodoService {...}
export const COMPLETED_TODO_SERVICE = new OpaqueToken('ICompletedTodoService');
```
app.module.ts
```
import { CompletedTodoService } from '../services/completed-todo.service';
import { COMPLETED_TODO_SERVICE } from '../services/i-completed-todo.service';
// import { MockCompletedTodoService } from '../services/mock-completed-todo.service';

providers: [
    { provide: COMPLETED_TODO_SERVICE, useClass: CompletedTodoService },
```
current-todo.service.ts
```
import { COMPLETED_TODO_SERVICE, ICompletedTodoService } from '../services/i-completed-todo.service';

constructor(
    private authService: AuthService,
    @Inject(COMPLETED_TODO_SERVICE) private completedTodoService: ICompletedTodoService,
```