// META {"module":5,"lesson":"Giới thiệu về CSV và Cấu trúc cơ bản","activity":"Cấu trúc cơ bản của File CSV","title":"Cấu trúc cơ bản của tệp CSV","lead":"Gọi đúng tên từng phần của tệp CSV. Bấm <b>Bước tiếp</b> để xem từng nhãn.","tabs":[["csv","Các thành phần"]],"codeTitle":"Tệp sp.csv"}
var CSV2 = ['Ma,Ten,Gia','SP01,Bút bi,5000','SP02,Vở,12000','SP03,Thước,8000','SP04,,3000'];
// hl: map từ dòng -> mảng các đoạn cần tô; mode xác định cách tô
function csvTxt(mode){
  var lines = CSV2.map(function(l, i){
    var parts = l.split(','), seg = [];
    parts.forEach(function(p, k){
      var s = '';
      if (mode === 'head' && i === 0) s = 'hi';
      if (mode === 'rec' && i === 1) s = 'hi';
      if (mode === 'field' && i === 2 && k === 1) s = 'hi';
      if (mode === 'empty' && i === 4 && k === 1) s = 'bad';
      if (p) seg.push({t:p, s:s});
      if (k < parts.length - 1) {
        var cs = '';
        if (mode === 'delim' && i === 1) cs = 'hi';
        if (mode === 'empty' && i === 4) cs = 'bad';
        seg.push({t:',', s:cs, c:'key'});
      }
    });
    return {seg:seg};
  });
  return vText(lines, {eol:mode === 'eol'});
}
function csvLbl(t, label, s){ return vChips([{t:t, s:s || 'hi', label:label}]); }
var EX = {
csv:{inputs:[],chips:[],
 intro:'Một tệp CSV nhỏ có thêm một dòng thiếu tên. Bấm "Bước tiếp".',
 lines:function(){return CSV2.slice();},
 run:function(c){
  c.snap({ln:0,title:'Hàng tiêu đề',body:'Dòng đầu ghi tên các cột. Nó không phải là dữ liệu sản phẩm.',viz:[csvTxt('head'),csvLbl('Hàng tiêu đề','tên các cột')]});
  c.snap({ln:1,title:'Bản ghi',body:'Mỗi dòng dữ liệu là một bản ghi, tương ứng với một sản phẩm.',viz:[csvTxt('rec'),csvLbl('Bản ghi','một dòng, một sản phẩm')]});
  c.snap({ln:2,title:'Trường',body:'Mỗi giá trị trong một bản ghi là một trường, như "Vở".',viz:[csvTxt('field'),csvLbl('Trường','một giá trị')]});
  c.snap({ln:1,title:'Dấu phân cách',body:'Dấu phẩy ngăn cách các trường trong cùng một dòng.',viz:[csvTxt('delim'),csvLbl('Dấu phân cách','dấu phẩy')]});
  c.snap({ln:4,title:'Trường rỗng',body:'Dòng "SP04,,3000" có hai dấu phẩy liền nhau. Trường ở giữa (tên) bị bỏ trống.',viz:[csvTxt('empty'),csvLbl('Trường rỗng','thiếu tên','bad')]});
  c.snap({ln:0,title:'Xuống dòng',body:'Ký tự xuống dòng (hiện là ↵) kết thúc mỗi bản ghi và bắt đầu bản ghi mới.',viz:[csvTxt('eol'),csvLbl('Xuống dòng','kết thúc một bản ghi')]});
  c.snap({ln:0,title:'Xong',body:'Một số vùng (như Việt Nam) cho Excel xuất CSV dùng dấu chấm phẩy thay cho dấu phẩy.',note:'Hiểu đúng tên gọi: hàng tiêu đề, bản ghi, trường, dấu phân cách. Dấu phân cách có thể là ; ở một số vùng.',viz:vPair(vText(['SP01,Bút bi,5000'],{noNo:true}),vText(['SP01;Bút bi;5000'],{noNo:true}),{ta:'Dấu phẩy',tb:'Dấu chấm phẩy (Excel ở một số vùng)'})});
 }}
};
