
const canvas = document.getElementById("Game_Canvas");
const ctx = canvas.getContext("2d");



let score=0;
//점수 초기화
let Game_Alive=false;


let Notes=[]; //노트들 넣고 빼고 할 배열 만들어주기 
var audio = new Audio("MUSIC_FILE.mp3"); //음악 파일 가져오기
audio.load(); //음악 로드
audio.volume = 0.5;//음악 볼륨 정하기 

//var Click = new Audio("pop.mp3");
//Click.load(); 안씀 
//Click.volume = 1;

//판정선 이미지 가져오기 
var Judgeimg = new Image();
    Judgeimg.src="Judge.png";

function DrawJudge()//판정선 그리기 
{
    
    ctx.beginPath(); // Start a new path
    ctx.strokeStyle = "white";
    ctx.lineWidth="5";
    ctx.moveTo(canvas.width/2, 0); // Move the pen to (30, 50)
    ctx.lineTo(canvas.width/2, 400); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path
    ctx.drawImage(Judgeimg, 0, 130,canvas.width, 6);
}


//노트 분홍색 가져오기 
var img = new Image();
img.src="note.png";


var img_=new Image();
img_.src="note_.png";

//노트 클래스 
class Note{
    constructor(NoteType){
    this.NoteX=40;//x=0
    this.NoteY=0; //100px가 중앙임 
    this.NoteSpeed=1;//떨어지는 속도=10
    this.NoteType=NoteType;//f랑j

    this.NoteW=225;
    this.NoteH=7;//가로:50ㅔㅌ ㅔ솔 25px

    this.alive=false; //오브젝트 끔 

 
    }

    Update() //노트.업데이트로 노트의 위치를 업데이트해준다 
    {
    this.NoteY+=this.NoteSpeed; //속도만큼 Y좌표 바꿔주기
    this.Draw();//그리기 함수 호출 

    if(this.NoteY>=canvas.height)
    {
        
 
            console.log("MISS")//캔버스 아래로 내려가면 미스남 
        document.getElementsByClassName("JUDGE")[0].innerHTML="MISS";//판정 가져와서 미스로 글자 바꾸기 
        

        this.DelNote(); // 이 노트 삭제하기 
    }

    }

    Draw()
    {
        //ctx
        ctx.drawImage(img, this.NoteX, this.NoteY, this.NoteW, this.NoteH); //나 그리기 
    }

    DelNote() //이노트 삭제하기 
    {

        Notes.splice(0, 1); //notes배열의 0번째(가장아래)1개를 없앤다
        delete(this);//나를 없앤다 
    }


}


class Note_{ //파랑 노트임 
    constructor(NoteType){
    this.NoteX=40;//x=0
    this.NoteY=0; //100px가 중앙임 
    this.NoteSpeed=1;//떨어지는 속도=10
    this.NoteType=NoteType;//f랑j

    this.NoteW=225;
    this.NoteH=7;//가로:50ㅔㅌ ㅔ솔 25px

    this.alive=false; //오브젝트 끔 

 
    }

    Update()
    {
    this.NoteY+=this.NoteSpeed; //속도만큼 Y좌표 바꿔주기
    this.Draw();//그리기 함수 호출 

    if(this.NoteY>=canvas.height)
    {

            console.log("MISS")
        document.getElementsByClassName("JUDGE")[0].innerHTML="MISS";
        
        
        this.DelNote();
        
    }

    }

    Draw()
    {
        //ctx
        ctx.drawImage(img_, this.NoteX, this.NoteY, this.NoteW, this.NoteH);
    }

    DelNote()
    {



        Notes.splice(0, 1);
        delete(this);
  
        
    }


}

function SpawnNote(typeofNote) //노트 소환하기 
{
//f와 j는 색이 다른거임 
    if(typeofNote=="f")
    {let NewNote=new Note(typeofNote);
    Notes.push(NewNote);}
    else if (typeofNote=="j")
    {
        let NewNote=new Note_(typeofNote);
    Notes.push(NewNote); //notes배열에 푸쉬해서 넣어준다 
    }
}





