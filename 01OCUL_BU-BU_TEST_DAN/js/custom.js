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

    //     <div class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">
    //         <span class="margin-right-small"></span>
    //         <button class="ug-report-button-full-display button-as-link button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme md-ink-ripple" type="button" aria-label="Report an Issue" ng-click="$ctrl.showReportForm()">
    //         <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>
    //         <span>Report an Issue</span>
    //         </button>
    //     </div>
    //     <div class="alert-panel ug-report-msg-div" ng-show="successMessagebool">
    //         <div class="alert-message">
    //             {{successMessage}}                
    //             <button class="md-button md-primoExplore-theme md-ink-ripple" type="button" ng-click="$ctrl.ok()"><span>DISMISS</span><div class="md-ripple-container"></div></button>
    //         </div>
    //     </div>          
    //   <div ng-if="$ctrl.showRPForm" class="send-actions-content-item report-problem-form-wrapper ug-report-issue-form-wrapper" layout="row">
    //         <md-content layout-wrap layout-padding layout-fill>
    //           <form name="$ctrl.reportForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.submitReport();">
    //             <div layout="row" class="layout-full-width" layout-align="center center">
    //               <div flex="10" flex-sm="5" hide-xs></div>
    //               <div class="form-focus service-form ug-report-issue-in-form-div" layout-padding flex>
    //                 <div layout-margin>
    //                   <div layout="column">
    //                     <h4 class="md-subhead">Report an Issue</h4>                                                             
    //                     <md-input-container id="ug-desc-container" ng-if="$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
    //                     <label>What is the issue? Please describe in detail:</label>
    //                     <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" ng-minlength="3"  /></textarea>                        
    //                   </md-input-container>
    //                     <md-input-container id="ug-desc-container" ng-if="!$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
    //                     <label>What is the issue? Please describe in detail:</label>
    //                     <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" required/></textarea>
    //                     <!--
    //                     ngMessages module doesn't seem to be fully supported within PrimoVE
    //                     so doing a workaround 
    //                     <div ng-messages="reportForm.description.$error" role="alert" ng-show="reportForm.description.$invalid && reportForm.description.$dirty">
    //                     -->
    //                     <div ng-messages="reportForm.description.$error" role="alert" aria-atomic="true">
    //                       <div ng-message-default>please enter your issue and describe in detail</div>
    //                       <br/>
    //                     </div>
    //                   </md-input-container>
    //                   <md-input-container class="ug-report-input-container underlined-input">
    //                     <label>Do you want us to follow up with you? Please enter your email address:</label>
    //                     <input ng-model="$ctrl.email" name="email" id="ugemail" type="text">
    //                   </md-input-container>                      
    //                 </div>
    //               </div>
    //             </div>
    //             <div flex="10" flex-sm="5" hide-xs></div>                
    //           </div>
    //           <div layout="row">
    //             <div layout="row" layout-align="center" layout-fill>
    //               <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Submit Report">
    //                 <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon>
    //                 <span translate="report"></span>
    //               </md-button>
    //             </div>
    //           </div>
    //         </form>
    //       </md-content>
    //     </div>  


    //    /********** START OF UG REPORT AN ISSUE *************/    
    //    app.component('prmActionListAfter', {                            
          
    //     bindings: {parentCtrl: `<`},
    //     controller: ['$location', '$httpParamSerializer', '$scope', '$http', '$sce', function ($location, $httpParamSerializer, $scope, $http, $sce) {  
    //         var _this = this;

    //         this.$onInit = function () {                
    //           //default form as hidden
    //           this.showRPForm = false;
    //           //use requireDesc to track required fields / error msg
    //           this.requireDesc = true;
    //         };
            
    //         this.showReportForm = function () {
    //           //if showing form, set focus to description
    //           _this.showRPForm = !_this.showRPForm;         
    //           this.requireDesc = true;

    //           if (_this.showRPForm) {                
    //             //must use the timeout to set the focus                
    //             setTimeout(() => {                  
    //               document.getElementById("ugdescription").focus();                  
    //             }, 0)                
    //           }
    //             return _this.showRPForm;
    //         };            
            
    //         this.setStatusCode = function (code) {
    //             return _this.statusCode = code;
    //         };            
            
    //         this.submitReport = function () {
    //           //in submit
    //           if (_this.validate()) {                
    //             var params = {                                                          
    //               'FROMOMNI': "True",
    //               'email': _this.email,
    //               'description': _this.description,
    //               'full_URL': $location.absUrl(),
    //               'URL_params': $location.search()
    //             };
                
    //             $http.post("https://app.lib.uoguelph.ca/omni/api/email-issue/", params).then(function (msg) {                                    
    //               _this.setStatusCode(200);
    //               $scope.successMessage = "Thanks for the feedback. We’re on it!";
    //               $scope.successMessagebool = true;                  
    //             }).catch(function (err) {                                                      
    //               $scope.successMessage = "We're sorry, your message didn't send. Please try again.";
    //               $scope.successMessagebool = true;
    //               console.log("Gone into reportForm catch from email post");
    //               _this.setStatusCode(500);                  
    //             }).finally(function () {                                    
    //               console.log("report issue email statusCode: "+String(_this.statusCode));
    //               //reset the form, clear vars
                  
    //               //clear the notification
    //               setTimeout(function() {
    //                 //reset after a certain amt of time                      
    //                 $scope.successMessagebool = false;
    //                 $scope.successMessage = "";
    //               }, 3000);

    //               //if a success, clear things
    //               if (_this.statusCode == 200) {                    
    //                 _this.description = _this.email = '';
    //                 _this.reportForm.$setPristine();
    //                 _this.reportForm.$setUntouched();                    
    //               }
    //               _this.showReportForm();                  
    //             });
    //           }
    //         };

    //         //validation for the report form is something must be entered in the description
    //         this.validate = function () {                              
    //           var result = false;              
    //           try {
    //             if (this.description.length > 0) {
    //               result = true;
    //               this.requireDesc = true;                                    
    //             }  
    //             else {                  
    //               this.requireDesc = false;                  
    //             }
    //           } catch (error) {
    //             this.requireDesc = false;
    //           }                                  
    //           return result;
    //         };
    //     }],    
    //     template: `
    
    //     `,
    // });         
    
    // /**********END OF UG REPORT AN ISSUE ***************/    

    
/******************* end - Adding Report a Problem link ***************************/


})();