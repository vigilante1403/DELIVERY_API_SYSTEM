import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ISubmitReqAnalyze } from 'src/app/interface/delivery/IDelivery';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  maxDate:string=''
  constructor(private datepipe:DatePipe,private service:ManageService){
    const currentDate = new Date()
    this.maxDate = this.datepipe.transform(currentDate,'yyyy-MM-dd')!
  }
  
  dateChoose = new Date();
  week:number=0;
  show=false
  change1=false
  change2=false
  type="line"
  onDateChoose(event:any){
    this.dateChoose=event.target.value;
    this.change1=true
  }
  onWeekInput(event:any){
    this.week=Number((event.target as HTMLInputElement).value)
this.change2=true

  }
  onSetTypeView(event:Event){
  
    this.type=(event.target as HTMLSelectElement).value

  }
  onSubmit(){
    this.chartLabels=[]
    this.chartData=[]
    if(this.change1&&this.change2){
      var submit:ISubmitReqAnalyze=({
        startTime: this.dateChoose,
        weeks:this.week
      })
      this.service.addNewAnalyzeData(submit).subscribe({
        next:(res)=>{
          console.log(res);
          for(var i=1;i<=this.week;i++){
            var weeklabel = "Week "+i
            this.chartLabels.push(weeklabel);
          }
          this.chartType=this.type;
          this.chartData=res;this.show=true
        },
        error:(err)=>{console.log(err)}
      })
    }
   
  }
  chartData:any = [
    // {
    //   data: [330, 600, 260, 700],
    //   label: 'Account A'
    // },
    // {
    //   data: [120, 455, 100, 340],
    //   label: 'Account B'
    // },
    // {
    //   data: [45, 67, 800, 500],
    //   label: 'Account C'
    // },
    // {
    //   data: [100, 267, 500, 789],
    //   label: 'Account D'
    // }
  ];
  chartLabels:any = [
    // 'January',
    // 'February',
    // 'March',
    // 'April'
  ];
  chartOptions = {
    responsive: true
  };
  chartType:any=""
  onChartHover = ($event: any) => {
    window.console.log('onChartHover', $event);
  };

  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  };
  // newDataPoint(dataArr = [100, 100, 100], label:any) {
  //   this.chartData.forEach((dataset, index) => {
  //     this.chartData[index] = Object.assign({}, this.chartData[index], {
  //       data: [...this.chartData[index].data, dataArr[index]]
  //     });
  //   });

  //   this.chartLabels = [...this.chartLabels, label];
  // }
}
