// META {"module":2,"lesson":"Bài 2.3. Sắp xếp mảng","activity":"Sắp Xếp Mảng (Bubble Sort, Selection Sort)","title":"Bubble Sort và Selection Sort từng bước","lead":"Xem các cột được xếp từ thấp lên cao bằng hai cách khác nhau. Chọn tab rồi bấm <b>Bước tiếp</b>.","tabs":[["bubble","Bubble Sort từng bước"],["toiuu","Bubble Sort tối ưu (dừng sớm)"],["selection","Selection Sort và so sánh số lần đổi chỗ"]],"codeTitle":"Mã nguồn C++","path":"ky-thuat-xu-ly-mang-va-thuat-toan-co-ban/sap-xep-mang/sap-xep-mang-bubble-sort-selection-sort/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Mảng vẽ thành các cột';

/* tìm số thứ tự dòng code theo đoạn chữ đầu dòng (tránh đếm tay) */
function b5ix(lines, text){ for (var i = 0; i < lines.length; i++) if (lines[i].trim().indexOf(text) === 0) return i; return 0; }
function b5last(lines, text){ for (var i = lines.length - 1; i >= 0; i--) if (lines[i].trim().indexOf(text) === 0) return i; return 0; }
function b5join(a){ return a.join(' '); }

/* Bubble Sort thật: trả về từng lượt, mỗi lượt có danh sách phép so sánh */
function b5bubble(start, early){
  var a = start.slice(), n = a.length, passes = [];
  for (var i = 0; i < n - 1; i++) {
    var ev = [], flag = false;
    for (var j = 0; j < n - 1 - i; j++) {
      var sw = a[j] > a[j + 1];
      if (sw) { var t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; flag = true; }
      ev.push({j:j, swapped:sw, after:a.slice()});
    }
    passes.push({events:ev, after:a.slice(), flag:flag});
    if (early && !flag) break;
  }
  return passes;
}
/* Selection Sort thật: mỗi lượt i có: các lần j, vị trí min sau mỗi lần, có đổi chỗ không */
function b5select(start){
  var a = start.slice(), n = a.length, rounds = [];
  for (var i = 0; i < n - 1; i++) {
    var mn = i, trail = [];
    for (var j = i + 1; j < n; j++) { var better = a[j] < a[mn]; if (better) mn = j; trail.push({j:j, better:better, mn:mn}); }
    var before = a.slice(), sw = mn !== i;
    if (sw) { var t = a[i]; a[i] = a[mn]; a[mn] = t; }
    rounds.push({i:i, trail:trail, mn:mn, swapped:sw, before:before, after:a.slice()});
  }
  return rounds;
}
function b5score(luot, ss, doi, extra){
  var it = [{k:'Lượt', v:luot}, {k:'So sánh', v:ss}, {k:'Đổi chỗ', v:doi}];
  return vScore(extra ? it.concat(extra) : it);
}

