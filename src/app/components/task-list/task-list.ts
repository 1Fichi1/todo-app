import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TaskFormComponent
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchText = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  filterTasks() {
    const text = this.searchText.toLowerCase();
    this.filteredTasks = this.tasks.filter(t =>
      t.title.toLowerCase().includes(text) ||
      (t.description && t.description.toLowerCase().includes(text))
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.refresh();
  }

  viewDetails(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  toggleStatus(task: Task) {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
  }
}
