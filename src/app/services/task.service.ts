import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({ id: this.idCounter++, ...task });
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
