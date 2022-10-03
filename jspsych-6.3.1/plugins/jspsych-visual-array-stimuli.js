/**
 *
 * jspsych-occlusion-numerosity
 * Hui Men
 * University of Marburg
 * 08.11.2021
 *
 * Display two images containing different number of elements
 * 3 conditions are interleaved: 1) both sides are occluded 2) both sides are not occluded 3) half-half
 * 2 questions are asked after displaying the images 1) compare the numerosity 2) confidence
 *
 **/

jsPsych.plugins["visual-array-stimuli"] = (function() {

var plugin = {};

jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'target', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'foil', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'fixation_image', 'image');

plugin.info = {
  name: 'visual-array-stimuli',
  description: '',
  parameters: {
    set_size: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Set size1',
      default: undefined,
      description: 'How many items should be displayed?'
    },

    set_size_r: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Set size2',
      default: undefined,
      description: 'How many items should be displayed?'
    },

    target_size: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Target size',
      array: true,
      default: [60, 60],
      description: 'Two element array indicating the height and width of the search array element images.'
    },
    trial_duration: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Trial duration',
      default: 250,
      description: 'The maximum duration to wait for a response.'
    },
    stimuli_type: {
      type: jsPsych.plugins.parameterType.INT,
    //pretty_name: 'colrs',
    //default: ["blue", "green"],
    //description: 'The maximum duration to wait for a response.'
    },
    condition:{
      type: jsPsych.plugins.parameterType.INT,
    },
    occ_num: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Occlusion shape',
        default: 250,
        description: 'The maximum duration to wait for a response.'
      },
    real_trial:{
      type: jsPsych.plugins.parameterType.INT,
    },
  }
}


