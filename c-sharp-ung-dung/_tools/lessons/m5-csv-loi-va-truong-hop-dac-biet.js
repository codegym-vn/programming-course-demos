// META {"module":5,"lesson":"Xử lý CSV nâng cao và Ứng dụng thực tế","activity":"Xử lý các trường hợp đặc biệt và lỗi trong CSV","title":"Đọc CSV bẩn mà không sập","lead":"Tệp có dòng trống, dòng thiếu cột và dòng sai kiểu. Bấm <b>Bước tiếp</b> để xem từng dòng được kiểm tra.","tabs":[["bn","Tệp CSV bẩn"]],"codeTitle":"Mã nguồn C#"}
var G7R = ['Ma,Ten,Gia', 'SP01,Bút,5000', '', 'SP02,Vở', 'SP03,Thước,abc', 'SP04,Tẩy,3000'];
function g7Eval(i){
  var line = G7R[i], p = line.split(',');
  if (line.trim() === '') return {k:'skip', why:'dòng trống'};
  if (p.length !== 3) return {k:'bad', msg:'Dòng ' + (i + 1) + ': cần 3 cột, có ' + p.length, chk:1};
  if (!/^-?\d+$/.test(p[2])) return {k:'bad', msg:'Dòng ' + (i + 1) + ': giá không hợp lệ', chk:2};
  return {k:'good', t:p.join(' | ')};
}
function g7View(cur, st){
  // cur: chỉ số dòng đang xét (-1 chưa); st: trạng thái từng dòng; chk: mảng s 3 kiểm tra
  var good = [], bad = [];
  for (var i = 1; i < G7R.length; i++){
    if (st[i] === 'good') good.push({t:'Dòng ' + (i + 1) + ': ' + G7R[i], s:cur === i ? 'new' : ''});
    if (st[i] === 'bad') bad.push({t:g7Eval(i).msg, s:cur === i ? 'new' : ''});
  }
  return good.length + bad.length >= 0 ? {good:good, bad:bad} : null;
}
function g7Viz(cur, st, chk){
  var lines = G7R.map(function(x, i){
    var s = st[i] === 'good' ? 'ok' : st[i] === 'bad' ? 'bad' : st[i] === 'skip' ? 'dim' : '';
    if (i === cur && !s) s = 'hi';
    return {t:x, s:s};
  });
  var v = g7View(cur, st);
  return [
    vText(lines, {title:'sp.csv', cursor:cur >= 0 ? cur : undefined, eol:true}),
    vFlow([
      {t:'Dòng trống?', s:chk[0] || 'dim'},
      {t:'Đủ 3 cột?', s:chk[1] || 'dim'},
      {t:'Giá là số?', s:chk[2] || 'dim'}
    ], {title:'Các kiểm tra'}),
    vBins({title:'Hợp lệ', items:v.good, kind:'ok'}, {title:'Lỗi', items:v.bad, kind:'bad'})
  ];
}
var EX = { bn:{ inputs:[], chips:[],
  intro:'Tệp có 6 dòng, trong đó có dòng hỏng. Chương trình phải đọc hết, giữ dòng tốt và ghi lại lỗi. Bấm "Bước tiếp".',
  lines:function(){ return [
    'var good = new List<Product>();',
    'var bad = new List<string>();',
    'var rows = File.ReadAllLines(path);',
    'for (int i = 1; i < rows.Length; i++)',
    '{',
    '  string line = rows[i];',
    '  if (line.Trim() == "") continue;',
    '  var p = line.Split(\',\');',
    '  if (p.Length != 3)',
    '  {',
    '    bad.Add("Dòng " + (i + 1)',
    '      + ": cần 3 cột, có "',
    '      + p.Length);',
    '    continue;',
    '  }',
    '  if (!int.TryParse(p[2], out int gia))',
    '  {',
    '    bad.Add("Dòng " + (i + 1)',
    '      + ": giá không hợp lệ");',
    '    continue;',
    '  }',
    '  good.Add(new Product(p[0],',
    '    p[1], gia));',
    '}'
  ]; },
  run:function(c){
    var st = {}, nGood = 0, nBad = 0;
    c.snap({ln:2, title:'Đọc cả tệp và bỏ tiêu đề', body:'ReadAllLines đọc ' + G7R.length + ' dòng. Vòng for bắt đầu từ i = 1 nên dòng 1 (tiêu đề) được bỏ qua.', vars:[['rows.Length', G7R.length]], viz:g7Viz(0, {0:'skip'}, [])});
    st = {0:'skip'};
    var steps = [
      {ln:21, t:'Dòng 2 hợp lệ', b:function(e){ return 'Không trống, có đủ 3 cột và giá 5000 là số, nên Product được thêm vào danh sách Hợp lệ.'; }},
      {ln:6, t:'Dòng 3 trống', b:function(){ return 'Dòng trống thì continue, bỏ qua luôn. Đây không phải lỗi nên không ghi vào thùng Lỗi.'; }},
      {ln:10, t:'Dòng 4 thiếu cột', b:function(e){ return 'Split chỉ cho 2 phần thay vì 3, nên ghi lỗi kèm số dòng: "' + e.msg + '".'; }},
      {ln:17, t:'Dòng 5 sai giá', b:function(e){ return 'TryParse("abc") thất bại, nên ghi lỗi: "' + e.msg + '". Chương trình vẫn không sập.'; }},
      {ln:21, t:'Dòng 6 hợp lệ', b:function(){ return 'Dòng cuối đủ 3 cột và giá 3000 là số, nên được thêm vào Hợp lệ.'; }}
    ];
    steps.forEach(function(sp, k){
      var i = k + 1, e = g7Eval(i), chk;
      st[i] = e.k;
      if (e.k === 'good'){ nGood++; chk = ['ok', 'ok', 'ok']; }
      else if (e.k === 'skip') chk = ['hi'];
      else if (e.chk === 1) chk = ['ok', 'bad'];
      else chk = ['ok', 'ok', 'bad'];
      if (e.k === 'skip') chk = ['hi', 'dim', 'dim'];
      if (e.k === 'bad') nBad++;
      c.snap({ln:sp.ln, title:sp.t, body:sp.b(e), vars:[['i', i], ['hợp lệ', nGood], ['lỗi', nBad]], viz:g7Viz(i, st, chk)});
    });
    c.snap({ln:23, title:'Xong', body:'Kết quả: ' + nGood + ' dòng hợp lệ và ' + nBad + ' dòng lỗi, mỗi lỗi có số dòng để người dùng tự sửa.', note:'Không để một dòng hỏng làm hỏng cả tệp; ghi lại số dòng để người dùng sửa.', vars:[['hợp lệ', nGood], ['lỗi', nBad]], viz:g7Viz(-1, st, [])});
  }
}};
