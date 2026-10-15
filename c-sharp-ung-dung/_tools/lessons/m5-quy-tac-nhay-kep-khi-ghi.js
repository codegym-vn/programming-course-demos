// META {"module":5,"lesson":"Ghi dữ liệu ra File CSV","activity":"Quy tắc xử lý dấu nháy kép khi ghi CSV","title":"Quy tắc nháy kép khi ghi CSV","lead":"Mỗi trường đi qua hai trạm: kiểm tra ký tự đặc biệt rồi nhân đôi nháy. Chọn một giá trị rồi bấm <b>Bước tiếp</b>.","tabs":[["but","Bút bi"],["phay","Hà Nội, Việt Nam"],["nhay","Sách \"C#\""],["xd","Có xuống dòng"]],"codeTitle":"Mã nguồn C#"}
var G7V = { but:'Bút bi', phay:'Hà Nội, Việt Nam', nhay:'Sách "C#"', xd:'Dòng 1\nDòng 2' };
function g7Show(s){ return s.replace(/\r/g, '\\r').replace(/\n/g, '↵'); }
function g7Lit(s){ return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'; }
function g7Found(v){
  var f = [];
  if (v.indexOf(',') >= 0) f.push('dấu phẩy');
  if (v.indexOf('"') >= 0) f.push('dấu nháy kép');
  if (v.indexOf('\n') >= 0 || v.indexOf('\r') >= 0) f.push('xuống dòng');
  return f;
}
function g7Result(v, stage){
  // stage: 0 chưa có | 1 đã nhân đôi (chưa bọc) | 2 đã bọc | -1 giữ nguyên
  var need = g7Found(v).length > 0, seg = [];
  if (stage === 0) return vText([{t:'(chưa có kết quả)', s:'dim'}], {title:'Ô CSV', noNo:true});
  if (stage === -1) return vText([{seg:[{t:g7Show(v), s:'ok'}]}], {title:'Ô CSV (giữ nguyên)', noNo:true});
  if (stage === 2) seg.push({t:'"', s:'new'});
  v.split('').forEach(function(ch){
    if (ch === '"'){ seg.push({t:'"', s:''}); if (stage >= 1) seg.push({t:'"', s:'new'}); }
    else seg.push({t:ch === '\n' ? '↵' : ch});
  });
  if (stage === 2) seg.push({t:'"', s:'new'});
  return vText([{seg:seg}], {title:'Ô CSV', noNo:true});
}
function g7Flow(v, a, b, c2, item){
  return vFlow([
    {t:'Giá trị trường', s:'hi', item:g7Show(v)},
    {t:'Có , " hoặc xuống dòng?', s:a || 'dim'},
    {t:'Nhân đôi dấu nháy', s:b || 'dim'},
    {t:'Bọc nháy kép', s:c2 || 'dim'}
  ], {title:'Hai trạm xử lý'});
}
var G7FN = [
  'string EscapeCsv(string s)',
  '{',
  '  bool need = s.Contains(\',\')',
  '    || s.Contains(\'"\')',
  '    || s.Contains(\'\\n\')',
  '    || s.Contains(\'\\r\');',
  '  if (!need) return s;',
  '  string t = s.Replace(',
  '    "\\"", "\\"\\"");',
  '  return "\\"" + t + "\\"";',
  '}',
  '',
  'string r = EscapeCsv('
];
function g7Tab(key){
  var v = G7V[key];
  var found = g7Found(v), need = found.length > 0;
  var t = v.replace(/"/g, '""');
  var r = need ? '"' + t + '"' : v;
  var hasQ = v.indexOf('"') >= 0;
  return { inputs:[], chips:[],
    intro:'Giá trị ' + g7Show(v) + ' sắp được ghi thành một trường CSV. Xem nó đi qua từng trạm. Bấm "Bước tiếp".',
    lines:function(){ return G7FN.concat(['  ' + g7Lit(v) + ');']); },
    run:function(c){
      c.snap({ln:13, title:'Giá trị cần ghi', body:'Đây là giá trị của một trường: ' + g7Show(v) + '. Hàm EscapeCsv quyết định nó được ghi ra thế nào.', viz:[g7Flow(v), g7Result(v, 0)]});
      c.snap({ln:2, title:'Trạm 1: có ký tự đặc biệt không?',
        body:need ? 'Có ' + found.join(' và ') + ' trong giá trị, nên trường này phải được bọc trong nháy kép.' : 'Không có dấu phẩy, nháy kép hay xuống dòng nào, nên need là false.',
        viz:[g7Flow(v, need ? 'ok' : 'no'), g7Result(v, 0)]});
      if (!need){
        c.snap({ln:6, title:'Giữ nguyên', body:'need là false nên hàm trả về s luôn, không thay đổi gì.', viz:[g7Flow(v, 'no', 'dim', 'dim'), g7Result(v, -1)]});
      } else {
        c.snap({ln:7, title:'Trạm 2: nhân đôi nháy',
          body:hasQ ? 'Mỗi dấu " trong giá trị được viết thành hai dấu "". Dấu thêm vào được tô xanh.' : 'Giá trị không có dấu nháy kép, nên Replace không đổi gì.',
          viz:[g7Flow(v, 'ok', hasQ ? 'ok' : 'no'), g7Result(v, 1)]});
        c.snap({ln:9, title:'Bọc nháy kép', body:'Thêm một dấu " ở đầu và một dấu " ở cuối. Hai dấu mới được tô xanh.', viz:[g7Flow(v, 'ok', hasQ ? 'ok' : 'no', 'ok'), g7Result(v, 2)]});
      }
      r.split('\n').forEach(function(x){ c.out(x); });
      c.snap({ln:13, title:'Xong', body:'Kết quả r là ' + g7Show(r) + (need ? '. Đọc lại bằng bộ phân tích chuẩn sẽ ra đúng giá trị ban đầu.' : '. Không cần bọc nên giữ nguyên.'),
        note:'Ghi đúng quy tắc thì đọc lại bằng bộ phân tích chuẩn sẽ ra đúng giá trị ban đầu.',
        viz:[g7Flow(v, need ? 'ok' : 'no', need ? (hasQ ? 'ok' : 'no') : 'dim', need ? 'ok' : 'dim'), g7Result(v, need ? 2 : -1)]});
    }
  };
}
var EX = { but:g7Tab('but'), phay:g7Tab('phay'), nhay:g7Tab('nhay'), xd:g7Tab('xd') };
