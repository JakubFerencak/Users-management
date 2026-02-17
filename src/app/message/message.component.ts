import { Component, inject, OnInit } from '@angular/core';
import { Message, MessageService } from '../../services/message.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  messageService = inject(MessageService);
  message: Message = {value: '', type:'error'};

  ngOnInit(): void {
      this.messageService.getMessageStream().subscribe(m => {
        this.message = m;
        setTimeout(() => this.message = {value: '', type:'error'}, 5000);
    });
  }
}