plugin.trial = function(display_element, trial) {


//// -------- DEFINE PAPER SIZE --------- ////
var paper_width = 410;
//var paper_size = paper_width * 1.3 ; 
var paper_size = 410;//paper_width;

//// --------- NUMBER OF STIMULI --------- ////
var number_stim = trial.set_size; 
var number_stim_r = trial.set_size_r;

/*
if (trial.real_trial == 0){
  var trialtype = "catch_trial";
}else if(trial.real_trial == 2){
  var trialtype = "partial_occlude_trial";
}elsef if(trial.real_trial == 1){
  var trialtype = "real_trial";
}*/
//// --------- FIX PAPER POSITION -------- ////

var bordersize = 0; 
var pos_paper_top = -39;  
var pos_paper_left = 0; 
var imagebetweengap = 0;



//// ------ DECIDE WHICH CASE [NO OCCULDE / BOTH OCCLUDE / HALF-HALF] ------ ////


var ppt = 0.3 + 0.02 * (trial.occ_num - 1);
//var numss = 0.3 + ppt.toFixed(2)  ;

var numss = ppt.toFixed(2);


if (trial.occ_num == 1){
   var numss = "0.30";
}else if (trial.occ_num == 2){
   var numss = "0.32";
}else if (trial.occ_num == 3){
   var numss = "0.34";
}else if (trial.occ_num == 4){
   var numss = "0.36";
}else if (trial.occ_num == 5){
   var numss = "0.38";
}else if (trial.occ_num == 6){
   var numss = "0.40";
}else if (trial.occ_num == 7){
   var numss = "0.42";
}else if (trial.occ_num == 8){
   var numss = "0.44";
}else if (trial.occ_num == 9){
   var numss = "0.46";
}else if (trial.occ_num == 10){
   var numss = "0.48";
}else if (trial.occ_num == 11){
   var numss = "0.50";
}else if (trial.occ_num == 12){
   var numss = "0.52";
}else if (trial.occ_num == 13){
   var numss = "0.54";
}else if (trial.occ_num == 14){
   var numss = "0.56";
}else if (trial.occ_num == 15){
   var numss = "0.58";
}else if (trial.occ_num == 16){
   var numss = "0.60";
}else if (trial.occ_num == 17){
   var numss = "0.62";
}else if (trial.occ_num == 18){
   var numss = "0.64";
}else if (trial.occ_num == 19){
   var numss = "0.66";
}else if (trial.occ_num == 20){
   var numss = "0.68";
}else if (trial.occ_num == 21){
   var numss = "0.70";
}
//var fnum = 0.3+numss;
//var stillim = "star_" + numss + "_" + trial.set_size;
var stillim = "star_" + numss + "_" + trial.set_size;
//var stillim = "star_0.36_6";

      //var stillim = "star_0.3_6";
  


/////// ---------- FIX POSITIONS OF TWO IMAGES ---------- //////

  var pos_leftpaper_top =  0  ;  
  var pos_leftpaper_left = 0 ;//+ paper_width * 0.5 + imagebetweengap;

  var pos_rightpaper_top = 0 ; 
  var pos_rightpaper_left = 0;//- paper_width * 0.5 - imagebetweengap; 

  var maskwidth = paper_width - 2 * bordersize;
  var maskheight = paper_size - 1.5 * bordersize;


///*************************************************************************///
///*************************************************************************///
///*************************************************************************///

var circlemat = [];

var s = 10; // length of the stripe

const start = 0;
const end = 400;
const step = 20;
const arrayLength = Math.floor(((end - start) / step)) + 1;
const x0 = [...Array(arrayLength).keys()].map(x => (x * step) + start)  ;

const start_sub = -10;
const end_sub = 10;
const step_sub = 1;
const arrayLength_sub = Math.floor(((end_sub - start_sub) / step_sub)) + 1;
//const x00 = [...Array(arrayLength_sub).keys()].map(x => (x * step_sub) + start_sub) ;
var x00= [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1,2,3,4,5,6,7,8,9,10];

var strip_num = arrayLength;

var r_large = Math.floor(x00.length/2) ;
var r_small =  0.7* r_large;
var r_occluder = 0.5 * r_small;
//var radius = r_small;



var circlemat = [];
for(let i = 0; i < strip_num; i++) {
    circlemat[i] = [];
    for(let j = 0; j < strip_num; j++) {
        circlemat[i][j] = 0.5;
    }
}
var contn = -1;
var cont_l = 0;
var cont_s = 0;
//for (var i = 0; i<strip_num ; i++){
//  for (var j =0 ; j<strip_num ; j++){
for (var i = 0; i<strip_num; i++){
  for (var j =0 ; j<strip_num; j++){
    contn = contn + 1;
  //  var ii = i * 20 +1; jj = j*20 + 1;
    if ( (Math.sqrt(x00[i]**2 + x00[j]**2) < r_large)&&(Math.sqrt(x00[i]**2 + x00[j]**2) >= r_small)){ // outside circle
      circlemat[contn] = 1;
      cont_l = cont_l + 1;
     // circlemat[i][j] = 0;
    }else if(Math.sqrt(x00[i]**2 + x00[j]**2) < r_small){ // inner circle
      circlemat[contn] = 2;
      cont_s = cont_s + 1;
     // circlemat[i][j] = 1;
    }else{
      circlemat[contn] = 0;
     // circlemat[i][j] = 0.5;
    }
  }
}


var stddev = 0.5;
var mean_l = 0.5;
var mean_s = -0.5;

var list_large=[];
for(var n = 0; n<cont_l; n++){
    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    //const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    list_large.push(z0 * stddev + mean_l)
}

var list_small=[];
for(var n = 0; n<cont_s; n++){
    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    //const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    list_small.push(z0 * stddev + mean_s)
}

/*
var circlemat =  [0,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,
0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,
0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,
0,  0,  0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,  0,
0,  0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,
0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  0,
0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,
0,  0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,
0,  0,  0,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,  0,
0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,
0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,
0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,
0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0];
*/
                

///*************************************************************************///
///***********************NO OCCLUSION PART END*****************************///
///*************************************************************************///

 
display_element.innerHTML += '<div id="jspsych-visual-search-circle-container" style= "position: relative; width:' + paper_width + 'px; height:' + paper_size + 'px; top:'+ pos_paper_top + 'px; left:' + pos_paper_left + 'px;"></div>';
 
var paper = display_element.querySelector("#jspsych-visual-search-circle-container");




///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--DISPLAY-**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////

show_search_array();

function show_search_array() {




    
      /*paper.innerHTML = '<div class = "backleft">\
      <img class = "imageleft" src="img/'+ stillim + '.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
          </div>';
    */



var rand_large = jsPsych.randomization.sampleWithoutReplacement(list_large,list_large.length) ;
var rand_small = jsPsych.randomization.sampleWithoutReplacement(list_small,list_small.length) ;

         /* paper.innerHTML = '<div class = "backleft">\
          <img class = "imageleft" src="img/test.gif" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
              </div>';*/

              var s = 10; // length of the stripe
              var num_lines = 10;


              var lines = '';
              var cont = -1;
              var cont_l = -1;
              var cont_s = -1;
              //for (var i = 1 ; i<=x0.length;  i += Math.round(s*Math.sqrt(2))){
              //  for (var j = 1 ; j<=x0.length;  j += Math.round(s*Math.sqrt(2))){ 
              for (var i = 0 ; i<strip_num;  i++){
                for (var j = 0 ; j<strip_num;  j++){  
                  // cont = i * 20;
                  cont = cont +1;               
                  var xx1 = x0[i];
                  var yy1 = x0[j];   
                  // if ( (Math.sqrt(xx1^2 + yy1^2) <= r_large)&&(Math.sqrt(xx1^2 + yy1^2) > r_small)){
                 
                  if (circlemat[cont] == 1){
                     cont_l = cont_l+1;
                  //if ( circlemat[i][j] == 1){
                     var p = rand_large[cont_l];//-0.5;//Math.random(); // slope, randomly taken from a distribution
                     var xx2 = xx1 + s/Math.sqrt(p**2 + 1);
                     var yy2 = yy1 + (s*p)/Math.sqrt(p**2 + 1);
                     var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(255,0,0);stroke-width:2" />';
                  }else if (circlemat[cont] == 2){
                     cont_s = cont_s + 1;
                     var p = rand_small[cont_s];//0.5;//Math.random() -1; // slope, randomly taken from a distribution
                     var xx2 = xx1 + s/Math.sqrt(p**2 + 1);
                     var yy2 = yy1 + (s*p)/Math.sqrt(p**2 + 1);
                     var lines = lines +  '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,255,0);stroke-width:2" />';
                  }
                   else if (circlemat[cont]== 0.5){
                     var p = -0.9;//Math.random() -1; // slope, randomly taken from a distribution
                     var xx2 = xx1 + s/Math.sqrt(p**2 + 1);
                     var yy2 = yy1 + (s*p)/Math.sqrt(p**2 + 1);
                     var lines = lines +  '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(255,255,0);stroke-width:2" />';
                  } 
                }
              }
            
              

       /*   paper.innerHTML = '<div class = "backleft">\
            <svg height="210" width="500">\
            <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />\
            <line x1="100" y1="100" x2="300" y2="200" style="stroke:rgb(255,255,0);stroke-width:2" />\
          </svg>\
          </div>'; */

          paper.innerHTML = '<div class = "backleft">\
            <svg height="500" width="500">\
            '+lines+'\
          \
  <defs>\
    <filter id="blur-out">\
      <feDropShadow dx="0" dy="0" stdDeviation="4.5"\
          flood-color="black"/>\
\
    </filter>\
  </defs>\
  <circle cx="204" cy="200" r="70" fill = "cyan" filter= "url(#blur-out)"/>\
</svg>\
          </div>';

      /*    paper.innerHTML = '<div class = "backleft">\<svg height="100" width="100">\
      <circle cx="50" cy="50" r="40" stroke="blue" stroke-width="5" stroke-dasharray="3" fill="transparent" /></svg>\
    </div>';
*/
//The x1 attribute defines the start of the line on the x-axis
//The y1 attribute defines the start of the line on the y-axis
//The x2 attribute defines the end of the line on the x-axis
//The y2 attribute defines the end of the line on the y-axis

//<img class = "clip-svg2" src="img/woodwithgrid2.png" style = "--mask_posleft:'+ masright + 'px; --mask_postop: '+ mastop +'px; width:'+ maskwidth +'px; height:' + maskheight + 'px;"><svg width="0" height="0"><svg width="0" height="0"><defs><clipPath id="myClip2">'+ clippos +'</clipPath></defs></svg>\

    var start_time = Date.now();

  
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        clear_display();
        end_trial();
      }, trial.trial_duration);
    }


    function clear_display() {
        display_element.innerHTML = '';
      }
    }


    function end_trial() {
      jsPsych.pluginAPI.clearAllTimeouts();

      // data saving

        var trial_data = {
        set_size: trial.set_size,//trial.set_size,
        vis_area: trial.occ_num,
        vis_proportion: numss,
        //set_size_r: number_stim_r,//trial.set_size_r,
      //  trialtype: trial.real_trial, //trialtype,
       // display_type: disord,
       // locations_l: [display_locs_x,display_locs_y] ,
       // locations_r: [display_locs_r_x,display_locs_r_y],
       // colours_l: to_present,
       // colours_r: to_present_r
       };

      // go to next trial
      jsPsych.finishTrial(trial_data);
    }
  };

  // helper function for determining stimulus locations

  function cosd(num) {
    return Math.cos(num / 180 * Math.PI);
  }

  function sind(num) {
    return Math.sin(num / 180 * Math.PI);
  }

  return plugin;
})();
