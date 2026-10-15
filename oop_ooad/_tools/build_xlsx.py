import os, re, sys, unicodedata
REPO = '/Users/tuananhcan/Downloads/programming-course-demos'
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter

OUT = sys.argv[1]
BASE_URL = "https://codegym-vn.github.io/programming-course-demos/"

def slug(s):
    s = s.replace("C#", "c-sharp").replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

MODULES = [
    "Giới thiệu Lập trình hướng đối tượng (OOP)",
    "Đối tượng, Lớp và Đóng gói (Encapsulation)",
    "Kế thừa (Inheritance) và Tái sử dụng Mã",
    "Đa hình (Polymorphism) và Thiết kế linh hoạt",
    "Trừu tượng (Abstraction) với Abstract Class và Interface",
    "Giới thiệu Phân tích & Thiết kế hướng đối tượng (OOAD)",
    "Mối quan hệ giữa các lớp và Sơ đồ lớp UML (Class Diagram)",
    "Nguyên tắc thiết kế hướng đối tượng cơ bản và Mã nguồn sạch",
    "Xây dựng dự án thực tế với OOP & OOAD",
]

N, T, K = "Nên làm", "Làm thêm nếu muốn", "Không cần"
R, A = "Bài đọc", "Phân tích (kính lúp)"
C1, C2, TAB = "1 cột", "2 cột song song", "1 cột, nhiều tab"

