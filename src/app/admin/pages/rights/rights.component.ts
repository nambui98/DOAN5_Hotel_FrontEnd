import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../../core/models';
import { UserService } from '../../../core/services';
@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.css'],
})
export class RightsComponent {
  loading = false;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        debugger;
        this.users = users;
      });
  }
}
