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

  /******************* BrockU New Titles ***************************/

  app.controller('prmSearchBarAfterController', ['$scope', '$http',
  function ($scope, $http) {

      var self = this;
      var screenWidth = 0;
      var scrollSpeed = 0;
      var loadCursor = 0;
      var contentWidth = 0;
      var scrollMultiplier = 0;

      self.books = [
        {
          "isbn": "1551112000",
          "mmsid": "991002992389705152"
        },
        {
          "isbn": "1915070872",
          "mmsid": "991009351620905152"
        },
        {
          "isbn": "0199533989;",
          "mmsid": "991009351621105152"
        },
        {
          "isbn": "0367682060",
          "mmsid": "991009351621405152"
        },
        {
          "isbn": "1492598925",
          "mmsid": "991009351623005152"
        },
        {
          "isbn": "1492594229",
          "mmsid": "991009351623405152"
        },
        {
          "isbn": "1718200307",
          "mmsid": "991009351623505152"
        },
        {
          "isbn": "1492598496",
          "mmsid": "991009351623605152"
        },
        {
          "isbn": "abc",
          "mmsid": "991009351721505162"
        },
        {
          "isbn": "1718202997",
          "mmsid": "991009351624405152"
        },
        {
          "isbn": "1718201729",
          "mmsid": "991009351624505152"
        },
        {
          "isbn": "9783030418113",
          "mmsid": "991009351624605152"
        },
        {
          "isbn": "abc",
          "mmsid": "991009351721505162"
        },
        {
          "isbn": "9780367761714",
          "mmsid": "991009351624705152"
        },
        {
          "isbn": "1524635340",
          "mmsid": "991009351720105152"
        },
        {
          "isbn": "9781849171694",
          "mmsid": "991009351720205152"
        },
        {
          "isbn": "1771135689",
          "mmsid": "991009351721505152"
        },
        {
          "isbn": "abc",
          "mmsid": "991009351721505162"
        },
        {
          "isbn": "1554815371",
          "mmsid": "991009351722005152"
        },
        {
          "isbn": "9781645036616",
          "mmsid": "991009351722705152"
        },
        {
          "isbn": "1433170329",
          "mmsid": "991009351723505152"
        },
        {
          "isbn": "9783837655841",
          "mmsid": "991009351724505152"
        },
        {
          "isbn": "1642597406",
          "mmsid": "991009355723005152"
        },
        {
          "isbn": "1119684234",
          "mmsid": "991009355723805152"
        },
        {
          "isbn": "0136746918",
          "mmsid": "991009359323605152"
        },
        {
          "isbn": "1987819675",
          "mmsid": "991009359325305152"
        },
        {
          "isbn": "0374538980",
          "mmsid": "991009376883705152"
        },
        {
          "isbn": "1737208334",
          "mmsid": "991009376883805152"
        },
        {
          "isbn": "0593197143",
          "mmsid": "991009376883905152"
        },
        {
          "isbn": "1953295592",
          "mmsid": "991009376884005152"
        },
        {
          "isbn": "9780316461245",
          "mmsid": "991009376884105152"
        },
        {
          "isbn": "1602234221",
          "mmsid": "991009376884205152"
        },
        {
          "isbn": "164445064X",
          "mmsid": "991009376884305152"
        }
      ];

      self.display = [];
      
      self.$onInit = function () {

        // show display only on the main page of Omni
        if (window.location.href != 'http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN'){
          self.showDisplay = false;
        } else {
          self.showDisplay = true;
        }

        //find viewport width, and then load twice as many books as is needed to fill it
        setTimeout(() => {
          self.findWidth();
          self.nextBooks(~~(screenWidth/150) * 2);
        }, 0);
      };

      
      //Hides books with inadequate or non-existent covers
      //Incrementally calculates total collective width of valid covers
      //Set scrolling container width to accomodate collective width
      self.showBook = function(img){

        img.parentElement.style.display = 'initial';

        if (img.offsetWidth < 100) {
          img.parentElement.style.display = 'none';
        } else {
          contentWidth += img.offsetWidth;
          document.getElementById('bu-nt-cont').style.width = contentWidth + "px";
        }
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

        if (loadCursor < self.books.length) {
          
          //increment books by quotient of screenwidth/avg bookheight x dynamic scroll multiplier, + a buffer of 2 books
          self.nextBooks((Math.ceil(~~(screenWidth/150)) * scrollMultiplier) + 2); 
        }

        document.getElementById('bu-nt-cwrap').scrollLeft += scrollSpeed;

      }

      //Screen Resize Event
      //Calls the find width function to update the 
      addEventListener('resize', (Event) => {
        self.findWidth();
      });

      //obtain width of screen for scrolling calculations
      self.findWidth = function () {

        screenWidth = document.getElementById('bu-nt-cwrap').offsetWidth;

        if (screenWidth < 800) {
          scrollMultiplier =  0.9;
        } else {
          scrollMultiplier =  0.50;
        }

        scrollSpeed = screenWidth * scrollMultiplier;

      }

      //add books to display array (for lazy loading cover images)
      self.nextBooks = function (n) {
        var i = loadCursor;
        n = n + loadCursor;
        
        while (i <= n && loadCursor < self.books.length){
          self.display[i] = self.books[i];
          i++;
          loadCursor++;
        }
      }
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