# (module, lesson, activity, loại, mức, ý chính, cách hoạt động, dạng, ghi chú)
ROWS = [
# ---------- Module 1 ----------
(1, "Giới thiệu Lập trình hướng đối tượng (OOP)", "Khái niệm Lập trình hướng đối tượng (OOP) là gì?", R, T,
 "OOP gom dữ liệu và hành vi vào một đối tượng.",
 "Cùng bài toán lưu 2 sinh viên. Cột trái (thủ tục): các biến rời name1, gpa1, name2, gpa2 và hàm In(name, gpa). Cột phải (OOP): lớp SinhVien có Name, Gpa, In(); tạo sv1, sv2 rồi gọi sv1.In(). Mỗi bước tô sáng dòng code, bộ nhớ cột trái là các ô biến rời, cột phải là 2 hộp đối tượng. Bước cuối ghi chú: dữ liệu của mỗi sinh viên nằm gọn trong một đối tượng.",
 C2, ""),
(1, "Giới thiệu Lập trình hướng đối tượng (OOP)", "Tại sao cần Lập trình hướng đối tượng?", R, K,
 "Lý do và lợi ích (lý thuyết).", "Không cần mô phỏng: nội dung là lập luận, ý chính đã có ở bài trên và ở các mô phỏng chương sau.", "", ""),
(1, "Giới thiệu Lập trình hướng đối tượng (OOP)", "Các khái niệm cốt lõi của OOP (Tổng quan)", R, N,
 "Nhìn nhanh 4 trụ cột bằng một ví dụ nhỏ cho mỗi trụ cột.",
 "4 tab, mỗi tab 3-4 bước. Tab Đóng gói: acc.Deposit(-50) bị chặn, Balance giữ nguyên. Tab Kế thừa: Dog : Animal, dog.Eat() dùng phương thức của lớp cha. Tab Đa hình: Animal a lần lượt trỏ Dog, Cat; cùng lời gọi a.Speak() in Gâu, Meo. Tab Trừu tượng: chỉ gọi car.Start(), các bước bên trong ẩn (mờ). Bộ nhớ hiện hộp đối tượng và giá trị trường.",
 TAB, "Mỗi tab chỉ là bản rút gọn; chi tiết có ở chương 2 đến 5."),
# ---------- Module 2 ----------
(2, "Giới thiệu về Lớp và Đối tượng trong C#", "Lớp là gì? Đối tượng là gì?", R, N,
 "Lớp là khuôn, đối tượng là bản cụ thể được tạo bằng new.",
 "Code: class Car { string Color; int Speed; } rồi Car a = new Car(); a.Color = \"Đỏ\"; Car b = new Car(); b.Color = \"Xanh\";. Bộ nhớ chia 2 vùng: Biến (a, b giữ tham chiếu →Car#1, →Car#2) và Đối tượng (2 hộp Car với trường riêng). Mỗi bước tô sáng hộp vừa tạo/vừa đổi. Ghi chú cuối: một lớp, nhiều đối tượng, mỗi đối tượng có dữ liệu riêng.",
 C1, "Cần mở rộng khung #mem: thêm vùng Đối tượng (heap) dạng hộp có tên lớp, mã #1, #2 và các trường."),
(2, "Giới thiệu về Lớp và Đối tượng trong C#", "Tạo và Sử dụng Đối tượng", R, N,
 "new tạo đối tượng; biến lớp chứa tham chiếu, không chứa đối tượng.",
 "3 tab. Tab Tạo và dùng: new, gán trường, gọi phương thức, in console. Tab Gán tham chiếu: Car b = a; b.Color = \"Đen\"; in a.Color ra Đen vì a và b cùng trỏ Car#1. Tab null: Car c = null; c.Run(); dừng ở bước báo NullReferenceException (console hiện lỗi màu đỏ).",
 TAB, "Tab 2 là ý quan trọng nhất, nên để mặc định."),
(2, "Các Thành phần của Lớp: Trường và Phương thức", "Trường (Fields) trong C#", R, N,
 "Trường là dữ liệu của đối tượng; có giá trị mặc định; mỗi đối tượng giữ bản riêng.",
 "2 tab. Tab Giá trị mặc định: new Student() chưa gán gì, bộ nhớ hiện Name = null, Age = 0, IsActive = false; sau đó gán từng trường. Tab Mỗi đối tượng một bản: s1.Age = 18; s2.Age = 20; đổi s1 không ảnh hưởng s2 (ô s2 giữ nguyên, ô s1 tô vàng).",
 TAB, ""),
(2, "Các Thành phần của Lớp: Trường và Phương thức", "Phương thức (Methods) và Hành vi của Đối tượng", R, N,
 "Gọi phương thức: truyền tham số, chạy thân hàm, đổi trạng thái đối tượng, trả về giá trị.",
 "Lớp Counter có Count và Add(int step) trả về Count mới. Main gọi c.Add(2) rồi c.Add(3). Dòng tô sáng nhảy từ Main vào thân Add rồi quay lại. Bộ nhớ hiện ngăn gọi hàm: tham số step, đối tượng đang dùng (this →Counter#1), giá trị trả về; ngăn biến mất khi hàm kết thúc. Nhập được giá trị bước (1-9).",
 C1, "Có ô nhập step."),
(2, "Các Thành phần của Lớp: Trường và Phương thức", "Phân tích lỗi thường gặp về Tham số và Giá trị trả về", A, T,
 "Truyền int là truyền bản sao; truyền đối tượng là truyền tham chiếu; quên dùng giá trị trả về.",
 "3 tab. Tab Truyền int: Tang(x) tăng bản sao, x ở Main không đổi. Tab Truyền đối tượng: Tang(acc) đổi acc.Balance thật. Tab Bỏ quên giá trị trả về: gọi s.ToUpper() mà không gán, s không đổi. Mỗi tab có bộ nhớ trước/sau để so.",
 TAB, "Học liệu hiện là hoạt động phân tích; mô phỏng đính kèm bổ trợ."),
(2, "Nguyên lý Đóng gói (Encapsulation) và Kiểm soát truy cập", "Đóng gói là gì? Tại sao lại cần Đóng gói?", R, N,
 "Ẩn dữ liệu, chỉ cho thay đổi qua phương thức có kiểm tra.",
 "2 cột cùng kịch bản (gửi 100, rút 500). Cột trái: public decimal Balance, code bên ngoài gán acc.Balance -= 500 → số dư âm -400. Cột phải: private balance + Withdraw(amount) kiểm tra đủ tiền → từ chối, số dư giữ 100. Câu kết so sánh hai số dư cuối.",
 C2, ""),
(2, "Nguyên lý Đóng gói (Encapsulation) và Kiểm soát truy cập", "Các Từ khóa Kiểm soát Truy cập (Access Modifiers)", R, N,
 "public, private, protected, internal: ai được truy cập thành viên nào.",
 "4 tab theo vị trí code đứng: Trong chính lớp, Trong lớp con, Lớp khác cùng project, Project khác. Mỗi bước thử truy cập một thành viên (public/private/protected/internal), ô kết quả hiện ✓ được phép (xanh) hoặc ✗ lỗi biên dịch CS0122 (đỏ). Bước cuối hiện bảng tổng hợp 4x4.",
 TAB, "Không chạy code thật, mô phỏng kết quả biên dịch theo luật C#."),
(2, "Nguyên lý Đóng gói (Encapsulation) và Kiểm soát truy cập", "Phân tích mã nguồn: Đóng gói kém và Đóng gói tốt", A, K,
 "", "Không cần: ý chính đã có ở mô phỏng 'Đóng gói là gì?'.", "", ""),
(2, "Thuộc tính (Properties) trong C#", "Giới thiệu về Thuộc tính (Properties)", R, N,
 "Property trông như trường nhưng chạy qua get/set.",
 "Lớp Person có private int age và property Age { get; set { if (value >= 0) age = value; } }. Main: p.Age = 20; p.Age = -5; Console.WriteLine(p.Age);. Dòng tô sáng nhảy vào khối set (hiện ô value) và get. Bước -5 chỉ rõ điều kiện sai nên age vẫn 20. Nhập được giá trị gán thứ hai.",
 C1, "Có ô nhập giá trị (cho phép số âm)."),
(2, "Thuộc tính (Properties) trong C#", "Cú pháp và Các loại Thuộc tính", R, T,
 "Các dạng property hay gặp.",
 "4 tab: Auto-property { get; set; }; Chỉ đọc { get; } gán ngoài lớp báo lỗi biên dịch; private set chỉ lớp tự đổi; Tính toán (FullName => First + \" \" + Last) đổi First thì FullName đổi theo. Mỗi tab 3-4 bước.",
 TAB, ""),
(2, "Thuộc tính (Properties) trong C#", "Sử dụng Thuộc tính với Logic Validation", A, K,
 "", "Không cần: đã có trong mô phỏng 'Giới thiệu về Thuộc tính'.", "", ""),
(2, "Hàm tạo (Constructors) và Khởi tạo Đối tượng", "Mục đích của Hàm tạo (Constructors)", R, N,
 "Constructor chạy ngay khi new, đảm bảo đối tượng có dữ liệu hợp lệ từ đầu.",
 "2 cột. Cột trái: không constructor, new Book() rồi quên gán Title → Title = null, in ra rỗng. Cột phải: Book(string title, decimal price), new Book(\"C#\", 99) → bước 1 cấp vùng nhớ (trường mặc định), bước 2 chạy thân constructor gán giá trị, bước 3 trả tham chiếu về biến.",
 C2, ""),
(2, "Hàm tạo (Constructors) và Khởi tạo Đối tượng", "Các loại Hàm tạo và Nạp chồng Hàm tạo", R, N,
 "Nhiều constructor khác tham số; C# chọn theo đối số; : this(...) gọi lẫn nhau.",
 "3 tab theo lời gọi: new Point(), new Point(5), new Point(5, 7). Mỗi tab tô sáng constructor được chọn, rồi theo : this(x, 0) nhảy sang constructor đầy đủ. Bộ nhớ hiện X, Y sau cùng.",
 TAB, ""),
(2, "Hàm tạo (Constructors) và Khởi tạo Đối tượng", "Sử dụng từ khóa 'this' trong Hàm tạo", A, T,
 "name = name gán tham số cho chính nó; this.name = name mới gán vào trường.",
 "2 cột cùng new Person(\"An\"). Cột trái name = name; → trường name vẫn null. Cột phải this.name = name; → trường name = \"An\". Bộ nhớ hiện song song tham số name và trường this.name.",
 C2, "Học liệu hiện là hoạt động phân tích; lỗi rất hay gặp nên đáng làm."),
(2, "Tổng kết và Áp dụng Đóng gói", "Tóm tắt Nguyên lý Đóng gói và Best Practices", R, K,
 "", "Không cần: bài tóm tắt.", "", ""),
# ---------- Module 3 ----------
(3, "Giới thiệu về Kế thừa", "Kế thừa là gì?", R, N,
 "Lớp con có sẵn trường và phương thức của lớp cha.",
 "Animal { Name; Eat() } và Dog : Animal { Bark() }. new Dog() → hộp đối tượng chia 2 phần: phần của Animal (Name) và phần của Dog. Gọi dog.Eat(): mô phỏng tìm Eat trong Dog, không thấy, lên Animal, tìm thấy (tô sáng đường đi). Gọi dog.Bark() tìm thấy ngay trong Dog.",
 C1, ""),
(3, "Giới thiệu về Kế thừa", "Mối quan hệ 'is-a' và lớp cha, lớp con", R, T,
 "Dog là một Animal, nhưng Animal chưa chắc là Dog.",
 "Từng bước chạy các phép kiểm tra is: dog is Animal → true, dog is Dog → true, animal is Dog → false, cat is Dog → false. Sơ đồ cây lớp bên cạnh tô sáng đường từ lớp con lên lớp cha khi true.",
 C1, ""),
(3, "Các khái niệm cơ bản của Kế thừa trong C#", "Cú pháp Kế thừa trong C#", R, N,
 "Cú pháp : và thứ tự chạy constructor: cha trước, con sau; : base(...) truyền tham số lên cha.",
 "new Dog(\"Lu\", \"Corgi\"). Dòng tô sáng: vào Dog(...) → nhảy lên Animal(name) qua : base(name) → gán Name → quay lại thân Dog gán Breed. Console in theo thứ tự \"Animal ctor\", \"Dog ctor\".",
 C1, "Bổ trợ luôn cho 'Phân tích lỗi khi kết hợp Kế thừa và Constructor'."),
(3, "Các khái niệm cơ bản của Kế thừa trong C#", "Thành viên được kế thừa và Tầm vực truy cập", R, N,
 "Lớp con kế thừa tất cả, nhưng chỉ truy cập được public/protected, không truy cập private.",
 "Lớp cha có public Name, protected Age, private secret. Trong phương thức của lớp con thử dùng từng cái: ✓, ✓, ✗ lỗi biên dịch. Tab 2: từ Main (ngoài) thử dog.Name ✓, dog.Age ✗, dog.secret ✗. Ghi chú: trường private vẫn nằm trong đối tượng (hiện mờ), chỉ là không truy cập trực tiếp.",
 TAB, ""),
(3, "Tái sử dụng mã và Cải tiến với Kế thừa", "Kế thừa để Tái sử dụng Mã", R, T,
 "Code chung đưa lên lớp cha, sửa một chỗ.",
 "2 cột. Trái: Car và Truck mỗi lớp tự viết Start() giống nhau. Phải: Vehicle.Start() dùng chung. Kịch bản: đổi thông báo Start → cột trái sửa 2 chỗ, cột phải sửa 1 chỗ (ô đếm 'chỗ phải sửa').",
 C2, ""),
(3, "Kế thừa nâng cao: virtual, override, base", "Từ khóa `virtual` và `override`", R, N,
 "virtual + override: phương thức chạy theo đối tượng thật, không theo kiểu biến.",
 "2 tab. Tab Có virtual/override: Animal a = new Dog(); a.Speak(); → tô sáng Dog.Speak, in Gâu. Tab Không virtual (che bằng new): cùng code nhưng in âm thanh chung của Animal. Bộ nhớ hiện kiểu biến (Animal) và kiểu đối tượng (Dog) cạnh nhau.",
 TAB, "Chương 4 (Ghi đè phương thức) dùng lại mô phỏng này."),
(3, "Kế thừa nâng cao: virtual, override, base", "Sử dụng từ khóa `base`", R, N,
 "base.Method() gọi phiên bản lớp cha rồi bổ sung.",
 "Employee.GetInfo() trả \"Tên: An\"; Manager.GetInfo() override = base.GetInfo() + \", Phòng: IT\". Dòng tô sáng nhảy Manager → Employee → quay về ghép chuỗi; ô biến hiện chuỗi tạm từng bước.",
 C1, ""),
(3, "Các vấn đề và thực hành tốt nhất trong Kế thừa", "Hạn chế của Kế thừa", R, T,
 "Lớp cha thay đổi có thể làm hỏng lớp con.",
 "Lớp cha Collection có Add và AddRange (AddRange gọi Add). Lớp con CountingList override Add để đếm. Gọi AddRange 3 phần tử → đếm ra 6 (đếm 2 lần) vì AddRange của cha lại gọi Add. Từng bước theo luồng gọi để thấy nguyên nhân.",
 C1, "Ví dụ kinh điển 'fragile base class'; có thể thay bằng ví dụ bài đọc đang dùng."),
(3, "Các vấn đề và thực hành tốt nhất trong Kế thừa", "Khi nào nên sử dụng Kế thừa", R, K,
 "", "Không cần: hướng dẫn ra quyết định, không có quá trình chạy.", "", ""),
# ---------- Module 4 ----------
(4, "Giới thiệu về Đa hình trong C#", "Khái niệm Đa hình là gì?", R, N,
 "Cùng một lời gọi, đối tượng khác nhau cho hành vi khác nhau.",
 "Một biến Animal a. Bước 1 a = new Dog(); a.Speak() → Gâu. Bước 2 a = new Cat(); a.Speak() → Meo. Bước 3 a = new Duck(); → Quạc. Dòng a.Speak() giữ nguyên, chỉ đổi đối tượng mà a trỏ tới (mũi tên trong bộ nhớ đổi hướng).",
 C1, ""),
(4, "Giới thiệu về Đa hình trong C#", "Ví dụ minh họa Đa hình", R, K,
 "", "Không cần: trùng ý với 'Khái niệm Đa hình' và 'Ví dụ về Đa hình với danh sách lớp cơ sở'; đính kèm lại một trong hai.", "", ""),
(4, "Giới thiệu về Đa hình trong C#", "Lợi ích của Đa hình", R, K,
 "", "Không cần: đính kèm lại mô phỏng 'Đa hình giúp tạo mã linh hoạt và dễ mở rộng'.", "", ""),
(4, "Đa hình tĩnh: Nạp chồng phương thức (Method Overloading)", "Nạp chồng phương thức là gì?", R, N,
 "Cùng tên, khác tham số; trình biên dịch chọn phiên bản theo đối số.",
 "Lớp Calc có Add(int,int), Add(double,double), Add(int,int,int). Main gọi lần lượt Add(2,3), Add(2.5,1.5), Add(1,2,3). Mỗi bước tô sáng lời gọi, rồi tô sáng phiên bản được chọn và nêu lý do (số lượng/kiểu đối số).",
 C1, ""),
(4, "Đa hình tĩnh: Nạp chồng phương thức (Method Overloading)", "Cú pháp và ví dụ về Nạp chồng phương thức", R, T,
 "Nạp chồng hợp lệ và không hợp lệ.",
 "3 tab: Khác số tham số ✓; Khác kiểu tham số ✓; Chỉ khác kiểu trả về ✗ lỗi biên dịch CS0111. Mỗi tab 2-3 bước.",
 TAB, ""),
(4, "Đa hình động: Ghi đè phương thức (Method Overriding) và từ khóa virtual, override", "Ghi đè phương thức là gì và tại sao cần?", R, K,
 "", "Dùng lại mô phỏng 'Từ khóa virtual và override' (chương 3).", "", "Đính kèm lại, không làm mới."),
(4, "Đa hình động: Ghi đè phương thức (Method Overriding) và từ khóa virtual, override", "Từ khóa virtual và override", R, K,
 "", "Dùng lại mô phỏng 'Từ khóa virtual và override' (chương 3).", "", "Đính kèm lại, không làm mới."),
(4, "Đa hình với các lớp cơ sở và giao diện", "Đa hình thông qua tham chiếu lớp cơ sở", R, N,
 "Kiểu biến quyết định gọi được gì; đối tượng thật quyết định chạy bản nào.",
 "Animal a = new Dog();. Bước a.Speak() → chạy Dog.Speak. Bước a.Fetch() → lỗi biên dịch vì Animal không có Fetch. Bước ((Dog)a).Fetch() → chạy được. Bộ nhớ hiện 'kiểu biến: Animal' và 'đối tượng: Dog#1'.",
 C1, ""),
(4, "Đa hình với các lớp cơ sở và giao diện", "Ví dụ về Đa hình với danh sách lớp cơ sở", R, N,
 "Một vòng foreach xử lý nhiều loại đối tượng.",
 "List<Shape> shapes = { Circle(r=2), Rect(3,4), Square(5) }. foreach gọi s.Area(): mỗi lần lặp tô sáng phần tử, nhảy vào Area đúng lớp, cộng dồn total. Mảng shapes hiện hi/done như các mô phỏng mảng trước.",
 C1, "Làm tròn diện tích hình tròn 2 chữ số."),
(4, "Đa hình với các lớp cơ sở và giao diện", "Đa hình với Interface (giới thiệu)", R, T,
 "Các lớp không cùng cha vẫn dùng chung được qua interface.",
 "IPayable { GetAmount() } cho Employee và Invoice. List<IPayable> duyệt và cộng tổng tiền. Sơ đồ nhỏ: 2 lớp không liên quan cùng nối vào IPayable.",
 C1, ""),
(4, "Đa hình với các lớp cơ sở và giao diện", "Phân biệt Upcasting và Downcasting", "Đã có nội dung", T,
 "Upcast luôn an toàn; downcast có thể lỗi; dùng is/as để kiểm tra.",
 "4 tab: Upcast Animal a = dog ✓; Downcast đúng (Dog)a ✓; Downcast sai (Cat)a → InvalidCastException; Dùng as → null thay vì lỗi, và if (a is Dog d).",
 TAB, "Học liệu không phải bài đọc; mô phỏng đính kèm bổ trợ."),
(4, "Ứng dụng và Lợi ích của Đa hình trong thiết kế phần mềm", "Đa hình giúp tạo mã linh hoạt và dễ mở rộng", R, N,
 "Thêm loại mới không phải sửa code cũ.",
 "2 cột. Trái: TinhDienTich(shape) dùng switch theo loại. Phải: shape.Area() đa hình. Kịch bản thêm Triangle: cột trái tô đỏ các dòng phải sửa trong switch, cột phải chỉ thêm lớp mới (tô xanh). Câu kết: số chỗ phải sửa 2 so với 0.",
 C2, "Tab 'Lợi ích của Đa hình' đính kèm lại bài này."),
(4, "Ứng dụng và Lợi ích của Đa hình trong thiết kế phần mềm", "Ví dụ thực tế về Đa hình trong thiết kế hệ thống", R, T,
 "Một hàm Checkout làm việc với mọi phương thức thanh toán.",
 "3 tab: Tiền mặt, Thẻ, Ví điện tử. Cùng Checkout(IPayment p, 200000), mỗi tab chạy Pay của lớp tương ứng (phí khác nhau), console in kết quả.",
 TAB, ""),
# ---------- Module 5 ----------
(5, "Giới thiệu về Trừu tượng và Abstract Class", "Khái niệm Trừu tượng trong Lập trình hướng đối tượng (OOP)", R, T,
 "Người dùng chỉ thấy cái cần dùng, chi tiết bên trong được ẩn.",
 "car.Start() ở Main; bên trong là 4 bước riêng tư (CheckFuel, Ignite, ...). Chế độ mặc định chỉ thấy 1 dòng gọi; bấm tiếp mới 'mở nắp' thấy các bước ẩn hiện mờ. Ghi chú: người gọi không cần biết các bước này.",
 C1, ""),
(5, "Giới thiệu về Trừu tượng và Abstract Class", "Tại sao chúng ta cần Trừu tượng trong thiết kế phần mềm?", R, K,
 "", "Không cần: lập luận lý thuyết.", "", ""),
(5, "Giới thiệu về Trừu tượng và Abstract Class", "Giới thiệu Abstract Class: Khái niệm và Mục đích", R, N,
 "Abstract class không tạo đối tượng được; lớp con phải hoàn thiện phần abstract.",
 "3 tab. Tab Không new được: new Shape() → lỗi biên dịch CS0144. Tab Lớp con hoàn chỉnh: new Circle(2).Describe() → Describe (code chung ở Shape) gọi Area() (abstract) → chạy Area của Circle. Tab Quên override: class Square : Shape không viết Area → lỗi CS0534.",
 TAB, "Gộp luôn ý của bài 'Cấu trúc cơ bản của Abstract Class và Abstract Method'."),
(5, "Giới thiệu về Trừu tượng và Abstract Class", "Cấu trúc cơ bản của một Abstract Class và Abstract Method", R, K,
 "", "Dùng lại mô phỏng 'Giới thiệu Abstract Class' (đã gồm tab Quên override).", "", "Đính kèm lại."),
(5, "Thực hành với Abstract Class", "Các quy tắc và hạn chế khi sử dụng Abstract Class", R, T,
 "Abstract class vẫn có constructor và trường; chỉ kế thừa được một lớp.",
 "2 tab. Tab Constructor: new Circle(2) → constructor Shape chạy trước (gán Name) rồi Circle. Tab Một lớp cha: class C : A, B → lỗi CS1721.",
 TAB, ""),
(5, "Giới thiệu về Interface", "Khái niệm Interface trong C# và vai trò của nó", R, N,
 "Interface là hợp đồng; lớp nào ký thì phải làm đủ.",
 "IFlyable { Fly() } cho Bird và Airplane (không cùng cha). Hàm LetItFly(IFlyable f) gọi f.Fly(). Bước 1 truyền Bird → chạy Bird.Fly; bước 2 truyền Airplane → chạy Airplane.Fly. Tab 2: lớp thiếu Fly → lỗi CS0535.",
 TAB, ""),
(5, "Giới thiệu về Interface", "Interface khác gì Abstract Class? (Tổng quan ban đầu)", R, K,
 "", "Không cần: có mô phỏng so sánh ở bài 'So sánh chi tiết ... Phần 1'.", "", ""),
(5, "Giới thiệu về Interface", "Các quy tắc cơ bản và cú pháp của Interface trong C#", R, K,
 "", "Không cần: quy tắc cú pháp, ý chính đã có ở 'Khái niệm Interface'.", "", ""),
(5, "Thực hành với Interface", "Kế thừa đa giao diện (Multiple Inheritance) qua Interface", R, N,
 "Một lớp có thể thực thi nhiều interface; mỗi interface là một 'góc nhìn'.",
 "class Duck : IFlyable, ISwimmable. Cùng một đối tượng Duck#1: IFlyable f = duck chỉ gọi được Fly(); ISwimmable s = duck chỉ gọi được Swim(); f.Swim() → lỗi biên dịch. Bộ nhớ hiện 3 biến cùng trỏ một hộp Duck#1.",
 C1, ""),
(5, "So sánh và Lựa chọn giữa Abstract Class và Interface", "So sánh chi tiết Abstract Class và Interface (Phần 1: Khác biệt cấu trúc và khả năng)", R, T,
 "Abstract class: có trường, constructor, code chung, 1 cha. Interface: hợp đồng, nhiều interface.",
 "2 cột chạy cùng tiêu chí, mỗi bước một tiêu chí (có trường? có constructor? có code sẵn? kế thừa nhiều?), ô kết quả ✓/✗ và đoạn code nhỏ minh họa.",
 C2, ""),
(5, "So sánh và Lựa chọn giữa Abstract Class và Interface", "So sánh chi tiết Abstract Class và Interface (Phần 2: Trường hợp sử dụng và triết lý thiết kế)", R, K,
 "", "Không cần: triết lý thiết kế, không có quá trình chạy.", "", ""),
(5, "Áp dụng Trừu tượng trong Thiết kế Hệ thống", "Lợi ích của Trừu tượng trong thiết kế phần mềm hiện đại", R, K,
 "", "Không cần: ý đổi cài đặt mà không sửa code gọi đã có ở mô phỏng DIP (chương 8).", "", ""),
(5, "Áp dụng Trừu tượng trong Thiết kế Hệ thống", "Ví dụ thực tế: Cách các framework C# lớn sử dụng Abstract Class và Interface", R, T,
 "List.Sort() dùng IComparable mà lớp của bạn thực thi.",
 "Student : IComparable<Student>, CompareTo theo điểm. Gọi list.Sort(): mỗi bước hiện một lần Sort gọi CompareTo(a, b) và kết quả âm/0/dương, mảng sinh viên đổi chỗ dần. Ghi chú: thư viện .NET không biết Student, chỉ biết IComparable.",
 C1, "Dùng Insertion Sort để mô phỏng các lần gọi; ghi chú .NET thực tế dùng thuật toán khác."),
# ---------- Module 6 ----------
(6, "Tổng quan về Phân tích & Thiết kế hướng đối tượng (OOAD)", "OOAD là gì?", R, K, "", "Không cần: lý thuyết.", "", ""),
(6, "Tổng quan về Phân tích & Thiết kế hướng đối tượng (OOAD)", "Lịch sử và sự phát triển của OOAD", R, K, "", "Không cần: lịch sử.", "", ""),
(6, "Tổng quan về Phân tích & Thiết kế hướng đối tượng (OOAD)", "Tại sao OOAD lại quan trọng?", R, K, "", "Không cần: lý thuyết.", "", ""),
(6, "Tổng quan về Phân tích & Thiết kế hướng đối tượng (OOAD)", "Vị trí của OOAD trong vòng đời phát triển phần mềm (SDLC)", R, K, "", "Không cần: sơ đồ tĩnh trong bài đọc là đủ.", "", ""),
(6, "Phân tích yêu cầu trong OOAD", "Thu thập và làm rõ yêu cầu hệ thống", R, K, "", "Không cần: kỹ năng mềm, không có quá trình chạy.", "", ""),
(6, "Phân tích yêu cầu trong OOAD", "Kịch bản sử dụng (Use Case) và vai trò của nó trong phân tích", R, K,
 "", "Dùng chung mô phỏng 'Ví dụ về Use Case cho hệ thống quản lý thư viện'.", "", "Đính kèm lại."),
(6, "Phân tích yêu cầu trong OOAD", "Ví dụ về Use Case cho hệ thống quản lý thư viện", R, N,
 "Use Case là chuỗi bước Tác nhân ↔ Hệ thống, có luồng chính và luồng thay thế.",
 "Use Case 'Mượn sách'. Mỗi bước tô sáng một dòng kịch bản (Độc giả quét thẻ → Hệ thống kiểm tra thẻ → ...), 2 làn Độc giả | Hệ thống. 3 tab: Luồng chính (mượn thành công), Thẻ hết hạn, Sách đã được mượn; tab 2-3 rẽ nhánh ở bước tương ứng.",
 TAB, "Không có code C#; khung #code hiển thị kịch bản Use Case."),
(6, "Xác định Đối tượng, Thuộc tính và Hành vi", "Khái niệm Đối tượng và Lớp trong ngữ cảnh OOAD", R, K, "", "Không cần: trùng chương 2.", "", ""),
(6, "Xác định Đối tượng, Thuộc tính và Hành vi", "Kỹ thuật xác định danh từ và động từ", R, N,
 "Danh từ → ứng viên lớp/thuộc tính; động từ → ứng viên phương thức.",
 "Đoạn mô tả 3-4 câu (cửa hàng sách). Mỗi bước tô sáng một cụm từ: danh từ (xanh) đưa vào cột 'Ứng viên lớp', động từ (vàng) vào cột 'Phương thức'. Bước sau lọc: gộp từ trùng, loại danh từ là thuộc tính (tên, giá) chuyển vào lớp tương ứng. Bước cuối hiện 3 hộp lớp kết quả.",
 C1, "Không có code; khung #code hiển thị đoạn mô tả yêu cầu."),
(6, "Xác định Đối tượng, Thuộc tính và Hành vi", "Thuộc tính (Attributes) của đối tượng", R, K, "", "Không cần: đã có trong mô phỏng danh từ/động từ.", "", ""),
(6, "Xác định Đối tượng, Thuộc tính và Hành vi", "Hành vi (Behaviors/Methods) của đối tượng", R, K, "", "Không cần: đã có trong mô phỏng danh từ/động từ.", "", ""),
(6, "Từ Phân tích đến Thiết kế sơ bộ", "Vai trò của mô hình hóa trong OOAD", R, K, "", "Không cần: lý thuyết.", "", ""),
(6, "Từ Phân tích đến Thiết kế sơ bộ", "Giới thiệu sơ lược về Sơ đồ lớp (Class Diagram)", R, K,
 "", "Dùng chung mô phỏng 'Đối chiếu mã C# với sơ đồ lớp UML đơn giản' (chương 7).", "", "Đính kèm lại."),
# ---------- Module 7 ----------
(7, "Tổng quan về mối quan hệ giữa các lớp và Kế thừa", "Giới thiệu các loại mối quan hệ giữa các lớp", R, T,
 "Nhìn nhanh 5 quan hệ và ký hiệu UML.",
 "5 tab: Kế thừa, Kết hợp, Tập hợp, Hợp thành, Phụ thuộc. Mỗi tab: 3-4 dòng code C# và sơ đồ 2 hộp lớp; bấm tiếp vẽ dần mũi tên đúng ký hiệu (tam giác rỗng, đường thẳng, thoi rỗng, thoi đặc, nét đứt).",
 TAB, "Cần thành phần vẽ sơ đồ lớp UML bằng SVG (dùng chung cho cả chương 7)."),
(7, "Tổng quan về mối quan hệ giữa các lớp và Kế thừa", "Biểu diễn Kế thừa trong sơ đồ lớp UML", R, T,
 "class Dog : Animal ↔ mũi tên tam giác rỗng từ con lên cha.",
 "Code bên trái, sơ đồ bên phải. Mỗi bước đọc một dòng code và vẽ phần tương ứng: hộp Animal, hộp Dog, mũi tên kế thừa, thêm Cat. Ghi chú: mũi tên luôn chỉ về lớp cha.",
 C2, ""),
(7, "Hiểu rõ mối quan hệ Kết hợp (Association)", "Giới thiệu về Kết hợp (Association)", R, N,
 "Hai đối tượng biết nhau qua tham chiếu nhưng sống độc lập.",
 "Teacher có List<Student>. Tạo t, s1, s2; t.AddStudent(s1); ... Bộ nhớ hiện mũi tên từ Teacher#1 sang Student#1, #2. Bước t = null: Teacher biến mất, Student vẫn còn vì biến s1, s2 còn giữ.",
 C1, ""),
(7, "Hiểu rõ mối quan hệ Kết hợp (Association)", "Đa số (Multiplicity) trong Kết hợp", R, N,
 "1, 0..1, *, 1..* nghĩa là bao nhiêu đối tượng ở đầu kia.",
 "3 tab theo đa số: Person 0..1 Passport (gán lần 2 bị từ chối), Order 1..* OrderItem (Order rỗng → không hợp lệ, thêm item → hợp lệ), Class * Student (thêm bao nhiêu cũng được). Mỗi bước thêm một đối tượng, ô trạng thái 'hợp lệ/không hợp lệ' theo đa số trên sơ đồ.",
 TAB, ""),
(7, "Phân biệt Tập hợp (Aggregation) với Kết hợp", "Khái niệm Tập hợp (Aggregation)", R, K,
 "", "Dùng chung mô phỏng 'Minh họa Tập hợp trong đời sống và mã nguồn'.", "", "Đính kèm lại."),
(7, "Phân biệt Tập hợp (Aggregation) với Kết hợp", "Minh họa Tập hợp trong đời sống và mã nguồn", R, N,
 "Toàn thể chứa bộ phận nhưng bộ phận được tạo bên ngoài và sống tiếp khi toàn thể mất.",
 "Player được tạo ở Main rồi truyền vào team.Add(p). Bước team = null: hộp Team mờ đi (bị thu hồi), Player vẫn còn. Bước cuối p chuyển sang team2.",
 C1, ""),
(7, "Mối quan hệ Hợp thành (Composition) và sự phụ thuộc vòng đời", "Hợp thành (Composition) - Mối quan hệ mạnh mẽ", R, N,
 "Bộ phận được toàn thể tạo ra bên trong và mất cùng toàn thể.",
 "House tạo 3 Room trong constructor (new Room bên trong House). Bộ nhớ hiện Room chỉ được House tham chiếu. Bước house = null: House và cả 3 Room cùng mờ đi (không còn ai tham chiếu).",
 C1, "Ghi chú: C# thu hồi bằng bộ gom rác, không xóa ngay; mô phỏng nói 'không còn truy cập được'."),
(7, "Mối quan hệ Hợp thành (Composition) và sự phụ thuộc vòng đời", "So sánh Tập hợp và Hợp thành", R, T,
 "Khác nhau ở chỗ ai tạo bộ phận và bộ phận có sống tiếp không.",
 "2 cột chạy cùng nhịp: trái Department–Employee (tập hợp), phải Car–Engine (hợp thành). Bước cuối gán toàn thể = null: cột trái Employee còn, cột phải Engine mất.",
 C2, ""),
(7, "Áp dụng các mối quan hệ vào thiết kế", "Các nguyên tắc khi lựa chọn mối quan hệ giữa các lớp", R, K,
 "", "Không cần: hướng dẫn ra quyết định; mô phỏng sẽ thành câu đố (trái quy tắc không quiz).", "", ""),
(7, "Làm quen với Sơ đồ lớp UML và các thành phần cơ bản", "Sơ đồ lớp UML là gì? Tại sao cần nó?", R, K, "", "Không cần: lý thuyết.", "", ""),
(7, "Làm quen với Sơ đồ lớp UML và các thành phần cơ bản", "Cấu trúc của một lớp trong UML", R, T,
 "Hộp lớp 3 ngăn và ký hiệu + - #.",
 "Vẽ dần hộp BankAccount: ngăn tên, ngăn thuộc tính (- balance: decimal), ngăn phương thức (+ Deposit(amount: decimal): void). Mỗi bước giải thích một ký hiệu.",
 C1, ""),
(7, "Làm quen với Sơ đồ lớp UML và các thành phần cơ bản", "Đối chiếu mã C# với sơ đồ lớp UML đơn giản", R, N,
 "Mỗi dòng code tương ứng một dòng trong hộp UML.",
 "2 cột: code C# lớp Book bên trái, hộp UML bên phải. Mỗi bước tô sáng cùng lúc một dòng code và dòng UML tương ứng (private → -, public → +, kiểu đặt sau dấu :). Tab 2: lớp có property và constructor.",
 C2, "Đính kèm lại cho 'Giới thiệu sơ lược về Sơ đồ lớp' (chương 6)."),
(7, "Hướng dẫn từng bước vẽ Sơ đồ lớp UML hoàn chỉnh", "Quy trình vẽ Sơ đồ lớp UML", R, N,
 "Quy trình: tìm lớp → thuộc tính → phương thức → quan hệ → đa số.",
 "Đề bài nhỏ (thư viện: Độc giả, Sách, Phiếu mượn). Mỗi bước thực hiện một giai đoạn quy trình, sơ đồ được vẽ thêm phần tương ứng; khung trạng thái nói đang ở bước nào của quy trình.",
 C1, ""),
(7, "Phân tích và hiểu các sơ đồ lớp UML phức tạp", "Các yếu tố nâng cao trong Sơ đồ lớp UML", R, T,
 "abstract, interface, static, enum, phụ thuộc trong UML.",
 "5 tab, mỗi tab một yếu tố: tên nghiêng (abstract), «interface» + mũi tên nét đứt tam giác, gạch chân (static), «enumeration», mũi tên nét đứt (phụ thuộc). Mỗi tab: code C# ↔ hình vẽ.",
 TAB, ""),
# ---------- Module 8 ----------
(8, "Giới thiệu về Mã nguồn sạch và Thiết kế tốt", "Mã nguồn sạch là gì?", R, T,
 "Cùng kết quả, code sạch dễ đọc hơn.",
 "2 cột chạy cùng dữ liệu: trái tên biến a, b, x, số 0.1 không giải thích; phải tên rõ (price, quantity, DiscountRate). Cả hai in cùng kết quả; bước cuối ghi chú: máy chạy như nhau, người đọc thì khác.",
 C2, ""),
(8, "Giới thiệu về Mã nguồn sạch và Thiết kế tốt", "Tầm quan trọng của thiết kế tốt trong OOP", R, K, "", "Không cần: lý thuyết.", "", ""),
(8, "Giới thiệu về Mã nguồn sạch và Thiết kế tốt", "Dấu hiệu của một mã nguồn kém chất lượng (Code Smells)", R, K,
 "", "Không cần: đã có hoạt động 'Nhận diện Code Smells' và mô phỏng refactoring cuối chương.", "", ""),
(8, "Nguyên tắc Đơn nhiệm (Single Responsibility Principle - SRP)", "Giới thiệu Nguyên tắc Đơn nhiệm (SRP)", R, K,
 "", "Dùng chung mô phỏng 'Ví dụ minh họa SRP trong thực tế'.", "", "Đính kèm lại."),
(8, "Nguyên tắc Đơn nhiệm (Single Responsibility Principle - SRP)", "Ví dụ minh họa SRP trong thực tế", R, N,
 "Mỗi lớp một lý do để thay đổi.",
 "2 cột. Trái: Invoice tự tính tiền, in hóa đơn, lưu file. Phải: Invoice / InvoicePrinter / InvoiceRepository. 3 tab là 3 yêu cầu thay đổi (đổi thuế, đổi mẫu in, đổi chỗ lưu); mỗi tab tô sáng lớp bị sửa: cột trái luôn là Invoice, cột phải đúng 1 lớp chuyên trách.",
 C2, ""),
(8, "Nguyên tắc Mở/Đóng (Open/Closed Principle - OCP)", "Giới thiệu Nguyên tắc Mở/Đóng (OCP)", R, K,
 "", "Dùng chung mô phỏng 'Cách thiết kế để tuân thủ OCP'.", "", "Đính kèm lại."),
(8, "Nguyên tắc Mở/Đóng (Open/Closed Principle - OCP)", "Cách thiết kế để tuân thủ OCP với Đa hình và Interface", R, N,
 "Mở để mở rộng, đóng để sửa đổi.",
 "2 cột. Trái: DiscountCalculator if/else theo loại khách. Phải: IDiscount với Regular, Silver. Kịch bản thêm khách VIP: cột trái phải mở lớp cũ chèn else if (tô đỏ), cột phải thêm lớp VipDiscount (tô xanh), lớp cũ không đổi. Chạy tính giá 1.000.000 cho 3 loại khách, cả hai cột ra cùng kết quả.",
 C2, "Khác domain với mô phỏng đa hình chương 4 để không trùng."),
(8, "Nguyên tắc Thay thế Liskov (Liskov Substitution Principle - LSP)", "Giới thiệu Nguyên tắc Thay thế Liskov (LSP)", R, N,
 "Lớp con phải thay được lớp cha mà không làm sai kết quả.",
 "Hàm Resize(Rectangle r) { r.Width = 5; r.Height = 4; } mong đợi Area = 20. Tab Rectangle: ra 20 ✓. Tab Square : Rectangle (set Width cũng đổi Height): từng bước thấy Width=5 kéo Height=5, rồi Height=4 kéo Width=4 → Area = 16 ✗.",
 TAB, ""),
(8, "Nguyên tắc Thay thế Liskov (Liskov Substitution Principle - LSP)", "Phân tích ví dụ vi phạm và tuân thủ LSP", R, T,
 "Sửa vi phạm LSP bằng cách tách hành vi ra interface.",
 "2 cột. Trái: Penguin : Bird override Fly() ném NotSupportedException; vòng foreach birds gọi Fly → dừng ở Penguin với lỗi. Phải: IFlyable chỉ cho chim biết bay; vòng lặp chạy hết.",
 C2, "Khóa học có 2 học liệu cùng tên (1 bài đọc, 1 hoạt động); gắn vào bài đọc."),
(8, "Nguyên tắc Tách biệt Giao diện (Interface Segregation Principle - ISP)", "Giới thiệu Nguyên tắc Tách biệt Giao diện (ISP)", R, K,
 "", "Dùng chung mô phỏng 'So sánh thiết kế với và không có ISP'.", "", "Đính kèm lại."),
(8, "Nguyên tắc Tách biệt Giao diện (Interface Segregation Principle - ISP)", "So sánh thiết kế với và không có ISP", R, N,
 "Interface nhỏ, đúng nhu cầu, không ép lớp làm việc thừa.",
 "2 cột. Trái: IWorker { Work(); Eat(); } — Robot buộc phải viết Eat() ném lỗi; vòng gọi Eat cho mọi worker dừng ở Robot. Phải: IWorkable, IEatable — Robot chỉ ký IWorkable; vòng gọi Eat chỉ duyệt IEatable, chạy hết.",
 C2, ""),
(8, "Nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion Principle - DIP)", "Giới thiệu Nguyên tắc Đảo ngược Phụ thuộc (DIP)", R, N,
 "Lớp cấp cao phụ thuộc interface, không phụ thuộc lớp cụ thể.",
 "2 cột. Trái: OrderService tự new EmailSender() bên trong. Phải: OrderService nhận IMessageSender qua constructor. Kịch bản đổi sang SMS: cột trái phải sửa OrderService, cột phải chỉ đổi 1 dòng ở Main. Bộ nhớ hiện OrderService trỏ tới đối tượng sender nào.",
 C2, ""),
(8, "Nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion Principle - DIP)", "Lợi ích của việc giảm sự phụ thuộc trực tiếp", R, T,
 "Nhờ DIP có thể kiểm thử bằng đối tượng giả.",
 "Truyền FakeSender (chỉ ghi lại tin nhắn vào danh sách) cho OrderService, gọi PlaceOrder, kiểm tra danh sách có 1 tin → Test đạt ✓. Không gửi email thật.",
 C1, ""),
(8, "Refactoring cơ bản và Thực hành SOLID", "Refactoring là gì và khi nào cần refactor?", R, K,
 "", "Dùng chung mô phỏng 'Các kỹ thuật Refactoring phổ biến'.", "", "Đính kèm lại."),
(8, "Refactoring cơ bản và Thực hành SOLID", "Các kỹ thuật Refactoring phổ biến", R, N,
 "Refactor đổi cấu trúc, không đổi hành vi.",
 "4 tab: Extract Method, Rename, Replace Magic Number bằng hằng số, Replace Conditional bằng Đa hình. Mỗi tab: bước 1 chạy code gốc ra kết quả X; các bước sau biến đổi code (dòng đổi tô vàng); bước cuối chạy lại cùng đầu vào vẫn ra X ✓.",
 TAB, ""),
# ---------- Module 9 ----------
(9, "Phân tích yêu cầu và Xác định phạm vi dự án", "Giới thiệu dự án mẫu và các yêu cầu ban đầu", R, K, "", "Không cần: bài giới thiệu dự án.", "", ""),
(9, "Phân tích yêu cầu và Xác định phạm vi dự án", "Kỹ thuật thu thập và phân tích yêu cầu cơ bản", R, K, "", "Không cần: lý thuyết.", "", ""),
(9, "Phân tích yêu cầu và Xác định phạm vi dự án", "Xác định các đối tượng chính và thuộc tính ban đầu", R, T,
 "Áp dụng danh từ/động từ cho đề bài dự án mẫu.",
 "Dùng lại khung mô phỏng 'Kỹ thuật xác định danh từ và động từ' (chương 6) nhưng thay đoạn mô tả bằng yêu cầu của dự án mẫu.",
 C1, "Cần xác nhận đề tài dự án mẫu (đoán là Quản lý Thư viện)."),
(9, "Phân tích yêu cầu và Xác định phạm vi dự án", "Xác định phạm vi và giới hạn của dự án", R, K, "", "Không cần: lý thuyết.", "", ""),
(9, "Phân tích hướng đối tượng (OOA) - Xây dựng mô hình ban đầu", "Từ yêu cầu đến các đối tượng trong hệ thống", R, K, "", "Không cần: đã có ở chương 6 và bài 'Xác định các đối tượng chính'.", "", ""),
(9, "Phân tích hướng đối tượng (OOA) - Xây dựng mô hình ban đầu", "Xác định các hành vi (phương thức) cho từng lớp", R, K, "", "Không cần: trùng chương 6.", "", ""),
(9, "Phân tích hướng đối tượng (OOA) - Xây dựng mô hình ban đầu", "Xác định các mối quan hệ ban đầu giữa các lớp", R, K, "", "Không cần: trùng chương 7.", "", ""),
(9, "Thiết kế hướng đối tượng (OOD) - Sơ đồ lớp UML và Nguyên tắc SOLID", "Chuyển đổi mô hình OOA sang OOD", R, T,
 "Mô hình phân tích (khái niệm) được bổ sung chi tiết kỹ thuật thành mô hình thiết kế.",
 "Bắt đầu từ hộp Book chỉ có tên thuộc tính (OOA). Mỗi bước thêm một lớp chi tiết: kiểu dữ liệu, ký hiệu truy cập, phương thức, interface IBookRepository, lớp dịch vụ LibraryService. Bước cuối hiện sơ đồ OOD.",
 C1, ""),
(9, "Thiết kế hướng đối tượng (OOD) - Sơ đồ lớp UML và Nguyên tắc SOLID", "Áp dụng Nguyên tắc Đơn trách nhiệm (SRP) và Nguyên tắc Mở/Đóng (OCP)", R, K, "", "Dùng lại mô phỏng SRP và OCP (chương 8).", "", "Đính kèm lại."),
(9, "Thiết kế hướng đối tượng (OOD) - Sơ đồ lớp UML và Nguyên tắc SOLID", "Áp dụng Nguyên tắc Thay thế Liskov (LSP) và Nguyên tắc Tách giao diện (ISP)", R, K, "", "Dùng lại mô phỏng LSP và ISP (chương 8).", "", "Đính kèm lại."),
(9, "Thiết kế hướng đối tượng (OOD) - Sơ đồ lớp UML và Nguyên tắc SOLID", "Áp dụng Nguyên tắc Đảo ngược Phụ thuộc (DIP)", R, K, "", "Dùng lại mô phỏng DIP (chương 8).", "", "Đính kèm lại."),
(9, "Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản", "Cấu trúc dự án C# theo mô hình hướng đối tượng", R, K, "", "Không cần: cây thư mục tĩnh trong bài đọc là đủ.", "", ""),
(9, "Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản", "Hướng dẫn tạo project và các lớp cơ bản", R, K, "", "Không cần: thao tác trên Visual Studio, ảnh chụp màn hình phù hợp hơn.", "", ""),
(9, "Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản", "Xây dựng các phương thức và xử lý logic nghiệp vụ", R, N,
 "Một phương thức nghiệp vụ = chuỗi kiểm tra rồi mới cập nhật trạng thái.",
 "library.BorrowBook(memberId, bookId): tìm thành viên → tìm sách → sách còn không → thành viên chưa vượt 3 cuốn → cập nhật. 3 tab: Thành công, Sách đã được mượn, Vượt hạn mức. Bộ nhớ hiện danh sách sách (cột IsBorrowed) và số sách của thành viên.",
 TAB, ""),
(9, "Triển khai dự án - Cấu trúc thư mục và Mã hóa cơ bản", "Giới thiệu công cụ Debugging trong Visual Studio", R, N,
 "Breakpoint, Step Over, Step Into, cửa sổ Watch.",
 "Mô phỏng giao diện debug: chương trình dừng ở breakpoint (chấm đỏ). 2 tab: Step Over (chạy qua lời gọi hàm trong 1 bước) và Step Into (đi vào thân hàm). Khung Watch hiện biến thay đổi sau mỗi bước.",
 TAB, "Khung mô phỏng hiện tại vốn giống trình debug nên rất hợp."),
(9, "Hoàn thiện dự án và Đánh giá", "Xử lý đầu vào/đầu ra và hiển thị thông tin", R, T,
 "Nhập sai không làm chương trình sập khi dùng int.TryParse.",
 "Vòng menu console. 2 tab: int.Parse(\"abc\") → FormatException, chương trình dừng; int.TryParse → trả false, in 'Vui lòng nhập số', hỏi lại. Console mô phỏng lượt nhập.",
 TAB, ""),
(9, "Hoàn thiện dự án và Đánh giá", "Thêm các tính năng bổ sung và cải thiện giao diện người dùng", R, K, "", "Không cần.", "", ""),
(9, "Hoàn thiện dự án và Đánh giá", "Các phương pháp kiểm thử đơn vị cơ bản (Unit Testing)", R, N,
 "Arrange - Act - Assert; test đạt và test không đạt.",
 "Test cho BankAccount.Withdraw: 3 test (rút hợp lệ, rút quá số dư, rút số âm). Mỗi test 3 bước tô sáng Arrange/Act/Assert; mảng kết quả ✓/✗; console in 'Test k: ... → đạt/KHÔNG đạt'. Tab 2: Withdraw có lỗi cố ý (không kiểm tra số dư) → test 2 KHÔNG đạt.",
 TAB, "Theo mẫu kiểm thử đã làm ở khóa Thuật toán. Đính kèm lại cho 'Hướng dẫn kiểm thử đơn vị một chức năng nhỏ'."),
(9, "Hoàn thiện dự án và Đánh giá", "Hướng dẫn kiểm thử đơn vị một chức năng nhỏ", R, K, "", "Dùng lại mô phỏng 'Các phương pháp kiểm thử đơn vị cơ bản'.", "", "Đính kèm lại."),
]

