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

  /******************* BrockU New Titles ***************************/

  // Declare full books array outside the controller is the array is not destroyed 
  // with the component by ng-if
  var newbooks = new Array();
  
  app.controller('prmSearchBarAfterController', ['$http', '$scope', 
    function ($http, $scope) {

      const $ctrl = this;
      var screenWidth = 0;      
      var loadCursor = 0;
      var dispCursor = 0;    
      var scrollWidth = 0;
      
      var mouseDown = false;
      var startX = 0;
      var endX = 0;

      $ctrl.display = [];

      // On feature initialization, set scroll position to 0 and check if the user is 
      // on the front page of Omni, if not hide the feature. 
      $ctrl.$onInit = function () {
          $ctrl.showDisplay = true;
          setTimeout(() =>  {  
            document.getElementById('bu-outer-carousel').scrollLeft = 0;
          },0 );
          if ((window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_NEW_TITLES")) 
              && (window.location.href.indexOf("&mode=advanced") == -1)) {        
            getBooks();
          } else {
            $ctrl.showDisplay = false;
          };
      };

      //Load books from data file if not already loaded. If there is a problem hide the feature. 
      function getBooks() {
          if(newbooks.length == 0 ) {
              $http.get('http://rtod.library.brocku.ca:8080/data/gtitles.json'
              ).then(
                  function successCallback(data) {
                      newbooks = data.data;
                      loadBooks(19);
						          findWidth();
                  },
                  function errorCallback(data){
                      $ctrl.showDisplay = false;
                      console.log(data);
                  } 
              );
          } else {
            setTimeout(() =>  {
              loadBooks(19);
              findWidth();
            }, 10);
          };
          loadBooks(19);
          findWidth();
      };

      // Main book load function, loads n books from full books array into display array so the items 
      // can be lazy loaded. If we hit the end of the full array, wrap around for infinite scroll. 
      function loadBooks(n) {
        let i = 1;
        while (i <= n && loadCursor < newbooks.length) {
          $ctrl.display[dispCursor] = newbooks[loadCursor]
          i++;
          loadCursor++;
          dispCursor++;
          if (loadCursor == newbooks.length) {
            loadCursor = 0;
          }
        }
      };

      // Retrieve viewport width, dynamically sets scroll distance
      function findWidth() {
        screenWidth = document.body.offsetWidth;
        scrollWidth = (screenWidth > 500) ? 500 : screenWidth;
        $ctrl.showDisplay = (screenWidth >= 700) ? true : false;
      };

      // Adds space to inner carousel container to make room for new items
      function setWidth(w) {
        let innerCont = document.getElementById('bu-inner-carousel');
        innerCont.style.width = String(innerCont.offsetWidth + w) + "px";
      }

      // Scrolls left
      $ctrl.scrollLeft = function () {
        document.getElementById('bu-outer-carousel').scrollLeft -= scrollWidth; 
      };

      // Scrolls left, extends if near the end of loaded covers
      $ctrl.scrollRight = function () {
        let scrollCont = document.getElementById('bu-outer-carousel');
        let innerCont = document.getElementById('bu-inner-carousel');
        if ( scrollCont.scrollLeft + screenWidth >= innerCont.offsetWidth - 1000) {
          loadBooks(8);
          setTimeout(() => {
            setWidth(1000);
          }, 0);
        };
        scrollCont.scrollLeft += scrollWidth;
      };

      $ctrl.viewAll = function() {
        window.location.href = 'https://ocul-bu.primo.exlibrisgroup.com/discovery/search?query=any,contains,%3F%3F&tab=New_Titles&search_scope=New_Books&vid=01OCUL_BU:BU_DEFAULT&lang=en&offset=0';
      };

      $ctrl.toStart = function() {
        let scrollCont = document.getElementById('bu-outer-carousel');
        scrollCont.scrollLeft = 0;
      }

      //Screen Resize Event
      //Calls the find width function to update the width
      addEventListener('resize', (Event) => {
        
        if (((window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_NEW_TITLES"))
             && (window.location.href.indexOf("&mode=advanced") == -1))
             && newbooks.length != 0) {        
          findWidth();
        } else {
          $ctrl.showDisplay = false;
        };
        
        $scope.$apply();

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

        if ((!window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_NEW_TITLES"))         
            || (window.location.href.indexOf("&mode=advanced")) != -1) {
          $ctrl.showDisplay = false;
        } else {
          $ctrl.showDisplay = true;
        };
      });

    }]
);

  app.component('prmSearchBarAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmSearchBarAfterController',
  templateUrl: 'custom/BU_DEFAULT/html/newtitles.html',
  });

  /******************* end - BrockU New Titles Display***************************/

})();

