let datajson;
let bufferjson;
let newjson=[];
let arrauthors = [];
let arrworks = [];

function preload(){
  let url ='./data.json';
  //讀取json，使用callback，確定讀完資料才執行
  datajson = loadJSON(url,(data)=>{
    bufferjson = datajson[2].data;//讀取資料部分存為bufferjson
    //對bufferjson中每一個物件定義為v
    bufferjson.forEach((v)=>{
      // 設定newjson格式
      let tv = {author:v.author_lastname,work:[v.work_id]}
      let inout = -1; // 預設newjson中同作者
      //第一個newjson中必是空的，所以先放一個物件
      if (newjson.length ==0){
        newjson.push(tv);
      }else{
        // 針對每一個newjson中的物件
        newjson.some((av,i)=>{
          //若有發現newjson中作者名重複
          if (i>0 && v.author_lastname == av.author){
            inout=i; // 找到那是第幾個物件
            tv.work = av.work.concat(v.work_id);
            // 因已找到重複作者 使用some中的return true跳出迴圈
            return true; 
          }
        });
          //若inout為-1表示newjson中沒有該作者
        if(inout<0){
          // 新增物件
          newjson.push(tv);
        }else{
          // 修正newjson中的既有物件
          newjson[inout]=tv;
        }       
      }
      
    });
    saveJSON(newjson, 'newdata.json');
  });
  
}

function setup() {
  createCanvas(2400, 1200);
  newjson.forEach((a)=>{
    arrauthors.push(new author(random(width),random(height),a.author,a.work));
  });
  
  arrauthors.forEach((a)=>{
    a.display();
  });
}

function draw() {
  //background(220);
  
}
class author{
  constructor(_x,_y,_name,_works){
    this.x=_x;
    this.y=_y;
    this.size=15;
    this.name=_name;
    this.works=this.genworks(_works);
  }
  genworks(wo){
    let ws = [];
      wo.forEach((w)=>{
        if (arrworks.length ==0){
          let wobj = new work(this.x+random(-50,50),this.y+random(-50,50),w);
          arrworks.push(wobj);
          ws.push(wobj);
        }else{
          let inaws = false;
          arrworks.some((aw)=>{
            if(aw.name==w){
              inaws = true;
            }
          });
          if (inaws == false){
            let wobj = new work(this.x+random(-200,200),this.y+random(-200,200),w);
            arrworks.push(wobj);
            ws.push(wobj);
          }
        }
      });
   return ws;
  }
  display(){
    noStroke();
    fill(0,255,0,100)
    circle(this.x,this.y,this.size);
    
    this.works.forEach((w)=>{
      stroke(0);
      line(this.x,this.y,w.x,w.y);
      w.display();
    });
    
  }
}
class work{
  constructor(_x,_y,_name){
    this.x=_x;
    this.y=_y;
    this.size=12;
    this.name=_name;
  }
  display(){
    noStroke();
    fill(255,0,0,100);
    circle(this.x,this.y,this.size);
  }
}