// META {"module":4,"lesson":"Bài 4.2. break và continue","activity":"Từ Khóa Đặc Biệt: Break Và Continue","title":"break dừng hẳn, continue bỏ lượt","lead":"Xem hai từ khóa làm vòng lặp đổi hướng thế nào, rồi xem break trong vòng lồng nhau. Chọn ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["brk","break: tìm số chia hết cho 7"],["cont","continue: in số lẻ 1..10"],["nest","break trong vòng lồng nhau"],["flag","Cờ hiệu: tìm i*j = 6"],["wh","continue trong while"]],"codeTitle":"Mã nguồn C++","path":"vong-lap/break-va-continue/tu-khoa-dac-biet-break-va-continue/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';

/* dải ô số cho tab break / continue. st: hàm trả trạng thái từng số */
function b17Row(n, st, name){
  var a = []; for (var i = 1; i <= n; i++) { var x = st(i); a.push({v:i, s:x[0], sub:x[1]}); }
  return vCells(a, {name:name, idx:false});
}
function b17Out(from, to, tt, s1, s2){
  return vFlow([{t:from, s:s1 || 'bad'}, {t:to, s:s2 || 'ok'}], {title:tt});
}

var EX = {
brk:{inputs:[],
 intro:'Vòng lặp tìm số chia hết cho 7 trong khoảng 1..100. Hãy để ý vòng lặp dừng ở đâu. Bấm "Bước tiếp".',
 lines:function(){ return [
  'for (int i = 1; i <= 100; i++) {',
  '  if (i % 7 == 0) {',
  '    cout << "Da tim thay so: "',
  '         << i << endl;',
  '    break;',
  '  }',
  '}',
  'cout << "Code chay den day"',
  '     << " sau khi break" << endl;']; },
 run:function(c){
  var N = 10, f = 1; while (f % 7 !== 0) f++;   /* f = 7 */
  var nm = 'Lượt i trong 1..100 (hiện 10 ô đầu)';
  var sc = function(n){ return vScore([{k:'Số lượt đã chạy', v:n}]); };
  c.snap({ln:0, title:'Bắt đầu vòng lặp', body:'i bắt đầu từ 1. Vòng lặp có thể chạy tới 100 lượt, mỗi lượt kiểm tra xem i có chia hết cho 7 không.',
   viz:[b17Row(N, function(i){ return [i === 1 ? 'hi' : null]; }, nm), sc(0)]});
  c.snap({ln:1, title:'i = 1: 1 % 7 = 1', body:'1 chia 7 dư 1, khác 0 nên điều kiện sai. Lượt này không in gì, vòng lặp sang i = 2.',
   viz:[b17Row(N, function(i){ return [i === 1 ? 'ok' : i === 2 ? 'hi' : null]; }, nm), sc(1)]});
  c.snap({ln:1, title:'i = 2 đến 6: đều không chia hết', body:'Từ 2 đến 6 đều chia 7 có dư, điều kiện luôn sai. Sáu lượt đã chạy mà chưa tìm thấy gì.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'hi' : null]; }, nm), sc(f - 1)]});
  c.snap({ln:1, title:'i = 7: 7 % 7 = 0', body:'Lần đầu tiên 7 chia hết cho 7, điều kiện đúng. Chương trình vào thân if.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'hi' : null]; }, nm), sc(f)]});
  c.out('Da tim thay so: ' + f);
  c.snap({ln:2, title:'In số tìm được', body:'Máy in "Da tim thay so: 7". Lệnh tiếp theo là break.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'hi' : null]; }, nm), sc(f)]});
  c.snap({ln:4, title:'break: dừng hẳn vòng lặp', body:'break thoát khỏi vòng lặp ngay, dù i <= 100 vẫn còn đúng. Các lượt i = 8 đến 100 sẽ không bao giờ chạy.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'bad' : 'dim', i === f ? 'break' : null]; }, nm), sc(f),
    b17Out('Vòng lặp (bị break)', 'Lệnh sau vòng lặp', 'Luồng chạy')]});
  c.out('Code chay den day sau khi break');
  c.snap({ln:7, title:'Chạy tiếp sau vòng lặp', body:'Máy nhảy thẳng ra ngoài dấu } của vòng lặp và chạy lệnh cout kế tiếp.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'bad' : 'dim']; }, nm), sc(f), b17Out('Vòng lặp (đã thoát)', 'Lệnh sau vòng lặp', 'Luồng chạy', 'dim', 'hi')]});
  c.snap({ln:8, title:'Xong', body:'Chỉ ' + f + ' lượt được chạy thay vì 100 lượt.',
   note:'break thoát hẳn khỏi vòng lặp gần nhất, bất kể điều kiện vòng lặp còn đúng hay sai.',
   viz:[b17Row(N, function(i){ return [i < f ? 'ok' : i === f ? 'bad' : 'dim']; }, nm), sc(f)]});
 }},
cont:{inputs:[],
 intro:'Vòng lặp in các số lẻ từ 1 đến 10. Hãy để ý số chẵn bị bỏ qua thế nào. Bấm "Bước tiếp".',
 lines:function(){ return [
  'for (int i = 1; i <= 10; i++) {',
  '  if (i % 2 == 0) {',
  '    continue;',
  '  }',
  '  cout << i << " ";',
  '}']; },
 run:function(c){
  var N = 10, nm = 'Lượt i = 1..10';
  var printed = [];
  function st(upto, cur, curKind){ return function(i){
    if (i > upto) return [i === cur ? 'hi' : null];
    if (i === cur) return [curKind, curKind === 'no' ? 'bỏ lượt' : null];
    return i % 2 === 0 ? ['no', 'bỏ lượt'] : ['ok']; }; }
  function sc(){ return vScore([{k:'Đã in', v:printed.length ? printed.join(' ') : '(chưa có)'}]); }
  c.snap({ln:0, title:'Bắt đầu vòng lặp', body:'i chạy từ 1 đến 10. Mỗi lượt sẽ kiểm tra i có chẵn không.', viz:[b17Row(N, st(0, 1, 'hi'), nm), sc()]});
  c.write('1 '); printed.push(1);
  c.snap({ln:4, title:'i = 1: số lẻ, được in', body:'1 % 2 = 1 nên không vào if. Lượt này chạy hết, máy in 1.', viz:[b17Row(N, st(1, 2, 'hi'), nm), sc()]});
  c.snap({ln:2, title:'i = 2: continue', body:'2 % 2 = 0, điều kiện đúng nên gặp continue. Lệnh cout bên dưới bị bỏ qua.',
   viz:[b17Row(N, st(2, 2, 'no'), nm), sc(), vFlow([{t:'Thân vòng lặp', s:'no', sub:'bỏ phần còn lại'}, {t:'i++', s:'hi', sub:'nhảy thẳng tới đây'}], {title:'continue nhảy tới đâu'})]});
  c.write('3 '); printed.push(3);
  c.snap({ln:4, title:'i = 3: được in', body:'Vòng lặp vẫn chạy bình thường. Sau continue, i++ làm i thành 3 và máy in 3.', viz:[b17Row(N, st(3, 4, 'hi'), nm), sc()]});
  c.snap({ln:2, title:'i = 4: lại continue', body:'Số chẵn nào cũng bị continue bỏ lượt, không in.', viz:[b17Row(N, st(4, 4, 'no'), nm), sc()]});
  c.write('5 7 9 '); printed.push(5, 7, 9);
  c.snap({ln:4, title:'i = 5 đến 9', body:'Số lẻ 5, 7, 9 được in; số chẵn 6, 8 bị bỏ lượt.', viz:[b17Row(N, st(9, 10, 'hi'), nm), sc()]});
  c.out('');
  c.snap({ln:2, title:'i = 10: continue rồi kết thúc', body:'10 là số chẵn nên bị bỏ lượt. i++ làm i = 11, điều kiện i <= 10 sai nên vòng lặp kết thúc.', viz:[b17Row(N, st(10, 10, 'no'), nm), sc()]});
  c.snap({ln:5, title:'Xong', body:'Màn hình hiện 1 3 5 7 9. Vòng lặp vẫn chạy đủ 10 lượt, chỉ 5 lượt bị cắt ngắn.',
   note:'continue chỉ bỏ phần còn lại của lượt hiện tại; trong for, máy vẫn chạy bước cập nhật i++ rồi sang lượt kế tiếp.',
   viz:[b17Row(N, st(10, 0, 'no'), nm), sc()]});
 }},
nest:{inputs:[],
 intro:'Hai vòng lặp lồng nhau, vòng con có break. Hãy để ý break chỉ ảnh hưởng vòng con. Bấm "Bước tiếp".',
 lines:function(){ return [
  'for (int i = 0; i < 3; i++) {',
  '  for (int j = 0; j < 3; j++) {',
  '    if (j == 1) {',
  '      break;',
  '    }',
  '    cout << j << " ";',
  '  }',
  '  cout << endl;',
  '}']; },
 run:function(c){
  /* rows[i] = mảng trạng thái ô j */
  var rows = [[null, null, null], [null, null, null], [null, null, null]], brk = 0;
  function view(curI){
    var h = rows.map(function(r, i){
      return vCells(r.map(function(s, j){ return {v:'j=' + j, s:s || null}; }), {name:'Hàng i = ' + i + (i === curI ? ' (vòng cha đang ở đây)' : ''), idx:false});
    });
    h.push(vScore([{k:'Hàng chạy', v:rows.filter(function(r){ return r.some(Boolean); }).length}, {k:'Lần break', v:brk, s:brk ? 'bad' : null}]));
    return h;
  }
  c.snap({ln:0, title:'Vòng cha: i = 0', body:'Vòng ngoài (cha) chạy i = 0, 1, 2. Mỗi hàng bên dưới là một lượt của vòng cha, các ô là vòng con j.', viz:view(0)});
  rows[0][0] = 'hi';
  c.snap({ln:2, title:'i = 0, j = 0', body:'j == 1 sai nên không break, vòng con đi tiếp xuống lệnh in.', viz:view(0)});
  rows[0][0] = 'ok'; c.write('0 ');
  c.snap({ln:5, title:'In j = 0', body:'Máy in 0. Vòng con tăng j lên 1.', viz:view(0)});
  rows[0][1] = 'bad'; rows[0][2] = 'dim'; brk++;
  c.snap({ln:3, title:'j = 1: break', body:'Điều kiện j == 1 đúng nên gặp break. Chỉ vòng con (j) dừng; ô j = 2 không chạy.', viz:view(0)});
  c.out('');
  c.snap({ln:7, title:'Vòng cha xuống dòng, sang i = 1', body:'Vòng con đã thoát, vòng cha vẫn chạy bình thường: endl xuống dòng, rồi i++ thành 1.', viz:view(1)});
  rows[1] = ['ok', 'bad', 'dim']; brk++; c.out('0 ');
  c.snap({ln:3, title:'i = 1: lặp lại y hệt', body:'Vòng con lại in 0 rồi gặp break ở j = 1. Hàng i = 1 giống hàng i = 0.', viz:view(1)});
  rows[2] = ['ok', 'bad', 'dim']; brk++; c.out('0 ');
  c.snap({ln:3, title:'i = 2: cũng vậy', body:'Vòng cha đủ 3 lượt (i = 0, 1, 2) dù vòng con bị break mỗi lần.', viz:view(2)});
  c.snap({ln:8, title:'Xong', body:'Màn hình có 3 dòng, mỗi dòng một số 0.',
   note:'break (hoặc continue) đặt trong vòng con chỉ tác động tới vòng con đó, vòng cha vẫn chạy tiếp.', viz:view(-1)});
 }},
flag:{inputs:[],
 intro:'Tìm cặp (i, j) đầu tiên có i * j = 6 và dừng cả hai vòng. Hãy để ý lá cờ found. Bấm "Bước tiếp".',
 lines:function(){ return [
  'bool found = false;',
  'for (int i = 1; i <= 5 && !found; i++) {',
  '  for (int j = 1; j <= 5; j++) {',
  '    if (i * j == 6) {',
  '      cout << "Tim thay: i=" << i',
  '           << ", j=" << j << endl;',
  '      found = true;',
  '      break;',
  '    }',
  '  }',
  '}',
  'cout << "Da thoat ca 2 vong lap" << endl;']; },
 run:function(c){
  var fi = 0, fj = 0;
  for (var a = 1; a <= 5 && !fi; a++) for (var b = 1; b <= 5; b++) if (a * b === 6) { fi = a; fj = b; break; }
  var rows = [];
  for (var i = 1; i <= 5; i++) rows.push([null, null, null, null, null]);
  function flag(v, s){ return vBoxes([{name:'found', type:'bool', v:v ? 'true' : 'false', s:s}], {frame:'Cờ hiệu'}); }
  function view(found, fs, curI){
    var h = rows.map(function(r, k){
      var i = k + 1, dim = curI === 'stop' && i > fi;
      return vCells(r.map(function(s, j){ return {v:i * (j + 1), s:dim ? 'dim' : (s || null)}; }), {name:'i = ' + i + ' (ô là i × j)', idx:false});
    });
    h.push(flag(found, fs));
    return h;
  }
  c.snap({ln:0, title:'Dựng cờ found = false', body:'Biến bool found như một lá cờ: chưa tìm thấy thì cờ chưa dựng. Mỗi ô trong lưới là tích i × j.', viz:view(false, 'new', 0)});
  rows[0] = ['ok', 'ok', 'ok', 'ok', 'ok'];
  c.snap({ln:3, title:'i = 1: không có tích nào bằng 6', body:'Với j = 1 đến 5, tích là 1, 2, 3, 4, 5, không có số 6. Vòng cha đi tiếp, vì i <= 5 && !found vẫn đúng.', viz:view(false, null, 1)});
  rows[1] = ['ok', 'ok', 'hi', null, null];
  c.snap({ln:3, title:'i = 2, j = 3: 2 * 3 = 6', body:'j = 1 và 2 cho tích 2 và 4 (chưa đủ). Tới j = 3 thì tích bằng 6, điều kiện đúng.', viz:view(false, null, 2)});
  c.out('Tim thay: i=' + fi + ', j=' + fj);
  c.snap({ln:4, title:'In cặp số tìm được', body:'Máy in "Tim thay: i=2, j=3".', viz:view(false, null, 2)});
  c.snap({ln:6, title:'Dựng cờ: found = true', body:'Lá cờ được dựng lên để báo cho vòng cha biết đã tìm thấy.', viz:view(true, 'hi', 2)});
  rows[1] = ['ok', 'ok', 'bad', 'dim', 'dim'];
  c.snap({ln:7, title:'break: thoát vòng con', body:'break chỉ thoát vòng con (j). Vòng cha chưa biết gì, nó sẽ tự kiểm tra điều kiện ở lượt kế tiếp.', viz:view(true, null, 2)});
  c.snap({ln:1, title:'Vòng cha kiểm tra i <= 5 && !found', body:'i++ làm i = 3. 3 <= 5 đúng nhưng !found = !true = sai, nên cả điều kiện sai. Vòng cha dừng, các hàng i = 3, 4, 5 không chạy.', viz:view(true, 'hi', 'stop')});
  c.out('Da thoat ca 2 vong lap');
  c.snap({ln:11, title:'Xong', body:'Cả hai vòng đã dừng ngay sau khi tìm thấy cặp (2, 3).',
   note:'break chỉ thoát một vòng. Muốn thoát cả vòng ngoài, đặt một biến cờ (found) và thêm !found vào điều kiện vòng ngoài.', viz:view(true, null, 'stop')});
 }},
wh:{inputs:[],
 intro:'continue trong while đặt trước i++ có thể gây lặp vô hạn, khác với for. Bấm "Bước tiếp".',
 lines:function(){ return [
  'int i = 1;',
  'while (i <= 5) {',
  '  if (i == 3) {',
  '    continue;',
  '  }',
  '  cout << i << " ";',
  '  i++;',
  '}']; },
 run:function(c){
  var i = 1, runs = 0, LIMIT = 1000;
  function bx(s){ return vBoxes([{name:'i', type:'int', v:i, s:s}], {frame:'Bộ nhớ · main()'}); }
  function cnt(){ return vScore([{k:'Số lượt đã chạy', v:runs}]); }
  c.snap({ln:0, title:'i = 1', body:'Vòng while: i++ nằm ở cuối thân, còn continue nằm trước nó. Hãy theo dõi i.', viz:[bx('new'), cnt()]});
  c.write('1 '); runs = 1; i = 2;
  c.snap({ln:6, title:'Lượt i = 1', body:'i khác 3 nên máy in 1, rồi i++ làm i = 2.', viz:[bx('hi'), cnt()]});
  c.write('2 '); runs = 2; i = 3;
  c.snap({ln:6, title:'Lượt i = 2', body:'Máy in 2, rồi i++ làm i = 3.', viz:[bx('hi'), cnt()]});
  runs = 3;
  c.snap({ln:3, title:'i = 3: continue', body:'Điều kiện i == 3 đúng nên gặp continue. Trong while, continue nhảy thẳng về dòng kiểm tra điều kiện, bỏ qua cả cout lẫn i++.',
   viz:[bx('bad'), cnt(), vFlow([{t:'Thân vòng lặp', s:'no', sub:'bị bỏ qua, gồm cả i++'}, {t:'Kiểm tra i <= 5', s:'hi', sub:'nhảy thẳng tới đây'}], {title:'continue trong while'})]});
  runs = 4;
  c.snap({ln:1, title:'Kiểm tra lại: i vẫn là 3', body:'3 <= 5 vẫn đúng, vào thân, i == 3 vẫn đúng, lại continue. i không bao giờ thay đổi.', viz:[bx('bad'), cnt()]});
  runs = LIMIT;
  c.out(''); c.err('(Mô phỏng dừng ở ' + LIMIT + ' lượt. Máy thật chạy mãi, dừng bằng Ctrl + C.)');
  c.snap({ln:3, title:'Lặp vô hạn', body:'Bộ đếm tăng mãi mà i đứng yên ở 3. Mô phỏng tự dừng ở ' + LIMIT + ' lượt cho gọn; máy thật sẽ chạy tới khi bị ép dừng.',
   viz:[bx('bad'), cnt(), vCard({kind:'warn', title:'Lặp vô hạn', sub:'continue đã bỏ qua i++, nên i đứng yên ở 3.'})]});
  c.snap({ln:3, title:'Xong: đặt i++ trước continue', body:'Cách sửa: tăng i ngay trong nhánh if trước khi continue. Khi đó i = 3 bị bỏ qua, kết quả đúng là 1 2 4 5.',
   note:'Trong for, continue vẫn chạy bước cập nhật. Trong while, continue nhảy thẳng về điều kiện, nên i++ phải được chạy trước khi gặp continue.',
   viz:[vText(['int i = 1;', 'while (i <= 5) {', 'if (i == 3) {', {t:'    i++;  // thêm dòng này', s:'ok'}, '    continue;', '}', 'cout << i << " ";', 'i++;', '}'], {title:'Bản đã sửa'}), vChips([{t:'1', s:'ok'}, {t:'2', s:'ok'}, {t:'3', s:'no', label:'bỏ qua'}, {t:'4', s:'ok'}, {t:'5', s:'ok'}], {title:'Kết quả in: 1 2 4 5'})]});
 }}
};
