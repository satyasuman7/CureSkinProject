import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent {
  @Input() url!: string;
  @Input() by!: string;
  @Input() time!: number;
  @Input() title!: string;
}