var B5START = [5, 2, 9, 1, 7, 3];
var B5T1 = ['int arr[6] = {5, 2, 9, 1, 7, 3};', 'int n = 6;', 'cout << "Ban dau: ";', 'for (int k = 0; k < n; k++)', '  cout << arr[k] << " ";', 'cout << endl;', 'for (int i = 0; i < n - 1; i++) {', '  for (int j = 0; j < n-1-i; j++) {', '    if (arr[j] > arr[j + 1]) {', '      int temp = arr[j];', '      arr[j] = arr[j + 1];', '      arr[j + 1] = temp;', '    }', '  }', '  cout << "Luot " << i + 1 << ": ";', '  for (int k = 0; k < n; k++)', '    cout << arr[k] << " ";', '  cout << endl;', '}'];
var B5T2 = ['int arr[6] = {5, 2, 9, 1, 7, 3};', 'int n = 6, soLuot = 0;', 'bool coHoanDoi;', 'for (int i = 0; i < n - 1; i++) {', '  soLuot++;', '  coHoanDoi = false;', '  for (int j = 0; j < n-1-i; j++) {', '    if (arr[j] > arr[j + 1]) {', '      int temp = arr[j];', '      arr[j] = arr[j + 1];', '      arr[j + 1] = temp;', '      coHoanDoi = true;', '    }', '  }', '  cout << "Luot " << i + 1 << ": ";', '  for (int k = 0; k < n; k++)', '    cout << arr[k] << " ";', '  cout << endl;', '  if (!coHoanDoi) {', '    cout << "Khong con hoan doi nao"', '         << " -> dung som!" << endl;', '    break;', '  }', '}', 'cout << "So luot chay thuc te: "', '     << soLuot << endl;'];
var B5T3 = ['int arr[6] = {5, 2, 9, 1, 7, 3};', 'int n = 6;', 'cout << "Ban dau: ";', 'for (int k = 0; k < n; k++)', '  cout << arr[k] << " ";', 'cout << endl;', 'for (int i = 0; i < n - 1; i++) {', '  int viTriNhoNhat = i;', '  for (int j = i + 1; j < n; j++) {', '    if (arr[j] < arr[viTriNhoNhat]) {', '      viTriNhoNhat = j;', '    }', '  }', '  if (viTriNhoNhat != i) {', '    int temp = arr[i];', '    arr[i] = arr[viTriNhoNhat];', '    arr[viTriNhoNhat] = temp;', '  }', '  cout << "Luot " << i + 1 << ": ";', '  for (int k = 0; k < n; k++)', '    cout << arr[k] << " ";', '  cout << endl;', '}'];

/* hình cột: cells = mảng; opts: pair [j, j+1] đang so (hi), swapped, done (đuôi), doneLeft, minIdx, ptr/ptr2 */
function b5bars(a, o){
  o = o || {};
  var items = a.map(function(v, i){
    var s = '', sub = '';
    if (o.pair && (i === o.pair[0] || i === o.pair[1])) s = o.swapped ? 'ok' : 'hi';
    if (o.minIdx !== undefined && i === o.minIdx) { s = 'bad'; sub = '▼ min'; }
    if (o.curJ !== undefined && i === o.curJ && i !== o.minIdx) s = 'hi';
    return {v:v, s:s, sub:sub};
  });
  return vArray(items, {name:'arr', bars:true, ptr:o.ptr, ptrLabel:o.ptrLabel || 'j', ptr2:o.ptr2, ptr2Label:o.ptr2Label || 'j+1', done:o.done || 0, doneFrom:o.doneLeft ? 'left' : undefined, swap:o.swap, note:o.note});
}

