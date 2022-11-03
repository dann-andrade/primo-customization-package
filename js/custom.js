/* LibraryH3lp code ---------------------------------------------------------*/
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
/* End LibraryH3lp code -----------------------------------------------------*/



/* Google Analytics ---------------------------------------------------------*/
var googleAnalyticsUrl = document.createElement('script');
googleAnalyticsUrl.src = "https://www.googletagmanager.com/gtag/js?id=G-QEMT44XVTJ";
googleAnalyticsUrl.type = 'text/javascript';
googleAnalyticsUrl.async = true;
document.head.appendChild(googleAnalyticsUrl);

var googleAnalyticsCode = document.createElement('script');
googleAnalyticsCode.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QEMT44XVTJ');`;
document.head.appendChild(googleAnalyticsCode);  
/* End Google Analytics ------------------------------------------------------*/


/* Load JQuery ---------------------------------------------------------------*/
var js = document.createElement('script') ;
js.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js";
document.head.appendChild(js);
/* End JQuery ----------------------------------------------------------------*/

(function(){
"use strict";
'use strict';

  // start of ANGULAR CODE
  var app = angular.module('viewCustom', ['angularLoad']);

/* LibraryH3lp code ----------------------------------------------------------*/

  /*below is the code for libraryh3lp on Homepage ONLY */
  var s=document.createElement('script');
  s.id='localScript';
  s.src= 'https://ca.libraryh3lp.com/js/libraryh3lp.js?526';
  document.body.appendChild(s);

  app.component('prm-search-after', {
    template: '<div id="needs-js"></div>'
  });

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
  
/* End LibraryH3lp code -----------------------------------------------------*/



/* BrockU Report a Problem --------------------------------------------------*/

  app.controller('prmActionContainerAfterController', ['$scope', '$http',
  function ($scope, $http) {

    var ctrl = this;

    //initialize form to hidden
    //initialize invalid flags to initially hide warning icons
    //initialize submission and success flags off
    //pull pnx data into scope variable
    // - Construct url and adds mmsid/recordid depending on what is available in pnx
    // - Adds title depending on material type 
    // - Initialize desc to empty string
    // - set submit confirm as default message until wording/email are approved by PWG
    ctrl.$onInit = function () {  

      ctrl.showForm = false;
      ctrl.submitFlow = false;
      ctrl.submitted = false;

      ctrl.rURL = window.location.href;
    
      if (undefined != ctrl.parentCtrl.item.pnx.display.mms) {
        ctrl.linkID = ctrl.parentCtrl.item.pnx.display.mms[0];
        ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                      ctrl.linkID +
                      '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        ctrl.itemMMSID = ctrl.parentCtrl.item.pnx.display.mms[0];
      } else if ((undefined != ctrl.parentCtrl.item.pnx.display.source) && (ctrl.parentCtrl.item.pnx.display.source == 'literatum:achs')) {
        ctrl.linkID = ctrl.parentCtrl.item.pnx.control.sourcerecordid[0];
        ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                      ctrl.linkID +
                      '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        ctrl.itemMMSID = ctrl.parentCtrl.item.pnx.control.sourcerecordid[0];
      } else {
        ctrl.linkID = ctrl.parentCtrl.item.pnx.control.recordid[0];
        ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=' + 
                        ctrl.linkID +
                        '&context=PC&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        ctrl.itemMMSID = 'n/a';
      };

      if (undefined != ctrl.parentCtrl.item.pnx.display.title) {
        ctrl.itemTitle = ctrl.parentCtrl.item.pnx.display.title[0];
      } else if (undefined != ctrl.parentCtrl.item.pnx.addata.btitle) {
        ctrl.itemTitle = ctrl.parentCtrl.item.pnx.addata.btitle[0];
      } else if (undefined != ctrl.parentCtrl.item.pnx.addata.jtitle) {
        ctrl.itemTitle = ctrl.parentCtrl.item.pnx.addata.jtitle[0];
      } else if (undefined != ctrl.parentCtrl.item.pnx.addata.atitle) {
        ctrl.itemTitle = ctrl.parentCtrl.item.pnx.addata.atitle[0];
      } else {
        ctrl.itemTitle = 'PNX TITLE ERROR'
      };
    };


    //function for Report Button
    //show form, toggle submission and success flags off
    //unhide the submit confirm, ctrl is here in case someone double reports without refreshing
    //re-initializes the desc to an empty string in case of double report
    ctrl.showReportForm = function () {

      ctrl.showForm = true;
      ctrl.submitFlow = false;
      ctrl.submitted = false;
      ctrl.submitConf = false;
      ctrl.showFAQ = false;

    };

    // closing the form simple re-initializes everything (for now)
    ctrl.closeReportForm = function () {

      ctrl.$onInit();

    };

    ctrl.toggleFAQ = function () {

      ctrl.showFAQ = !ctrl.showFAQ
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
    ctrl.submitReport = function (valid, remail, rdesc) {

      ctrl.submitted = true;       

      if (valid) {

        ctrl.showForm = false;

        setTimeout(() => {

          let rmessage = {report: 
                            [{ 
                              title: ctrl.itemTitle, 
                              user: remail, 
                              desc: rdesc, 
                              url: ctrl.itemURL,
                              rurl: ctrl.rURL,
                              mmsid: ctrl.itemMMSID
                            }]
                          };

          let url = '<insert flow url>';

          $http.post(url, rmessage, {headers:{'Content-Type': 'application/json'}}).then(function successCallback(resp) {
            ctrl.submitSuccess = true;
          });
        }, 0);

        setTimeout(() => {
          ctrl.submitFlow = true;
        }, 150);

        setTimeout(() => {
          ctrl.submitFlow = false;
          ctrl.submitSuccess = false;
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

      <div id="bu-form-title" class="layout-align-center-center layout-row" ng-if="$ctrl.showForm">
        <label id="bu-title-label">Report Problem</label>
      </div>

      <!--Main Form Element-->
      <div id="bu-report-form" ng-if="$ctrl.showForm">

        <!-- FAQ -->
        <div id="bu-faq" class="layout-align-center-center layout-column" layout="column" layout-align="center center">
          <div id="bu-faq-wrap" class="layout-align-center-center layout-row" layout="row" layout-align="center center">

            <!-- Main Label -->
            <label id="bu-faq-label">Common Problems & Fixes</label>

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
                ng-if="!$ctrl.showFAQ">view</span>
              </div>
            </button>
          </div>

          <!-- FAQ text -->
          <div id="bu-faq-text" class="layout-align-center-center layout-row" layout="row" layout-align="center center"
            ng-show="$ctrl.showFAQ"> 
              <ul id="faq-list">
                <li><b>1. The link is giving an error message.</b></li>

                <li>Solution: Retry the link through a new incognito/private window in your preferred browser, or retry the link in another browser 
                (<a href="https://support.google.com/chrome/answer/95464?hl=en&co=GENIE.Platform%3DDesktop" target="_blank">Chrome</a>,
                <a href="https://support.apple.com/en-ca/guide/safari/ibrw1069/mac" target="_blank">Safari</a>,
                <a href="https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history" target="_blank">Firefox</a>).
                <br />  
                If that fixes the problem, consider clearing your browser cache to avoid this problem in the future.
                Instructions on how to clear your cache in 
                <a href="https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop" target="_blank">Chrome</a>,
                <a href="https://support.apple.com/en-ca/guide/safari/sfri47acf5d6/mac" target="_blank">Safari</a>,
                <a href="https://support.mozilla.org/en-US/kb/how-clear-firefox-cache" target="_blank">Firefox</a>.</li>
                <br />
                <li><b>2. The link should have gone to a journal article, but instead went to an unexpected page.</b></li>
                <li> Solution: Sometimes publishers don’t link directly to articles and instead direct you to the journal homepage first. 
                When this happens, use the search box on the journal homepage to search the title of the article.</li>
                <br />
                <li><b>3. I’ve found the item I need in Omni, but I don’t see options for access.</b></li>
                <li>Solution: First ensure you are signed into your Omni account, to see all options for requesting the item. Watch a brief 
                <a href="https://youtu.be/DJZd9vpaKHk" target="_blank">video </a> to learn more. If there is no option in Omni for either print or online access, you can  
                <a href="https://brocku.ca/library/interlibrary-loan/" target="_blank">request the item from another library</a>.</li> 
                <br />
                <li><b>Still have questions?</b>
                <li>Please fill in the form below. We’ll get back to you as soon as we can!</li>
              </ul>
          </div>
        </div>

        <hr id="bu-sep">

        <form name="mform" class="layout-align-center-center layout-column" novalidate>
          <div id="bu-form-items"> 

            <!--Description Label-->
            <div class="layout-align-left-center layout-row bu-label-wrap" layout="row" layout-align="left center">
              <label class="bu-label-text" name="descerror">What is the problem? </label>
            </div>

            <!--Description Field-->
            <div class="layout-align-center-center" layout="row" layout-align="center center">
              <textarea id="fdesc" name="fdesc" placeholder="Please provide as much detail as possible to help us understand how we might resolve the problem." 
              aria-label="Describe your problem" ng-model="rdesc" required></textarea>
            </div>

            <!--Invalid Text-->
            <div id="bu-description-flag" class="layout-align-center-center" layout="row" layout-align="center center"
            ng-if="mform.fdesc.$invalid && ($ctrl.submitted || mform.fdesc.$touched)">
              <div class="warning-bg">
                <prm-icon class="bu-special-text-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
              </div>
              <span class="bu-special-text" >description required</span>
            </div>

            <!--Email Label-->
            <div class="layout-align-left-center layout-row margin-top-medium bu-label-wrap" layout="row" layout-align="left center">
              <label class="bu-label-text" name="emailerror">Please provide your email address so we can follow up with you. </label>
            </div>

            <!--Email Field-->
            <div class="layout-align-center-center" layout="row" layout-align="center center">
              <input id="femail" autofill="false" name="email" type="email" placeholder="Eg. aa00bb@brocku.ca" aria-label="Enter your email" 
              ng-model="remail" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" required>
            </div>

            <!--Invalid Text-->
            <div id="bu-email-flag" class="layout-align-center-center" layout="row" layout-align="center center"
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

/* End BrockU Report a Problem ----------------------------------------------*/

/*CFDUX - Omni Improvement and Enhancements R. 1 */

/*Collapse the list of institutions on the full record. ---------------------*/

/* Collapse "Get It From Other Institutions" 
dropdown by default in full record display. */
app.component("prmAlmaOtherMembersAfter", {
  bindings: {
    parentCtrl: "<",
  },
  controller: [
    function () {
      var ctrl = this;

      ctrl.$onInit = function () {
        ctrl.parentCtrl.isCollapsed = true;
      }
    },
  ],
}); 

/*----------------------------------------------------------------------------*/

/* Item Location Filter -----------------------------------------------------*/

  //Auto activates the filter for items in full display
  //written on 2/4/20 by Joe Ferguson from the University of Tennessee, Knoxville
  app.component('prmLocationItemsAfter', {
    bindings: {parentCtrl: '<'},
    controller: function($scope){
      var myVar = setInterval(activateFilter, 1000);
      function activateFilter() {
        if( $("span:contains('Filters')").length ){
          clearInterval(myVar);
          return;
        }
        if( $("[id^='filter']").length ){
          $("[id^='filter']").parent().click()
        }
      }
    }
  });

/* End Item Location Filter -------------------------------------------------*/
})();