// META {"module":2,"lesson":"Nguyên lý Đóng gói (Encapsulation) và Kiểm soát truy cập","activity":"Các Từ khóa Kiểm soát Truy cập (Access Modifiers)","title":"Từ khóa kiểm soát truy cập","lead":"Chọn nơi code đứng, rồi bấm <b>Bước tiếp</b> để thử truy cập từng thành viên. Đây là mô phỏng kết quả biên dịch theo luật C#, không chạy code thật.","tabs":[["lop","Trong chính lớp"],["con","Trong lớp con"],["khac","Lớp khác cùng project"],["pj","Project khác"]]}
var MEM=['Pub','Priv','Prot','Intl'], KW=['public','private','protected','internal'];
var ROWS=[['Trong chính lớp',[1,1,1,1]],['Trong lớp con',[1,0,1,1]],['Lớp khác cùng project',[1,0,0,1]],['Project khác',[1,0,0,0]]];
function errMsg(m){return "error CS0122: 'Account."+m+"' is inaccessible due to its protection level";}
function makeTab(row,lines,lns,intro,where){
 return {inputs:[],intro:intro,lines:function(){return lines;},
 run:function(c){
  var res=ROWS[row][1];
  var cells=function(n){var f=[];for(var i=0;i<4;i++){
    if(i<n)f.push([KW[i]+' '+MEM[i],res[i]?'✓ được phép':'✗ CS0122',res[i]?'ok':'bad']);
    else f.push([KW[i]+' '+MEM[i],'chưa thử']);}
   return f;};
  for(var i=0;i<4;i++){
   if(!res[i])c.err(errMsg(MEM[i]));
   c.snap({ln:lns[i],title:'Thử truy cập '+KW[i]+' '+MEM[i],
    body:res[i]?'Code '+where+' được phép dùng thành viên '+KW[i]+'. Biên dịch thành công.':'Code '+where+' không được dùng thành viên '+KW[i]+'. Lỗi biên dịch CS0122.',
    objs:[O('Kết quả '+where,cells(i+1),{hi:1})]});
  }
  var rows=ROWS.map(function(r,k){return O(r[0],r[1].map(function(v,j){return [KW[j],v?'✓':'✗',v?'ok':'bad'];}),{hi:k===row});});
  c.snap({ln:lns[3],title:'Xong',body:'Bảng tổng hợp: hàng đang xem được tô đậm. Dòng nào có ✗ sẽ không biên dịch được.',note:'private chỉ trong lớp; protected thêm lớp con; internal trong cùng project; public ở mọi nơi. (Bảng giả định lớp con nằm cùng project.)',objs:rows});
 }};
}
var DECL=['  public int Pub;','  private int Priv;','  protected int Prot;','  internal int Intl;'];
var EX={
lop:makeTab(0,['class Account','{'].concat(DECL,['','  void Test()','  {','    Pub = 1;','    Priv = 1;','    Prot = 1;','    Intl = 1;','  }','}']),[9,10,11,12],'Code nằm ngay trong lớp Account, truy cập thành viên của chính nó. Bấm "Bước tiếp".','trong chính lớp'),
con:makeTab(1,['// Account có Pub, Priv,','// Prot, Intl (như trên)','class Dog : Account','{','  void Test()','  {','    Pub = 1;','    Priv = 1;','    Prot = 1;','    Intl = 1;','  }','}'],[6,7,8,9],'Code nằm trong Dog, lớp con của Account (cùng project). Bấm "Bước tiếp".','trong lớp con'),
khac:makeTab(2,['// Lớp Shop, cùng project','class Shop','{','  void Test()','  {','    var a = new Account();','    a.Pub = 1;','    a.Priv = 1;','    a.Prot = 1;','    a.Intl = 1;','  }','}'],[6,7,8,9],'Code nằm trong lớp Shop, không liên quan kế thừa, cùng project với Account. Bấm "Bước tiếp".','trong lớp khác cùng project'),
pj:makeTab(3,['// Lớp Shop, project khác','// (đã tham chiếu Account)','class Shop','{','  void Test()','  {','    var a = new Account();','    a.Pub = 1;','    a.Priv = 1;','    a.Prot = 1;','    a.Intl = 1;','  }','}'],[7,8,9,10],'Code nằm ở project khác, chỉ tham chiếu tới project chứa Account. Bấm "Bước tiếp".','ở project khác')
};
