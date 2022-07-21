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
  askus.innerHTML = '<a class="tab-head" href="javascript:void()" >Ask Us Chat<img src="custom/01OCUL_BU-BU_DEFAULT/img/speech-bubble_white-fill-small-web.png" alt=""></a> \
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

        var self = this;

        //initialize form to hidden
        //initialize invalid flags to initially hide warning icons
        //initialize submission and success flags off
        //pull pnx data into scope variable
        // - Construct url and adds mmsid/recordid depending on what is available in pnx
        // - Adds title depending on material type 
        // - Initialize desc to empty string
        // - set submit confirm as default message until wording/email are approved by PWG
        self.$onInit = function () {  

          self.showForm = false;
          self.submitFlow = false;
          self.submitted = false;

          self.rURL = window.location.href;
        
          if (undefined != self.parentCtrl.item.pnx.display.mms) {
            self.linkID = self.parentCtrl.item.pnx.display.mms[0];
            self.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                          self.linkID +
                          '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            self.itemMMSID = self.parentCtrl.item.pnx.display.mms[0];
          } else if ((undefined != self.parentCtrl.item.pnx.display.source) && (self.parentCtrl.item.pnx.display.source == 'literatum:achs')) {
            self.linkID = self.parentCtrl.item.pnx.control.sourcerecordid[0];
            self.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                          self.linkID +
                          '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            self.itemMMSID = self.parentCtrl.item.pnx.control.sourcerecordid[0];
          } else {
            self.linkID = self.parentCtrl.item.pnx.control.recordid[0];
            self.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=' + 
                            self.linkID +
                            '&context=PC&vid=01OCUL_BU:BU_DEFAULT&lang=en';
            self.itemMMSID = 'n/a';
          };

          if (undefined != self.parentCtrl.item.pnx.display.title) {
            self.itemTitle = self.parentCtrl.item.pnx.display.title[0];
          } else if (undefined != self.parentCtrl.item.pnx.addata.btitle) {
            self.itemTitle = self.parentCtrl.item.pnx.addata.btitle[0];
          } else if (undefined != self.parentCtrl.item.pnx.addata.jtitle) {
            self.itemTitle = self.parentCtrl.item.pnx.addata.jtitle[0];
          } else if (undefined != self.parentCtrl.item.pnx.addata.atitle) {
            self.itemTitle = self.parentCtrl.item.pnx.addata.atitle[0];
          } else {
            self.itemTitle = 'PNX TITLE ERROR'
          };
        };


        //function for Report Button
        //show form, toggle submission and success flags off
        //unhide the submit confirm, self is here in case someone double reports without refreshing
        //re-initializes the desc to an empty string in case of double report
        self.showReportForm = function () {

          self.showForm = true;
          self.submitFlow = false;
          self.submitted = false;
          self.submitConf = false;
          self.showFAQ = false;

        };

        // closing the form simple re-initializes everything (for now)
        self.closeReportForm = function () {

          self.$onInit();

        };

        self.toggleFAQ = function () {

          self.showFAQ = !self.showFAQ
        };

        //function for Submit Button
        //set submittd flag to true
        //call validation functions
        //if input is valid
        // - hide form
        // - show success popup 
        // - pull problem description
        // - post data via api lin
        // - Hide submission status report
        self.submitReport = function (valid, remail, rdesc) {

          self.submitted = true;       

          if (valid) {

            self.showForm = false;

            setTimeout(() => {

              let rmessage = {report: 
                                [{ 
                                  title: self.itemTitle, 
                                  user: remail, 
                                  desc: rdesc, 
                                  url: self.itemURL,
                                  rurl: self.rURL,
                                  mmsid: self.itemMMSID
                                }]
                              };

              let url = '<insert flow url>';

              $http.post(url, rmessage, {headers:{'Content-Type': 'application/json'}}).then(function successCallback(resp) {
                self.submitSuccess = true;
              });
            }, 0);

            setTimeout(() => {
              self.submitFlow = true;
            }, 150);

            setTimeout(() => {
              self.submitFlow = false;
              self.submitSuccess = false;
              $scope.$apply();
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
        <div ng-hide="$ctrl.showForm">
          <button id="bu-report-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report problem" 
          ng-click="$ctrl.showReportForm()">
            <prm-icon class="bu-button-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
            <span class="bu-button-text">report problem</span>
          </button>
        </div>

        <!--Submission Success Popup-->
        <div id="bu-submit-success" class="layout-align-center-center bu-submit-conf" layout="row" layout-align="center center" 
        ng-if="$ctrl.submitFlow && $ctrl.submitSuccess">
          <span class="bu-button-text">report submitted</span>
        </div>

        <!--Submission Fail Popup-->
        <div id="bu-submit-fail" class="layout-align-center-center bu-submit-conf" layout="row" layout-align="center center" 
        ng-if="$ctrl.submitFlow && !$ctrl.submitSuccess">
          <span class="bu-button-text">error  -  please contact liberm@brocku.ca</span>
        </div>

        <!-- FAQ -->
        <div id="bu-faq" class="layout-align-center-center layout-column" layout="column" layout-align="center center"
        ng-if="$ctrl.showForm">
          <div id="bu-faq-wrap" class="layout-align-center-center layout-row" layout="row" layout-align="center center">

            <!-- Main Label -->
            <label id="bu-faq-label">Please read our FAQ to learn about common problems and solutions</label>

            <!-- FAQ toggle button -->
            <button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected bu-faq-button" type="button" aria-label="Read FAQ" 
            ng-click="$ctrl.toggleFAQ()">
              <div id="bu-faq-button-items">
                <prm-icon class="bu-button-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"
                ng-if="$ctrl.showFAQ"></prm-icon>
                <span class="bu-button-text"
                ng-if="$ctrl.showFAQ">close</span>
                <prm-icon class="bu-button-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-down"
                ng-if="!$ctrl.showFAQ"></prm-icon>
                <span class="bu-button-text"
                ng-if="!$ctrl.showFAQ">view faq</span>
              </div>
            </button>
          </div>

          <!-- FAQ text -->
          <div class="layout-align-center-center layout-row" layout="row" layout-align="center center">
            <p id="bu-faq-text"
              ng-show="$ctrl.showFAQ"> 
              <b>Problem</b>: When I click on the link, I get an error message.<br />
              <b>Solution</b>: Retry the link in another browser, or try an incognito/private window in your preferred browser. Another option is to clear your preferred browser’s cache.<br /><br />
              
              <b>Problem</b>: I clicked on an article link, but don’t see the fulltext of that article. Instead the link goes to the journal landing page.<br />
              <b>Solution</b>: Sometimes publishers don’t provide direct links to articles. You may need to navigate the journal webpage by first selecting the correct volume and issue, or by 
              copying and pasting the article title in the webpage’s search box.<br /><br />
              
              <b>Problem</b>: My search results in Omni doesn’t offer fulltext, just this message: ‘The library doesn't have the article? Request it via Interlibrary Loan’.<br />
              <b>Solution</b>: Sign into Omni using the link provided on that page, and then click on the ‘Request it via Interlibrary Loan’ link to request this item from another library. We 
              will notify you if/when it is available.<br /><br />
              
              Did these solutions not solve your problem? Please submit a report or email libhelp@brocku.ca and describe your problem. </p>
          </div>
        </div>

        <!--Main Form Element-->
        <div id="bu-report-form" ng-if="$ctrl.showForm">

          <form name="mform" class="layout-align-center-center layout-column" novalidate>
            <div id="bu-form-items"> 

              <!--Description Label-->
              <div class="layout-align-left-center" layout="row" layout-align="left center">
                <label class="bu-label-text" name="descerror">What is the problem? </label>
              </div>

              <!--Description Field-->
              <div class="layout-align-center-center" layout="row" layout-align="center center">
                <textarea id="fdesc" name="fdesc" placeholder="Please provide as much detail as possible to help us understand how we might resolve the problem." 
                aria-label="Describe your problem" ng-model="rdesc" required></textarea>
              </div>

              <!--Invalid Text-->
              <div class="bu-special-text-wrap" class="layout-align-center-center"layout="row" layout-align="center center"
              ng-if="mform.fdesc.$invalid && ($ctrl.submitted || mform.fdesc.$touched)">
                <div class="warning-bg">
                  <prm-icon class="bu-special-text-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
                </div>
                <span class="bu-special-text" >description required</span>
              </div>

              <!--Email Label-->
              <div class="layout-align-left-center layout-row margin-top-medium" layout="row" layout-align="left center">
                <label class="bu-label-text" name="emailerror">Please provide your email address so we can follow up with you. </label>
              </div>

              <!--Email Field-->
              <div class="layout-align-center-center" layout="row" layout-align="center center">
                <input id="femail" autofill="false" name="email" type="email" placeholder="Eg. aa00bb@brocku.ca" aria-label="Enter your email" 
                ng-model="remail" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" required>
              </div>

              <!--Invalid Text-->
              <div class="bu-special-text-wrap" class="layout-align-center-center" layout="row" layout-align="center center"
              ng-if="mform.email.$invalid && ($ctrl.submitted || mform.email.$touched)">
                <prm-icon class="bu-special-text-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
                <span class="bu-special-text" ng-if="!mform.email.$error.required">invalid email</span>
                <span class="bu-special-text" ng-if="mform.email.$error.required">email required</span>
              </div>

            </div>
          </form>

          <!--Form Buttons-->
          <div id="bu-form-buttons" class="layout-align-center-center margin-top-medium" layout="row" layout-align="center center" ng-if="$ctrl.showForm">
            
            <!--Close Button-->
            <button id="bu-close-button"  class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Close form" 
            ng-click="$ctrl.closeReportForm()">
              <prm-icon class="bu-button-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"></prm-icon>
              <span class="bu-button-text">cancel</span>
            </button>
            

            <!--Submit Button-->
            <button id="bu-submit-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="submit" aria-label="Submit report" 
            ng-click="$ctrl.submitReport(mform.$valid, remail, rdesc); mform.email.$setTouched(); mform.fdesc.$setTouched()">
              <prm-icon class="bu-button-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="check"></prm-icon>
              <span class="bu-button-text">submit</span>
            </button> 
          </div>
        </div>
      </div>
      `,
    });
   
/******************* end - Adding Report a Problem link ***************************/


})();