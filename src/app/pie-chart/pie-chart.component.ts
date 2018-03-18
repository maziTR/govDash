import { Component, OnInit, AfterViewInit, OnDestroy, Input  } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ChartsService } from '../charts.service';


@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  private chart: AmChart;
  data: any[];
  titleText: string  
  constructor(private AmCharts: AmChartsService,
              private chartsService: ChartsService) { }

  ngOnInit() {
    // this.ngAfterViewInit();
    
  }
  ngAfterViewInit(){
    this.chart = this.AmCharts.makeChart( "chartdivpie", this.chartsService.generatePie(this.data, [105,105], this.titleText)
    // {
    //   "type": "pie",
    //   "theme": "light",
    //   "titles": [{
    //     "text": "סטטוס ביצוע לכלל המשימות - סטטוס שנתי מטויב קצר",
    //     "size": 20
    //   }],
    //   "dataProvider": [ {
    //     "title": "1. בוצע כמתוכנן במקור",
    //     "value": 106
    //   }, {
    //     "title": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
    //     "value": 94
    //   },
    //     {"title":"3. יבוצע בהמשך, בהתאם לתכנון המקורי",
    //      "value":31
    //     },
    //     {"title":"4. מתעכב מול תכנון מקורי",
    //      "value":226
    //     },
    //      {"title":"5. בוטל",
    //      "value":107
    //     }
    //      ],
    //   "fontFamily": "Arial, Helvetica, sans-serif",
    //   "fontSize": 16,
    //   "titleField": "title",
    //   "valueField": "value",
    //   "labelRadius": 5,
    //   "radius": "42%",
    //   "innerRadius": "60%",
    //   "labelText": "[[title]]",
    //   "export": {
    //     "enabled": true
    //   }
    // }
    );

    this.chart = this.AmCharts.makeChart( "chartdivpie2", {
      "type": "pie",
      "theme": "light",
      "titles": [{
        "text": "סטטוס ביצוע לכלל המשימות - סטטוס שנתי מטויב ארוך",
        "size": 20
      }],
      "dataProvider": [ {
        "title": "1. בוצע כמתוכנן במקור",
        "value": 106
      }, {
        "title": "2. בוצע עם שינוי בזמן המשימה",
        "value": 65
      },
        {"title":"3. בוצע עם שינוי במהות המשימה",
         "value":15
        },
        {"title":"4. בוצע עם שינוי בזמן + מהות המשימה",
         "value":14
        }
         ],
      "fontFamily": "Arial, Helvetica, sans-serif",
      "fontSize": 16,
      "titleField": "title",
      "valueField": "value",
      "labelRadius": 5,
      "radius": "42%",
      "innerRadius": "60%",
      "labelText": "[[title]]",
      "export": {
        "enabled": true
      }
    } );
  }
  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}