//배열에서 삭제->딜리트 노트 

let NoteTime = 352;
//let HalfNoteTime=176;
//let QuatNoteTime=25;
let Game_NoteTimer=0;
//...

let round =0; //표시용 
let i=-2; //내려오는 속도 맞춰주려고 i -2한걸 표준으로.. 

function Update()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    DrawJudge();
    //판정선그리기

    Game_NoteTimer++
    for(let j=0;j<Notes.length;j++)
    {
        let NowNote=Notes[j];
        NowNote.Update();
       // if(NowNote.NoteY==130)
      //  console.log(Game_NoteTimer+"판정")
        
    }//판정선위에 노트(그리기)


    //노트 업데이트 
    
    if(Game_NoteTimer>=QuatNoteTime&&i!=420)
    {
    //console.log(i);
    i++;
 

    if(i<64-4)
    {
        round=0;
        if((i-4)%8==0)
        SpawnNote("f");
        else if((i-4)%4==0)
        SpawnNote("j");
        
    }
    else if(i<130-4)
    {
//채보 돌려막기 
        round=1;
        One(i)
        
    }
    else if(i<196-4)
    {
        round=2;
        Two(i)
        
    }
    else if(i<250)
    {
        round=3;
        Three(i)
    }
    else if(i<320)
    {
        round=1
        One(i)
    }
    else if(i<386)
    {
        round=1
        One(i)
    }
   /* else if (i<450)
    {
        round=4
        Four(i);
    }
    /*else if(i<515)
    {
        round=5
        Five(i)
    }
    else if(i<580)
    {
        round=3;
        Three(i)
    }
    else if(i<652)
    {
        round=1
    }
    else if(i<708)
    {
        round=1
    }*/
    else round=0;
    
    console.log(round)

    Game_NoteTimer=0;
    }

    document.getElementById("score").innerHTML=score
    
    if(i!=420)
    requestAnimationFrame(Update);
    else 
    {
        console.log("GameEnd");
        GameEnd();
       // SpawnNote("j"); 안되는 것 확인

    }
}

function GameEnd()
{
//종료 
    let Final = document.createElement("h1");
    let RetryB= document.createElement("button");
    RetryB.classList.add("retry");
    RetryB.innerText="Retry?"
    RetryB.onclick=
    function Refresh()
    {
        location.reload();
    }
    
    let Pa = document.getElementsByClassName("Game_View")[0];
    Pa.insertBefore(RetryB, document.getElementById("Game_Canvas"));

    Pa.insertBefore(Final, document.getElementById("Game_Canvas"));

    document.getElementById("Game_Canvas").remove();
    document.getElementsByClassName("JUDGE")[0].remove();
    Final.innerHTML = "SCORE : "+score;
    
}

let forcount=0;

function One(i)
{
if(i<130)
    forcount=i-60;
else if(i<320)
    forcount=i-255;
else if (i<392)
    forcount=i-320;

   // console.log(forcount)

    if(forcount<3|| (forcount>5&&forcount<15) || (forcount>=15&&forcount<20)||(forcount>22&&forcount<32)|| (forcount>= 33&&forcount<36)||(forcount>38&&forcount<52)
    ||(forcount>54&&forcount<58))
    {   if(i%2==0)
        SpawnNote("f")
        else SpawnNote("j")
    }
    else if (forcount==3||forcount==20||forcount==36||forcount==52||forcount==58||forcount==61||forcount==64)
    {
        SpawnNote("j")
    }



}
function Two(i)
{
    if(i<196)
   { forcount=i-126;
   }
   // console.log(forcount)


    switch (forcount)
    {
        case 1:
        case 2:
        case 4:
        case 7:
        case 9:
        case 11:
        case 12:
        case 14:
        case 16:

        case 17:
        case 18:
        case 20:
        case 23:
        case 25:
        case 27:
        case 28:
        case 30:
        case 32:

        case 33:
        case 34:
        case 36:
        case 39:
        case 41:
        case 43:
        case 44:
        case 46:
        case 48:

        case 50:
        case 52:
        case 54: //up

        case 55://if
        case 56://you
        case 57://real
        case 58://ly
        case 59:
        case 61://that 
        case 63:

            if(forcount%3==0)
            SpawnNote("f");
        else SpawnNote("j");
        break;

        default:
        break;

    

}

}
function Three(i)
{
    if(i<257)
    {forcount=i-192}
    else if(i<580)
    forcount=i-515

    switch (forcount)
    {
        case 0:
        case 3:
        case 4:

        case 6:
        case 8:
        case 10:
        case 12:


        case 15:
        case 18:
        case 19:

        case 21:
        case 23:
        case 25:
        case 27:


        case 31:
        case 34:
        case 35:

        case 37:
        case 39:
        case 41:
        case 43:
        case 45:

        case 47://I
        case 49:
        case 51:
        case 53:

        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 61:
        if(forcount%2==0)
        SpawnNote("j");
        else SpawnNote("f");
            
        break;
    }

}




