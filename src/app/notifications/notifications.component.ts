import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @ViewChildren('replyBox') replyBoxes!: QueryList<any>;

  notifications = [
    { profilePhoto: 'assets/images/photo1.jpg', sender: 'John Doe', subject: 'commented on your post', date: '10/03/25 11:44 a.m.', read: false, type: 'comment', expanded: false, course: 'Math 101', comment: 'Great post!', selected: false },
    { profilePhoto: 'assets/images/photo2.jpg', sender: 'Meeting Reminder', subject: 'Team meeting at 3 PM', date: '05/03/25 10:06 a.m.', read: false, type: 'meeting', expanded: false, course: '', comment: '', selected: false },
    { profilePhoto: 'assets/images/photo3.jpg', sender: 'Jane Smith', subject: 'commented on your photo', date: '08/01/25 11:30 a.m.', read: false, type: 'comment', expanded: false, course: 'Science 202', comment: 'Nice photo!', selected: false },
    { profilePhoto: 'assets/images/photo4.jpg', sender: 'Meeting Reminder', subject: 'Project kickoff meeting', date: '08/01/25 11:30 a.m.', read: false, type: 'meeting', expanded: false, course: '', comment: '', selected: false },
    { profilePhoto: 'assets/images/photo5.jpg', sender: 'John Doe', subject: 'commented on your status', date: '08/01/25 10:46 a.m.', read: false, type: 'comment', expanded: false, course: 'History 303', comment: 'Interesting status!', selected: false },
  ];

  markAsRead(index: number) {
    this.notifications[index].read = true;
  }

  markAsUnread(index: number) {
    this.notifications[index].read = false;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  toggleExpand(index: number) {
    this.notifications[index].expanded = !this.notifications[index].expanded;
  }

  replyToComment(index: number) {
    const replyBox = this.replyBoxes.toArray()[index];
    const reply = replyBox.nativeElement.value;
    console.log(`Reply to comment: ${reply}`);
    // Handle the reply logic here
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.notifications.forEach(notification => notification.selected = checked);
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      if (notification.selected) {
        notification.read = true;
      }
    });
  }

  markAllAsUnread() {
    this.notifications.forEach(notification => {
      if (notification.selected) {
        notification.read = false;
      }
    });
  }

  deleteSelected() {
    this.notifications = this.notifications.filter(notification => !notification.selected);
  }

  filterNotifications(filter: string) {
    if (filter === 'all') {
      this.notifications = [...this.notifications];
    } else if (filter === 'read') {
      this.notifications = this.notifications.filter(n => n.read);
    } else if (filter === 'unread') {
      this.notifications = this.notifications.filter(n => !n.read);
    }
  }
}