var EX = {
bubble:{inputs:[], chips:[],
 intro:'Bubble Sort so sánh từng cặp liền kề và đổi chỗ nếu sai thứ tự, để số lớn "nổi" dần về cuối. Bấm "Bước tiếp".',
 lines:function(){ return B5T1; },
 run:function(c){
  var P = b5bubble(B5START, false), n = B5START.length;
  var cmp = 0, swp = 0, L = B5T1;
  function tally(pass){ pass.events.forEach(function(e){ cmp++; if (e.swapped) swp++; }); }
  c.out('Ban dau: ' + b5join(B5START));
  c.snap({ln:b5ix(L, 'cout << "Ban dau'), title:'Mảng ban đầu',
   body:'Mảng có 6 số: 5 2 9 1 7 3. Chiều cao mỗi cột bằng giá trị của số. Mục tiêu: xếp từ thấp đến cao.',
   viz:[b5bars(B5START), b5score(0, 0, 0)]});
  /* Lượt 1: hai cặp đầu tả chi tiết */
  var p1 = P[0], e0 = p1.events[0], e1 = p1.events[1];
  cmp++; swp += e0.swapped ? 1 : 0;
  c.snap({ln:b5ix(L, 'arr[j + 1] = temp'), title:'Lượt 1: so cặp (5, 2)',
   body:'5 lớn hơn 2 (sai thứ tự) nên đổi chỗ hai số. Cột 5 tiến một bước về bên phải.',
   viz:[b5bars(e0.after, {pair:[0, 1], swapped:true, ptr:0, ptr2:1, swap:[0, 1]}), b5score(1, cmp, swp)]});
  cmp++; swp += e1.swapped ? 1 : 0;
  c.snap({ln:b5ix(L, 'if (arr[j] >'), title:'Lượt 1: so cặp (5, 9)',
   body:'5 không lớn hơn 9 (đúng thứ tự) nên giữ nguyên. Từ giờ cột 9 sẽ được mang đi tiếp.',
   viz:[b5bars(e1.after, {pair:[1, 2], ptr:1, ptr2:2}), b5score(1, cmp, swp)]});
  p1.events.slice(2).forEach(function(e){ cmp++; if (e.swapped) swp++; });
  c.out('Luot 1: ' + b5join(p1.after));
  c.snap({ln:b5last(L, 'cout << endl;'), title:'Hết lượt 1',
   body:'3 cặp còn lại: 9 đổi chỗ liên tiếp với 1, 7 và 3 rồi nằm ở cuối. Số lớn nhất đã "nổi" về đúng chỗ (cột xanh). Rồi vòng for nhỏ in cả mảng ra console.',
   viz:[b5bars(p1.after, {done:1}), b5score(1, cmp, swp)]});
  var msgs = ['Lượt 2: số lớn thứ nhì (7) nổi tới ngay trước 9. Lượt này chỉ cần so 4 cặp vì ô cuối đã xong.', 'Lượt 3: lúc này mảng đã xếp đúng hoàn toàn: 1 2 3 5 7 9. Nhưng thuật toán chưa biết điều đó.'];
  [1, 2].forEach(function(k){
   tally(P[k]); c.out('Luot ' + (k + 1) + ': ' + b5join(P[k].after));
   c.snap({ln:b5last(L, 'cout << endl;'), title:'Hết lượt ' + (k + 1), body:msgs[k - 1], viz:[b5bars(P[k].after, {done:k + 1}), b5score(k + 1, cmp, swp)]});
  });
  tally(P[3]); tally(P[4]);
  c.out('Luot 4: ' + b5join(P[3].after)); c.out('Luot 5: ' + b5join(P[4].after));
  c.snap({ln:b5last(L, 'cout << endl;'), title:'Lượt 4 và lượt 5',
   body:'Mảng đã xếp xong từ lượt 3, nhưng hai lượt này vẫn chạy: chỉ so sánh mà không đổi chỗ nào. Đây là việc làm thừa.',
   note:'Bubble Sort đổi chỗ từng cặp liền kề, số lớn nhất nổi về cuối sau mỗi lượt. Bản cơ bản luôn chạy đủ n-1 lượt: ở đây 5 lượt, 15 lần so sánh, 8 lần đổi chỗ.',
   viz:[b5bars(P[4].after, {done:n}), b5score(5, cmp, swp, [{k:'Lãng phí', v:'lượt 4, 5', s:'bad'}])]});
 }},

toiuu:{inputs:[], chips:[],
 intro:'Thêm một "đèn" coHoanDoi: nếu cả lượt không đổi chỗ lần nào thì mảng đã xong và dừng sớm. Bấm "Bước tiếp".',
 lines:function(){ return B5T2; },
 run:function(c){
  var P = b5bubble(B5START, true), L = B5T2, n = B5START.length;
  var cmp = 0, swp = 0;
  function lamp(v){ return {k:'coHoanDoi', v:v ? 'true' : 'false', s:v ? 'ok' : 'bad'}; }
  c.snap({ln:2, title:'Khai báo cờ coHoanDoi',
   body:'Cờ coHoanDoi ghi nhớ: "trong lượt này có đổi chỗ lần nào không?". Còn soLuot đếm số lượt đã chạy.',
   viz:[b5bars(B5START), b5score(0, 0, 0)]});
  var tails = ['Đầu lượt 1 cờ được đặt về false. Có đổi chỗ nên cờ bật thành true: chưa thể dừng.', 'Lượt 2: đầu lượt cờ về false, rồi lại bật true vì còn đổi chỗ.', 'Lượt 3: vẫn có đổi chỗ nên cờ true. Mảng đã xếp xong nhưng thuật toán chưa biết.'];
  [0, 1, 2].forEach(function(k){
   P[k].events.forEach(function(e){ cmp++; if (e.swapped) swp++; });
   c.out('Luot ' + (k + 1) + ': ' + b5join(P[k].after));
   c.snap({ln:b5last(L, 'cout << endl;'), title:'Hết lượt ' + (k + 1), body:tails[k],
    viz:[b5bars(P[k].after, {done:k + 1}), b5score(k + 1, cmp, swp, [lamp(P[k].flag)])]});
  });
  var p4 = P[3];
  p4.events.forEach(function(e){ cmp++; if (e.swapped) swp++; });
  c.out('Luot 4: ' + b5join(p4.after));
  c.snap({ln:b5last(L, 'cout << endl;'), title:'Hết lượt 4: không đổi chỗ nào',
   body:'Đầu lượt 4 cờ về false. So 2 cặp mà không cặp nào cần đổi, nên cờ vẫn là false.',
   viz:[b5bars(p4.after, {done:4}), b5score(4, cmp, swp, [lamp(p4.flag)])]});
  c.out('Khong con hoan doi nao -> dung som!');
  c.snap({ln:b5ix(L, 'cout << "Khong con'), title:'if (!coHoanDoi) break;',
   body:'Cờ vẫn false nghĩa là lượt này không đổi gì: mảng đã xếp xong. Lệnh break thoát khỏi vòng lặp ngoài, không chạy lượt 5.',
   viz:[b5bars(p4.after, {done:n}), b5score(4, cmp, swp, [lamp(false)])]});
  c.out('So luot chay thuc te: ' + P.length);
  c.snap({ln:b5ix(L, 'cout << "So luot'), title:'Xong',
   body:'soLuot = ' + P.length + ' lượt, ít hơn 1 lượt so với bản cơ bản (5 lượt). Số lần so sánh cũng giảm từ 15 xuống ' + cmp + '.',
   note:'Cờ coHoanDoi phải được đặt lại false ở đầu mỗi lượt. Nếu quên, cờ giữ true mãi và thuật toán không bao giờ dừng sớm.',
   viz:[b5bars(p4.after, {done:n}), b5score(P.length, cmp, swp)]});
 }},

selection:{inputs:[], chips:[],
 intro:'Selection Sort mỗi lượt chọn số nhỏ nhất của phần chưa xếp rồi đổi chỗ đúng một lần. Bấm "Bước tiếp".',
 lines:function(){ return B5T3; },
 run:function(c){
  var R = b5select(B5START), L = B5T3, n = B5START.length, bub = b5bubble(B5START, false), bubSwaps = 0, bubCmp = 0;
  bub.forEach(function(p){ p.events.forEach(function(e){ bubCmp++; if (e.swapped) bubSwaps++; }); });
  var cmp = 0, swp = 0;
  c.out('Ban dau: ' + b5join(B5START));
  c.snap({ln:b5ix(L, 'cout << "Ban dau'), title:'Mảng ban đầu', body:'Vẫn là mảng 5 2 9 1 7 3. Lượt nào cũng gồm hai việc: tìm số nhỏ nhất của phần chưa xếp, rồi đổi nó về đầu phần đó.',
   viz:[b5bars(B5START), b5score(0, 0, 0)]});
  var r0 = R[0]; cmp += r0.trail.length;
  c.snap({ln:b5ix(L, 'viTriNhoNhat = j;'), title:'Lượt 1: tìm số nhỏ nhất',
   body:'Cờ min (▼) bắt đầu ở ô 0 (số 5). Con trỏ j quét 2, 9, 1, 7, 3: cờ nhảy sang ô 1 (số 2) rồi sang ô 3 (số 1). Quét hết thì min là 1, ở chỉ số 3.',
   viz:[b5bars(r0.before, {minIdx:r0.mn, ptr:0, ptrLabel:'i', ptr2:n - 1, ptr2Label:'j'}), b5score(1, cmp, swp)]});
  swp++; c.out('Luot 1: ' + b5join(r0.after));
  c.snap({ln:b5ix(L, 'arr[viTriNhoNhat] = temp;'), title:'Lượt 1: đổi chỗ một lần',
   body:'Đổi số nhỏ nhất (ô 3) với số ở đầu phần chưa xếp (ô 0). Chỉ đúng 1 lần đổi cho cả lượt. Cột 1 xanh là đã vào đúng chỗ.',
   viz:[b5bars(r0.after, {done:1, doneLeft:true, swap:[0, r0.mn]}), b5score(1, cmp, swp)]});
  var r1 = R[1]; cmp += r1.trail.length; c.out('Luot 2: ' + b5join(r1.after));
  c.snap({ln:b5ix(L, 'if (viTriNhoNhat != i)'), title:'Lượt 2: số nhỏ nhất đã đúng chỗ',
   body:'Trong phần chưa xếp (2 9 5 7 3), số nhỏ nhất là 2 và nó đang ở ngay ô 1. viTriNhoNhat == i nên không cần đổi chỗ.',
   viz:[b5bars(r1.after, {done:2, doneLeft:true, minIdx:r1.mn}), b5score(2, cmp, swp)]});
  var r2 = R[2]; cmp += r2.trail.length; swp++; c.out('Luot 3: ' + b5join(r2.after));
  c.snap({ln:b5ix(L, 'arr[viTriNhoNhat] = temp;'), title:'Lượt 3: quét rồi đổi chỗ',
   body:'Phần chưa xếp là 9 5 7 3. Số nhỏ nhất là 3 (ô 5), được đổi lên ô 2. Mảng đã đúng thứ tự từ 1 2 3.',
   viz:[b5bars(r2.after, {done:3, doneLeft:true, swap:[2, r2.mn]}), b5score(3, cmp, swp)]});
  R.slice(3).forEach(function(r){ cmp += r.trail.length; if (r.swapped) swp++; c.out('Luot ' + (r.i + 1) + ': ' + b5join(r.after)); });
  c.snap({ln:b5ix(L, 'if (viTriNhoNhat != i)'), title:'Lượt 4 và lượt 5',
   body:'Số nhỏ nhất của phần còn lại đã nằm đúng chỗ ở cả hai lượt, nên không có lần đổi nào.',
   viz:[b5bars(R[4].after, {done:n, doneLeft:true}), b5score(5, cmp, swp)]});
  c.snap({ln:b5last(L, 'cout << endl;'), title:'So sánh với Bubble Sort',
   body:'Cùng mảng 5 2 9 1 7 3: Selection Sort đổi chỗ ' + swp + ' lần, Bubble Sort ở tab đầu đổi ' + bubSwaps + ' lần. Số lần so sánh của cả hai đều là ' + cmp + '.',
   note:'Selection Sort chọn số nhỏ nhất rồi đổi một lần mỗi lượt, nên ít lần đổi chỗ hơn Bubble Sort. Cả hai đều so sánh khoảng n(n-1)/2 cặp.',
   viz:[b5bars(R[4].after, {done:n, doneLeft:true}), vScore([{k:'Bubble: đổi chỗ', v:bubSwaps, s:'bad'}, {k:'Selection: đổi chỗ', v:swp, s:'ok'}, {k:'So sánh (mỗi thuật toán)', v:cmp}])]});
 }}
};
