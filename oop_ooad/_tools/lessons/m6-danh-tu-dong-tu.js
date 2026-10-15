// META {"module":6,"lesson":"Xác định Đối tượng, Thuộc tính và Hành vi","activity":"Kỹ thuật xác định danh từ và động từ","title":"Tìm danh từ và động từ","lead":"Đọc mô tả yêu cầu, gom danh từ thành ứng viên lớp và động từ thành ứng viên phương thức. Bấm <b>Bước tiếp</b>.","tabs":[["x","Cửa hàng sách"]],"codeTitle":"Mô tả yêu cầu"}
var DL = ['// Mô tả yêu cầu','Khách hàng đặt đơn hàng.','Mỗi đơn hàng gồm nhiều sách.','Mỗi sách có tên và giá.','Đơn hàng tính tổng tiền.'];
function cols(nouns,verbs){return [AR('Ứng viên lớp (danh từ)',nouns,[],nouns.map(function(_,i){return i;}),[]),AR('Phương thức (động từ)',verbs,verbs.map(function(_,i){return i;}),[],[])];}
var EX = {x:{inputs:[],
 intro:'Một đoạn mô tả yêu cầu của cửa hàng sách. Ta đọc từng câu và nhặt danh từ, động từ. Bấm "Bước tiếp".',
 lines:function(){return DL;},
 run:function(c){
  var N=[],V=[];
  c.snap({ln:0,title:'Đọc mô tả',body:'Danh từ có thể là lớp hoặc thuộc tính. Động từ có thể là phương thức. Ta nhặt hết rồi mới lọc.',arrs:cols(N,V)});
  N=N.concat(['khách hàng','đơn hàng']);V=V.concat(['đặt']);
  c.snap({ln:1,title:'Câu 1',body:'Danh từ: khách hàng, đơn hàng (màu xanh). Động từ: đặt (màu vàng).',arrs:cols(N,V)});
  N=N.concat(['đơn hàng','sách']);
  c.snap({ln:2,title:'Câu 2',body:'Danh từ: đơn hàng (lại gặp), sách. "gồm" chỉ là quan hệ giữa hai thứ, chưa tính là hành vi.',arrs:cols(N,V)});
  N=N.concat(['sách','tên','giá']);
  c.snap({ln:3,title:'Câu 3',body:'Danh từ: sách (lại gặp), tên, giá. "có" cũng chỉ là quan hệ.',arrs:cols(N,V)});
  N=N.concat(['đơn hàng','tổng tiền']);V=V.concat(['tính tổng tiền']);
  c.snap({ln:4,title:'Câu 4',body:'Danh từ: đơn hàng (lại gặp), tổng tiền. Động từ: tính tổng tiền.',arrs:cols(N,V)});
  var uniq=N.filter(function(x,i){return N.indexOf(x)==i;});
  c.snap({ln:4,title:'Lọc 1: gộp từ trùng',body:'Gộp các từ trùng nhau. Từ '+N.length+' danh từ còn '+uniq.length+' từ khác nhau.',arrs:cols(uniq,V)});
  var cls=['khách hàng','đơn hàng','sách'];
  c.snap({ln:3,title:'Lọc 2: tên, giá là thuộc tính',body:'"Tên" và "giá" là đặc điểm của sách, không tự đứng một mình nên chuyển thành thuộc tính của Sách. "Tổng tiền" là thuộc tính của Đơn hàng. Động từ gắn với lớp: đặt thuộc Khách hàng, tính tổng tiền thuộc Đơn hàng.',arrs:cols(cls,['đặt (Khách hàng)','tính tổng tiền (Đơn hàng)'])});
  c.snap({ln:4,title:'Xong',body:'Ba lớp kết quả: KhachHang, DonHang, Sach, mỗi lớp có thuộc tính và phương thức tìm được.',
   note:'Danh từ cho ứng viên lớp hoặc thuộc tính, động từ cho ứng viên phương thức. Sau đó gộp trùng và loại những danh từ thật ra là thuộc tính.',
   arrs:cols(cls,['đặt (Khách hàng)','tính tổng tiền (Đơn hàng)']),
   uml:{boxes:[
    {id:'k',name:'KhachHang',attrs:[],methods:['+ DatDonHang()'],c:0,r:0},
    {id:'d',name:'DonHang',attrs:['- tongTien: decimal'],methods:['+ TinhTongTien()'],c:1,r:0},
    {id:'s',name:'Sach',attrs:['- ten: string','- gia: decimal'],methods:[],c:1,r:1}],
    links:[{a:'k',b:'d',type:'assoc',la:'1',lb:'*'},{a:'d',b:'s',type:'assoc',la:'*',lb:'*'}]}});
 }}};
