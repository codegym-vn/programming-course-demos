// META {"module":7,"lesson":"Hướng dẫn từng bước vẽ Sơ đồ lớp UML hoàn chỉnh","activity":"Quy trình vẽ Sơ đồ lớp UML","title":"Quy trình vẽ sơ đồ lớp","lead":"Đề bài nhỏ về thư viện, vẽ qua 5 giai đoạn. Bấm <b>Bước tiếp</b> để làm từng giai đoạn.","codeTitle":"Đề bài","tabs":[["x","Thư viện: Độc giả, Sách, Phiếu mượn"]]}
var EX = {x:{
 inputs:[],
 intro:'Đề bài: thư viện cho độc giả mượn sách. Ta vẽ sơ đồ lớp theo 5 giai đoạn. Bấm "Bước tiếp".',
 lines:function(){return [
  'Đề: Thư viện cho độc giả mượn sách',
  '- Độc giả có tên, mã số',
  '- Sách có tên sách, tác giả',
  '- Phiếu mượn có ngày mượn',
  '- Độc giả mượn sách qua phiếu',
  '- Một độc giả có nhiều phiếu',
  '- Một phiếu chỉ mượn một sách'];},
 run:function(c){
  var B=[
   {id:'R',name:'Reader',c:0,r:0,attrs:['- Name: string','- Id: int'],methods:['+ Borrow(b: Book)']},
   {id:'L',name:'Loan',c:1,r:0,attrs:['- Date: DateTime'],methods:['+ Return(): void']},
   {id:'K',name:'Book',c:1,r:1,attrs:['- Title: string','- Author: string'],methods:[]}];
  var u=function(stage,hi){
   var boxes=B.map(function(b){return {id:b.id,name:b.name,c:b.c,r:b.r,hi:hi===1&&stage===1,
    attrs:stage>=2?b.attrs.map(function(t){return {t:t,hi:stage===2};}):[],
    methods:stage>=3?b.methods.map(function(t){return {t:t,hi:stage===3};}):[]};});
   var links=[];
   if(stage>=4){links.push({a:'R',b:'L',type:'assoc',hi:stage===4,la:stage>=5?'1':'',lb:stage>=5?'*':''});
    links.push({a:'L',b:'K',type:'assoc',hi:stage===4,la:stage>=5?'*':'',lb:stage>=5?'1':''});}
   return {boxes:boxes,links:links};};
  var st=function(i,t){return [['Giai đoạn',i+' / 5 '+t,1]];};
  c.snap({ln:0,title:'Đọc đề bài',body:'Quy trình có 5 giai đoạn: tìm lớp, thuộc tính, phương thức, quan hệ, đa số. Ta đi lần lượt.',vars:[['Giai đoạn','chưa bắt đầu']]});
  c.snap({ln:0,title:'Giai đoạn 1: tìm lớp',body:'Danh từ chính trong đề: Độc giả, Sách, Phiếu mượn. Mỗi danh từ là một lớp, ta vẽ ba hộp (Reader, Book, Loan).',vars:st(1,'tìm lớp'),uml:u(1,1)});
  c.snap({ln:1,title:'Giai đoạn 2: thuộc tính',body:'Đề nói độc giả có tên và mã số, sách có tên và tác giả, phiếu có ngày mượn. Đó là các thuộc tính, ghi vào ngăn giữa.',vars:st(2,'thuộc tính'),uml:u(2)});
  c.snap({ln:4,title:'Giai đoạn 3: phương thức',body:'Độc giả mượn sách nên Reader có Borrow. Phiếu có thể trả sách nên Loan có Return. Ghi vào ngăn dưới.',vars:st(3,'phương thức'),uml:u(3)});
  c.snap({ln:4,title:'Giai đoạn 4: quan hệ',body:'Độc giả mượn sách qua phiếu: Reader nối với Loan, Loan nối với Book bằng đường kết hợp.',vars:st(4,'quan hệ'),uml:u(4)});
  c.snap({ln:5,title:'Giai đoạn 5: đa số',body:'Một Reader có nhiều Loan (1 và *). Ở phía Loan và Book, mỗi Loan chỉ mượn một Book (* và 1).',vars:st(5,'đa số'),uml:u(5)});
  c.snap({ln:6,title:'Xong',body:'Sơ đồ đã đủ lớp, thuộc tính, phương thức, quan hệ và đa số.',
   note:'Quy trình vẽ: tìm lớp, thuộc tính, phương thức, quan hệ, rồi đa số.',vars:st(5,'đa số'),uml:u(5)});
 }}};
