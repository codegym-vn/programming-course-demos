// META {"module":3,"lesson":"Giới thiệu về Kế thừa","activity":"Mối quan hệ 'is-a' và lớp cha, lớp con","title":"Quan hệ is-a","lead":"Dog là một Animal, nhưng Animal chưa chắc là Dog. Bấm <b>Bước tiếp</b> để chạy từng phép kiểm tra is.","tabs":[["x","Các phép kiểm tra is"]]}
var PAR={Dog:'Animal',Cat:'Animal',Animal:null};
function isA(t,target){while(t){if(t===target)return true;t=PAR[t];}return false;}
function UM(from,hit){
 var up=[];
 if(hit){var t=from;while(PAR[t]){up.push(t);t=PAR[t];}}
 function hasLink(n){return up.indexOf(n)>=0?1:0;}
 return {boxes:[
  {id:'A',name:'Animal',c:0,r:0,hi:hit&&from?1:0},
  {id:'D',name:'Dog',c:0,r:1,hi:from==='Dog'?1:0},
  {id:'C',name:'Cat',c:1,r:1,hi:from==='Cat'?1:0}],
  links:[{a:'D',b:'A',type:'inherit',hi:hasLink('Dog')},{a:'C',b:'A',type:'inherit',hi:hasLink('Cat')}]};
}
var EX = {x:{inputs:[],
 intro:'Dog và Cat đều kế thừa Animal. Xem mỗi phép kiểm tra is cho kết quả gì. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Animal { }','class Dog : Animal { }','class Cat : Animal { }','',
  'Dog dog = new Dog();','Animal animal = new Animal();','Cat cat = new Cat();',
  'Console.WriteLine(dog is Animal);','Console.WriteLine(dog is Dog);','Console.WriteLine(animal is Dog);','Console.WriteLine(cat is Dog);'];},
 run:function(c){
  var V=[['dog','→ Dog#1'],['animal','→ Animal#2'],['cat','→ Cat#3']];
  function OB(hi){return [O('Dog#1',[],{hi:hi===0,tag:'kiểu thật: Dog'}),O('Animal#2',[],{hi:hi===1,tag:'kiểu thật: Animal'}),O('Cat#3',[],{hi:hi===2,tag:'kiểu thật: Cat'})];}
  c.snap({ln:6,title:'Tạo ba đối tượng',body:'Có một Dog, một Animal và một Cat. Sơ đồ bên dưới: Dog và Cat là con của Animal.',vars:V,objs:OB(-1),uml:UM(null,0)});
  var T=[[7,0,'Dog','Animal'],[8,0,'Dog','Dog'],[9,1,'Animal','Dog'],[10,2,'Cat','Dog']];
  var why=[
   'Dog kế thừa Animal, nên một Dog cũng là một Animal.',
   'Đối tượng Dog tất nhiên là một Dog.',
   'Animal là lớp cha. Một Animal chưa chắc là Dog, đi từ Animal lên không gặp Dog.',
   'Cat và Dog là hai nhánh khác nhau của Animal, nên một Cat không phải là Dog.'];
  for(var i=0;i<4;i++){
   var t=T[i],r=isA(t[2],t[3]);
   c.out(r?'True':'False');
   c.snap({ln:t[0],title:(['dog','dog','animal','cat'][i])+' is '+t[3]+' → '+(r?'true':'false'),body:why[i],
    vars:V.concat([['kết quả',r?'true':'false',1]]),objs:OB(t[1]),uml:UM(t[2],r)});
  }
  c.snap({ln:10,title:'Xong',body:'Kết quả: true, true, false, false. Sơ đồ chỉ sáng đường lên khi kiểm tra cho true.',
   note:'Lớp con "là một" lớp cha (Dog is Animal), nhưng chiều ngược lại không đúng.',vars:V,objs:OB(-1),uml:UM(null,0)});
 }}};
