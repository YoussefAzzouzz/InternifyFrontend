import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandService } from '../../services/demand.service';

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.css']
})
export class DemandDetailsComponent implements OnInit {
  demand: any;

  constructor(private route: ActivatedRoute, private demandService: DemandService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.demandService.getDemandById(Number(id)).subscribe(data => {
        this.demand = data;
      });
    }
  }
}
