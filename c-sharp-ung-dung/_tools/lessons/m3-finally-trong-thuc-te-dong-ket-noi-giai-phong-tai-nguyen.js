// META {"module":3,"lesson":"Khối finally và Đảm bảo Giải phóng Tài nguyên","activity":"finally trong thực tế: Đóng kết nối, giải phóng tài nguyên","title":"Quên đóng kết nối","lead":"Bể kết nối giả lập chỉ có 5 ô. Hàm LoadData lỗi liên tục. Bấm <b>Bước tiếp</b> để hai cột cùng chạy.","tabs":[["x","Gọi hàm 3 lần, cả 3 lần đều lỗi"]],"codeTitle":"Mã nguồn C#"}
function myBoard(open, leaked, using, extra) {
  var cells = [];
  for (var i = 0; i < 5; i++) {
    if (i < leaked) cells.push({ v: 'Bỏ ngỏ', s: 'bad' });
    else if (i === leaked && using) cells.push({ v: 'Đang dùng', s: 'hi' });
    else cells.push({ v: null, s: 'ok' });
  }
  var out = [vScore([{ k: 'Kết nối đang mở', v: open, s: open >= 5 ? 'bad' : (open > 0 ? 'hi' : 'ok') }]), vCells(cells, { name: 'Bể kết nối (5 ô)', idx: false })];
  if (extra) out.push(extra);
  return out;
}
var myHead = '// conn: kết nối giả lập, tối đa 5';
var EX = {x: {
 intro: 'Mỗi lần gọi LoadData(): mở kết nối, truy vấn (luôn lỗi), rồi đóng kết nối. Hãy theo dõi bộ đếm ở mỗi cột.',
 running: 'Truy vấn lỗi mỗi lần. Bên trái Close() bị bỏ qua, bên phải finally luôn đóng.',
 done: 'Cuối cùng: bên trái 5 kết nối bị bỏ ngỏ và hết chỗ cho lần mở thứ 6, bên phải vẫn 0 kết nối đang mở.',
 note: 'Rò rỉ tài nguyên không gây lỗi ngay mà tích lũy dần cho tới khi hệ thống cạn tài nguyên. Đặt Close() trong finally. Kết nối ở đây là giả lập, giới hạn 5 chỉ để minh họa.',
 cols: [
 {title: 'Không finally', sub: 'Close() bị bỏ qua khi Query lỗi.',
  lines: [myHead, 'static void LoadData()', '{', '  conn.Open();', '  conn.Query();', '  conn.Close();', '}', 'for (int i = 1; i <= 6; i++)', '{', '  try { LoadData(); }', '  catch (Exception) { }', '}'],
  run: function (c) {
   c.snap({ ln: 3, title: 'Lần 1: mở kết nối', body: 'LoadData() mở kết nối thứ nhất, bộ đếm là 1.', vars: [['i', 1, 1]], viz: myBoard(1, 0, true) });
   c.snap({ ln: 10, title: 'Lần 1: Query lỗi', body: 'Query ném lỗi, nhảy thẳng xuống catch nên Close() bị bỏ qua. Kết nối bị bỏ ngỏ, đếm = 1.', vars: [['i', 1]], viz: myBoard(1, 1, false) });
   c.snap({ ln: 10, title: 'Lần 2: lỗi, không đóng', body: 'Lại mở kết nối mới, lại lỗi, lại không đóng. Đếm = 2.', vars: [['i', 2, 1]], viz: myBoard(2, 2, false) });
   c.snap({ ln: 10, title: 'Lần 3: lỗi, không đóng', body: 'Đếm = 3. Không có thông báo lỗi nào, vì catch đã nuốt lỗi.', vars: [['i', 3, 1]], viz: myBoard(3, 3, false) });
   c.snap({ ln: 10, title: 'Lần 4 và lần 5', body: 'Tiếp tục như vậy, đếm = 5 và bể kết nối đã đầy.', vars: [['i', 5, 1]], viz: myBoard(5, 5, false) });
   c.snap({ ln: 3, title: 'Lần 6: hết kết nối', body: 'Bể chỉ có 5 ô, tất cả đang bị bỏ ngỏ nên conn.Open() không mở được nữa.', vars: [['i', 6, 1]],
    viz: myBoard(5, 5, false, vCard({ kind: 'err', title: 'Hết kết nối', sub: 'Bể kết nối giả lập chỉ có 5 ô.' })) });
   c.snap({ ln: 3, title: 'Xong', body: 'Chương trình bị nghẹt dù mỗi lần lỗi đều nhỏ.', vars: [['i', 6]],
    viz: myBoard(5, 5, false, vCard({ kind: 'err', title: 'Hết kết nối', sub: 'Bể kết nối giả lập chỉ có 5 ô.' })) });
  }},
 {title: 'Có finally', sub: 'Close() nằm trong finally.',
  lines: [myHead, 'static void LoadData()', '{', '  conn.Open();', '  try', '  {', '    conn.Query();', '  }', '  finally', '  {', '    conn.Close();', '  }', '}', 'for (int i = 1; i <= 6; i++)', '{', '  try { LoadData(); }', '  catch (Exception) { }', '}'],
  run: function (c) {
   c.snap({ ln: 3, title: 'Lần 1: mở kết nối', body: 'LoadData() mở kết nối thứ nhất, bộ đếm là 1.', vars: [['i', 1, 1]], viz: myBoard(1, 0, true) });
   c.snap({ ln: 10, title: 'Lần 1: finally đóng', body: 'Query lỗi, nhưng finally vẫn chạy và đóng kết nối. Đếm về 0.', vars: [['i', 1]], viz: myBoard(0, 0, false) });
   c.snap({ ln: 10, title: 'Lần 2: lỗi nhưng vẫn đóng', body: 'Mỗi lần lỗi, finally đều đóng kết nối. Đếm vẫn là 0.', vars: [['i', 2, 1]], viz: myBoard(0, 0, false) });
   c.snap({ ln: 10, title: 'Lần 3: lỗi nhưng vẫn đóng', body: 'Đếm vẫn là 0.', vars: [['i', 3, 1]], viz: myBoard(0, 0, false) });
   c.snap({ ln: 10, title: 'Lần 4 và lần 5', body: 'Vẫn không có kết nối nào bị bỏ ngỏ.', vars: [['i', 5, 1]], viz: myBoard(0, 0, false) });
   c.snap({ ln: 10, title: 'Lần 6: vẫn bình thường', body: 'Bể còn nguyên 5 ô trống, lần 6 mở và đóng như các lần trước.', vars: [['i', 6, 1]], viz: myBoard(0, 0, false) });
   c.snap({ ln: 10, title: 'Xong', body: 'Không có kết nối nào bị rò rỉ.', vars: [['i', 6]], viz: myBoard(0, 0, false) });
  }}
 ]}};