MOD_SHORT = ["gioi-thieu-oop", "doi-tuong-lop-dong-goi", "ke-thua", "da-hinh", "truu-tuong",
             "gioi-thieu-ooad", "quan-he-lop-uml", "nguyen-tac-thiet-ke-solid", "du-an-thuc-te"]

wb = Workbook()
font = "Arial"
H = Font(name=font, bold=True, color="FFFFFF")
HF = PatternFill("solid", fgColor="2F6F4F")
thin = Side(style="thin", color="C8CCD0")
B = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap = Alignment(wrap_text=True, vertical="top")
PRI_FILL = {N: "D9F2E3", T: "FFF1CC", K: "EEEEEE"}

# ---- Sheet 1: Phân tích ----
ws = wb.active
ws.title = "Phan tich"
heads = ["STT", "Chương (Module)", "Bài học (Lesson)", "Học liệu (Activity)", "Loại học liệu",
         "Mức đề xuất", "Trạng thái", "Ý chính cần mô phỏng", "Cách hoạt động của mô phỏng", "Dạng giao diện",
         "Đường dẫn file (đề xuất)", "Link GitHub Pages (sau khi đẩy)", "Ghi chú", "Duyệt (OK / Sửa / Bỏ)", "Ý kiến của bạn"]
ws.append(heads)
for c in ws[1]:
    c.font, c.fill, c.alignment, c.border = H, HF, Alignment(wrap_text=True, vertical="center"), B

