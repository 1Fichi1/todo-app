import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  title = '';
  description = '';

  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title.trim()) return;

    this.taskService.addTask({
      title: this.title,
      description: this.description,
      status: 'pending'
    });

    this.title = '';
    this.description = '';
    this.taskAdded.emit(); // Сообщаем родителю
  }
}
