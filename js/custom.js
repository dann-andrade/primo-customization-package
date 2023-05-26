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

      let url = 'https://prod-08.westus.logic.azure.com:443/workflows/3ed6fdd6a8244ce5a9c5ae17c826b922/triggers/manual/paths/invoke?api-version=2016-06-01\&sp=%2Ftriggers%2Fmanual%2Frun\&sv=1.0\&sig=pVAZN1cylBIHAjq42Z8tu7okyHlD88Duff-gnfGF-7U';

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
      "isbn": "9781773630366",
      "mmsid": "991009415524405152",
      "title": "Sick and tired: health and safety inequalities"
    },
    {
      "isbn": "0369103858",
      "mmsid": "991009416423005152",
      "title": "Bluebirds"
    },
    {
      "isbn": "0369103734",
      "mmsid": "991009416423105152",
      "title": "Is my microphone on?"
    },
    {
      "isbn": "0369103386",
      "mmsid": "991009416423205152",
      "title": "Every day she rose"
    },
    {
      "isbn": "0369103416",
      "mmsid": "991009416423305152",
      "title": "Let's run away : four stories and a message for the world written in response to an unpublished memoir"
    },
    {
      "isbn": "0369103637",
      "mmsid": "991009416423405152",
      "title": "Blow wind"
    },
    {
      "isbn": "0369103505",
      "mmsid": "991009416423505152",
      "title": "Women of the fur trade"
    },
    {
      "isbn": "0369103572",
      "mmsid": "991009416423605152",
      "title": "Public enemy"
    },
    {
      "isbn": "0369103548",
      "mmsid": "991009416423705152",
      "title": "Lady sunrise"
    },
    {
      "isbn": "0369103475",
      "mmsid": "991009416423805152",
      "title": "Everybody just c@lm the f#ck down"
    },
    {
      "isbn": "036910157X",
      "mmsid": "991009416423905152",
      "title": "Forget me not"
    },
    {
      "isbn": "9781773635545",
      "mmsid": "991009416424005152",
      "title": "Country of poxes : three germs and the taking of territory"
    },
    {
      "isbn": "1773635522",
      "mmsid": "991009416424105152",
      "title": "Abolitionist intimacies"
    },
    {
      "isbn": "9781773635613",
      "mmsid": "991009416424205152",
      "title": "Solidarity beyond bars : unionizing prison labour"
    },
    {
      "isbn": "3110275686",
      "mmsid": "991009089272105152",
      "title": "Methods in contemporary linguistics"
    },
    {
      "isbn": "311046408X",
      "mmsid": "991009090584005152",
      "title": "Public History and School : International Perspectives"
    },
    {
      "isbn": "3110461285",
      "mmsid": "991009091193105152",
      "title": "Coolies of capitalism : Assam tea and the making of Coolie labour"
    },
    {
      "isbn": "348698960X",
      "mmsid": "991009093667805152",
      "title": "Auf dem Weg zur Normalit\u00e4t : Konflikt und Verst\u00e4ndigung in den deutsch-franz\u00f6sischen Beziehungen der 1970er Jahre"
    },
    {
      "isbn": "3110478129",
      "mmsid": "991009096192605152",
      "title": "Katechismus-Andachten (1656)"
    },
    {
      "isbn": "3110579170",
      "mmsid": "991009097033905152",
      "title": "The Civilising Offensive : Social and educational reform in 19th century Belgium"
    },
    {
      "isbn": "3110579200",
      "mmsid": "991009098808705152",
      "title": "Victimhood and acknowledgment : the other side of terrorism"
    },
    {
      "isbn": "3110518015",
      "mmsid": "991009099102505152",
      "title": "Jeux de mots et cr\u00e9ativit\u00e9 : Langue(s), discours et litt\u00e9rature"
    },
    {
      "isbn": "3110322501",
      "mmsid": "991009100798105152",
      "title": "Johanssonian investigations essays in honour of Ingvar Johansson on his seventieth birthday"
    },
    {
      "isbn": "3110610477",
      "mmsid": "991009102807905152",
      "title": "Global histories of work"
    },
    {
      "isbn": "3110262444",
      "mmsid": "991009103625605152",
      "title": "Our Neighbours, Ourselves : Contemporary Reflections on Survival"
    },
    {
      "isbn": "3662488477",
      "mmsid": "991009240251705152",
      "title": "Autonomous Driving Technical, Legal and Social Aspects"
    },
    {
      "isbn": "3110541572",
      "mmsid": "991009240799405152",
      "title": "Manuscripts and Archives : Comparative Views on Record-Keeping"
    },
    {
      "isbn": "3110350548",
      "mmsid": "991009240808905152",
      "title": "150 Jahre deutsche Verwaltungsgerichtsbarkeit : Vortrag, gehalten vor der Juristischen Gesellschaft zu Berlin am 9. Oktober 2013 im OVG Berlin-Brandenburg"
    },
    {
      "isbn": "1283166240",
      "mmsid": "991009240945405152",
      "title": "Heinrich Heine - ein deutscher Europ\u00e4er im franz\u00f6sischen Exil : Vortrag, gehalten vor der Juristischen Gesellschaft zu Berlin am 9. Dezember 2009"
    },
    {
      "isbn": "1283629232",
      "mmsid": "991009240964805152",
      "title": "Grundrechtsschutz zwischen Karlsruhe und Stra\u00dfburg : Vortrag, gehalten vor der Juristischen Gesellschaft zu Berlin am 13. Juli 2011"
    },
    {
      "isbn": "3110397315",
      "mmsid": "991009241244205152",
      "title": "Inszenierte Moderne : Popul\u00e4res Theater in Berlin und London, 1880-1930"
    },
    {
      "isbn": "3110341387",
      "mmsid": "991009241253105152",
      "title": "Zukunftsgestaltung durch \u00d6ffentliches Recht : Referate und Diskussionen auf der Tagung der Vereinigung der Deutschen Staatsrechtslehrer in Greifswald vom 2. bis 5. Oktober 2013"
    },
    {
      "isbn": "3110216949",
      "mmsid": "991009241269305152",
      "title": "Von Kant zu Schelling : Die beiden Wege des Deutschen Idealismus"
    },
    {
      "isbn": "3110466643",
      "mmsid": "991009241305605152",
      "title": "Okkultismus im Geha\u0308use : Institutionalisierungen der Parapsychologie im 20. Jahrhundert im internationalen Vergleich"
    },
    {
      "isbn": "311040785X",
      "mmsid": "991009241334405152",
      "title": "Menschen z\u00e4hlen : Wissensproduktion durch britische Volksz\u00e4hlungen und Umfragen vom 19. Jahrhundert bis ins digitale Zeitalter"
    },
    {
      "isbn": "3110424711",
      "mmsid": "991009241346905152",
      "title": "50 Jahre Aktiengesetz"
    },
    {
      "isbn": "311043346X",
      "mmsid": "991009241366105152",
      "title": "Brauchen wir ein drittes Geschlecht? : Reformbedarf im deutschen (Familien-)Recht nach Einf\u00fchrung des \u00a7 22 Abs. 3 PStG"
    },
    {
      "isbn": "3110466961",
      "mmsid": "991009241412305152",
      "title": "Genre und Gemeinsinn : Hollywood zwischen Krieg und Demokratie"
    },
    {
      "isbn": "3110479435",
      "mmsid": "991009241441205152",
      "title": "Der Prozess Jesu- aus ro\u0308misch-rechtlicher Perspektive"
    },
    {
      "isbn": "3110435217",
      "mmsid": "991009241446205152",
      "title": "Verfassung als Ordnungskonzept : Berichte und Diskussionen auf der Tagung der Vereinigung der Deutschen Staatsrechtslehrer in Speyer vom 7.-10. Oktober 2015"
    },
    {
      "isbn": "3110405555",
      "mmsid": "991009241447405152",
      "title": "Monastische Kultur als transkonfessionelles Ph\u00e4nomen : Beitr\u00e4ge einer deutsch-russischen interdisziplin\u00e4ren Tagung in Vladimir und Suzdal\u2019"
    },
    {
      "isbn": "3110399474",
      "mmsid": "991009241473105152",
      "title": "Von der D\u00e4monologie zum Unbewussten : Die Transformation der Anthropologie um 1800"
    },
    {
      "isbn": "1283430282",
      "mmsid": "991009241488905152",
      "title": "Figuren des Messianischen in Schriften deutsch-j\u00fcdischer Intellektueller 1900-1933"
    },
    {
      "isbn": "3110431149",
      "mmsid": "991009241707905152",
      "title": "NICHTS NEUES SCHAFFEN : Perspektiven auf die treue Kopie 1300-1900"
    },
    {
      "isbn": "3110579758",
      "mmsid": "991009241729805152",
      "title": "Disruption in the Arts : Textual, Visual, and Performative Strategies for Analyzing Societal Self-Descriptions"
    },
    {
      "isbn": "3110543893",
      "mmsid": "991009241763705152",
      "title": "Kant on love"
    },
    {
      "isbn": "3110620359",
      "mmsid": "991009241829605152",
      "title": "Nietzsche, Religion, and Mood"
    },
    {
      "isbn": "3110424703",
      "mmsid": "991009241898805152",
      "title": "Handbook the global history of work"
    },
    {
      "isbn": "3110575590",
      "mmsid": "991009241925905152",
      "title": "Studies on Greek and Coptic Majuscule Scripts and Books"
    },
    {
      "isbn": "3110645629",
      "mmsid": "991009241955005152",
      "title": "Infrastrukturen"
    }]
    
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
          if ((window.location.href.startsWith("http://10.20.124.65:8003/discovery/search?vid=01OCUL_BU:BU_TEST_DAN")) 
              && (window.location.href.indexOf("&mode=advanced") == -1)) {        
            getBooks();
          } else {
            $ctrl.showDisplay = false;
          };
      };

      // Load books from data file if not already loaded. If there is a problem hide the feature. 
      function getBooks() {
          // if(newbooks.length == 0 ) {
          //     $http.get('http://rtod.library.brocku.ca:8080/data/gtitles.json'
          //     ).then(
          //         function successCallback(data) {
          //             newbooks = data.data;
          //             loadBooks(19);
					// 	          findWidth();
          //         },
          //         function errorCallback(data){
          //             $ctrl.showDisplay = false;
          //             console.log(data);
          //         } 
          //     );
          // } else {
          //   setTimeout(() =>  {
          //     loadBooks(19);
          //     findWidth();
          //   }, 10);
          // };
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

