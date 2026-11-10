// META {"module":5,"lesson":"Bài 5.2. Dự án: Phân tích yêu cầu và thiết kế","activity":"Đề bài dự án “Máy tính tiền cửa hàng mini” và tiêu chí chấm","title":"Chương trình mẫu: máy tính tiền cửa hàng mini","lead":"Xem chương trình mẫu chạy với dữ liệu nhập từ bàn phím: nhập hàng, giảm giá theo bậc, VAT 8%. Chọn ví dụ rồi bấm <b>Bước tiếp</b>.","tabs":[["vidu","Ví dụ trong đề (Gạo + Nước mắm)"],["bien","Thử giá trị biên"],["sai","Nhập sai"]],"codeTitle":"Dữ liệu nhập vào","path":"bai-tap-cuoi-khoa-va-du-an-thuc-te/du-an-phan-tich-yeu-cau-va-thiet-ke/de-bai-du-an-may-tinh-tien-cua-hang-mini-va-tieu-chi-cham/index.html"}
var LAYOUT = 'side';
var CONSOLE_TITLE = 'Màn hình (Console)';
var VIZ_TITLE = 'Bảng hàng và bậc giảm giá';

/* định dạng số kiểu 1.030.000 */
function b21Fmt(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
/* bậc giảm giá (từ cao xuống thấp, như đề bài) */
var B21_TIERS = [{min:2000000, pct:10, t:'Từ 2.000.000 trở lên: 10%'}, {min:1000000, pct:5, t:'Từ 1.000.000 tới dưới 2.000.000: 5%'}, {min:500000, pct:2, t:'Từ 500.000 tới dưới 1.000.000: 2%'}, {min:0, pct:0, t:'Dưới 500.000: không giảm'}];
/* thang bậc: upto = số bậc đã xét xong (đã biết ✗), pick = chỉ số bậc được chọn (hoặc -1) */
function b21Ladder(total, upto){
  var items = [], chosen = false;
  B21_TIERS.forEach(function(tr, i){
    var s = 'dim';
    if (i < upto) { if (!chosen && total >= tr.min) { s = 'ok'; chosen = true; } else s = chosen ? 'dim' : 'no'; }
    items.push({t:tr.t, s:s});
  });
  return vGates(items, {});
}
function b21Pick(total){ for (var i = 0; i < B21_TIERS.length; i++) if (total >= B21_TIERS[i].min) return i; return 3; }
function b21Table(items, hiRow){
  var rows = [['Tên hàng', 'Đơn giá', 'Số lượng', 'Thành tiền']];
  items.forEach(function(x){ rows.push([x.n, b21Fmt(x.p), String(x.q), b21Fmt(x.p * x.q)]); });
  if (!items.length) rows.push([{t:'(chưa có dòng nào)', s:'dim'}, '', '', '']);
  return vGrid(rows, {head:true, title:'Bảng nhập hàng', hiRow:hiRow});
}

var EX = {
vidu:{inputs:[],
 intro:'Chương trình mẫu của dự án chạy với dữ liệu trong đề. Cột trái là các giá trị người dùng gõ. Bấm "Bước tiếp".',
 lines:function(){ return ['Chon chuc nang: 3', 'Chon chuc nang: 1', 'So luong mat hang: 2', 'Ten hang: Gao ST25', 'Don gia: 180000', 'So luong: 5', 'Ten hang: Nuoc mam', 'Don gia: 65000', 'So luong: 2', 'Chon chuc nang: 3']; },
 run:function(c){
  var items = [{n:'Gao ST25', p:180000, q:5}, {n:'Nuoc mam', p:65000, q:2}];
  var total = items.reduce(function(s, x){ return s + x.p * x.q; }, 0);
  var tier = b21Pick(total), pct = B21_TIERS[tier].pct, disc = total * pct / 100, after = total - disc, vat = after * 8 / 100, pay = after + vat;
  c.write('Chon chuc nang: '); c.input('3'); c.out('Chua co hoa don nao trong ca nay');
  c.snap({ln:0, title:'Chưa có hóa đơn nào', body:'Mở chương trình và chọn 3 (thống kê) khi chưa bán gì. Chương trình in thông báo thay vì chia cho 0.', viz:[b21Table([]), b21Ladder(0, 0)]});
  c.write('Chon chuc nang: '); c.input('1'); c.write('So luong mat hang: '); c.input('2');
  c.snap({ln:2, title:'Tạo hóa đơn mới: 2 mặt hàng', body:'Chọn 1 để tạo hóa đơn, rồi nhập số mặt hàng là 2. Vòng for sẽ hỏi lần lượt từng mặt hàng.', viz:[b21Table([]), b21Ladder(0, 0)]});
  c.write('Ten hang: '); c.input('Gao ST25'); c.write('Don gia: '); c.input('180000'); c.write('So luong: '); c.input('5');
  c.snap({ln:5, title:'Mặt hàng 1: Gạo ST25', body:'Thành tiền = 180.000 x 5 = ' + b21Fmt(900000) + ' đồng.', viz:[b21Table(items.slice(0, 1), 1), b21Ladder(0, 0)]});
  c.write('Ten hang: '); c.input('Nuoc mam'); c.write('Don gia: '); c.input('65000'); c.write('So luong: '); c.input('2');
  c.snap({ln:8, title:'Mặt hàng 2: Nước mắm', body:'Thành tiền = 65.000 x 2 = ' + b21Fmt(130000) + ' đồng.', viz:[b21Table(items, 2), b21Ladder(0, 0)]});
  c.snap({ln:8, title:'Tổng tiền hàng: ' + b21Fmt(total), body:'Cộng thành tiền: ' + b21Fmt(900000) + ' + ' + b21Fmt(130000) + ' = ' + b21Fmt(total) + ' đồng. Giờ xác định mức giảm giá.', viz:[b21Table(items), vScore([{k:'Tổng tiền hàng', v:b21Fmt(total)}]), b21Ladder(0, 0)]});
  c.snap({ln:8, title:'Xét bậc: ' + b21Fmt(total) + ' >= 2.000.000?', body:'Xét từ bậc cao xuống thấp. ' + b21Fmt(total) + ' chưa tới 2.000.000, bậc 10% không đạt.', viz:[b21Table(items), b21Ladder(total, 1)]});
  c.snap({ln:8, title:'Xét bậc: ' + b21Fmt(total) + ' >= 1.000.000?', body:'Đạt. Chọn bậc 5% và không xét các bậc thấp hơn nữa.', viz:[b21Table(items), b21Ladder(total, 2)]});
  c.snap({ln:8, title:'Giảm giá 5% và VAT 8%', body:'Giảm giá = ' + b21Fmt(total) + ' x 5% = ' + b21Fmt(disc) + '. Sau giảm giá: ' + b21Fmt(after) + '. VAT 8% tính trên số tiền sau giảm giá: ' + b21Fmt(vat) + '.',
   viz:[b21Table(items), b21Ladder(total, 2), vCard({kind:'info', title:'Cách tính', rows:[['Tổng tiền hàng', b21Fmt(total)], ['Giảm giá (' + pct + '%)', '- ' + b21Fmt(disc)], ['Sau giảm giá', b21Fmt(after)], ['VAT (8%)', '+ ' + b21Fmt(vat)], ['Tổng thanh toán', b21Fmt(pay)]]})]});
  ['', '============ HOA DON ============', 'Gao ST25 180000 x 5 = 900000', 'Nuoc mam 65000 x 2 = 130000', '---------------------------------', 'Tong tien hang: ' + total, 'Giam gia (' + pct + '%): ' + disc, 'Sau giam gia: ' + after, 'VAT (8%): ' + vat, '---------------------------------', 'TONG THANH TOAN: ' + pay, '================================='].forEach(function(l){ c.out(l); });
  c.snap({ln:8, title:'In hóa đơn', body:'Hóa đơn hiện đủ từng dòng, thẳng cột. Doanh thu và số hóa đơn được cộng dồn vào thống kê ca.', viz:[b21Table(items), vScore([{k:'Tổng thanh toán', v:b21Fmt(pay), s:'ok'}])]});
  c.write('Chon chuc nang: '); c.input('3');
  c.out('Tong so hoa don: 1'); c.out('Tong doanh thu: ' + pay); c.out('Trung binh moi hoa don: ' + pay);
  c.snap({ln:9, title:'Xem thống kê ca', body:'Bây giờ đã có 1 hóa đơn: tổng doanh thu và giá trị trung bình đều là ' + b21Fmt(pay) + '.', viz:[vScore([{k:'Số hóa đơn', v:1}, {k:'Tổng doanh thu', v:b21Fmt(pay)}, {k:'Trung bình', v:b21Fmt(pay)}])]});
  c.snap({ln:9, title:'Xong', body:'Cả đề bài chạy theo thứ tự: nhập hàng, tổng tiền, giảm giá, VAT, tổng thanh toán.',
   note:'Giảm giá xét theo tổng tiền hàng, từ bậc cao xuống bậc thấp; VAT tính trên số tiền sau giảm giá.', viz:[vScore([{k:'Tổng thanh toán', v:b21Fmt(pay), s:'ok'}])]});
 }},
bien:{inputs:[],
 intro:'Thử ba tổng tiền nằm sát các mốc giảm giá. Mỗi lần chương trình mẫu chỉ in tổng tiền hàng và mức giảm. Bấm "Bước tiếp".',
 lines:function(){ return ['Chon chuc nang: 1', 'So luong mat hang: 1', 'Don gia: 999999', 'Don gia: 1000000', 'Don gia: 2000000']; },
 run:function(c){
  var cases = [999999, 1000000, 2000000];
  c.snap({ln:0, title:'Cách thử', body:'Mỗi lần tạo hóa đơn một mặt hàng, số lượng 1, đơn giá là tổng cần thử. Các mốc 1.000.000 và 2.000.000 dễ sai nhất.', viz:[b21Ladder(0, 0)]});
  cases.forEach(function(t, k){
   var tr = b21Pick(t), pct = B21_TIERS[tr].pct;
   c.write('Don gia: '); c.input(String(t));
   c.out('Tong tien hang: ' + t); c.out('Muc giam: ' + pct + '%');
   var why = t === 999999 ? 'Thiếu 1 đồng so với mốc 1.000.000, nên chỉ đạt bậc 2%.' : t === 1000000 ? 'Đúng bằng mốc 1.000.000, và đề ghi "từ 1.000.000" nên tính bậc 5%.' : 'Đúng bằng mốc 2.000.000, đạt bậc cao nhất 10%.';
   c.snap({ln:2 + k, title:'Tổng ' + b21Fmt(t) + ': bậc ' + pct + '%', body:why, viz:[vScore([{k:'Tổng tiền hàng', v:b21Fmt(t)}, {k:'Mức giảm', v:pct + '%', s:'ok'}]), b21Ladder(t, 4)]});
  });
  c.snap({ln:4, title:'Xong', body:'Ba giá trị sát mốc cho ba bậc khác nhau: 2%, 5%, 10%.',
   note:'Luôn thử giá trị biên: hai giá trị sát nhau ở hai bên mốc phải cho hai mức giảm khác nhau.', viz:[vScore([{k:'999.999', v:'2%'}, {k:'1.000.000', v:'5%'}, {k:'2.000.000', v:'10%'}])]});
 }},
sai:{inputs:[],
 intro:'Chương trình mẫu không chấp nhận đơn giá âm hay số lượng 0 và bắt nhập lại. Bấm "Bước tiếp".',
 lines:function(){ return ['Chon chuc nang: 1', 'So luong mat hang: 1', 'Ten hang: Banh mi', 'Don gia: -5000', 'Don gia: 5000', 'So luong: 0', 'So luong: 3']; },
 run:function(c){
  var none = [], done = [{n:'Banh mi', p:5000, q:3}];
  function bad(msg){ return vCard({kind:'err', title:msg, sub:'Ô nhập đỏ, dòng chưa được thêm vào bảng.'}); }
  c.write('Chon chuc nang: '); c.input('1'); c.write('So luong mat hang: '); c.input('1'); c.write('Ten hang: '); c.input('Banh mi');
  c.snap({ln:2, title:'Nhập tên hàng: Banh mi', body:'Tên hàng nhập bình thường. Giờ tới đơn giá.', viz:[b21Table(none)]});
  c.write('Don gia: '); c.input('-5000'); c.err('Don gia khong hop le');
  c.snap({ln:3, title:'Đơn giá -5000 bị từ chối', body:'Đơn giá âm là vô lý. Chương trình báo "Don gia khong hop le" và hỏi lại, không thêm dòng vào bảng.', viz:[b21Table(none), bad('Don gia khong hop le')]});
  c.write('Don gia: '); c.input('5000');
  c.snap({ln:4, title:'Đơn giá 5000 được chấp nhận', body:'Giá trị dương hợp lệ nên chương trình hỏi tiếp số lượng.', viz:[b21Table(none)]});
  c.write('So luong: '); c.input('0'); c.err('So luong khong hop le');
  c.snap({ln:5, title:'Số lượng 0 bị từ chối', body:'Mua 0 món không có nghĩa. Chương trình báo "So luong khong hop le" và hỏi lại.', viz:[b21Table(none), bad('So luong khong hop le')]});
  c.write('So luong: '); c.input('3');
  c.snap({ln:6, title:'Số lượng 3: dòng được thêm', body:'Cả đơn giá và số lượng đều hợp lệ. Thành tiền = 5.000 x 3 = ' + b21Fmt(15000) + ' đồng, dòng được thêm vào bảng.', viz:[b21Table(done, 1)]});
  c.snap({ln:6, title:'Xong', body:'Mỗi giá trị nhập vào đều được kiểm tra trước khi tính tiền.',
   note:'Kiểm tra dữ liệu đầu vào: đơn giá không được âm, số lượng phải lớn hơn 0; nhập sai thì bắt nhập lại.', viz:[b21Table(done)]});
 }}
};
