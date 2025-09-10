const timerDisplay=document.getElementById("timer");
const startBtn=document.getElementById("start");
const pauseBtn=document.getElementById("pause");
const resetBtn=document.getElementById("reset");
const tabs=document.querySelectorAll(".tab");

let workSessionCount=0;

let durations={//his object acts like a lookup table for how long each session should last.
    work:25*60, //25 min *60s= ...s
    short:5*60, 
    long:15*60,  
};//we are doing no of backcounting  in seconds then cov them to min and sec

//s1-curr tab / by deafault tab
let currentSession="work";//sets the default session to "work" when the app starts.
let timeLeft=durations[currentSession];//This initializes the timeLeft variable with the duration of the current session.
let timerInterval=null;//for setting interval and clearing interval 

//s2 - update timer display
function updateDisplay()
{
    let minutes=Math.floor(timeLeft/60);// let tl=125 min= 2 
    let seconds=timeLeft%60; //125%60=5s
    timerDisplay.textContent=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

//all three btns have lgpobal time left and global timeinterval 

//s3-start btn 
startBtn.addEventListener("click",()=>
{
  if(timerInterval) //if time interval is already set
  {
    return ;
  }
  //if it is null
  timerInterval=setInterval(//Starts a repeating function every 1000 milliseconds (1 second) using setInterval.
    ()=>
    {
        if(timeLeft>0)
        {   timeLeft--;
            updateDisplay();
        }
        else
        {   //no more time left - automatic clear interval wjen no more time is left but what if user press start btn many times each time new interval could have beeen created if (timeinterval ) was not written 
             
          clearInterval(timerInterval);
          timerInterval=null;

          //after 1 session automatic swtich to short brek and after 4 session switch to long breaks;   
          if(currentSession==="work")
          { workSessionCount++;
            if(workSessionCount%4===0)//div by 4 - long break
            { currentSession="long"; }
            else
            { currentSession="short";}
          }
          else//if not work 
          {
             currentSession="work";
          }
    }
  }
  ,1000)
}
);

//s4 -pause btn
pauseBtn.addEventListener("click",()=>
{  clearInterval(timerInterval);
   timerInterval=null;
}
);

//s5 -reset
resetBtn.addEventListener("click",()=>
{   clearInterval(timerInterval);
    timerInterval=null;
    timeLeft=durations[currentSession];
    updateDisplay();
}
);

//s6 -tabs switching
tabs.forEach(tab=>
{  tab.addEventListener("click",
   ()=>
  { tabs.forEach(t=>{ t.classList.remove("active") });//remove active classes from each tab
    tab.classList.add("active");//add active to tab which is clicked 

    currentSession=tab.getAttribute("data-session")||"work";//show the selected tab timer
    timeLeft=durations[currentSession];

    //clear any prev running time ionterval
    clearInterval(timerInterval);
    timerInterval=null;
    updateDisplay();
  }
);
  
}
)
//intial Display 
updateDisplay();