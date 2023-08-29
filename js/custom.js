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

  newbooks = [
    {
      "isbn": "0345808002",
      "mmsid": "991006627299705152",
      "title": "All my puny sorrows"
    },
    {
      "isbn": "0123819806",
      "mmsid": "991006835489705152",
      "title": "The vitamins"
    },
    {
      "isbn": "9781550461428",
      "mmsid": "991009439025605152",
      "title": "Soldiers of the king : the Upper Canadian militia, 1812-1815 : a reference guide"
    },
    {
      "isbn": "0143192957",
      "mmsid": "991009499925605152",
      "title": "Organized mind"
    },
    {
      "isbn": "1101147113",
      "mmsid": "991009500225505152",
      "title": "The brain that changes itself : stories of personal triumph from the frontiers of brain science"
    },
    {
      "isbn": "0231526695",
      "mmsid": "991009500225605152",
      "title": "The animal rights debate : abolition or regulation?"
    },
    {
      "isbn": "1788210360",
      "mmsid": "991009500282505152",
      "title": "Capitalism, socialism and property rights : why market socialism cannot substitute the market"
    },
    {
      "isbn": "1788210263",
      "mmsid": "991009500282705152",
      "title": "Populocracy : the tyranny of authenticity and the rise of populism"
    },
    {
      "isbn": "1911116347",
      "mmsid": "991009500282905152",
      "title": "Flawed capitalism : the Anglo-American condition and its resolution"
    },
    {
      "isbn": "1911116568",
      "mmsid": "991009500283405152",
      "title": "ANALYSING CORRUPTION : an introduction."
    },
    {
      "isbn": "1911116657",
      "mmsid": "991009500283605152",
      "title": "The political economy of Brexit"
    },
    {
      "isbn": "1788210131",
      "mmsid": "991009500283805152",
      "title": "The sex economy"
    },
    {
      "isbn": "1668466473",
      "mmsid": "991009500283905152",
      "title": "Cyber trafficking, threat behavior, and malicious activity monitoring for healthcare organizations"
    },
    {
      "isbn": "1668482258",
      "mmsid": "991009500284005152",
      "title": "Multidisciplinary approaches to sustainable human development"
    },
    {
      "isbn": "1668473100",
      "mmsid": "991009500284105152",
      "title": "Policies, protocols, and standards for professionalism in a diverse work environment"
    },
    {
      "isbn": "1668489449",
      "mmsid": "991009500284205152",
      "title": "HR analytics in an era of rapid automation"
    },
    {
      "isbn": "1668492741",
      "mmsid": "991009500284305152",
      "title": "Governance quality, fiscal policy, and the path to a low-carbon future : perspectives from developing economies"
    },
    {
      "isbn": "166848353X",
      "mmsid": "991009500284405152",
      "title": "The role of brands in an era of over-information"
    },
    {
      "isbn": "1668472449",
      "mmsid": "991009500284505152",
      "title": "Exploring niche tourism business models, marketing, and consumer experience"
    },
    {
      "isbn": "1668486261",
      "mmsid": "991009500284605152",
      "title": "Revolutionizing financial services and markets through fintech and blockchain"
    },
    {
      "isbn": "1668488841",
      "mmsid": "991009500284705152",
      "title": "Principles of financial control in the public sector"
    },
    {
      "isbn": "1788211340",
      "mmsid": "991009500421205152",
      "title": "The Federal Reserve and its founders : money politics and power"
    },
    {
      "isbn": "178821031X",
      "mmsid": "991009500421305152",
      "title": "Europe and Northern Ireland's future : negotiating Brexit's unique case"
    },
    {
      "isbn": "1911116126",
      "mmsid": "991009500421705152",
      "title": "The contradictions of capital in the twenty-first century : the Piketty opportunity"
    },
    {
      "isbn": "9781788211734",
      "mmsid": "991009500421805152",
      "title": "Alarums & excursions : improvising politics on the European stage"
    },
    {
      "isbn": "1911116843",
      "mmsid": "991009500421905152",
      "title": "The Doreen Massey reader"
    },
    {
      "isbn": "1793627134",
      "mmsid": "991009499925705152",
      "title": "Authenticity in the music of video games"
    },
    {
      "isbn": "051162476X",
      "mmsid": "991009500225705152",
      "title": "Kant and the claims of knowledge"
    },
    {
      "isbn": "9780520393196",
      "mmsid": "991009500287505152",
      "title": "Sounding the Indian Ocean: Musical Circulations in the Afro-Asiatic Seascape"
    },
    {
      "isbn": "0593542231",
      "mmsid": "991009500423605152",
      "title": "Look : how to pay attention in a distracted world"
    },
    {
      "isbn": "0306923319",
      "mmsid": "991009500423805152",
      "title": "Outrage machine : how tech is amplifying discontent, undermining democracy, and pushing us towards chaos"
    },
    {
      "isbn": "1685711383",
      "mmsid": "991009494371305152",
      "title": "Open Book in Ways of Water"
    },
    {
      "isbn": "1685710905",
      "mmsid": "991009494790605152",
      "title": "Tales"
    },
    {
      "isbn": "0525620796",
      "mmsid": "991009498625605152",
      "title": "Mexican Gothic"
    },
    {
      "isbn": "1455521329",
      "mmsid": "991009498725405152",
      "title": "Bless me, Ultima"
    },
    {
      "isbn": "029275762X",
      "mmsid": "991009498725705152",
      "title": "[Un]framing the \"bad woman\" : Sor Juana, Malinche, Coyolxauhqui, and other rebels with a cause"
    },
    {
      "isbn": "0345808002",
      "mmsid": "991006627299705152",
      "title": "All my puny sorrows"
    },
    {
      "isbn": "0123819806",
      "mmsid": "991006835489705152",
      "title": "The vitamins"
    },
    {
      "isbn": "9781550461428",
      "mmsid": "991009439025605152",
      "title": "Soldiers of the king : the Upper Canadian militia, 1812-1815 : a reference guide"
    },
    {
      "isbn": "1929572204",
      "mmsid": "991006590559705152",
      "title": "Beaded earrings : techniques & designs"
    },
    {
      "isbn": "9780774827225",
      "mmsid": "991006606769705152",
      "title": "\"Métis\" : race, recognition, and the struggle for indigenous peoplehood"
    },
    {
      "isbn": "9798544671213",
      "mmsid": "991009499023605152",
      "title": "Leather crafting book for beginners : introduction to leather crafting"
    },
    {
      "isbn": "0228011051",
      "mmsid": "991009499023805152",
      "title": "Atiqput : Inuit oral history and project naming"
    },
    {
      "isbn": "0735278865",
      "mmsid": "991009499023905152",
      "title": "Making love with the land : essays"
    },
    {
      "isbn": "1039000657",
      "mmsid": "991009499024005152",
      "title": "Rehearsals for living"
    },
    {
      "isbn": "0735277214",
      "mmsid": "991009499024105152",
      "title": "VenCo : a novel"
    },
    {
      "isbn": "0143192957",
      "mmsid": "991009499925605152",
      "title": "Organized mind"
    },
    {
      "isbn": "1101147113",
      "mmsid": "991009500225505152",
      "title": "The brain that changes itself : stories of personal triumph from the frontiers of brain science"
    },
    {
      "isbn": "0231526695",
      "mmsid": "991009500225605152",
      "title": "The animal rights debate : abolition or regulation?"
    },
    {
      "isbn": "1788210360",
      "mmsid": "991009500282505152",
      "title": "Capitalism, socialism and property rights : why market socialism cannot substitute the market"
    }
  ]
  
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
      //     if(newbooks.length == 0 ) {
      //         $http.get('https://library.brocku.ca/phpmyadmin/newtitles/gtitles.json'
      //         ).then(
      //             function successCallback(data) {
      //                 newbooks = data.data;
      //                 loadBooks(19);
			// 			          findWidth();
      //             },
      //             function errorCallback(data){
      //                 $ctrl.showDisplay = false;
      //                 console.log(data);
      //             } 
      //         );
      //     } else {
      //       setTimeout(() =>  {
      //         loadBooks(19);
      //         findWidth();
      //       }, 10);
      //     };
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
        scrollCont.scrollLeft = 0;
      }

      //Screen Resize Event
      //Calls the find width function to update the width
      addEventListener('resize', (Event) => {
        
        if ((window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN"))
             && (window.location.href.indexOf("&mode=advanced") == -1)) {        
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

        if (!window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN")) {        
          $ctrl.showDisplay = false;
        } else if (window.location.href.indexOf("&mode=advanced") != -1) {
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

