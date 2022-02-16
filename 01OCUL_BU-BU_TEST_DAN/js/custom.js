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

        const rform = angular.element(document.querySelector("#bu-report-form"));

        //initialize form to hidden
        this.$onInit = function () {  

          this.showRPForm = false;
          this.showMenu = false;
          this.validEmail = true;
          this.reportSubmitted = false;

        };

        this.showMenuButtons = function() {

          this.showMenu = !this.showMenu;
          this.showRPForm = false;
          this.validEmail = true;
          this.reportSubmitted = false;
          document.getElementById('bu-submit-confirm').style.display = "block";
          document.getElementById('bu-submit-confirm').classList.remove('fade-out');


        };

    
        //button logic
        this.showReportForm = function () {

          

          this.validEmail = true;
          

          //adds/removes fade classes 
          if (this.showRPForm) {
            rform.removeClass('fade-in');
          } else {
            rform.addClass('fade-in');
          };

          //flip actual toggle 
          this.showRPForm = !this.showRPForm;

          //Sets focus to email field upon form display
          if (this.showRPForm) {
            setTimeout(() => {
              document.getElementById("fdesc").focus();
            }, 0);
          };

          //return 
          return this.showRPForm;

        };

        //email validation
        this.validateEmail = function () {

          let patronemail = document.getElementById("femail").value;
          this.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(patronemail);
          let submitbutton = document.getElementById("bu-rb-submit")

          if (patronemail == ''){

            this.validEmail = true;

          };


          if(!this.validEmail) {
            setTimeout(() => {
              submitbutton.disabled = true;
              submitbutton.style.color = 'gray';
            }, 0);
          } else {
            setTimeout(() => {
              submitbutton.disabled = false;
              submitbutton.style.color = 'black';
            }, 0);
          }; 

        };

        this.submitReport = function () {

          rform.removeClass('fade-in')

          this.reportSubmitted = true;
          this.showRPForm = false;
          this.showMenu = false;
          this.validEmail = true;

          setTimeout(() => {
            
            document.getElementById('bu-submit-confirm').style.display = "none";
          
          }, 5000);

          setTimeout(() => {
            
            document.getElementById('bu-submit-confirm').classList.add('fade-out');
          
          }, 4000);

          

        };

      }]
    );

    app.component('prmActionContainerAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmActionContainerAfterController',
      template: `
      <div id="bu-rap" class="layout-align-center-center layout-row margin-bottom-medium margin-top-medium" layout="column" layout-align="center center">
        <div id="bu-report-button">
          <div class="layout-align-center-center layout-row margin-bottom-medium margin-top-medium" layout="row" layout-align="center center">
            <div ng-if="$ctrl.showMenu == false">
              <button id="bu-rb-report" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report Problem" ng-click="$ctrl.showMenuButtons()">
                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
                <span style="text-transform: none; font-variant: small-caps;">report problem</span>
              </button>
            </div>
            <div ng-if="$ctrl.showMenu">
              <button id="bu-rb-cancel" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Cancel Report" ng-click="$ctrl.showMenuButtons()">
                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"></prm-icon>
                <span style="text-transform: none; font-variant: small-caps;">cancel report</span>
              </button>
            </div>
            <div ng-if="$ctrl.showMenu">
              <button id="bu-rb-showmenu" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Detailed Report" ng-click="$ctrl.showReportForm()">
                <prm-icon icon-type="svg" svg-icon-set="primo-actions" icon-definition="info" ng-if="$ctrl.showRPForm == false"></prm-icon>
                <span style="text-transform: none; font-variant: small-caps;" ng-if="$ctrl.showRPForm == false">add details</span>
                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="double-chevron-up" ng-if="$ctrl.showRPForm"></prm-icon>
                <span style="text-transform: none; font-variant: small-caps;" ng-if="$ctrl.showRPForm">close details</span>
              </button>
            </div>
            <div ng-if="$ctrl.showMenu">
              <button id="bu-rb-submit" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Submit Report" ng-click="$ctrl.submitReport()">
                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check" ng-if="$ctrl.validEmail"></prm-icon>
                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error-outline" ng-if="$ctrl.validEmail == false"></prm-icon>
                <span style="text-transform: none; font-variant: small-caps;">submit report</span>
              </button>
            </div>
          </div> 
        </div>
        <div id="bu-report-form" class="fade-in" ng-if="$ctrl.showRPForm">
          <form /*action="https://formspree.io/f/xnqwdjpw" method="POST"*/  class="layout-align-center-center layout-column">
            <textarea id="fdesc" name="message" placeholder="Please describe the problem you are experienceing"></textarea>
            <label id="invalidemail" ng-if="$ctrl.validEmail == false">Please enter a valid email address or leave blank to submit anonymously</label>
            <input id="femail" type="email" (keyup)="$ctrl.validateEmail()" name="email" placeholder="Please enter your email address">
          </form>
        </div>
        <div id="bu-submit-confirm" class="layout-align-center-center layout-row margin-bottom-medium" layout="row" layout-align="center center" ng-if="$ctrl.reportSubmitted">
          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
          <span style="font-variant: small-caps;">report submitted</span>
        </div>
      </div>
      `,
    });
   
/******************* end - Adding Report a Problem link ***************************/


})();