window.addEventListener("keydown", e => {
    //f랑 j키 눌렀을 때 판정학; 
    if (e.key=="f") 
    {
     console.log("f"+ " "+ i);
    Judgeimg.src="Judge_Pr.png"; //눌리면 판정선 이펙트(색 바꾸기) 
       // if()

       if(Notes[0].NoteY>=120&&Notes[0].NoteY<=140)
       {console.log("Perfect") //거리 재서 perfect good bad 작성 
       document.getElementsByClassName("JUDGE")[0].innerHTML="Perfect";
       score+=5;

       }
       else if(Notes[0].NoteY>=110&&Notes[0].NoteY<=150)
       {console.log("GOOD")
       document.getElementsByClassName("JUDGE")[0].innerHTML="GOOD";
       score+=2;

       }
       else if(Notes[0].NoteY>=100&&Notes[0].NoteY<canvas.height)
       {console.log("BAD")
       document.getElementsByClassName("JUDGE")[0].innerHTML="BAD";
       score+=1;
       }
       Notes[0].DelNote();
    }//j도 똑같이 


    else if(e.key=="j")
    {
       console.log("j"+ " "+ i);
        Judgeimg.src="Judge_Pr.png";
        if(Notes[0].NoteY>=120&&Notes[0].NoteY<=140)
        {console.log("Perfect")
        document.getElementsByClassName("JUDGE")[0].innerHTML="Perfect";
        score+=5;
        }
        else if(Notes[0].NoteY>=110&&Notes[0].NoteY<=150)
        {console.log("GOOD")
        document.getElementsByClassName("JUDGE")[0].innerHTML="GOOD";
        score+=2;
        }
        else if(Notes[0].NoteY>=100&&Notes[0].NoteY<=canvas.height)
        {("BAD")
        document.getElementsByClassName("JUDGE")[0].innerHTML="BAD";
        score+=1;
        }
        Notes[0].DelNote();
    }
});

window.addEventListener("keyup",e=>{
    if (e.key=="f") 
    Judgeimg.src="Judge.png";
else if (e.key=="j")
    Judgeimg.src="Judge.png";
})





function Game_Start()
{
DrawJudge();
document.getElementById("StartB").remove();

/*
let JudgeDoc=document.createElement("P");
let Pa=document.document.getElementsByClassName("Game_View");
Pa.insertBefore(JudgeDoc , document.getElementById("Game_Canvas")); 
JudgeDoc.innerHtml("Let's go!");
JudgeDoc.classList.add("JUDGE")
*/

let JudgeDoc = document.createElement("P");
JudgeDoc.innerHTML = "Let's go!";
JudgeDoc.classList.add("JUDGE");

let Pa = document.getElementsByClassName("Game_View")[0];
Pa.insertBefore(JudgeDoc, document.getElementById("Game_Canvas"));


//SpawnNote();
requestAnimationFrame(Update);

audio.play();
}


