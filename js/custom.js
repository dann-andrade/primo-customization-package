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

  /******************* BrockU Report a Problem ***************************/

    app.controller('prmActionContainerAfterController', ['$scope', '$http',
      function ($scope, $http) {

        //initialize form to hidden
        //initialize invalid flags to initially hide warning icons
        //initialize submission and success flags off
        //pull pnx data into scope variable
        // - Construct url and adds mmsid/recordid depending on what is available in pnx
        // - Adds title depending on material type 
        //-  Initialize desc to empty string
        this.$onInit = function () {  

          this.showForm = false;
          this.validEmail = true
          this.submitSuccess = false;
          this.submitted = false;

          $scope.rURL = window.location.href;
        
          if (undefined != this.parentCtrl.item.pnx.display.mms) {
            $scope.linkID = this.parentCtrl.item.pnx.display.mms[0];
            $scope.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                          $scope.linkID +
                          '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            $scope.itemMMSID = this.parentCtrl.item.pnx.display.mms[0];
          } else if ((undefined != this.parentCtrl.item.pnx.display.source) && (this.parentCtrl.item.pnx.display.source == 'literatum:achs')) {
            $scope.linkID = this.parentCtrl.item.pnx.control.sourcerecordid[0];
            $scope.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                          $scope.linkID +
                          '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            $scope.itemMMSID = this.parentCtrl.item.pnx.control.sourcerecordid[0];
          } else {
            $scope.linkID = this.parentCtrl.item.pnx.control.recordid[0];
            $scope.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=' + 
                            $scope.linkID +
                            '&context=PC&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            $scope.itemMMSID = 'n/a';
          };

          if (undefined != this.parentCtrl.item.pnx.display.title) {
            $scope.itemTitle = this.parentCtrl.item.pnx.display.title[0];
          } else if (undefined != this.parentCtrl.item.pnx.addata.btitle) {
            $scope.itemTitle = this.parentCtrl.item.pnx.addata.btitle[0];
          } else if (undefined != this.parentCtrl.item.pnx.addata.jtitle) {
            $scope.itemTitle = this.parentCtrl.item.pnx.addata.jtitle[0];
          } else if (undefined != this.parentCtrl.item.pnx.addata.atitle) {
            $scope.itemTitle = this.parentCtrl.item.pnx.addata.atitle[0];
          } else {
            $scope.itemTitle = 'PNX TITLE ERROR'
          };

          $scope.userDesc='';
        };


        //function for Report Button
        //show form, toggle submission and success flags off
        //unhide the submit confirm, this is here in case someone double reports without refreshing
        this.showReportForm = function () {

          this.showForm = true;
          this.submitSuccess = false;
          this.submitted = false;

          setTimeout(() => {
            document.getElementById('bu-submit-confirm').style.display = 'block';
          },0);

        };

        // closing the form simple re-initializes everything (for now)
        this.closeReportForm = function () {

          this.$onInit();

        };

        //use regex to determine validEmail flag from pemail input
        // - True if description contains properly formatted email address
        //if field is empty pass anonymous in place of data
        //if true pass data to scope
        //if false set focus to field for input
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

        //function for Submit Button
        //set submittd flag to true
        //call validation functions
        //if input is valid
        // - hide form
        // - show success popup 
        // - pull problem description
        // - post data via api lin
        // - Hide submission confirmation
        this.submitReport = function () {

          this.submitted = true;

          this.validateEmail();
          
          if (this.validEmail) {

            this.showForm = false;
            this.submitSuccess = true;
            $scope.userDesc = document.getElementById("fdesc").value;

            setTimeout(() => {

              let rmessage = {report: 
                                [{ 
                                  title: $scope.itemTitle, 
                                  user: $scope.userEmail, 
                                  desc: $scope.userDesc, 
                                  url: $scope.itemURL,
                                  rurl: $scope.rURL,
                                  mmsid: $scope.itemMMSID
                                }]
                              };

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

        <!--Initial Report Button-->
        <div ng-if="$ctrl.showForm == false">
          <button id="bu-report-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report problem" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
            <span class="bu-button-text">report problem</span>
          </button>
        </div>

        <!--Submission Confirmation Popup-->
        <div id="bu-submit-confirm" class="layout-align-center-center" layout-row" layout="row" layout-align="center center" ng-if="$ctrl.submitSuccess">
          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
          <span class="bu-button-text">report submitted</span>
        </div>

        <!--Main Form Element-->
        <div id="bu-report-form" ng-if="$ctrl.showForm">
          <form class="layout-align-center-center layout-column">
            <div id="bu-form-items"> 

              <!--Description Label-->
              <div class="layout-align-left-center" layout-row" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="descerror">What is the problem? </label>
              </div>

              <!--Description Field-->
              <div class="layout-align-center-center" layout-row" layout="row" layout-align="center center">
                <textarea id="fdesc" name="message" placeholder="Please provide as much detail as possible to help us understand how we might resolve the problem." aria-label="Describe your problem"></textarea>
              </div>

              <!--Email Label-->
              <div class="layout-align-left-center layout-row margin-top-medium" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="emailerror">Would you like us to follow up with you? </label>
                <span class="bu-special-text" ng-if="$ctrl.validEmail == false && $ctrl.submitted">invalid email</span>
              </div>

              <!--Email Field-->
              <div class="layout-align-center-center margin-bottom-small" layout-row" layout="row" layout-align="center center">
                <input id="femail" autofill="false" name="email" placeholder="If yes, please enter your email address" (keyup)="$ctrl.validateEmail()" aria-label="Enter your email">
                
                <!--Invalid Flag-->
                <div class="layout-align-center-center layout-row warning-bg" layout="column" layout-align="center center" ng-if="$ctrl.validEmail == false && $ctrl.submitted"> 
                  <prm-icon class="warning-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error" ></prm-icon>
                </div>
              </div>
            </div>
          </form>

          <!--Form Buttons-->
          <div id="bu-form-buttons" class="layout-align-center-center layout-row" layout="row" layout-align="center center" ng-if="$ctrl.showForm">
            
            <!--Close Button-->
            <button id="bu-close-button"  class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Close form" ng-click="$ctrl.closeReportForm()">
              <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"></prm-icon>
              <span class="bu-button-text">cancel</span>
            </button>

            <!--Submit Button-->
            <button id="bu-submit-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="submit" aria-label="Submit report" ng-click="$ctrl.submitReport()">
              <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
              <span class="bu-button-text">submit</span>
            </button> 
          </div>
        </div>
      </div>
      `,
    });
   
/******************* end - Adding Report a Problem link ***************************/


})();