for i, (m, les, act, typ, pri, idea, desc, form, note) in enumerate(ROWS, 1):
    path = url = ""
    if pri != K:
        path = "oop_ooad/%s/%s/%s/index.html" % (slug(MODULES[m-1]), slug(les), slug(act))
        url = BASE_URL + path.replace("index.html", "")
    st = "" if pri == K else ("Done" if os.path.exists(os.path.join(REPO, path)) else "Chưa done")
    ws.append([i, "%d. %s" % (m, MODULES[m-1]), les, act, typ, pri, st, idea, desc, form, path, url, note, "", ""])

widths = [5, 26, 28, 34, 13, 14, 12, 32, 70, 15, 40, 40, 30, 14, 26]
for j, w in enumerate(widths, 1):
    ws.column_dimensions[get_column_letter(j)].width = w
last = ws.max_row
for row in ws.iter_rows(min_row=2, max_row=last):
    for c in row:
        c.font = Font(name=font, size=10)
        c.alignment = wrap
        c.border = B
    pri = row[5].value
    row[5].fill = PatternFill("solid", fgColor=PRI_FILL[pri])
    row[5].font = Font(name=font, size=10, bold=(pri == N))
    row[13].fill = PatternFill("solid", fgColor="FFFFE0")
    row[14].fill = PatternFill("solid", fgColor="FFFFE0")
    if row[6].value:
        row[6].fill = PatternFill("solid", fgColor="C6EFCE" if row[6].value == "Done" else "FFC7CE")
        row[6].font = Font(name=font, size=10, bold=True, color="006100" if row[6].value == "Done" else "9C0006")
