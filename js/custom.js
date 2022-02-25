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

        const rform = document.getElementById('bu-report-form');
        

        //initialize form to hidden
        this.$onInit = function () {  

          this.showForm = false;
          this.validEmail = true;
          this.validDesc = true;
          this.submitSuccess = false;
          this.submitted = false

          $scope.itemMMSID = this.parentCtrl.item.pnx.display.mms[0];
          $scope.itemTitle = this.parentCtrl.item.pnx.display.title[0];
          $scope.itemURL= 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                          $scope.itemMMSID +
                          '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
          
        };

        this.showReportForm = function () {

          this.showForm = true;
          this.submitSuccess = false;
          this.submitted = false;

          setTimeout(() => {
            document.getElementById('bu-submit-confirm').style.display = 'block';
          },0);

        };

        this.closeReportForm = function () {

          this.$onInit();


        };

        //description validation
        this.validateDesc = function(){

          let desc = document.getElementById("fdesc").value;
          
          this.validDesc = /^[\s\S]*(?!\s*$).+$/.test(desc);

          if (this.validDesc){
            setTimeout(() => {
              $scope.userDesc = desc;
            },0);
          } else {
            setTimeout(() => {
              document.getElementById('fdesc').focus();
            },0);
          };

        };

        //email validation
        this.validateEmail = function () {

          let pemail = document.getElementById("femail").value;
          
          this.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(pemail);

          if (pemail == ''){
            this.validEmail = true;
            pemail = "Anonymous";
          };

          if(this.validEmail){
            setTimeout(() => {
              $scope.userEmail = pemail;
            },0);
          } else {
            setTimeout(() => {
              document.getElementById('femail').focus();
            },0);
          };

        };

        this.submitReport = function () {

          this.submitted = true;

          this.validateEmail();
          this.validateDesc();
          
          if (this.validDesc && this.validEmail) {

            this.showForm = false;
            this.submitSuccess = true;

            setTimeout(() => {

              let rmessage = {report: 
                                [{title: $scope.itemTitle, 
                                  mmsid: $scope.itemMMSID, 
                                  user: $scope.userEmail, 
                                  desc: $scope.userDesc, 
                                  url: $scope.itemURL}
                                ]
                              };

              console.log(rmessage);

              let url = "";

              $http.post(url, rmessage);

            }, 0);

            setTimeout(() => {

              document.getElementById('bu-submit-confirm').style.display = 'none';

            }, 5000);

          };

        };

      }]
    );

    app.component('prmActionContainerAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmActionContainerAfterController',
      template: `
      <div id="bu-rap" class="layout-align-center-center layout-row margin-bottom-medium margin-top-medium" layout="column" layout-align="center center">
        <div ng-if="$ctrl.showForm == false">
          <button id="bu-report-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report problem" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
            <span style="text-transform: none; font-variant: small-caps;">report problem</span>
          </button>
        </div>
        <div id="bu-submit-confirm" class="layout-align-center-center" layout-row" layout="row" layout-align="center center" ng-if="$ctrl.submitSuccess">
          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
          <span style="font-variant: small-caps;">report submitted</span>
        </div>
        <div id="bu-report-form" ng-if="$ctrl.showForm">
          <form class="layout-align-center-center layout-column">
            <div id="bu-form-items"> 
              <div class="layout-align-left-center" layout-row" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="descerror">What is the problem? </label>
                <span style="color:#cc0000; margin: 0 0 0 5px; font-variant: small-caps;">required</span>
              </div>
              <div class="layout-align-center-center" layout-row" layout="row" layout-align="center center">
                <textarea id="fdesc" name="message" placeholder="Please provide as much detail as possible to help us understand how we might resolve the problem." (keyup)="$ctrl.validateDesc()" aria-label="Describe your problem"></textarea>
                <div class="layout-align-center-center layout-row warning-bg" layout="column" layout-align="center center" ng-if="$ctrl.validDesc == false && $ctrl.submitted">   
                  <prm-icon class="warning-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
                </div>
              </div>
              <div class="layout-align-left-center layout-row margin-top-medium" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="emailerror">Would you like us to follow up with you? </label>
                <span style="color:#cc0000; margin: 0 0 0 5px; font-variant: small-caps;" ng-if="$ctrl.validEmail == false && $ctrl.submitted">invalid email</span>
              </div>
              <div class="layout-align-center-center margin-bottom-small" layout-row" layout="row" layout-align="center center">
                <input id="femail" autofill="false" name="email" placeholder=" Please enter your email address or leave blank to submit anonymously." (keyup)="$ctrl.validateEmail()" aria-label="Enter your email">
                <div class="layout-align-center-center layout-row warning-bg" layout="column" layout-align="center center" ng-if="$ctrl.validEmail == false && $ctrl.submitted"> 
                  <prm-icon class="warning-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error" ></prm-icon>
                </div>
              </div>
            </div>
          </form>
          <div id="bu-form-buttons" class="layout-align-center-center layout-row" layout="row" layout-align="center center" ng-if="$ctrl.showForm">
            <button id="bu-close-button"  class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Close form" ng-click="$ctrl.closeReportForm()">
              <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"></prm-icon>
              <span style="text-transform: none; font-variant: small-caps;">cancel</span>
            </button>
            <button id="bu-submit-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="submit" aria-label="Submit report" ng-click="$ctrl.submitReport()">
              <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
              <span style="text-transform: none; font-variant: small-caps;">submit</span>
            </button> 
          </div>
        </div>
      </div>
      `,
    });
   
/******************* end - Adding Report a Problem link ***************************/


})();