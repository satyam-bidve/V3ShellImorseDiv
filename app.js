const ovelvalues = [];   
const corevalues = [];
const ovelX = [];
const ovelY = [];
const coreX = [];
const coreY = [];
//------------------------------------------------------------------------------------ BESIC VALUES
const intersections = [];  // SHELL CIRCUMFERANCE CO-ORDINATES / MY BE LETTER AREA  
let coreCount = 0;      // hOW MANY CORE USER CREATED 
let maxWidthCore = 0;    // cORE SHELL FIT LOGIC TOTAL MAX WIDTH IS TAKING BY ALL CORES
let maxHeightCore = 0;  // cORE SHELL FIT LOGIC TOTAL MAX HEIGHT IS TAKING BY ALL CORES
let foundOvelX = 0;   // FOUNDED VALUES OF FINAL SHELL WIDTH
let foundOvelY = 0;   // FOUNDED VALUES OF FINAL SHELL hEIGHT
let major = 0;         // FOUNDED VALUES OF FINAL SHELL MAJOR LENGTH AXIS
let minor = 0;         // FOUNDED VALUES OF FINAL SHELL MINOR LENGTH AXIS

//-------------------------------------------------------------------------------------------lOGICAL vALUES







//################################################################################### start of $Doc.ready
$(document).ready(function(){
     //$(document).on('dblclick', '.draggable', rotateMe);
     // lets change ovels shape here user value 
     // access that ovel div -> change css property width and height
     // take care of array index to match correctly with ovel x and y values :)
     // getting values x -y  from the number input for creating shell
    $("#btngetVal").click(function(){ 

    
      var box = document.getElementById("showOvels");
      var htmlString = ""
       for(var i = 1 ; i <= 6 ; i++){
           htmlString = `
                    <div class="oval" id="ovel${i}" style = "width :${$(`#ox${i}`).val()}; height :${$(`#oy${i}`).val()};"></div>
                  
                  `
                      box.innerHTML += htmlString;
                      ovelvalues.push($(`#ox${i}`).val());
                      ovelX.push($(`#ox${i}`).val());
                      ovelvalues.push($(`#oy${i}`).val());
                      ovelX.push($(`#oy${i}`).val());
                      
       };
       $("#pBar").css({"width": "30%"});
    
  })

   

    
    

  
  
// here we get the user value of how many core he wants
// Function to create table dynamically so that we get all cores diamention
 $("#btnGetCoreCount").click(function(){
  coreCount = $("#getCoreCount").val()
    var table = document.getElementById("DynamicTable");
     for(var i = 1 ; i <= coreCount ; i++){
        var row = `
                    <tr>
                    <td>core ${i}</td>
                    <td><input type="number" id="cx${i}"></td>
                    <td><input type="number" id="cy${i}"></td>
                    </tr>
                    `
            table.innerHTML += row;
     }
    })
    // step 2 - creating core from user input diamensions
    // now need to make this dynamic
    // function to display the created cores with given diamension
    $("#btnCreateCore").click(function(){
        var box = document.getElementById("coreBox");
        var htmlString = ""
         for(var i = 1 ; i <= coreCount ; i++){
             htmlString = `
                      <div class="core" id="core${i}" style = "width :${$(`#cx${i}`).val()}; height :${$(`#cy${i}`).val()};"></div>
                    
                    `
                        box.innerHTML += htmlString;
                        corevalues.push($(`#cx${i}`).val());
                        coreX.push($(`#cx${i}`).val());
                        corevalues.push($(`#cy${i}`).val());
                        coreY.push($(`#cy${i}`).val());
                        
         };
         $("#pBar").css({"width": "60%"});
        
        })


      

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@_Main Logic_@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   // STEP 3  on click find max area all cores - fit to the ovel --
   $("#btnfindOvel").click(function(){
    // Here we will find the max length - and width X -Y in cores sums 
    // check if the max width (sum of x) of cores is less than the width of leasr ovel 
    // same goes with height

    // sum of x core and y 
    maxWidthCore = coreX.reduce((partialSum, a) => Number(partialSum) + Number(a), 0);
    maxHeightCore = coreY.reduce((partialSum, a) => Number(partialSum)+ Number(a), 0);
    //console.log(maxWidthCore);
    //console.log(maxHeightCore);
    
    // now check the ovel which have more x than maxWidthCore && more Y than maxHeightCore
    let found = false; // to break the loop at required point
     for(let i = 0 ; i < ovelvalues.length ; i+=2){
        //console.log(ovelvalues[i]);  <- here we get the values of width 
        //console.log(ovelvalues[i]);
        for(let j = 1 ; j < ovelvalues.length ;j +=2){
            if(ovelvalues[i] > maxWidthCore && ovelvalues[j] > maxHeightCore){
                 // make to sure that all cores are place  in a row horizontal or verticl it shoud fit ** page 832 problem
                 //console.log(ovelvalues[j]);
                if(ovelvalues[i] > maxHeightCore && ovelvalues[j] > maxWidthCore){  
                    foundOvelX = ovelvalues[i] ;  // rx -ry radius to width and height make it half
                    foundOvelY = ovelvalues[j] ;
                    found = true;
                   // console.log(ovelvalues[i] + " and "+ ovelvalues[j]);
                    
                    major  = foundOvelX > foundOvelY ? foundOvelX : foundOvelY > foundOvelX ? foundOvelY : 0; // in case to find eclkips equation corners 
                    minor = foundOvelX < foundOvelY ? foundOvelX : foundOvelY < foundOvelX ? foundOvelY : 0;  // use in minor asix as a limot for resizing core
                    break;
                }

            }
           
        }
        if(found) {
          break; // Exit the outer loop if the condition was met
      }
     }
     // if no shell is there tofit requred core
     if(foundOvelX == 0 && foundOvelY == 0){
        alert("No shell found here to fit all cores");
        location.reload(); // clear everything
     }
    
    // if shell found then change shell diamensions of found one
    $("#ellipse").css({"width":foundOvelX , "height":foundOvelY}) //<- change the eclips diamention here 
      //console.log(foundOvelX + " - "+ foundOvelY);

   
     $("#pBar").css({"width": "100%"});
   });
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


   // on click we create the  of cores  dynamically inside of shell  
  $("#btnCreateCoreSVG").click(function() {

   
    
    for (var i = 1; i <= coreCount; i++) {  // positioning problem 
      createBox(i);
    }
   
   
     

   function createBox(i) {
    var box = document.createElement('div');
    box.className = 'box';
    box.dataset.id = i;
   
   //box.style.zIndex = `var(--zi-${i})`;
    box.style.width = `${$(`#cx${i}`).val()}px`; // Assuming #cx${i} is an input field for width
    box.style.height = `${$(`#cy${i}`).val()}px`; // Assuming #cy${i} is an input field for height
    box.style.backgroundColor = `var(--bg-1)`;

    initializeBox(box);

    // Append the new box to the container
    document.getElementById('ellipse').appendChild(box);
   }
    
});


                    







function initializeBox(box) {



  $(function() {
    // Make the box draggable, resizable, and rotatable
    var shouldBeResizable = shouldBoxBeResizable(box);
   $(box).draggable({
    containment: "parent" // This ensures the box stays within its parent
  });/*.resizable({
   // disabled:!shouldBeResizable, // Set to true if not resizable, false if resizable
    handles: "n, e, s, w,ne, se, sw, nw"
  });*/

  function shouldBoxBeResizable(box) {
    return parseInt(box.dataset.id) % 2!== 0; // Example logic
  }
   
  
  var params = {
    start: function(event, ui) {
       // console.log("Rotating started")
       console.log(box.dataset.id);
    },
    rotate: function(event, ui) {
        if (Math.abs(ui.angle.current > 6)) {
          console.log("Rotating " + ui.angle.current);
        }
    },
    stop: function(event, ui) {
        console.log("Rotating stopped");
    },
};
   $(box).rotatable(params);
    $(box).resizable({
      
       handles: "n, e, s, w, ne, se, sw, nw"
     });



 
  });
 

 
}








  



  
});
//################################################################################### End of $Doc.ready



