// META {"module":8,"lesson":"Nguyên tắc Mở/Đóng (Open/Closed Principle - OCP)","activity":"Cách thiết kế để tuân thủ OCP với Đa hình và Interface","title":"Thêm tính năng mà không sửa lớp cũ","lead":"Cửa hàng muốn thêm khách VIP. Bấm <b>Bước tiếp</b> để xem bên nào phải sửa lớp cũ.","tabs":[["x","Thêm khách VIP"]]}
var EX = {x:(function(){
 function fmt(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
 var price = 1000000, pct = {Regular:0, Silver:5, Vip:15};
 var res = {}; Object.keys(pct).forEach(function(k){ res[k] = price * (100 - pct[k]) / 100; });
 var L = ['class DiscountCalculator','{','  public decimal Price(','    string type, decimal p)','  {','    if (type == "Regular")','      return p;','    else if (type == "Silver")','      return p * 95 / 100;','    else if (type == "Vip")','      return p * 85 / 100;','    return p;','  }','}'];
 var RL = ['interface IDiscount','{','  decimal Apply(decimal p);','}','class Regular : IDiscount','{','  public decimal Apply(decimal p)','    => p;','}','class Silver : IDiscount','{','  public decimal Apply(decimal p)','    => p * 95 / 100;','}','class VipDiscount : IDiscount','{','  public decimal Apply(decimal p)','    => p * 85 / 100;','}'];
 function lObjs(st, vip){
  var f = [['Regular','p'],['Silver','p * 95 / 100']];
  if (st >= 2) f.push(['Vip','p * 85 / 100', st === 2 ? 'hi' : 'bad']);
  return [O('DiscountCalculator',f,{hi:st >= 2,tag:st >= 2 ? 'phải mở lớp cũ' : ''})];
 }
 function rObjs(st){
  var o = [O('Regular',[['Apply','p']],{dim:st >= 3}),O('Silver',[['Apply','p * 95 / 100']],{dim:st >= 3})];
  if (st >= 2) o.push(O('VipDiscount',[['Apply','p * 85 / 100',st === 2 ? 'hi' : 'ok']],{hi:1,tag:'lớp mới'}));
  return o;
 }
 var viaIf = function(t, p){ if (t === 'Regular') return p; else if (t === 'Silver') return p * 95 / 100; else if (t === 'Vip') return p * 85 / 100; return p; };
 var viaObj = {Regular:function(p){ return p; }, Silver:function(p){ return p * 95 / 100; }, Vip:function(p){ return p * 85 / 100; }};
 var allSame = ['Regular','Silver','Vip'].every(function(k){ return viaIf(k, price) === viaObj[k](price) && viaIf(k, price) === res[k]; });
 var cols = [0,1].map(function(side){
  return {
   title:side ? 'Dùng interface' : 'Dùng if / else',
   sub:side ? 'IDiscount với mỗi loại khách một lớp.' : 'Một lớp DiscountCalculator xử lý mọi loại khách.',
   lines:side ? RL : L,
   run:function(c){
    var ln = side ? {Regular:7,Silver:12,Vip:17} : {Regular:6,Silver:8,Vip:10};
    var objs = side ? rObjs : lObjs;
    c.snap({ln:0,title:'Hiện trạng',body:side ? 'Có interface IDiscount, hai lớp Regular và Silver. Mỗi loại khách là một lớp.' : 'DiscountCalculator dùng if / else để chọn công thức cho Regular và Silver.',objs:objs(1)});
    c.snap({ln:side ? 14 : 9,title:'Yêu cầu: thêm khách VIP',body:side ? 'Cần thêm khách VIP giảm 15%. Ta viết thêm một lớp mới.' : 'Cần thêm khách VIP giảm 15%. Phải chèn thêm một nhánh else if.',objs:objs(2)});
    c.snap({ln:side ? 14 : 9,title:side ? 'Thêm lớp VipDiscount' : 'Sửa lớp cũ',body:side ? 'VipDiscount thực thi IDiscount. Không dòng nào của Regular, Silver hay IDiscount bị sửa.' : 'Phải mở DiscountCalculator và chèn else if. Mỗi lần sửa lớp cũ đều có nguy cơ làm hỏng phần đã chạy tốt.',objs:objs(3)});
    ['Regular','Silver','Vip'].forEach(function(k){
     c.out(k + ': ' + fmt(res[k]));
     c.snap({ln:ln[k],title:'Tính giá cho ' + k,body:side ? 'Gọi Apply(1000000) của đối tượng ' + (k === 'Vip' ? 'VipDiscount' : k) + ' cho ra ' + fmt(res[k]) + '.' : 'Gọi Price("' + k + '", 1000000) đi vào nhánh ' + k + ' cho ra ' + fmt(res[k]) + '.',vars:[['giá gốc',fmt(price)],['giảm',pct[k] + '%'],['kết quả',fmt(res[k]),1]],objs:objs(3)});
    });
    c.snap({ln:ln.Vip,title:'Xong',body:'Cả ba loại khách cho kết quả ' + ['Regular','Silver','Vip'].map(function(k){ return fmt(res[k]); }).join(', ') + '. ' + (side ? 'Lớp cũ giữ nguyên, chỉ thêm lớp mới.' : 'Nhưng lớp cũ đã bị sửa.'),objs:objs(3)});
   }};
 });
 return {
  intro:'Cả hai bên cùng tính giá cho ba loại khách. Hãy để ý bên nào phải sửa lớp cũ khi thêm khách VIP.',
  running:'Đỏ nghĩa là sửa vào lớp cũ, xanh là thêm lớp mới.',
  done:(allSame ? 'Cả hai bên cùng ra kết quả giống nhau cho ba loại khách. Khác ở chỗ bên trái' : 'Kết quả hai bên khác nhau, cần kiểm tra lại. Bên trái') + ' phải sửa lớp cũ, bên phải chỉ thêm lớp mới.',
  note:'OCP: mở để mở rộng (thêm lớp mới), đóng để sửa đổi (không sửa lớp cũ).',
  cols:cols};
})()};
