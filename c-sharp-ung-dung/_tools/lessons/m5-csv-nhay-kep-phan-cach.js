// META {"module":5,"lesson":"Đọc dữ liệu từ File CSV","activity":"Xử lý các trường có dấu nháy kép và dấu phân cách đặc biệt","title":"Trường có nháy kép và dấu phẩy","lead":"Cùng một dòng CSV: bên trái cắt bằng Split(','), bên phải đọc từng ký tự theo trạng thái. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["phay","Dấu phẩy trong trường"],["nhay","Nháy kép trong trường"]],"codeTitle":"Mã nguồn C#"}
function g7Ev(line){
  var ev = [], cur = '', inQ = false, f = [];
  function push(k, i, len, extra){
    var e = {k:k, i:i, len:len, cur:cur, inQ:inQ, f:f.slice()};
    for (var x in extra) e[x] = extra[x];
    ev.push(e);
  }
  for (var i = 0; i < line.length; i++){
    var ch = line[i];
    if (ch === '"'){
      if (inQ && line[i + 1] === '"'){ cur += '"'; push('esc', i, 2); i++; }
      else { inQ = !inQ; push(inQ ? 'open' : 'close', i, 1); }
    } else if (ch === ',' && !inQ){
      f.push(cur); var done = cur; cur = ''; push('cut', i, 1, {chot:done});
    } else if (ch === ','){ cur += ch; push('keep', i, 1); }
    else cur += ch;
  }
  f.push(cur); push('end', line.length, 0, {chot:cur});
  return {ev:ev, f:f};
}
function g7Lit(s){ return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'; }
var G7 = {
  phay: 'SP04,"Bút, mực xanh",15000',
  nhay: 'SP05,"Sách ""C#"" cơ bản",90000'
};
function g7Left(line, hasTwoLines){
  var parts = line.split(',');
  var lit = g7Lit(line);
  var lines;
  if (hasTwoLines){
    var cutAt = lit.indexOf(' cơ bản');
    lines = ['string line =', '  ' + lit.slice(0, cutAt) + '"', '  + "' + lit.slice(cutAt).replace(/^ /, ' '), 'var parts = line.Split(\',\');', 'Console.WriteLine(parts.Length);'];
  } else {
    lines = ['string line =', '  ' + lit + ';', 'var parts = line.Split(\',\');', 'Console.WriteLine(parts.Length);'];
  }
  var o = hasTwoLines ? 1 : 0;
  lines[hasTwoLines ? 2 : 1] = lines[hasTwoLines ? 2 : 1].replace(/;?$/, ';').replace(/;;$/, ';');
  var sp = hasTwoLines ? 3 : 2, ln = hasTwoLines ? 4 : 3;
  var lineLast = hasTwoLines ? 2 : 1;
  function txt(hiCommas){
    var seg = [], buf = '';
    for (var i = 0; i < line.length; i++){
      if (line[i] === ','){ if (buf){ seg.push({t:buf}); buf = ''; } seg.push({t:',', s:hiCommas ? 'bad' : ''}); }
      else buf += line[i];
    }
    if (buf) seg.push({t:buf});
    return vText([{seg:seg}], {title:'Dòng CSV', noNo:true});
  }
  function cells(){
    return vCells(parts.map(function(p, i){
      var s = 'ok', sub;
      if (!hasTwoLines && (i === 1 || i === 2)){ s = 'bad'; sub = 'mảnh của một trường'; }
      if (hasTwoLines && i === 1){ s = 'bad'; sub = 'còn nháy bao và nháy đôi'; }
      return {v:p, s:s, sub:sub};
    }), {name:'parts (kết quả Split)'});
  }
  var tail = hasTwoLines
    ? 'Split vẫn cho ' + parts.length + ' phần, nhưng phần giữa còn nguyên nháy bao quanh và nháy đôi: ' + parts[1] + '. Đó chưa phải giá trị đúng.'
    : 'Split cho ' + parts.length + ' phần thay vì 3. Một trường đã bị cắt vỡ làm ' + (parts.length - 2) + ' mảnh.';
  return {
    title:'Split(\',\')', sub:'Cắt ở mọi dấu phẩy.', lines:lines,
    run:function(c){
      c.snap({ln:0, title:'Dòng CSV', body:'Đây là một dòng có 3 trường. Trường giữa nằm trong nháy kép.', viz:[txt(false)]});
      c.snap({ln:sp, title:'Gọi Split(\',\')', body:'Split chỉ nhìn thấy ký tự dấu phẩy, nó không biết dấu phẩy nào nằm trong nháy. Nó cắt ở mọi dấu phẩy.', viz:[txt(true)]});
      c.snap({ln:sp, title:'Mảng parts', body:tail, viz:[txt(true), cells()]});
      c.out(String(parts.length));
      c.snap({ln:ln, title:'In parts.Length', body:hasTwoLines ? 'Số lượng trông có vẻ đúng, nhưng giá trị bên trong thì sai.' : 'In ra ' + parts.length + ', trong khi dòng chỉ có 3 trường. Cách này sai.', viz:[cells(), vCard({kind:'err', title:hasTwoLines ? 'Giá trị sai' : 'Sai: ' + parts.length + ' trường', sub:hasTwoLines ? parts[1] + ' (còn nháy thừa)' : 'đúng phải là 3 trường'})]});
      c.snap({ln:ln, title:'Xong', body:'Split(\',\') chỉ hợp với dữ liệu đơn giản, không có dấu phẩy hay nháy trong trường.', note:'Split(\',\') không hiểu nháy kép, nên không dùng được khi trường có thể chứa dấu phẩy hoặc nháy.', viz:[cells()]});
    }
  };
}
function g7Right(line){
  var R = g7Ev(line);
  var lines = ['// line: dòng CSV đang đọc', 'var fields = new List<string>();', 'var cur = new StringBuilder();', 'bool inQuote = false;', 'for (int i = 0; i < line.Length; i++)', '{', '  char ch = line[i];', '  if (ch == \'"\')', '  {', '    if (inQuote && i + 1 < line.Length', '        && line[i + 1] == \'"\')', '    {', '      cur.Append(\'"\'); i++;', '    }', '    else inQuote = !inQuote;', '  }', '  else if (ch == \',\' && !inQuote)', '  {', '    fields.Add(cur.ToString());', '    cur.Clear();', '  }', '  else cur.Append(ch);', '}', 'fields.Add(cur.ToString());'];
  var LN = {cut:18, open:14, close:14, esc:12, keep:21, end:23};
  function view(e, hiS){
    var f = e ? e.f : [], inQ = e ? e.inQ : false, cur = e ? e.cur : '';
    var seg;
    if (!e) seg = [{t:line}];
    else if (e.k === 'end') seg = [{t:line, s:'ok'}, {t:' ⏎ hết dòng', s:'hi'}];
    else seg = [{t:line.slice(0, e.i), s:'ok'}, {t:line.substr(e.i, e.len), s:hiS}, {t:line.slice(e.i + e.len)}];
    return [
      vText([{seg:seg}], {title:'Dòng CSV', noNo:true}),
      vCells(f.map(function(x, i){ return {v:x, s:(e && i === f.length - 1 && (e.k === 'cut' || e.k === 'end')) ? 'new' : 'ok'}; }), {name:'fields (kết quả)', cap:3, badges:[['Trong nháy', inQ ? 'Có' : 'Không'], ['cur', cur === '' ? '(trống)' : cur]]})
    ];
  }
  return {
    title:'Bộ phân tích theo trạng thái', sub:'Đi từng ký tự, nhớ đang trong nháy hay không.', lines:lines,
    run:function(c){
      c.snap({ln:3, title:'Chuẩn bị', body:'Có ba thứ cần nhớ: danh sách trường xong, trường đang ghép (cur) và cờ inQuote cho biết đang trong nháy hay không. Ban đầu inQuote là false.', viz:view(null)});
      R.ev.forEach(function(e){
        var q = '"' + e.chot + '"', t, b, s = 'hi';
        if (e.k === 'cut'){ t = 'Dấu phẩy ngoài nháy'; b = 'Gom các ký tự trước đó, gặp dấu phẩy khi inQuote là false: chốt trường ' + q + ' và bắt đầu trường mới.'; }
        else if (e.k === 'open'){ t = 'Nháy mở'; b = 'Gặp nháy kép khi chưa trong nháy. Nháy chỉ là dấu bao quanh, không đưa vào giá trị. inQuote chuyển thành true.'; }
        else if (e.k === 'keep'){ t = 'Dấu phẩy trong nháy'; b = 'Gặp dấu phẩy nhưng inQuote đang là true, nên đây là một ký tự của dữ liệu. Giữ lại trong cur, không cắt.'; s = 'no'; }
        else if (e.k === 'esc'){ t = 'Hai nháy liền nhau'; b = 'Trong nháy, hai dấu " đứng liền nhau nghĩa là một ký tự nháy. Thêm một dấu " vào cur rồi nhảy qua dấu thứ hai. Giá trị đang là ' + e.cur + '.'; }
        else if (e.k === 'close'){ t = 'Nháy đóng'; b = 'Gom các ký tự trong nháy vào cur. Gặp nháy kép mà sau đó không phải nháy nữa: đây là nháy đóng, inQuote trở về false.'; }
        else { t = 'Hết dòng'; b = 'Không còn ký tự nào. Chốt nốt trường cuối cùng ' + q + '.'; }
        c.snap({ln:LN[e.k], title:t, body:b, viz:view(e, s)});
      });
      var last = R.ev[R.ev.length - 1];
      c.snap({ln:23, title:'Xong', body:'Kết quả có ' + R.f.length + ' trường đúng: ' + R.f.map(function(x){ return '"' + x + '"'; }).join(', ') + '.', note:'Trường chứa dấu phẩy, nháy kép hoặc xuống dòng được bọc trong nháy kép; nháy bên trong viết thành "" (theo RFC 4180).', viz:view({k:'end', i:line.length, len:0, f:last.f, inQ:false, cur:last.cur}, 'ok')});
    }
  };
}
function g7Tab(key){
  var line = G7[key], L = g7Left(line, key === 'nhay'), Rt = g7Right(line), R = g7Ev(line);
  var lc = L.title ? L : L;
  var f = R.f.map(function(x){ return '"' + x + '"'; }).join(', ');
  var leftCnt = line.split(',').length;
  return {
    intro:key === 'phay' ? 'Dòng SP04 có tên sản phẩm chứa dấu phẩy. Bấm "Bước tiếp" để xem hai cách đọc cùng một dòng.' : 'Dòng SP05 có nháy kép nằm ngay trong tên sản phẩm. Bấm "Bước tiếp" để xem hai cách đọc cùng một dòng.',
    running:'Bên trái cắt một lần bằng Split. Bên phải đi từng ký tự và nhớ trạng thái trong nháy.',
    done:key === 'phay'
      ? 'Bên trái ra ' + leftCnt + ' trường (sai). Bên phải ra ' + R.f.length + ' trường đúng: ' + f + '.'
      : 'Bên trái giữ nguyên nháy bao và nháy đôi. Bên phải ra ' + R.f.length + ' trường đúng, trường giữa là ' + R.f[1] + '.',
    note:'Trường chứa dấu phẩy, nháy kép hoặc xuống dòng được bọc trong nháy kép; nháy bên trong viết thành "" (theo RFC 4180).',
    cols:[lc, Rt]
  };
}
var EX = { phay:g7Tab('phay'), nhay:g7Tab('nhay') };
