// META {"module":5,"lesson":"Giới thiệu về CSV và Cấu trúc cơ bản","activity":"CSV là gì và tại sao lại quan trọng?","title":"CSV là gì?","lead":"Cùng một dữ liệu, hai cách nhìn: bảng kiểu Excel và tệp văn bản CSV. Bấm <b>Bước tiếp</b> để thấy từng hàng tương ứng.","tabs":[["csv","Bảng và CSV"]],"codeTitle":"Tệp sp.csv"}
var CSV = ['Ma,Ten,Gia','SP01,Bút bi,5000','SP02,Vở,12000','SP03,Thước,8000'];
function csvBoth(row, st){
  var grid = CSV.map(function(l){ return l.split(','); });
  var rows = grid.map(function(r, i){ return r.map(function(v){ return {v:v, s:(row === i ? 'hi' : (st && i > 0 ? st : ''))}; }); });
  var texts = CSV.map(function(l, i){
    var parts = l.split(','), seg = [];
    parts.forEach(function(p, k){
      seg.push({t:p, s:row === i ? 'hi' : (st && i > 0 ? st : '')});
      if (k < parts.length - 1) seg.push({t:',', s:row === i ? 'f2' : (st && i > 0 ? st : ''), c:'key'});
    });
    return {seg:seg};
  });
  return vPair(vGrid(rows, {head:true}), vText(texts, {eol:true}), {ta:'Bảng kiểu Excel', tb:'Tệp văn bản CSV'});
}
var EX = {
csv:{inputs:[],chips:[],
 intro:'Bảng bên trái và văn bản bên phải là cùng một dữ liệu. Bấm "Bước tiếp".',
 lines:function(){return CSV.slice();},
 run:function(c){
  c.snap({ln:0,title:'Hàng tiêu đề',body:'Hàng đầu ghi tên các cột: Ma, Ten, Gia. Trong tệp CSV nó là dòng đầu "Ma,Ten,Gia".',viz:csvBoth(0)});
  c.snap({ln:1,title:'Bản ghi 1',body:'Dòng "SP01,Bút bi,5000" ứng với hàng 1. Dấu phẩy chính là ranh giới giữa các cột.',viz:csvBoth(1)});
  c.snap({ln:2,title:'Bản ghi 2',body:'Dòng "SP02,Vở,12000" ứng với hàng 2.',viz:csvBoth(2)});
  c.snap({ln:3,title:'Bản ghi 3',body:'Dòng "SP03,Thước,8000" ứng với hàng 3.',viz:csvBoth(3)});
  c.snap({ln:3,title:'Xong',body:'Mở bằng Notepad thấy văn bản thuần, mở bằng Excel thấy bảng. Dữ liệu vẫn là một.',note:'CSV là văn bản thuần: mỗi dòng một bản ghi, dấu phẩy ngăn cách trường. Người, Excel và chương trình đều đọc được.',viz:csvBoth(-1,'ok')});
 }}
};
