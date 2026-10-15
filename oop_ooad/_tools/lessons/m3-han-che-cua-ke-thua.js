// META {"module":3,"lesson":"Các vấn đề và thực hành tốt nhất trong Kế thừa","activity":"Hạn chế của Kế thừa","title":"Hạn chế của kế thừa","lead":"Lớp cha thay đổi cách làm bên trong có thể làm lớp con chạy sai. Bấm <b>Bước tiếp</b> để theo luồng gọi.","tabs":[["x","AddRange đếm sai"]]}
var EX = {x:{inputs:[],
 intro:'CountingList muốn đếm số phần tử đã thêm. Thêm 3 phần tử, kết quả mong đợi là 3. Bấm "Bước tiếp".',
 lines:function(){return [
  'class Collection','{','  public virtual void Add(int x)','  {','    // thêm x vào danh sách','  }',
  '  public virtual void AddRange(','    int[] xs)','  {','    foreach (var x in xs)','      Add(x);','  }','}',
  'class CountingList : Collection','{','  public int Count;','  public override void Add(int x)','  {','    Count++;','    base.Add(x);','  }',
  '  public override void AddRange(','    int[] xs)','  {','    Count += xs.Length;','    base.AddRange(xs);','  }','}','',
  'var list = new CountingList();','list.AddRange(new[] { 1, 2, 3 });'];},
 run:function(c){
  var xs=[1,2,3],count=0;
  var V=function(extra){return [['list','→ CountingList#1']].concat(extra||[]);};
  function OB(tag,fl){return [O('CountingList#1',[['Count',count,fl||'']],{hi:1,tag:tag})];}
  function A(i){return [AR('xs',xs,i==null?[]:[i],[],[])];}
  c.snap({ln:29,title:'Tạo CountingList',body:'Count bắt đầu từ 0.',vars:V(),objs:OB('')});
  c.snap({ln:30,title:'Gọi list.AddRange(1, 2, 3)',body:'CountingList có AddRange riêng nên chạy bản của nó trước.',vars:V([['xs','[1, 2, 3]']]),objs:OB('đang chạy CountingList.AddRange'),arrs:A()});
  count+=xs.length;
  c.snap({ln:24,title:'Đếm theo độ dài',body:'Count += xs.Length nên Count = '+count+'. Lớp con nghĩ rằng đã đếm đủ.',vars:V(),objs:OB('đang chạy CountingList.AddRange','hi'),arrs:A()});
  c.snap({ln:25,title:'base.AddRange(xs)',body:'Lớp con gọi AddRange của lớp cha để thêm thật sự. Dòng chạy nhảy lên Collection.',vars:V(),objs:OB('đang chạy Collection.AddRange'),arrs:A()});
  for(var i=0;i<xs.length;i++){
   count++;
   c.snap({ln:17,title:'AddRange gọi Add('+xs[i]+')',body:'Add là virtual nên AddRange của cha lại gọi bản Add của CountingList, và Count++ làm Count = '+count+'.',
    vars:V([['x',xs[i]]]),objs:OB('đang chạy CountingList.Add','hi'),arrs:A(i)});
  }
  c.snap({ln:30,title:'Xong',body:'Count = '+count+' thay vì '+xs.length+': mỗi phần tử bị đếm hai lần (một lần ở AddRange, một lần ở Add).',
   note:'Lớp con phụ thuộc vào cách lớp cha làm bên trong (AddRange gọi Add). Cha đổi cách làm thì con có thể chạy sai. Đây là điểm yếu của kế thừa.',
   vars:V(),objs:OB('','bad'),arrs:A()});
 }}};
