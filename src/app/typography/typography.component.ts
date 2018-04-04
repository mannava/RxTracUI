import {Component, OnInit} from '@angular/core';
import {ReviewService} from './typography.service';


@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
    private results: any;

    constructor(private reviewService: ReviewService) {
    }

    ngOnInit() {
    }

    public saveReview(username, comments, description) {


        this.reviewService.saveReview(username, comments, description).subscribe(data => {
            this.results = data;
        });
    }
}
