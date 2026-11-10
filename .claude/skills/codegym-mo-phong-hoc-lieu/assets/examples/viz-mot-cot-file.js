// META {"module":4,"lesson":"Đọc File Văn bản","activity":"Đọc từng dòng với ReadLine()","title":"Đọc từng dòng với ReadLine()","lead":"Vòng lặp while đọc từng dòng và dừng khi ReadLine() trả về null. Bấm <b>Bước tiếp</b> để xem từng vòng.","tabs":[["x","Đọc tệp diem.txt"]],"codeTitle":"Mã nguồn C#"}
var EX = {x:{inputs:[],chips:[],
 intro:'Tệp diem.txt có 4 dòng, trong đó dòng 3 để trống. Hãy để ý dòng trống khác null thế nào. Bấm "Bước tiếp".',
 lines:function(){return [
  'using var r =',
  '  new StreamReader("diem.txt");',
  'string line;',
  'int count = 0;',
  'while ((line = r.ReadLine()) != null)',
  '{',
  '  count++;',
  '  Console.WriteLine(line);',
  '}',
  'Console.WriteLine(count);'];},
 run:function(c){
  var file = ['An,8', 'Bình,6', '', 'Chi,9'], count = 0;
  function rlShow(cur, lineVal, hint){
    var L = file.map(function(t){ return t === '' ? {t: '(dòng trống)', s: 'dim'} : t; });
    L.push({t: '(hết tệp)', s: 'dim'});
    return [
      vText(L, {title: 'diem.txt', cursor: cur}),
      vScore([{k: 'line', v: lineVal === null ? 'null' : '"' + lineVal + '"', s: lineVal === null ? 'bad' : 'hi'}, {k: 'count', v: count}])
    ];
  }
  c.snap({ln:1,title:'Mở tệp',body:'Tệp được mở, con trỏ ở đầu dòng 1. Biến count bắt đầu từ 0.',viz:rlShow(-1, '').map(function(x, i){ return i === 1 ? vScore([{k: 'line', v: '-'}, {k: 'count', v: 0}]) : x; })});
  var texts = ['Lần 1: đọc dòng đầu', 'Lần 2: đọc dòng thứ hai', 'Lần 3: dòng trống', 'Lần 4: đọc dòng cuối'];
  var bodies = [
   function(l){ return 'ReadLine() trả về "' + l + '" nên điều kiện != null đúng. count tăng lên ' + count + ' và dòng được in ra.'; },
   function(l){ return 'ReadLine() trả về "' + l + '". count tăng lên ' + count + '.'; },
   function(l){ return 'Dòng này không có chữ nào, ReadLine() trả về chuỗi rỗng "". Chuỗi rỗng không phải null nên vòng lặp vẫn tiếp tục, count = ' + count + '.'; },
   function(l){ return 'ReadLine() trả về "' + l + '". count tăng lên ' + count + '.'; }];
  for (var i = 0; i < file.length; i++){
    var l = file[i]; count++; c.out(l);
    c.snap({ln:7,title:texts[i],body:bodies[i](l),viz:rlShow(i, l)});
  }
  var res = null;
  c.snap({ln:4,title:'Lần 5: hết tệp',body:'Không còn dòng nào, ReadLine() trả về null. Điều kiện != null sai nên thoát vòng lặp.',viz:rlShow(file.length, res)});
  c.out(String(count));
  c.snap({ln:9,title:'Xong',body:'Đã đọc ' + count + ' dòng, tính cả dòng trống.',
   note:'ReadLine trả về "" cho dòng trống và null khi hết tệp. Phải kiểm tra null để biết khi nào dừng.',viz:rlShow(file.length, res)});
 }}};
