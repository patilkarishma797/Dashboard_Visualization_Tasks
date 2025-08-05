import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
userAvatarUrl: string = 'assets/images/Contactimages.jpeg';
userName: string = 'Karishma Patil';
isHovered: boolean = false;

setFallback(event: Event) {
  (event.target as HTMLImageElement).src = 'assets/dummy-avatar.png';
}


}
