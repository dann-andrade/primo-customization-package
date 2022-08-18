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

            let url = '<insert flow url>';
            
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

  /******************* BrockU New Titles ***************************/

  //Initialize main array outside controller so data persists when element is destroyed by ng-if
  var books = new Array();
  
  app.controller('prmSearchBarAfterController', ['$http',
    function ($http) {

      //Init variables and display array
      var self = this;
      var screenWidth = 0;
      var scrollSpeed = 0;
      var loadCursor = 0;
      var contentWidth = 0;
      var scrollMultiplier = 0;
      self.display = [];
      
      //Initialization function
      //Displays feature and calls getBooks function to populate carousel if URL is main Omni page
      //Otherwise hides feature
      self.$onInit = function () {
          self.showDisplay = true;

          if (window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN")) {        
              self.getBooks();
          } else {
              self.showDisplay = false;
          };
      };

      //If global array is empty, makes http request to pull json and updates array if the request is successful
      //If request fails, hide feature
      //Then calculate width and use it to dynamically populate display array. 
      //If global array is full, skip request and just update array.
      self.getBooks = function () {
          if(books.length == 0 ) {
              $http.get('http://rtod.library.brocku.ca:8080/gtitles.json'
              ).then(
                  function successCallback(data) {
                      books = data.data;
                      self.findWidth();
                      self.nextBooks(~~(screenWidth/150) * 2);
                  },
                  function errorCallback(data){
                      self.showDisplay = false;
                  } 
              );
          } else {
            setTimeout(() =>  {
              self.findWidth();
              self.nextBooks(~~(screenWidth/150) * 2);
            }, 10);
          };
      };

      //Incrementally calculates total collective width of valid covers
      //Set scrolling container width to accomodate collective width
      self.showBook = function(img){
          contentWidth += img.offsetWidth;
          document.getElementById('bu-nt-cont').style.width = contentWidth + "px"
      };

      // Scroll Left function
      // Simply scrolls left by dynamically generated amount
      self.scrollLeft = function () {
          document.getElementById('bu-nt-cwrap').scrollLeft -= scrollSpeed; 
      };

      //Scroll Right Function
      //Lazy loads next set of books unless all books have been loaded
      //Scrolls left by dynamically generated amount
      self.scrollRight = function () {
          if (loadCursor < books.length) {
              self.nextBooks((Math.ceil(~~(screenWidth/150)) * scrollMultiplier) + 2); 
          }

          document.getElementById('bu-nt-cwrap').scrollLeft += scrollSpeed;
      };

      
      //Obtain width of screen for scrolling calculations
      self.findWidth = function () {
          screenWidth = document.getElementById('bu-nt-cwrap').offsetWidth;

          if (screenWidth < 800) {
              scrollMultiplier =  0.9;
          } else {
              scrollMultiplier =  0.50;
          }

          scrollSpeed = screenWidth * scrollMultiplier;
      };

      //add books to display array (for lazy loading cover images)
      self.nextBooks = function (n) {
          var i = loadCursor;
          n = n + loadCursor;
          
              while (i <= n && loadCursor < books.length){
                  self.display[i] = books[i];
                  i++;
                  loadCursor++;
              }
      };

      //Screen Resize Event
      //Calls the find width function to update the 
      addEventListener('resize', (Event) => {
          self.findWidth();
      });

      //Custom location change event listener adopted from: 
      //https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
      //Question by: AJ00200 [https://stackoverflow.com/users/375569/aj00200]
      //Answer by: aljgom [https://stackoverflow.com/users/3577695/aljgom]
      (() => {
        let oldPushState = history.pushState;
        history.pushState = function pushState() {
            let ret = oldPushState.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        };
    
        let oldReplaceState = history.replaceState;
        history.replaceState = function replaceState() {
            let ret = oldReplaceState.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        };
    
        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('locationchange'));
        });
      })();

      //Removes feature if not on homepage 
      addEventListener('locationchange', function () {
        if (!window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN")) {        
          self.showDisplay = false;
        } else {
          self.showDisplay = true;
        };
      });
    }]
);

  app.component('prmSearchBarAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmSearchBarAfterController',
  template: `
  <div id="bu-new-titles" class="layout-align-center-center layout-row" layout="row" layout-align="center center" 
  ng-if="$ctrl.showDisplay">
    <div class="bu-nt-scroll bu-nt-scroll-right" 
    ng-click="$ctrl.scrollLeft()">
      <span class="bu-scroll-arrows unselectable">&#9001;</span>
    </div>
    <div id="bu-nt-cwrap">
      <div id="bu-nt-cont">
        <div class="bu-book" 
        ng-repeat="book in $ctrl.display track by $index">
          <a href="http://10.20.124.65:8003/discovery/fulldisplay?docid=alma{{book.mmsid}}&context=L&vid=01OCUL_BU:BU_TEST_DAN&lang=en">
            <img (load)="$ctrl.showBook($event.currentTarget)" src="https://syndetics.com/index.php?client=primo&isbn={{book.isbn}}/mc.jpg"></img>
          </a>
        </div> 
      </div>
    </div>   
    <div class="bu-nt-scroll" 
    ng-click="$ctrl.scrollRight()">
      <span class="bu-scroll-arrows unselectable">&#12297;</span>
    </div> 
  </div>
  `,
  });

  /******************* end - BrockU New Titles Display***************************/

})();