ws.freeze_panes = "E2"
ws.auto_filter.ref = "A1:%s%d" % (get_column_letter(len(heads)), last)
dv = DataValidation(type="list", formula1='"OK,Sửa,Bỏ"', allow_blank=True)
ws.add_data_validation(dv)
dv.add("N2:N%d" % last)
dv2 = DataValidation(type="list", formula1='"%s,%s,%s"' % (N, T, K), allow_blank=False)
ws.add_data_validation(dv2)
dv2.add("F2:F%d" % last)
for pri, col in PRI_FILL.items():
    ws.conditional_formatting.add("F2:F%d" % last,
        FormulaRule(formula=['$F2="%s"' % pri], fill=PatternFill("solid", fgColor=col)))

# ---- Sheet 2: Tổng quan ----
s = wb.create_sheet("Tong quan", 0)
s["A1"] = "Phân tích hoạt động mô phỏng – Khóa C#: OOP + OOAD"
s["A1"].font = Font(name=font, size=14, bold=True)
s["A2"] = "Đã xét: toàn bộ bài đọc (biểu tượng cuốn sách) và một số hoạt động phân tích có quá trình chạy rõ. Bài tập nộp, thảo luận, trắc nghiệm được giữ nguyên nên không liệt kê."
s["A2"].font = Font(name=font, size=10, italic=True)
s.merge_cells("A2:F2"); s["A2"].alignment = Alignment(wrap_text=True); s.row_dimensions[2].height = 30
hdr = ["Chương", N, T, K, "Tổng số học liệu đã xét", "Đã duyệt OK", "Done", "Chưa done"]
for j, h in enumerate(hdr, 1):
    c = s.cell(row=4, column=j, value=h)
    c.font, c.fill, c.border = H, HF, B
    c.alignment = Alignment(wrap_text=True, vertical="center")
