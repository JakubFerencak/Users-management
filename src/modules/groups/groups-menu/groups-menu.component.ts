import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-groups-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './groups-menu.component.html',
  styleUrl: './groups-menu.component.css'
})
export class GroupsMenuComponent {

}
