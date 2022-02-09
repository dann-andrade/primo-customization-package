/************* LibraryH3lp code STARTS here **********/

// create a function to toggle askus popout
function askus_popout_toggle() {
  var askus = document.getElementById('askus-popout');
  var state = askus.getAttribute('data-askus-popout-state');
  console.log(state)

  if (state == "collapsed") {        
      askus.setAttribute('data-askus-popout-state', 'expanded');
  }
  else {        
      askus.setAttribute('data-askus-popout-state', 'collapsed');
  }
}

/************* LibraryH3lp code ends here **********/



(function(){
"use strict";
'use strict';

// start of ANGULAR CODE
var app = angular.module('viewCustom', ['angularLoad']);

/*----------below is the code for libraryh3lp on Homepage ONLY -----------*/
var s=document.createElement('script');
s.id='localScript';
s.src= 'https://ca.libraryh3lp.com/js/libraryh3lp.js?526';
document.body.appendChild(s);

app.component('prm-search-after', {
   template: '<div id="needs-js"></div>'
});
/*---------------libraryh3lp code ends here---------------*/

  /************* LibraryH3lp code STARTS here **********/
  
  /* need to import some monitoring code */
  var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
  x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "ca.libraryh3lp.com/js/libraryh3lp.js?526";
  var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);

  var askus = document.createElement('div');
  askus.id = 'askus-popout';
  askus.setAttribute('data-askus-popout-state', 'collapsed'); 
  askus.innerHTML = '<a class="tab-head" href="javascript:void()" ><img src="custom/01OCUL_BU-BU_DEFAULT/img/speech-bubble_white-fill-small.png" alt="">Ask a Librarian</a> \
  <div class="askus_tab"> \
  <!--<h2 class="askus_centre">Chat With Us</h2>--><!--Chat Button BEGIN--> \
      <div class="needs-js">chat loading...</div> \
      <ul> \
          <li>Click the image to chat with us</li> \
          <li>Ask Chat is a <a href="http://vr.scholarsportal.info/ask/">collaborative service</a></li> \
          <li><a href="https://brocku.ca/library/help/chat/">Ask Chat hours</a></li> \
          <li><a href="https://brocku.ca/library/contact/">Contact Us</a></li> \
      </ul> \
  </div>';    
  document.body.appendChild(askus);

  ///register the onclick for chat
  var askus_popout = document.querySelector('#askus-popout');

  var askus_onclick_att = document.createAttribute("onclick");
  askus_onclick_att.value = "askus_popout_toggle();"; 
  askus_popout.setAttributeNode(askus_onclick_att);
  
  /************* LibraryH3lp code ends here **********/

  /******************* Adding Report a Problem link ***************************/

    app.controller('prmActionContainerAfterController', ['$location', '$httpParamSerializer', '$scope', '$http', '$sce',
      function ($location, $httpParamSerializer, $scope, $http, $sce) {

        $scope.buttontext = "report problem";
        $scope.icon = "error";

        //hide form on load
        this.$onInit = function () {  

          this.showRPForm = false;

        };

        //show form
        this.showReportForm = function () {

          this.showRPForm = !this.showRPForm; 


          if (!this.showRPForm) {

            $scope.buttontext = "report problem";
            $scope.icon = "error";
            document.getElementById("bu-report-form").classList.remove("fade-in");

          } else {

            $scope.buttontext = "close form";
            $scope.icon = "close";
            document.getElementById("bu-report-form").classList.add("fade-in");

          }
          
                  
        };

        //Set focus to form
        if (this.showRPForm) {   


          setTimeout(() => {  
            document.getElementById("femail").focus();                  
          }, 0)              

        };

        //return 
        return this.showRPForm;

      }]
    );

    app.component('prmActionContainerAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmActionContainerAfterController',
      template: `
      <div id="bu-report-problem" class="layout-align-center-center layout-row margin-bottom-medium margin-top-medium" layout="row" layout-align="center center" ">
          <button id="bu-report-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report Pproblem" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error" ng-if="$ctrl.showRPForm == false"></prm-icon>
            <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close" ng-if="$ctrl.showRPForm == true" ></prm-icon>
            <span style="text-transform: none; font-variant: small-caps;">{{buttontext}}</span>
          </button>  
      </div>
      <div id="bu-report-form" ng-if="$ctrl.showRPForm" class="fade-in">
        <div layout="row" class="layout-full-width" layout-align="center center">
          <form name="$ctrl.reportForm" layout="column" layout-align="center center">
            <label for="femail">Email Address:</label><br>
            <input type="email" id="femail" name="femail"><br>
            <label for="fdesc">Problem:</label><br>
            <textarea id="fdesc" name="fdesc" cols="40" rows="5"></textarea><br><br>
            <input type="submit" value="Submit">
          </form>
        </div>
      </div>
      `,
    });
   
/******************* end - Adding Report a Problem link ***************************/


})();