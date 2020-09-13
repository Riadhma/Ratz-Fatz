import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    window.onscroll = function () {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.position = "fixed";
        document.getElementById("navbar").style.background = "#e8e8e8";
        document.getElementById("navbar").style.boxShadow = "2px 10px 19px -16px rgba(0, 0, 0, 0.75)";
        document.getElementById("logo").style.width = "80px";
        document.getElementById("nav-link").style.fontSize = "20px";
        document.getElementById("linkElement").style.color = "#111111";
        document.getElementById("linkElement2").style.color = "#111111";
      } else {
        document.getElementById("navbar").style.padding = "relative";
        document.getElementById("navbar").style.background = "transparent";
        document.getElementById("navbar").style.boxShadow = "none";
        document.getElementById("logo").style.width = "125px";
        document.getElementById("nav-link").style.fontSize = "24px";
        document.getElementById("linkElement").style.color = "#ffffff";
        document.getElementById("linkElement2").style.color = "#ffffff";
      }
    };
  }


}