rng = "'Phan tich'!$B$2:$B$%d" % last
prng = "'Phan tich'!$F$2:$F$%d" % last
orng = "'Phan tich'!$N$2:$N$%d" % last
srng = "'Phan tich'!$G$2:$G$%d" % last
for k, name in enumerate(MODULES, 1):
    r = 4 + k
    s.cell(row=r, column=1, value="%d. %s" % (k, name))
    for j, pri in enumerate([N, T, K], 2):
        s.cell(row=r, column=j, value='=COUNTIFS(%s,$A%d,%s,"%s")' % (rng, r, prng, pri))
    s.cell(row=r, column=5, value="=COUNTIF(%s,$A%d)" % (rng, r))
    s.cell(row=r, column=6, value='=COUNTIFS(%s,$A%d,%s,"OK")' % (rng, r, orng))
    s.cell(row=r, column=7, value='=COUNTIFS(%s,$A%d,%s,"Done")' % (rng, r, srng))
    s.cell(row=r, column=8, value='=COUNTIFS(%s,$A%d,%s,"Chưa done")' % (rng, r, srng))
tr = 5 + len(MODULES)
s.cell(row=tr, column=1, value="Tổng")
for j in range(2, 9):
    L = get_column_letter(j)
    s.cell(row=tr, column=j, value="=SUM(%s5:%s%d)" % (L, L, tr - 1))
