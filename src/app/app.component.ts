import { Component, OnInit } from '@angular/core';
import { JobService } from './services/job.service';

const PAGE_SIZE = 6;  // Add this constant

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CureSkinProject';
  
  fetchingJobDetails = false;
  jobIds: number[] | null = null;
  jobs: any[] = [];
  page = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void { 
    this.fetchJobs(this.page);
  }

  async fetchJobIds(currPage: number): Promise<number[]> {
    if (!this.jobIds) {
      this.jobIds = (await this.jobService.fetchJobIds().toPromise()) ?? [];
    }

    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return this.jobIds.slice(start, end);
  }

  async fetchJobs(currPage: number): Promise<void> {
    const jobIdsForPage = await this.fetchJobIds(currPage);

    this.fetchingJobDetails = true;
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) => this.jobService.fetchJobDetails(jobId).toPromise())
    );
    this.jobs = [...this.jobs, ...jobsForPage];

    this.fetchingJobDetails = false;
  }

  loadMoreJobs() {
    if (this.jobs.length > 0 && this.page * PAGE_SIZE + PAGE_SIZE <  (this.jobIds?.length ?? 0)) {
      this.page++;
      this.fetchJobs(this.page);
    }
  }
}
