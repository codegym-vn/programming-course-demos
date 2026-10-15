// META {"module":9,"lesson":"Thiết kế hướng đối tượng (OOD) - Sơ đồ lớp UML và Nguyên tắc SOLID","activity":"Chuyển đổi mô hình OOA sang OOD","title":"Từ OOA sang OOD","lead":"Mô hình phân tích chỉ nêu có gì, mô hình thiết kế thêm chi tiết kỹ thuật. Bấm <b>Bước tiếp</b> để thêm từng lớp chi tiết cho lớp Book.","tabs":[["x","Lớp Book qua từng bước"]],"codeTitle":"Các bước chuyển đổi"}
var EX = {x:{
 inputs:[],
 intro:'Ta bắt đầu từ hộp Book của mô hình phân tích (OOA), rồi thêm chi tiết từng bước để thành mô hình thiết kế (OOD). Bấm "Bước tiếp".',
 lines:function(){return [
  '1. OOA: chỉ có tên thuộc tính',
  '2. Thêm kiểu dữ liệu',
  '3. Thêm ký hiệu truy cập (+ -)',
  '4. Thêm phương thức',
  '5. Thêm interface kho sách',
  '6. Thêm lớp dịch vụ',
  '7. Kết quả: sơ đồ OOD'];},
 run:function(c){
  function bk(attrs,methods,hi){return {id:'b',name:'Book',attrs:attrs,methods:methods,c:0,r:0,hi:hi};}
  var A0=['Title','Author','IsBorrowed'];
  var A1=['Title: string','Author: string','IsBorrowed: bool'];
  var A2=['- Title: string','- Author: string','- IsBorrowed: bool'];
  var M=['+ Borrow(): void','+ Return(): void'];
  var repo={id:'r',name:'IBookRepository',stereo:'interface',attrs:[],methods:['+ Add(b: Book): void','+ FindById(id: int): Book'],c:1,r:0};
  function svc(hi){return {id:'s',name:'LibraryService',attrs:['- repo: IBookRepository'],methods:['+ BorrowBook(id: int): bool'],c:0,r:1,hi:hi};}
  c.snap({ln:0,title:'Mô hình OOA',body:'Lúc phân tích, Book chỉ cần biết có những thông tin nào. Chưa có kiểu dữ liệu, chưa có phương thức.',
   uml:{boxes:[bk(A0,[],1)],links:[]}});
  c.snap({ln:1,title:'Thêm kiểu dữ liệu',body:'Mỗi thuộc tính được gán kiểu cụ thể: Title và Author là string, IsBorrowed là bool.',
   uml:{boxes:[bk(A1,[],1)],links:[]}});
  c.snap({ln:2,title:'Thêm ký hiệu truy cập',body:'Dấu - nghĩa là private. Dữ liệu được giấu bên trong lớp, bên ngoài không sửa trực tiếp được.',
   uml:{boxes:[bk(A2,[],1)],links:[]}});
  c.snap({ln:3,title:'Thêm phương thức',body:'Hành động của sách được thêm vào: Borrow và Return. Dấu + nghĩa là public, bên ngoài gọi được.',
   uml:{boxes:[bk(A2,M.map(function(t){return {t:t,hi:true};}),0)],links:[]}});
  c.snap({ln:4,title:'Thêm interface IBookRepository',body:'Đây là lớp kỹ thuật mà OOA không có: nơi lưu và tìm sách. Dùng interface để sau này đổi cách lưu mà không ảnh hưởng chỗ khác.',
   uml:{boxes:[bk(A2,M,0),Object.assign({hi:1},repo)],links:[{a:'r',b:'b',type:'dep',label:'dùng'}]}});
  c.snap({ln:5,title:'Thêm lớp dịch vụ LibraryService',body:'LibraryService chứa quy trình nghiệp vụ, như mượn sách. Nó chỉ làm việc với interface, không biết sách được lưu ở đâu.',
   uml:{boxes:[bk(A2,M,0),repo,svc(1)],links:[{a:'r',b:'b',type:'dep',label:'dùng'},{a:'s',b:'r',type:'dassoc',hi:1}]}});
  c.snap({ln:6,title:'Xong',body:'Sơ đồ OOD hoàn chỉnh: lớp Book, interface IBookRepository, lớp dịch vụ LibraryService.',
   note:'OOD là OOA cộng thêm chi tiết kỹ thuật: kiểu dữ liệu, mức truy cập, phương thức và các lớp phục vụ như interface, dịch vụ.',
   uml:{boxes:[bk(A2,M,0),repo,svc(0)],links:[{a:'r',b:'b',type:'dep',label:'dùng'},{a:'s',b:'r',type:'dassoc'}]}});
 }}};