for row in s.iter_rows(min_row=5, max_row=tr, max_col=8):
    for c in row:
        c.font = Font(name=font, size=10, bold=(c.row == tr))
        c.border = B
        if c.column > 1:
            c.alignment = Alignment(horizontal="center")
s.column_dimensions["A"].width = 62
for L in "BCDEFGH":
    s.column_dimensions[L].width = 16

notes = [
    ("Cách đọc file", ""),
    ("Nên làm", "Bài đọc có quá trình chạy (luồng gọi hàm, bộ nhớ, đối tượng) mà chữ và ảnh tĩnh khó diễn tả."),
    ("Làm thêm nếu muốn", "Có ích nhưng ý chính đã được bài khác hoặc bài đọc truyền tải khá tốt."),
    ("Không cần", "Lý thuyết, tóm tắt, hướng dẫn ra quyết định, hoặc trùng ý: ghi rõ dùng lại mô phỏng nào."),
    ("Cột Trạng thái", "Done = đã viết mô phỏng và kiểm thử, file nằm ở cột Đường dẫn. Chưa done = chưa làm."),
    ("Cột Duyệt", "Ô vàng ở sheet 'Phan tich': chọn OK / Sửa / Bỏ và ghi ý kiến; bảng trên tự đếm số đã duyệt."),
    ("", ""),
    ("Quy ước kỹ thuật (giữ theo mẫu khóa Thuật toán)", ""),
    ("Khung trang", "Mỗi bài 1 file HTML độc lập, giữ CSS và engine snapshot (Bước tiếp / Chạy hết / Làm lại), có chế độ tối, rộng 390px không tràn."),
    ("Mở rộng cho OOP", "Khung bộ nhớ thêm vùng 'Đối tượng' (heap): hộp có tên lớp và mã #1, #2, liệt kê trường; biến tham chiếu hiện →Car#1. Hộp không còn ai tham chiếu thì mờ đi."),
    ("Mở rộng cho UML (chương 6-7)", "Thêm thành phần vẽ hộp lớp UML và các mũi tên quan hệ bằng SVG thuần; khung #code dùng được cho văn bản (đề bài, kịch bản Use Case)."),
    ("Lỗi biên dịch / ngoại lệ", "Hiện ở console bằng màu đỏ, kèm mã lỗi C# thật (CS0122, CS0144, CS0534, CS0535, NullReferenceException, InvalidCastException...)."),
    ("Không quiz, không thử thách", "Chỉ quan sát và bấm từng bước; tab dùng để đổi tình huống."),
    ("Thư mục", "oop_ooad/<chuong>/<bai-hoc>/<hoc-lieu>/index.html, đẩy lên GitHub Pages như khóa Thuật toán."),
]
r0 = tr + 2
for k, (a, b) in enumerate(notes):
    ca = s.cell(row=r0 + k, column=1, value=a)
    cb = s.cell(row=r0 + k, column=2, value=b)
    ca.font = Font(name=font, size=10, bold=True)
    cb.font = Font(name=font, size=10)
    s.merge_cells(start_row=r0 + k, start_column=2, end_row=r0 + k, end_column=6)
    cb.alignment = Alignment(wrap_text=True, vertical="top")
    if b and len(b) > 80:
        s.row_dimensions[r0 + k].height = 28
    if a in PRI_FILL:
        ca.fill = PatternFill("solid", fgColor=PRI_FILL[a])

wb.save(OUT)
from collections import Counter
print(len(ROWS), Counter(r[4] for r in ROWS))
