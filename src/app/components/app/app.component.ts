import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stydenity';

  ngOnInit() {    //intégration du chatbot
      (function(d, m){
              var kommunicateSettings =
                  {"appId":"1946f15272ca65472b6e0f9ea2c64e279","popupWidget":true,"automaticChatOpenOnNavigation":true};
              var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
              s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
              var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
              (window as any).kommunicate = m; m._globals = kommunicateSettings;
          })(document, (window as any).kommunicate || {});
    }
}
