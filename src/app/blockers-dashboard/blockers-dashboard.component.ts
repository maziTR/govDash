import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'blockers-dashboard',
  templateUrl: './blockers-dashboard.component.html',
  // styleUrls: ['./blockers-dashboard.component.css', '../loader.css']
  styleUrls: ['./blockers-dashboard.component.css']
})
export class BlockersDashboardComponent implements OnInit, OnChanges {
  @Input() sheetsArray: any[];
  chart1:any;
  chart2:any;
  chart1Title: string;
  chart2Title: string;

  constructor(private chartsService: ChartsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // titles for chart 1 & chart 2 entered here
    this.chart1Title =  "חסמים - המשאב העיקרי שהיה חסר לפרויקט כדי להתקדם כמתוכנן - חלוקה לתחומי על";
    this.chart2Title = "חסמים - ממשק מרכזי שהקשה על הביצוע - בחלוקה לתחומי על";
    if (this.sheetsArray) {
      // blockers chart 1 - missing resources - column names entered here
      let field = this.chartsService.findColumnNumByName(['תחום-על'])[0].column;
      let resourceQ1 = this.chartsService.findColumnNumByName(['Q1 חסמים משאבים - מטויב'])[0].column;
      let resourceQ3 = this.chartsService.findColumnNumByName(['Q3 חסמים משאבים - מטויב'])[0].column;
      let resourceQ4 = this.chartsService.findColumnNumByName(['2017 Q4- המשאב המרכזי שהיה חסר לפרויקט על מנת להתגבר על קשיי הביצוע'])[0].column;

      // blockers chart 2 - interfaces - column names entered here
      let interfaceQ1 = this.chartsService.findColumnNumByName(['Q1 חסמים ממשקים - מטויב'])[0].column;
      let interfaceQ3 = this.chartsService.findColumnNumByName(['Q3 חסמים ממשקים - מטויב'])[0].column;
      let interfaceQ4 = this.chartsService.findColumnNumByName(['2017 Q4- ממשק מרכזי שהקשה על הביצוע'])[0].column;

      this.chart1 = this.chartsService.generateChart(this.sheetsArray, [[field, resourceQ1], [field, resourceQ3], 
        [field, resourceQ4]], this.chart1Title);
      this.chart2 = this.chartsService.generateChart(this.sheetsArray, [[field, interfaceQ1], [field, interfaceQ3], 
        [field, interfaceQ4]], this.chart2Title);
    }
  }
}