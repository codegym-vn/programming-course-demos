// META {"module":1,"lesson":"Giới thiệu về Collections và List<T> cơ bản","activity":"Giới thiệu Collections trong C#","title":"Giới thiệu Collections trong C#","lead":"Cả hai cột cùng lưu điểm 8, 6, 9, 7, 10. Bấm <b>Bước tiếp</b> để xem mảng và List<T> xử lý khác nhau thế nào.","tabs":[["them","Thêm phần tử thứ 4 và thứ 5"]],"codeTitle":"Mã nguồn C#"}
function myArr(vals, cap, s, name){
  return vCells(vals.map(function(v){ return {v:v, s:s}; }), {name:name, cap:cap});
}
function myLst(c){ /* mô hình List<int> đơn giản: Capacity 0, lần Add đầu cấp 4, sau đó nhân đôi */
  return {items:[], cap:0, add:function(x){ var grew = false, old = this.cap; if (this.items.length === this.cap){ this.cap = this.cap === 0 ? 4 : this.cap * 2; grew = true; } this.items.push(x); return {grew:grew, old:old}; }};
}
var EX = {them:{
 intro:'Hai cột cùng cần lưu 5 điểm. Bên trái dùng mảng, bên phải dùng List<int>. Bấm "Bước tiếp".',
 running:'Mảng có đúng 3 ô từ lúc tạo. List<T> tự cấp thêm chỗ khi cần.',
 done:'Mảng chỉ chứa được 3 điểm nên điểm thứ 4 gây lỗi. List<int> chứa được cả 5 điểm (Count 5, Capacity 8) mà không cần làm gì thêm ngoài Add.',
 note:'Mảng cố định kích thước khi tạo. List<T> tự lo việc mở rộng, người dùng chỉ cần gọi Add.',
 cols:[
 {title:'Mảng int[]',sub:'Kích thước cố định lúc tạo.',
  lines:['int[] a = new int[3];','a[0] = 8;','a[1] = 6;','a[2] = 9;','a[3] = 7;'],
  run:function(c){
   var a = [0,0,0];
   c.snap({ln:0,title:'Tạo mảng 3 ô',body:'new int[3] tạo đúng 3 ô, mỗi ô mang giá trị 0. Số ô không đổi được nữa.',
    viz:[vCells(a.map(function(v){return {v:v,s:'new'};}),{name:'a'}), vScore([{k:'Length',v:a.length}])]});
   a[0] = 8;
   c.snap({ln:1,title:'a[0] = 8',body:'Gán điểm đầu tiên vào ô chỉ số 0.',
    viz:[vCells(a.map(function(v,i){return {v:v,s:i===0?'hi':null};}),{name:'a'}), vScore([{k:'Length',v:a.length}])]});
   a[1] = 6;
   c.snap({ln:2,title:'a[1] = 6',body:'Gán điểm thứ hai vào ô chỉ số 1.',
    viz:[vCells(a.map(function(v,i){return {v:v,s:i===1?'hi':null};}),{name:'a'}), vScore([{k:'Length',v:a.length}])]});
   a[2] = 9;
   c.snap({ln:3,title:'a[2] = 9',body:'Ô cuối cùng (chỉ số 2) đã dùng. Mảng đầy rồi.',
    viz:[vCells(a.map(function(v,i){return {v:v,s:i===2?'hi':'ok'};}),{name:'a'}), vScore([{k:'Length',v:a.length}])]});
   c.err('Unhandled exception. System.IndexOutOfRangeException:');
   c.err('Index was outside the bounds of the array.');
   c.snap({ln:4,title:'a[3] = 7: không có ô số 3',body:'Mảng chỉ có chỉ số 0, 1, 2 nên không có chỗ cho điểm thứ 4. Chương trình dừng với lỗi.',
    viz:[vCells(a.map(function(v){return {v:v,s:'ok'};}).concat([{v:'?',s:'bad'}]),{name:'a'}),
     vCard({kind:'err',title:'IndexOutOfRangeException',sub:'Index was outside the bounds of the array.'})]});
  }},
 {title:'List<int>',sub:'Tự mở rộng khi thêm phần tử.',
  lines:['var l = new List<int>();','l.Add(8);','l.Add(6);','l.Add(9);','l.Add(7);','l.Add(10);'],
  run:function(c){
   var L = myLst();
   function row(hiIdx, st){ return vCells(L.items.map(function(v,i){return {v:v,s:i===hiIdx?(st||'hi'):null};}),{name:'l',cap:L.cap}); }
   function sc(){ return vScore([{k:'Count',v:L.items.length},{k:'Capacity',v:L.cap}]); }
   c.snap({ln:0,title:'Tạo List rỗng',body:'List mới chưa có phần tử nào và cũng chưa cấp ô nào (Capacity 0).',
    viz:['<div class="v-sub" style="padding:8px 0">(chưa có ô nào)</div>', sc()]});
   var r = L.add(8);
   c.snap({ln:1,title:'Add(8): cấp sẵn 4 chỗ',body:'Lần Add đầu tiên, List cấp sẵn 4 chỗ (nét đứt là chỗ còn trống) rồi đặt 8 vào ô 0.',viz:[row(0,'new'), sc()]});
   L.add(6);
   c.snap({ln:2,title:'Add(6)',body:'Còn chỗ trống nên chỉ cần đặt 6 vào ô kế tiếp. Count tăng lên 2.',viz:[row(1,'new'), sc()]});
   L.add(9);
   c.snap({ln:3,title:'Add(9)',body:'Count là 3, Capacity vẫn 4. Còn đúng một ô dự phòng.',viz:[row(2,'new'), sc()]});
   L.add(7);
   c.snap({ln:4,title:'Add(7): lấp ô dự phòng',body:'Không cần lỗi hay cấp thêm: 7 vào ô dự phòng cuối. Count 4, Capacity 4, List đã đầy.',viz:[row(3,'new'), sc()]});
   var old = L.items.slice(), oldCap = L.cap;
   var r2 = L.add(10);
   c.snap({ln:5,title:'Add(10): hết chỗ, cấp dãy mới',body:'List cấp dãy mới gấp đôi ('+L.cap+' ô) và chép '+old.length+' phần tử sang. Dãy cũ bị bỏ đi.',
    viz:[vCells(old.map(function(v){return {v:v,s:'dim'};}),{name:'dãy cũ ('+oldCap+' ô)'}),
     vCells(old.map(function(v){return {v:v,s:'hi'};}),{name:'dãy mới ('+L.cap+' ô), đã chép sang',cap:L.cap}), vScore([{k:'Count',v:old.length},{k:'Capacity',v:L.cap}])]});
   c.snap({ln:5,title:'Thêm 10 vào dãy mới',body:'Sau khi chép xong, 10 vào ô số 4. Count '+L.items.length+', Capacity '+L.cap+'.',viz:[row(4,'new'), sc()]});
   c.snap({ln:5,title:'Xong',body:'Người dùng chỉ gọi Add. Việc cấp dãy mới và chép phần tử do List lo.',
    note:'Capacity tăng gấp đôi khi hết chỗ (4 rồi 8) là chi tiết cài đặt của .NET, chỉ nêu để minh họa.',viz:[row(-1), sc()]});
  }}
 ]}};
