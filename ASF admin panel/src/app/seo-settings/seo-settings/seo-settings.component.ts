import { Component, OnInit, ElementRef } from '@angular/core';
import { PermissionHelper } from 'src/app/helpers/permissions.helper';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { remove } from "lodash-es";
declare var $: any;
@Component({
  selector: 'seo-settings',
  templateUrl: './seo-settings.component.html',
  styleUrls: ['./seo-settings.component.css'],
})

export class SeoSettingComponent implements OnInit {
  public permissions: any = {};
  public activeTabIndex: number = 0;

  constructor(private router: Router,) {


  }

  ngOnInit(): void { }

  onClickLink(index) {
    this.activeTabIndex = index;
  }
}
