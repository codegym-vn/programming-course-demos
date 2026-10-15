// META {"module":4,"lesson":"Đọc File Văn bản","activity":"Đọc file và xử lý dữ liệu đơn giản","title":"Đọc file và xử lý dữ liệu","lead":"Mỗi dòng trong tệp là một chuỗi, cần chuyển sang số an toàn bằng TryParse. Bấm <b>Bước tiếp</b> để xem từng dòng được xử lý.","tabs":[["x","Đọc numbers.txt"]],"codeTitle":"Mã nguồn C#"}
var EX = {x:{inputs:[],chips:[],
 intro:'Tệp numbers.txt có 6 dòng, có dòng chữ và dòng trống. Hãy xem dòng nào được cộng, dòng nào bị ghi lỗi. Bấm "Bước tiếp".',
 lines:function(){return [
  'var lines =',
  '  File.ReadAllLines("numbers.txt");',
  'int sum = 0, max = 0;',
  'var bad = new List<int>();',
  'int no = 0;',
  'foreach (var s in lines)',
  '{',
  '  no++;',
  '  if (int.TryParse(s, out int v))',
  '  {',
  '    sum += v;',
  '    if (v > max) max = v;',
  '  }',
  '  else bad.Add(no);',
  '}'];},
 run:function(c){
  var file = ['12', '7', 'abc', '20', '', '5'];
  var sum = 0, max = 0, good = [], bad = [], states = file.map(function(){ return undefined; });
  function dpShow(cur){
    var L = file.map(function(t, i){
      var txt = t === '' ? '(dòng trống)' : t;
      return {t: txt, s: states[i]};
    });
    return [
      vText(L, {title: 'numbers.txt', cursor: cur}),
      vBins({title: 'Hợp lệ (cộng vào tổng)', items: good.map(function(x){ return {t: x, s: x.slice(-1) === 'x' ? undefined : undefined}; }), kind: 'ok'},
            {title: 'Dòng lỗi (ghi lại)', items: bad.map(function(x){ return {t: x}; }), kind: 'bad'}),
      vScore([{k: 'Tổng', v: sum}, {k: 'Max', v: max}, {k: 'Số dòng lỗi', v: bad.length, s: bad.length ? 'bad' : undefined}])
    ];
  }
  c.snap({ln:3,title:'Chuẩn bị',body:'Đọc cả tệp thành mảng 6 chuỗi, rồi đặt sum = 0, max = 0 và một danh sách bad để ghi số dòng lỗi.',
   vars:[['sum',0],['max',0]],viz:dpShow(-1)});
  var tips = ['Dòng 1: "12" là số', 'Dòng 2: "7" là số', 'Dòng 3: "abc" không phải số', 'Dòng 4: "20" là số', 'Dòng 5: dòng trống', 'Dòng 6: "5" là số'];
  for (var i = 0; i < file.length; i++){
    var s = file[i], ok = /^\s*[+-]?\d+\s*$/.test(s), no = i + 1, body;
    if (ok){
      var v = parseInt(s, 10), oldMax = max;
      sum += v; if (v > max) max = v;
      good.push(s); states[i] = 'ok';
      body = 'TryParse trả về true, v = ' + v + '. Tổng thành ' + sum + (max > oldMax ? ', max cập nhật thành ' + max + '.' : ', max vẫn là ' + max + '.');
    } else {
      bad.push('dòng ' + no + ': ' + (s === '' ? '(trống)' : '"' + s + '"')); states[i] = 'no';
      body = (s === '' ? 'Chuỗi rỗng' : '"' + s + '"') + ' không chuyển thành số được, TryParse trả về false. Chương trình ghi lại lỗi ở dòng ' + no + ', tổng giữ nguyên ' + sum + '.';
    }
    c.snap({ln: ok ? 10 : 13,title:tips[i],body:body,vars:[['s',s === '' ? '""' : S(s),1],['sum',sum],['max',max]],viz:dpShow(i)});
  }
  c.snap({ln:14,title:'Xong',body:'Tổng = ' + sum + ', max = ' + max + ', có ' + bad.length + ' dòng lỗi (' + bad.map(function(x){ return x.split(':')[0].replace('dòng ', ''); }).join(' và ') + ').',
   note:'Dữ liệu trong tệp luôn là chuỗi. Phải chuyển đổi an toàn bằng TryParse và ghi lại dòng lỗi.',vars:[['sum',sum],['max',max]],viz:dpShow(-1)});
 }}};
