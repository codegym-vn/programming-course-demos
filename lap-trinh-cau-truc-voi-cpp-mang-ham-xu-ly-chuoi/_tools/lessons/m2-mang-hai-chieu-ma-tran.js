// META {"module":2,"lesson":"Bài 2.4. Mảng hai chiều (ma trận)","activity":"Mảng Hai Chiều (Ma Trận)","title":"Ma trận: hàng, cột và hai vòng lặp lồng nhau","lead":"Xem một ô của ma trận được tìm bằng [hàng][cột], rồi hai vòng lặp lồng nhau duyệt cả bảng. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["truycap","Truy cập diem[1][2]"],["inbang","In bảng bằng vòng lặp lồng nhau"],["tongmax","Tổng và max kèm (hàng, cột)"]],"codeTitle":"Mã nguồn C++","path":"ky-thuat-xu-ly-mang-va-thuat-toan-co-ban/mang-hai-chieu-ma-tran/mang-hai-chieu-ma-tran/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Ma trận điểm: 3 hàng x 4 cột';

var B6M = [[8, 9, 7, 10], [6, 5, 8, 9], [7, 8, 6, 10]];
var B6DECL = ['int diem[3][4] = {', '  {8, 9, 7, 10},', '  {6, 5, 8, 9},', '  {7, 8, 6, 10}', '};'];
function b6ix(lines, text){ for (var i = 0; i < lines.length; i++) if (lines[i].trim().indexOf(text) === 0) return i; return 0; }
/* lưới: st(r, c) trả về trạng thái ô; hi = [r, c] để hiện mũi tên hàng/cột */
function b6grid(st, hi, note){
  var rows = B6M.map(function(row, r){ return row.map(function(v, c){ return {v:v, s:st ? (st(r, c) || '') : ''}; }); });
  return vGrid2D(rows, {name:'diem', hi:hi, note:note});
}

