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

    app.controller('prmActionContainerAfterController', ['$http',
      function ($http) {

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
          self.validEmail = false;
          self.validDesc = false;
          self.submitFlow = false;
          self.submitted = false;
          self.noEmail = true;

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

          self.userDesc='';
          self.submitMessage = 'error  -  please contact liberm@brocku.ca';
          self.submitColor = '#cc0000';

        };


        //function for Report Button
        //show form, toggle submission and success flags off
        //unhide the submit confirm, self is here in case someone double reports without refreshing
        //re-initializes the desc to an empty string in case of double report
        self.showReportForm = function () {

          self.showForm = true;
          self.submitFlow = false;
          self.submitted = false;

          setTimeout(() => {
            document.getElementById('bu-submit-status').style.display = 'flex';
          },0);

          self.userDesc='';

        };

        // closing the form simple re-initializes everything (for now)
        self.closeReportForm = function () {

          self.$onInit();

        };

        //use regex to determine validDesc flag from desc input
        // - True if description contains some letters and false otherise
        //if true pass data to scope
        //if false set focus to field for input
        self.validateDesc = function(){

          let desc = document.getElementById("fdesc").value;

          self.validDesc = /^[\s\S]*(?!\s*$).+$/.test(desc);

          if (self.validDesc){
            setTimeout(() => {
              self.userDesc = desc;
            },0);
          } else {
            setTimeout(() => {
              document.getElementById('fdesc').focus();
            },0);
          };

        };

        //use regex to determine validEmail flag from pemail input
        // - True if description contains properly formatted email address
        //if field is empty adjust error message
        //if true pass data to scope
        //if false set focus to field for input
        self.validateEmail = function () {

          let pemail = document.getElementById("femail").value;
          
          self.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(pemail);

          self.emailError = "invalid email";

          if (pemail == ''){
            self.emailError = "email required";
          };

          if(self.validEmail){
            setTimeout(() => {
              self.userEmail = pemail;
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
        // - Hide submission status report
        self.submitReport = function () {

          self.submitted = true;
          
          self.validateEmail();
          self.validateDesc();

          if (self.validEmail && self.validDesc) {

            self.userDesc = document.getElementById("fdesc").value;
            self.showForm = false;

            setTimeout(() => {

              let rmessage = {report: 
                                [{ 
                                  title: self.itemTitle, 
                                  user: self.userEmail, 
                                  desc: self.userDesc, 
                                  url: self.itemURL,
                                  rurl: self.rURL,
                                  mmsid: self.itemMMSID
                                }]
                              };

              let url = 'https://prod-38.westus.logic.azure.com:443/workflows/8d36d7d4bd034615bb5cc1c3b0fee268/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nse5QpflC-OuYyGDeChf3lp2fU_WhODKi3xyAcSVZWI';
              
              $http.post(url, rmessage, {headers:{'Content-Type': 'application/json'}}).then(function successCallback(resp) {

                self.submitMessage = 'report submitted';
                self.submitColor = '#0f7d00';
                
              });

            }, 0);

            setTimeout(() => {
              self.submitFlow = true;
            }, 150);

            setTimeout(() => {
              document.getElementById('bu-submit-status').style.display = 'none';
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
          <button id="bu-report-button" class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-unselected" type="button" aria-label="Report problem" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
            <span class="bu-button-text">report problem</span>
          </button>
        </div>

        <!--Submission Confirmation Popup-->
        <div id="bu-submit-status" class="layout-align-center-center" style="color: {{$ctrl.submitColor}}; background-color: {{$ctrl.submitBGC}};" layout-row" layout="row" layout-align="center center" ng-show="$ctrl.submitFlow">
          <span class="bu-button-text">{{$ctrl.submitMessage}}</span>
        </div>

        <!--Main Form Element-->
        <div id="bu-report-form" ng-if="$ctrl.showForm">
          <form class="layout-align-center-center layout-column">
            <div id="bu-form-items"> 

              <!--Description Label-->
              <div class="layout-align-left-center" layout-row" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="descerror">What is the problem? </label>
                <span class="bu-special-text" ng-if="$ctrl.validDesc == false && $ctrl.submitted">description required</span>
              </div>

              <!--Description Field-->
              <div class="layout-align-center-center" layout-row" layout="row" layout-align="center center">
                <textarea id="fdesc" name="message" placeholder="Please provide as much detail as possible to help us understand how we might resolve the problem." (keyup)="$ctrl.validateDesc()" aria-label="Describe your problem"></textarea>
                  
                <!--Invalid Flag-->
                <div class="layout-align-center-center layout-row warning-bg" layout="column" layout-align="center center" ng-show="$ctrl.validDesc == false && $ctrl.submitted">   
                  <prm-icon class="warning-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="error"></prm-icon>
                </div>
              </div>

              <!--Email Label-->
              <div class="layout-align-left-center layout-row margin-top-medium" layout="row" layout-align="left center">
                <label style="font-family: Roboto,Helvetica Neue,sans-serif; margin: 5px 0 5px 10px;" name="emailerror">Please provide your email address so we can follow up with you. </label>
                <span class="bu-special-text" ng-show="$ctrl.validEmail == false && $ctrl.submitted">{{$ctrl.emailError}}</span>
              </div>

              <!--Email Field-->
              <div class="layout-align-center-center margin-bottom-small" layout-row" layout="row" layout-align="center center">
                <input id="femail" autofill="false" name="email" placeholder="Eg. aa00bb@brocku.ca" (keyup)="$ctrl.validateEmail()" aria-label="Enter your email">
                
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
   
  /******************* end - BrockU Report a Problem ***************************/

  /******************* BrockU A-Z List ***************************/

  app.controller('prmBackToLibrarySearchButtonAfterController', ['$scope',  
    function ($scope) {

      this.$onInit = function () {

        this.showAZList = false;

        setTimeout(() => {
 
          this.checkPage();

        },0);

      };


      this.checkPage = function () {

        let urlString = window.location.href;
        
        if (urlString.includes('dbsearch')) {
          if (urlString.includes('dbsearch?vid=01OCUL_BU:BU_TEST_DAN')) {
            setTimeout(() => {
              window.open('http://10.20.124.28:8003/discovery/dbsearch?query=any,contains,%3F%3F&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F','_self');
            }, 0);
          };

          setTimeout(() => {
            this.showAZList = true; 
            document.getElementById("facets").style.visibility = "hidden";
          },0);
        };
      };

      this.searchSub = function() {

        // let urlString = 'http://10.20.124.28:8003/discovery/dbsearch?query=any,contains,%3F%3F&facet=topic,include,';
        // urlString.concat($scope.sSubject); 
        // urlString.concat('&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F');

        console.log($scope.sSubject);

        //window.open('http://10.20.124.28:8003/discovery/dbsearch?query=any,contains,%3F%3F&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F','_self');


      };

    }]
  );

  app.component('prmBackToLibrarySearchButtonAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmBackToLibrarySearchButtonAfterController',
    template: `
    <div id="bu-azlist" class="layout-align-center-center layout-row" layout="row" layout-align="center center" ng-if="$ctrl.showAZList">

      <div id="azlist-main" class="layout-align-center-center layout-column" layout="column" layout-align="center center">

        <div id="azlist-top" class="layout-align-center-center layout-row" layout="row" layout-align="center center">  
          
          <div id="azlist-col-subject" class="azlist-col">
            <select class="azlist-fcontrol" name="azlist-subjects" id="azlist-subjects" aria-label="Select Subject" ng-model="sSubject" = ng-change="$ctrl.searchSub()">
              <option value="">All Subjects</option>
              <option value="132168">Accounting and Finance (26)</option>
              <option value="132153">Applied Disability Studies (25)</option>
              <option value="23160">Applied Health Sciences (9)</option>
              <option value="132160">Applied Linguistics (16)</option>
              <option value="132166">Biological Sciences (40)</option>
              <option value="23159">Business (29)</option>
              <option value="132130">Canadian Studies (19)</option>
              <option value="132164">Chemistry (62)</option>
              <option value="132133">Child and Youth Studies (20)</option>
              <option value="132137">Classics (18)</option>
              <option value="132171">Communication (11)</option>
              <option value="132151">Computer Science (10)</option>
              <option value="132154">Dramatic Arts (20)</option>
              <option value="132163">Earth Sciences (37)</option>
              <option value="132150">Economics (34)</option>
              <option value="23161">Education (20)</option>
              <option value="132139">English Language and Literature (41)</option>
              <option value="132149">Entrepreneurship (14)</option>
              <option value="132170">Film Studies (15)</option>
              <option value="132324">Game Design and Programming (2)</option>
              <option value="132162">Geography (28)</option>
              <option value="132757">Gerontology (10)</option>
              <option value="132181">Health Sciences (18)</option>
              <option value="132134">History (69)</option>
              <option value="132167">Indigenous Studies (16)</option>
              <option value="132142">Information Technology (6)</option>
              <option value="132175">Interdisciplinary Humanities (10)</option>
              <option value="132183">Kinesiology (11)</option>
              <option value="132161">Labour Studies (23)</option>
              <option value="132180">Legal Information (7)</option>
              <option value="132136">Liberal Arts (14)</option>
              <option value="132146">Management (12)</option>
              <option value="132145">Marketing (21)</option>
              <option value="132159">Mathematics and Statistics (35)</option>
              <option value="132176">Medieval and Renaissance Studies (18)</option>
              <option value="132174">Modern Languages, Literature and Cultures (25)</option>
              <option value="132152">Multidisciplinary (47)</option>
              <option value="132158">Music (18)</option>
              <option value="132173">Neuroscience (24)</option>
              <option value="136074">Niagara (10)</option>
              <option value="132179">Nursing (17)</option>
              <option value="132178">Occupational Health and Safety (8)</option>
              <option value="132144">Oenology and Viticulture (29)</option>
              <option value="132141">Operations Management (7)</option>
              <option value="132147">Organizational Behavior and Human Resources (16)</option>
              <option value="132157">Philosophy (9)</option>
              <option value="132156">Physics (59)</option>
              <option value="132155">Political Science (37)</option>
              <option value="132129">Popular Culture (15)</option>
              <option value="130791">Psychology (26)</option>
              <option value="132182">Recreation and Leisure Studies (9)</option>
              <option value="132132">Sociology (28)</option>
              <option value="132143">Sport Management (9)</option>
              <option value="132148">Tourism Studies (27)</option>
              <option value="132128">Visual Arts (22)</option>
              <option value="132135">Women's and Gender Studies (19)</option>
            </select> 
          </div>

          <div id="azlist-col-type" class="azlist-col">
            <select class="azlist-fcontrol name="azlist-types" id="azlist-types" aria-label="Select Type">
              <option value="all">All Database Types</option>
              <option value="alumni">Alumni (188)</option>
              <option value="biography">Biography (3)</option>
              <option value="news">News (26)</option>
              <option value="openaccess">Open Access (120)</option>
              <option value="primarysources">Primary Sources (35)</option>
              <option value="references">References (11)</option>
              <option value="statisticsanddata">Statistics and Data (23)</option>
              <option value="streamingvideo">Streaming Video (12)</option>
            </select> 
          </div>

          <div id="azlist-col-search" class="azlist-col layout-align-center-center layout-row" layout="row" layout-align="center center">
            <input type="text" id="azlist-search" placeholder="Search for Databases">
            <button id="azlist-go-btn" type="button" aria-label="Submit for Search Results">
              <span>Go</span>
            </button>
          </div>

        </div>

        <div id="azlist-bottom" class="layout-align-center-center layout-row" layout="row" layout-align="center center">

          <div id="azlist-alpha" class="layout-align-center-center layout-row" layout="row" layout-align="center center">
        <button type="button" class="azlist-btn-alpha" id="azlist-btn-all" aria-label="Search for All"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=any,contains,%3F%3F&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">All</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-a" aria-label="Search for A"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,A&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">A</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-b" aria-label="Search for B"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,B&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">B</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-c" aria-label="Search for C"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,C&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">C</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-d" aria-label="Search for D"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,D&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">D</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-e" aria-label="Search for E"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,E&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">E</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-f" aria-label="Search for F"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,F&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">F</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-g" aria-label="Search for G"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,G&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">G</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-h" aria-label="Search for H"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,H&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">H</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-i" aria-label="Search for I"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,I&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">I</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-j" aria-label="Search for J"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,J&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">J</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-k" aria-label="Search for K"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,K&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">K</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-l" aria-label="Search for L"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,L&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">L</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-m" aria-label="Search for M"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,M&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">M</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-n" aria-label="Search for N"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,N&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">N</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-o" aria-label="Search for O"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,O&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">O</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-p" aria-label="Search for P"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,P&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">P</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-q" aria-label="Search for Q"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,Q&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">Q</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-r" aria-label="Search for R"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,R&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">R</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-s" aria-label="Search for S"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,S&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">S</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-t" aria-label="Search for T"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,T&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">T</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-u" aria-label="Search for U"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,U&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">U</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-v" aria-label="Search for V"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,V&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">V</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-w" aria-label="Search for W"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,W&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">W</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-x" aria-label="Search for X"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,X&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">X</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-y" aria-label="Search for Y"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,Y&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">Y</a></button>
            <button type="button" class="azlist-btn-alpha" id="azlist-btn-z" aria-label="Search for Z"><a href="http://10.20.124.28:8003/discovery/dbsearch?query=title,begins_with,Z&sortby=title&tab=jsearch_slot&vid=01OCUL_BU:BU_TEST_DAN&offset=0&databases=any,%3F%3F">Z</a></button>
          </div>
        
        </div>
      </div>
    </div>
    `,
  });

  /******************* END BrockU A-Z List ***************************/

})();