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

    var $ctrl = this;

    //initialize form to hidden
    //initialize invalid flags to initially hide warning icons
    //initialize submission and success flags off
    //pull pnx data into scope variable
    // - Construct url and adds mmsid/recordid depending on what is available in pnx
    // - Adds title depending on material type 
    // - Initialize desc to empty string
    // - set submit confirm as default message until wording/email are approved by PWG
    $ctrl.$onInit = function () {  

      $ctrl.showForm = false;
      $ctrl.submitFlow = false;
      $ctrl.submitted = false;

      $ctrl.rURL = window.location.href;
    
      if (undefined != $ctrl.parentCtrl.item.pnx.display.mms) {
        $ctrl.linkID = $ctrl.parentCtrl.item.pnx.display.mms[0];
        $ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                      $ctrl.linkID +
                      '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        $ctrl.itemMMSID = $ctrl.parentCtrl.item.pnx.display.mms[0];
      } else if ((undefined != $ctrl.parentCtrl.item.pnx.display.source) && ($ctrl.parentCtrl.item.pnx.display.source == 'literatum:achs')) {
        $ctrl.linkID = $ctrl.parentCtrl.item.pnx.control.sourcerecordid[0];
        $ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma' + 
                      $ctrl.linkID +
                      '&context=L&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        $ctrl.itemMMSID = $ctrl.parentCtrl.item.pnx.control.sourcerecordid[0];
      } else {
        $ctrl.linkID = $ctrl.parentCtrl.item.pnx.control.recordid[0];
        $ctrl.itemURL = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=' + 
                        $ctrl.linkID +
                        '&context=PC&vid=01OCUL_BU:BU_DEFAULT&lang=en';
        $ctrl.itemMMSID = 'n/a';
      };

      if (undefined != $ctrl.parentCtrl.item.pnx.display.title) {
        $ctrl.itemTitle = $ctrl.parentCtrl.item.pnx.display.title[0];
      } else if (undefined != $ctrl.parentCtrl.item.pnx.addata.btitle) {
        $ctrl.itemTitle = $ctrl.parentCtrl.item.pnx.addata.btitle[0];
      } else if (undefined != $ctrl.parentCtrl.item.pnx.addata.jtitle) {
        $ctrl.itemTitle = $ctrl.parentCtrl.item.pnx.addata.jtitle[0];
      } else if (undefined != $ctrl.parentCtrl.item.pnx.addata.atitle) {
        $ctrl.itemTitle = $ctrl.parentCtrl.item.pnx.addata.atitle[0];
      } else {
        $ctrl.itemTitle = 'PNX TITLE ERROR'
      };
    };


    //function for Report Button
    //show form, toggle submission and success flags off
    //unhide the submit confirm, $ctrl is here in case someone double reports without refreshing
    //re-initializes the desc to an empty string in case of double report
    $ctrl.showReportForm = function () {

      $ctrl.showForm = true;
      $ctrl.submitFlow = false;
      $ctrl.submitConf = false;
      $ctrl.showFAQ = false;

    };

    // closing the form simple re-initializes everything (for now)
    $ctrl.closeReportForm = function () {

      $ctrl.$onInit();

    };

    $ctrl.toggleFAQ = function () {

      $ctrl.showFAQ = !$ctrl.showFAQ
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
    $ctrl.submitReport = function (valid, remail, rdesc) {

      if (valid) {

        let rmessage = {report: 
                          [{ 
                            title: $ctrl.itemTitle, 
                            user: remail, 
                            desc: rdesc, 
                            url: $ctrl.itemURL,
                            rurl: $ctrl.rURL,
                            mmsid: $ctrl.itemMMSID
                          }]
                        };

        let url = '<insert flow url>';

        $http.post(url, rmessage, {headers:{'Content-Type': 'application/json'}})
        .then(  
          function successCallback(response) {   
            $ctrl.submitSuccess = true;
          }, 
          function errorCallback(response){
            $ctrl.submitSuccess = false;
          })
        .then(
          function submitted(){
            setTimeout(() => {
              $ctrl.submitFlow = true;
              $scope.$apply();
            }, 20);
          });

      };
    };
  }]
);

app.component('prmActionContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionContainerAfterController',
  templateUrl: 'custom/BU_DEFAULT/html/reportproblem.html',
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