var EX = {
truycap:{inputs:[], chips:[],
 intro:'Mỗi ô của ma trận có hai chỉ số: hàng trước, cột sau. Bấm "Bước tiếp".',
 lines:function(){ return B6DECL.concat(['cout << "diem[0][0] = "', '     << diem[0][0] << endl;', 'cout << "diem[1][2] = "', '     << diem[1][2] << endl;', 'cout << "diem[2][3] = "', '     << diem[2][3] << endl;']); },
 run:function(c){
  var L = B6DECL.concat(['cout << "diem[0][0] = "', '     << diem[0][0] << endl;', 'cout << "diem[1][2] = "', '     << diem[1][2] << endl;', 'cout << "diem[2][3] = "', '     << diem[2][3] << endl;']);
  c.snap({ln:0, title:'Khai báo ma trận 3 x 4',
   body:'diem là một bảng 3 hàng, 4 cột. Mỗi hàng là một mảng nhỏ, ba hàng xếp chồng lên nhau. Chỉ số hàng và cột đều bắt đầu từ 0.',
   viz:b6grid(null, null)});
  c.out('diem[0][0] = 8');
  c.snap({ln:5, title:'diem[0][0]',
   body:'Hàng 0, cột 0: ô ở góc trên bên trái, giá trị 8.',
   viz:b6grid(null, [0, 0])});
  c.snap({ln:7, title:'diem[1][2]: chọn hàng trước',
   body:'Số đầu tiên trong [1][2] là hàng. Hàng 1 sáng lên: cả khay {6, 5, 8, 9}.',
   viz:b6grid(function(r){ return r === 1 ? 'hi' : ''; }, null)});
  c.out('diem[1][2] = 8');
  c.snap({ln:7, title:'diem[1][2]: rồi chọn cột',
   body:'Số thứ hai là cột. Trong hàng 1, đi tới cột 2: ô giao nhau có giá trị 8.',
   viz:b6grid(function(r){ return r === 1 ? 'hi' : ''; }, [1, 2])});
  c.out('diem[2][3] = 10');
  c.snap({ln:9, title:'diem[2][3]',
   body:'Hàng 2, cột 3: ô cuối cùng của ma trận, giá trị 10.',
   note:'Viết [hàng][cột]: chỉ số đầu là hàng, chỉ số sau là cột. Đổi chỗ hai số là sang ô khác, ví dụ diem[0][1] là 9 còn diem[1][0] là 6.',
   viz:b6grid(null, [2, 3])});
 }},

inbang:{inputs:[], chips:[],
 intro:'Vòng ngoài đi theo hàng, vòng trong đi theo cột. Bấm "Bước tiếp" và để ý khi nào xuống dòng.',
 lines:function(){ return B6DECL.concat(['for (int hang = 0; hang < 3; hang++) {', '  for (int cot = 0; cot < 4; cot++) {', '    cout << diem[hang][cot] << "\\t";', '  }', '  cout << endl;', '}']); },
 run:function(c){
  var L = B6DECL.concat(['for (int hang = 0; hang < 3; hang++) {', '  for (int cot = 0; cot < 4; cot++) {', '    cout << diem[hang][cot] << "\\t";', '  }', '  cout << endl;', '}']);
  var lnPrint = b6ix(L, 'cout << diem'), lnEndl = b6ix(L, 'cout << endl'), lnFor = b6ix(L, 'for (int hang');
  function rowCells(h, upto){ return function(r, cc){ return r < h || (r === h && cc <= upto) ? 'ok' : ''; }; }
  c.snap({ln:lnFor, title:'hang = 0: vòng ngoài bắt đầu',
   body:'Vòng ngoài chọn hàng 0. Với mỗi hàng, vòng trong sẽ đi hết các cột của hàng đó.',
   viz:b6grid(null, null)});
  c.write('8\t');
  c.snap({ln:lnPrint, title:'hang = 0, cot = 0',
   body:'In diem[0][0] = 8 rồi dấu tab. Lệnh này không có endl nên con trỏ vẫn đứng trên cùng một dòng.',
   viz:b6grid(function(r, cc){ return ''; }, [0, 0])});
  c.write('9\t'); c.write('7\t'); c.write('10\t');
  c.snap({ln:lnPrint, title:'cot = 1, 2, 3',
   body:'Vòng trong chạy tiếp các cột 1, 2, 3 (gộp thành một bước): in 9, 7, 10 nối vào cùng dòng.',
   viz:b6grid(rowCells(0, 3), [0, 3])});
  c.out('');
  c.snap({ln:lnEndl, title:'Hết vòng cột: endl',
   body:'Vòng trong đã xong cả hàng 0. Bây giờ mới tới lệnh endl, nằm trong vòng ngoài nhưng ngoài vòng trong: xuống dòng một lần.',
   viz:b6grid(rowCells(0, 3), null)});
  c.write('6\t5\t8\t9\t'); c.out('');
  c.snap({ln:lnEndl, title:'hang = 1',
   body:'Vòng ngoài sang hàng 1. Vòng trong in 6 5 8 9 trên một dòng, rồi endl xuống dòng.',
   viz:b6grid(rowCells(1, 3), null)});
  c.write('7\t8\t6\t10\t'); c.out('');
  c.snap({ln:lnEndl, title:'hang = 2',
   body:'Hàng 2 làm tương tự: in 7 8 6 10, rồi xuống dòng. Console ra đúng hình dạng 3 dòng của ma trận.',
   viz:b6grid(rowCells(2, 3), null)});
  var good = B6M.map(function(row){ return row.join('  '); }), bad = [];
  B6M[0].forEach(function(v){ bad.push(String(v)); });
  bad.push('6', '... (tiếp tục, tổng cộng 12 dòng)');
  c.snap({ln:lnEndl, title:'Nếu đặt endl sai chỗ',
   body:'Thử đặt cout << endl; vào trong vòng cột: sẽ xuống dòng sau mỗi số, thành 12 dòng và mất hình bảng.',
   note:'Vòng ngoài là hàng, vòng trong là cột. Đặt endl ngay sau vòng cột (trong vòng hàng) để xuống dòng sau mỗi hàng.',
   viz:[vText(good, {noNo:true, title:'endl ngoài vòng cột (đúng): 3 dòng'}), vText(bad, {noNo:true, title:'endl trong vòng cột (sai): mỗi số một dòng'})]});
 }},

tongmax:{inputs:[], chips:[],
 intro:'Cộng tất cả các ô và tìm ô lớn nhất, nhớ cả hàng lẫn cột. Bấm "Bước tiếp".',
 lines:function(){ return ['int tong = 0;', 'int maxVal = diem[0][0];', 'int hangMax = 0, cotMax = 0;', 'for (int hang = 0; hang < 3; hang++) {', '  for (int cot = 0; cot < 4; cot++) {', '    tong += diem[hang][cot];', '    if (diem[hang][cot] > maxVal) {', '      maxVal = diem[hang][cot];', '      hangMax = hang;', '      cotMax = cot;', '    }', '  }', '}', 'cout << "Tong: " << tong << endl;', 'cout << "Gia tri lon nhat: "', '     << maxVal << " (tai hang "', '     << hangMax << ", cot "', '     << cotMax << ")" << endl;']; },
 run:function(c){
  var L = ['int tong = 0;', 'int maxVal = diem[0][0];', 'int hangMax = 0, cotMax = 0;', 'for (int hang = 0; hang < 3; hang++) {', '  for (int cot = 0; cot < 4; cot++) {', '    tong += diem[hang][cot];', '    if (diem[hang][cot] > maxVal) {', '      maxVal = diem[hang][cot];', '      hangMax = hang;', '      cotMax = cot;', '    }', '  }', '}', 'cout << "Tong: " << tong << endl;', 'cout << "Gia tri lon nhat: "', '     << maxVal << " (tai hang "', '     << hangMax << ", cot "', '     << cotMax << ")" << endl;'];
  var tong = 0, mx = B6M[0][0], hm = 0, cm = 0, snapAt = {};   /* trạng thái sau mỗi ô */
  var trail = [];
  B6M.forEach(function(row, r){ row.forEach(function(v, cc){
   var ch = false; tong += v; if (v > mx) { mx = v; hm = r; cm = cc; ch = true; }
   trail.push({k:trail.length, r:r, c:cc, v:v, tong:tong, mx:mx, hm:hm, cm:cm, ch:ch, tie:(v === mx && !ch && (r !== hm || cc !== cm))});
  }); });
  function Acc(t, from, ch){   /* from: chỉ số ô đầu của bước; null = không hiện phép cộng */
   var op = '';
   if (from !== null) { var base = from > 0 ? trail[from - 1].tong : 0, parts = []; for (var q = from; q <= t.k; q++) parts.push(trail[q].v); op = base + ' + ' + parts.join(' + ') + ' = ' + t.tong; }
   return vAcc([{k:'tong', v:t.tong, op:op, s:from !== null ? 'hi' : ''}, {k:'maxVal', v:t.mx, crown:true, s:ch ? 'new' : ''}, {k:'hangMax', v:t.hm}, {k:'cotMax', v:t.cm}]); }
  function G(upto, cur, crown){   /* upto: chỉ số trong trail đã xử lý xong; crown: [r,c] ô giữ max */
   return b6grid(function(r, cc){ var k = r * 4 + cc; if (cur.indexOf(k) >= 0) return 'hi'; if (crown && r === crown[0] && cc === crown[1]) return 'ok'; return ''; }, cur.length === 1 ? [Math.floor(cur[0] / 4), cur[0] % 4] : null, 'Ô xanh = ô đang giữ số lớn nhất (♛)');
  }
  c.snap({ln:2, title:'Khởi tạo tong và maxVal',
   body:'tong bắt đầu từ 0. maxVal bắt đầu bằng ô đầu tiên diem[0][0] = 8, vị trí (hàng 0, cột 0). Giống mảng một chiều, nhưng nhớ hai chỉ số.',
   viz:[G(-1, [], [0, 0]), vAcc([{k:'tong', v:0}, {k:'maxVal', v:8, crown:true}, {k:'hangMax', v:0}, {k:'cotMax', v:0}])]});
  var t0 = trail[0];
  c.snap({ln:5, title:'hang = 0, cot = 0',
   body:'Ô (0, 0) = 8: tong = 0 + 8 = 8. 8 không lớn hơn maxVal (đang là 8) nên max giữ nguyên.',
   viz:[G(0, [0], [0, 0]), Acc(t0, 0, false)]});
  var t1 = trail[1];
  c.snap({ln:7, title:'hang = 0, cot = 1',
   body:'Ô (0, 1) = 9: tong = ' + trail[0].tong + ' + 9 = ' + t1.tong + '. 9 lớn hơn 8 nên maxVal = 9 và vị trí đổi thành (0, 1).',
   viz:[G(1, [1], [0, 1]), Acc(t1, 1, true)]});
  var t3 = trail[3];
  c.snap({ln:7, title:'hang = 0, cot = 2 và 3',
   body:'Ô (0, 2) = 7 không phá kỷ lục. Ô (0, 3) = 10 lớn hơn 9 nên maxVal = 10 tại (0, 3). Cộng dồn: tong = ' + t3.tong + '.',
   viz:[G(3, [2, 3], [0, 3]), Acc(t3, 2, true)]});
  var t7 = trail[7];
  c.snap({ln:5, title:'hang = 1: cả hàng',
   body:'Hàng 1 gồm 6, 5, 8, 9: không số nào lớn hơn 10, nên max giữ nguyên. tong cộng thêm 28, thành ' + t7.tong + '.',
   viz:[G(7, [4, 5, 6, 7], [0, 3]), Acc(t7, 4, false)]});
  var t11 = trail[11];
  c.snap({ln:6, title:'hang = 2: số 10 thứ hai',
   body:'Hàng 2 gồm 7, 8, 6, 10. Ô (2, 3) cũng là 10, nhưng 10 > 10 là sai, nên không cập nhật: vị trí vẫn là (0, 3), ô xuất hiện đầu tiên. tong = ' + t11.tong + '.',
   viz:[G(11, [8, 9, 10, 11], [0, 3]), Acc(t11, 8, false)]});
  c.out('Tong: ' + t11.tong);
  c.out('Gia tri lon nhat: ' + t11.mx + ' (tai hang ' + t11.hm + ', cot ' + t11.cm + ')');
  c.snap({ln:13, title:'Xong',
   body:'In ra tổng ' + t11.tong + ' và giá trị lớn nhất ' + t11.mx + ' tại (hàng ' + t11.hm + ', cột ' + t11.cm + ').',
   note:'Mọi kỹ thuật của mảng một chiều dùng lại được cho ma trận, chỉ cần thêm một chỉ số. Dùng > (không phải >=) thì giữ vị trí xuất hiện đầu tiên.',
   viz:[G(11, [], [t11.hm, t11.cm]), Acc(t11, null, false)]});
 }}
};
