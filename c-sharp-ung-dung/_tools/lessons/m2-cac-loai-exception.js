// META {"module":2,"lesson":"Giới thiệu về Exception và Tầm quan trọng","activity":"Các loại Exception phổ biến trong C#","title":"Các loại Exception phổ biến","lead":"Mỗi tab là một loại exception hay gặp. Chọn một thẻ rồi bấm <b>Bước tiếp</b>.","tabs":[["format","FormatException"],["divide","DivideByZeroException"],["index","IndexOutOfRangeException"],["nullref","NullReferenceException"],["cast","InvalidCastException"],["overflow","OverflowException"]],"codeTitle":"Mã nguồn C#"}
/* mỗi tab tính kết quả bằng JS thật, rồi dựng cùng khung 3 bước */
function ceTab(o){
  return {inputs:[],chips:[],intro:o.intro,lines:function(){ return o.lines; },run:function(c){
   var r = o.calc();
   c.snap({ln:o.ln1,title:'Chuẩn bị dữ liệu',body:o.prep,viz:vCard({kind:'info',title:o.name,sub:'Dữ liệu đã sẵn sàng.',lines:o.codeShow}),vars:o.vars,arrs:o.arrs});
   c.err('Unhandled exception. System.' + o.name + ': ' + r.msg);
   c.snap({ln:o.ln2,title:'Chạy dòng gây lỗi',body:o.run(r),viz:vCard({kind:'warn',title:o.name,sub:'Dòng này sẽ ném exception.',lines:[o.bad]}),vars:o.vars,arrs:o.arrs});
   c.snap({ln:o.ln2,title:'Xong: ' + o.name,body:o.end,note:o.note,
    viz:vCard({kind:'err',title:o.name,sub:r.msg,lines:[o.bad],tip:o.tip}),vars:o.vars,arrs:o.arrs});
  }};
}
var EX = {
format:ceTab({name:'FormatException',lines:['string s = "12a";','int n = int.Parse(s);'],ln1:0,ln2:1,bad:'int n = int.Parse(s);',codeShow:['string s = "12a";'],
 intro:'Chuỗi "12a" không phải số. Bấm "Bước tiếp".',vars:[['s',S('12a'),1]],
 calc:function(){ var s = '12a'; return {ok:/^[+-]?\d+$/.test(s), msg:"The input string '" + s + "' was not in a correct format."}; },
 prep:'Biến s chứa chuỗi "12a", có cả chữ lẫn số.',run:function(r){ return 'int.Parse thử đổi "12a" thành số nhưng ' + (r.ok ? 'được' : 'không đổi được') + ', nên ném FormatException.'; },
 end:'Chuỗi không đúng dạng số nên đổi kiểu thất bại.',tip:'Cách phòng tránh: dùng int.TryParse để kiểm tra trước, không ném lỗi.',note:'Tên loại FormatException cho biết: dữ liệu sai định dạng. Đọc tên loại là bước đầu tiên để sửa lỗi.'}),
divide:ceTab({name:'DivideByZeroException',lines:['int a = 10;','int b = 0;','int r = a / b;'],ln1:1,ln2:2,bad:'int r = a / b;',codeShow:['int a = 10;','int b = 0;'],
 intro:'Chia số nguyên 10 cho 0. Bấm "Bước tiếp".',vars:[['a',10],['b',0,1]],
 calc:function(){ var a = 10, b = 0; return {zero:b === 0, msg:'Attempted to divide by zero.'}; },
 prep:'a = 10 và b = 0. Cả hai đều là số nguyên int.',run:function(r){ return 'Phép chia số nguyên a / b có b = 0' + (r.zero ? ' nên ném DivideByZeroException.' : '.'); },
 end:'Chia số nguyên cho 0 không có kết quả hợp lệ. Lưu ý: với double thì 10.0 / 0 không lỗi mà ra vô cực (∞).',tip:'Cách phòng tránh: kiểm tra b != 0 trước khi chia.',note:'Tên loại DivideByZeroException cho biết: chia số nguyên cho 0. Đọc tên loại là bước đầu tiên để sửa lỗi.'}),
index:ceTab({name:'IndexOutOfRangeException',lines:['int[] arr = new int[3];','int x = arr[3];'],ln1:0,ln2:1,bad:'int x = arr[3];',codeShow:['int[] arr = new int[3];'],
 intro:'Mảng có 3 phần tử nhưng đọc arr[3]. Bấm "Bước tiếp".',vars:[['arr.Length',3,1]],arrs:[AR('arr',[0,0,0])],
 calc:function(){ var arr = [0,0,0], i = 3; return {out:i >= arr.length, len:arr.length, msg:'Index was outside the bounds of the array.'}; },
 prep:'Mảng arr có 3 phần tử, các chỉ số hợp lệ là 0, 1, 2.',run:function(r){ return 'arr[3] truy cập chỉ số 3, nhưng chỉ số lớn nhất là ' + (r.len - 1) + ', nên ném IndexOutOfRangeException.'; },
 end:'Chỉ số bắt đầu từ 0 nên mảng 3 phần tử không có chỉ số 3.',tip:'Cách phòng tránh: kiểm tra i < arr.Length trước khi truy cập.',note:'Tên loại IndexOutOfRangeException cho biết: chỉ số vượt ngoài mảng. Đọc tên loại là bước đầu tiên để sửa lỗi.'}),
nullref:ceTab({name:'NullReferenceException',lines:['string s = null;','int n = s.Length;'],ln1:0,ln2:1,bad:'int n = s.Length;',codeShow:['string s = null;'],
 intro:'Biến s là null nhưng ta đọc s.Length. Bấm "Bước tiếp".',vars:[['s','null',1]],
 calc:function(){ var s = null; return {isNull:s === null, msg:'Object reference not set to an instance of an object.'}; },
 prep:'Biến s có giá trị null: nó không trỏ tới chuỗi nào.',run:function(r){ return 's.Length cần một chuỗi để đo độ dài, nhưng s ' + (r.isNull ? 'là null nên ném NullReferenceException.' : 'có giá trị.'); },
 end:'Không thể dùng dấu chấm trên một biến null.',tip:'Cách phòng tránh: kiểm tra s != null hoặc dùng s?.Length.',note:'Tên loại NullReferenceException cho biết: dùng biến đang null. Đọc tên loại là bước đầu tiên để sửa lỗi.'}),
cast:ceTab({name:'InvalidCastException',lines:['object o = "abc";','int n = (int)o;'],ln1:0,ln2:1,bad:'int n = (int)o;',codeShow:['object o = "abc";'],
 intro:'Biến object đang chứa chuỗi nhưng ép về int. Bấm "Bước tiếp".',vars:[['o',S('abc'),1]],
 calc:function(){ var o = 'abc'; return {isStr:typeof o === 'string', msg:"Unable to cast object of type 'System.String' to type 'System.Int32'."}; },
 prep:'Biến o kiểu object, bên trong thực chất là một chuỗi "abc".',run:function(r){ return '(int)o ép o về int, nhưng bên trong là ' + (r.isStr ? 'string' : 'int') + ' nên ném InvalidCastException.'; },
 end:'Không thể ép một chuỗi thành số nguyên bằng cách ép kiểu.',tip:'Cách phòng tránh: kiểm tra bằng is hoặc as trước khi ép, ví dụ if (o is int).',note:'Tên loại InvalidCastException cho biết: ép kiểu không hợp lệ. Đọc tên loại là bước đầu tiên để sửa lỗi.'}),
overflow:ceTab({name:'OverflowException',lines:['checked','{','  int x = int.MaxValue;','  x = x + 1;','}'],ln1:2,ln2:3,bad:'x = x + 1;',codeShow:['int x = int.MaxValue;'],
 intro:'Cộng 1 vào số int lớn nhất trong khối checked. Bấm "Bước tiếp".',vars:[['x','2147483647',1]],
 calc:function(){ var x = 2147483647, sum = x + 1; return {over:sum > 2147483647, wrap:sum | 0, msg:'Arithmetic operation resulted in an overflow.'}; },
 prep:'x = int.MaxValue = 2147483647, số int lớn nhất. Khối checked yêu cầu kiểm tra tràn số.',run:function(r){ return 'x + 1 vượt quá giá trị lớn nhất của int' + (r.over ? ', trong khối checked nên ném OverflowException.' : '.'); },
 end:'Nếu không có checked thì không có lỗi: kết quả quay vòng thành số âm ' + (2147483647 + 1 | 0) + '.',tip:'Cách phòng tránh: dùng kiểu lớn hơn như long, hoặc kiểm tra giới hạn trước khi cộng.',note:'Tên loại OverflowException cho biết: phép tính tràn số. Đọc tên loại là bước đầu tiên để sửa lỗi.'})
};
