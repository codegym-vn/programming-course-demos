// META {"module":6,"lesson":"Phân tích yêu cầu trong OOAD","activity":"Ví dụ về Use Case cho hệ thống quản lý thư viện","title":"Use Case: Mượn sách","lead":"Use Case là chuỗi bước giữa Tác nhân (Độc giả) và Hệ thống, có luồng chính và luồng thay thế. Chọn tình huống rồi bấm <b>Bước tiếp</b>.","tabs":[["chinh","Luồng chính"],["het","Thẻ hết hạn"],["da","Sách đã được mượn"]],"codeTitle":"Kịch bản Use Case"}
var UC = ['Use Case: Mượn sách','Tác nhân: Độc giả','','Luồng chính','1. [Độc giả] Quét thẻ thư viện','2. [Hệ thống] Kiểm tra thẻ','3. [Độc giả] Chọn sách cần mượn','4. [Hệ thống] Sách còn trên kệ?','5. [Hệ thống] Ghi phiếu mượn','6. [Hệ thống] In hạn trả sách','','Luồng thay thế','2a. Thẻ hết hạn:','  [Hệ thống] Báo lỗi, kết thúc','4a. Sách đã được mượn:','  [Hệ thống] Báo sách đã mượn,','  gợi ý chọn sách khác'];
function V(who,flow,extra){var v=[['Đang làm',who,1],['Luồng',flow]];if(extra)v.push(extra);return v;}
var EX = {
chinh:{inputs:[],
 intro:'Độc giả muốn mượn một cuốn sách và mọi thứ đều suôn sẻ. Bấm "Bước tiếp".',
 lines:function(){return UC;},
 run:function(c){
  var f='chính';
  c.snap({ln:0,title:'Use Case Mượn sách',body:'Kịch bản kể lại từng bước trao đổi giữa Độc giả (tác nhân) và Hệ thống. Ta đi theo luồng chính, tức khi mọi việc thuận lợi.',vars:V('-',f)});
  c.snap({ln:4,title:'Độc giả quét thẻ',body:'Độc giả đưa thẻ thư viện cho máy quét. Đây là bước bắt đầu.',vars:V('Độc giả',f)});
  c.snap({ln:5,title:'Hệ thống kiểm tra thẻ',body:'Hệ thống xem thẻ có hợp lệ và còn hạn không. Lần này thẻ còn hạn.',vars:V('Hệ thống',f,['Thẻ','còn hạn'])});
  c.snap({ln:6,title:'Độc giả chọn sách',body:'Độc giả chọn cuốn "Lập trình C#" cần mượn.',vars:V('Độc giả',f,['Sách','Lập trình C#'])});
  c.snap({ln:7,title:'Hệ thống kiểm tra sách',body:'Hệ thống thấy sách còn trên kệ, chưa ai mượn.',vars:V('Hệ thống',f,['Sách','còn trên kệ'])});
  c.snap({ln:8,title:'Hệ thống ghi phiếu mượn',body:'Hệ thống lưu phiếu mượn gắn độc giả với cuốn sách.',vars:V('Hệ thống',f,['Phiếu mượn','đã ghi'])});
  c.snap({ln:9,title:'Hệ thống in hạn trả',body:'Hệ thống in ngày hạn trả sách cho độc giả.',vars:V('Hệ thống',f,['Phiếu mượn','đã ghi'])});
  c.snap({ln:9,title:'Xong',body:'Đi hết 6 bước thì mượn sách thành công.',note:'Luồng chính là đường đi khi mọi việc suôn sẻ. Các tình huống khác nằm ở luồng thay thế.',vars:V('-',f,['Kết quả','mượn thành công'])});
 }},
het:{inputs:[],
 intro:'Lần này thẻ của độc giả đã hết hạn. Xem kịch bản rẽ nhánh ở bước nào. Bấm "Bước tiếp".',
 lines:function(){return UC;},
 run:function(c){
  var f='thay thế 2a';
  c.snap({ln:0,title:'Use Case Mượn sách',body:'Cùng kịch bản, nhưng thẻ của độc giả hết hạn. Luồng chính sẽ không đi hết được.',vars:V('-','chính')});
  c.snap({ln:4,title:'Độc giả quét thẻ',body:'Bước 1 vẫn giống luồng chính.',vars:V('Độc giả','chính')});
  c.snap({ln:5,title:'Hệ thống kiểm tra thẻ',body:'Ở bước 2, hệ thống phát hiện thẻ đã hết hạn. Luồng chính dừng ở đây, ta rẽ nhánh.',vars:V('Hệ thống','chính',['Thẻ','hết hạn']).map(function(r,i){return i==2?['Thẻ','hết hạn','1']:r;})});
  c.snap({ln:12,title:'Rẽ sang luồng 2a',body:'2a là luồng thay thế cho bước 2: trường hợp thẻ hết hạn.',vars:V('Hệ thống',f,['Thẻ','hết hạn'])});
  c.snap({ln:13,title:'Hệ thống báo lỗi',body:'Hệ thống báo thẻ hết hạn và kết thúc. Các bước 3 đến 6 không được chạy.',vars:V('Hệ thống',f,['Thẻ','hết hạn'])});
  c.snap({ln:13,title:'Xong',body:'Độc giả không mượn được sách, cần gia hạn thẻ trước.',note:'Luồng thay thế bắt đầu từ một bước của luồng chính (2a rẽ ra từ bước 2) khi có điều kiện khác thường.',vars:V('-',f,['Kết quả','không mượn được'])});
 }},
da:{inputs:[],
 intro:'Lần này thẻ hợp lệ nhưng cuốn sách đã có người mượn. Bấm "Bước tiếp".',
 lines:function(){return UC;},
 run:function(c){
  var f='thay thế 4a';
  c.snap({ln:0,title:'Use Case Mượn sách',body:'Cùng kịch bản, nhưng cuốn sách độc giả chọn đã được người khác mượn.',vars:V('-','chính')});
  c.snap({ln:4,title:'Độc giả quét thẻ',body:'Bước 1 giống luồng chính.',vars:V('Độc giả','chính')});
  c.snap({ln:5,title:'Hệ thống kiểm tra thẻ',body:'Thẻ còn hạn nên luồng chính đi tiếp.',vars:V('Hệ thống','chính',['Thẻ','còn hạn'])});
  c.snap({ln:6,title:'Độc giả chọn sách',body:'Độc giả chọn cuốn "Lập trình C#".',vars:V('Độc giả','chính',['Sách','Lập trình C#'])});
  c.snap({ln:7,title:'Hệ thống kiểm tra sách',body:'Ở bước 4, hệ thống thấy sách đã có người mượn. Luồng chính dừng ở đây, ta rẽ nhánh.',vars:V('Hệ thống','chính',['Sách','đã được mượn'])});
  c.snap({ln:14,title:'Rẽ sang luồng 4a',body:'4a là luồng thay thế cho bước 4: trường hợp sách đã được mượn.',vars:V('Hệ thống',f,['Sách','đã được mượn'])});
  c.snap({ln:15,title:'Hệ thống báo và gợi ý',body:'Hệ thống báo sách đã được mượn và gợi ý độc giả chọn sách khác.',vars:V('Hệ thống',f,['Sách','đã được mượn'])});
  c.snap({ln:16,title:'Xong',body:'Độc giả có thể quay lại bước 3 để chọn cuốn khác. Các bước ghi phiếu mượn chưa chạy.',note:'Mỗi luồng thay thế gắn với một bước cụ thể của luồng chính và nói rõ hệ thống làm gì khi gặp tình huống đó.',vars:V('-',f,['Kết quả','chưa mượn, chọn sách khác'])});
 }}
};
