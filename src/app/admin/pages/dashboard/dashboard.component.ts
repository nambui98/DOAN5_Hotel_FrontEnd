import { Component, OnInit, Renderer2 } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = '';
  total = 500;
  constructor(
    private renderer: Renderer2,
    private token: TokenStorageService
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.loadScripts();
  }
  public loadScripts() {
    this.renderExternalScript(
      'assets/plugins/apex/apexcharts.min.js'
    ).onload = () => {};

    this.renderExternalScript(
      'assets/assets/js/dashboard/dash_2.js'
    ).onload = () => {};
    this.renderExternalScript('assets/assets/js/custom.js').onload = () => {};
    // this.renderExternalScript('assets/assets/js/loader.js').onload = () => {};
    // this.renderExternalScript('assets/assets/js/custom.js').onload = () => {};
  }

  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
