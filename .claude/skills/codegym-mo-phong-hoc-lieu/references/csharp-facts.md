# Sự thật C#/.NET cần giữ đúng (theo .NET 8)

Dùng chung cho mô phỏng và bài đọc. Thông điệp lỗi phải đúng nguyên văn; số liệu phải tính bằng code thật.

## Kiểu số và toán tử
- `int / int` chia nguyên, bỏ phần lẻ; `%` là phần dư. `(double)a / b` mới ra số thực; `double q = a / b` vẫn chia nguyên trước rồi mới gán.
- `int` tràn số thì quay vòng (`int.MaxValue + 1 = -2147483648`), mặc định không báo lỗi; chỉ ném `OverflowException` trong khối `checked`.
- `0.1 + 0.2` in `0.30000000000000004`; `== 0.3` là false. So sánh double bằng hiệu nhỏ hơn sai số. `double` chia 0 ra ∞, không lỗi.

## Exception (thông điệp .NET 8)
- `int.Parse("abc")` → FormatException: "The input string 'abc' was not in a correct format." (bản .NET Framework cũ: "Input string was not in a correct format.")
- `int.Parse("99999999999")` → OverflowException: "Value was either too large or too small for an Int32."
- `10 / 0` (int) → DivideByZeroException: "Attempted to divide by zero."
- `arr[3]` với mảng 3 phần tử → IndexOutOfRangeException: "Index was outside the bounds of the array."
- `s.Length` khi s = null → NullReferenceException: "Object reference not set to an instance of an object."
- `(int)obj` khi obj là string → InvalidCastException: "Unable to cast object of type 'System.String' to type 'System.Int32'."
- `checked { int.MaxValue + 1 }` → OverflowException: "Arithmetic operation resulted in an overflow."
- Cây kế thừa: Exception → SystemException → FormatException, NullReferenceException, IndexOutOfRangeException, InvalidCastException; SystemException → ArithmeticException → DivideByZeroException, OverflowException; SystemException → IOException → FileNotFoundException, DirectoryNotFoundException; UnauthorizedAccessException kế thừa SystemException (KHÔNG phải IOException).
- catch xếp sai (Exception đứng trước catch cụ thể) → lỗi biên dịch CS0160: "A previous catch clause already catches all exceptions of this or of a super type ('Exception')".
- `finally` chạy cả khi có `return` trong `try`; không chạy nếu tiến trình bị kết thúc đột ngột (Environment.FailFast). `throw ex;` đặt lại stack trace; `throw;` giữ nguyên.

## Collections
- `new List<T>()` Capacity 0; lần Add đầu cấp 4, sau đó nhân đôi (4 → 8 → 16) (chi tiết cài đặt, nêu để minh họa).
- `list[i]` sai chỉ số → ArgumentOutOfRangeException ("Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')"); khác mảng (IndexOutOfRangeException).
- `Remove(x)` trả bool, xóa lần xuất hiện đầu; `Find` không thấy trả `default(T)`; `List.Sort` không ổn định.
- Thêm/xóa trong `foreach` → InvalidOperationException: "Collection was modified; enumeration operation may not execute." Gán biến lặp foreach → lỗi biên dịch CS1656.
- Dictionary: `Add` trùng khóa → ArgumentException "An item with the same key has already been added. Key: <khóa>"; đọc khóa không có → KeyNotFoundException "The given key '<khóa>' was not present in the dictionary."; `TryGetValue` trả bool; thứ tự duyệt không được bảo đảm.

## OOP
- `new` tạo đối tượng; trường chưa gán nhận mặc định (string/đối tượng: null, int: 0, bool: false). Biến kiểu lớp giữ tham chiếu; `b = a` chỉ chép tham chiếu.
- Truy cập trái quy tắc là lỗi BIÊN DỊCH: private/protected từ ngoài → CS0122; property không có set → CS0200; set private → CS0272; `new` lớp abstract → CS0144; không override abstract → CS0534; thiếu thành viên interface → CS0535; nạp chồng chỉ khác kiểu trả về → CS0111; kế thừa 2 lớp → CS1721; gọi thành viên không có trên kiểu biến → CS1061.
- Constructor lớp cha chạy trước (`: base(...)`); `: this(...)` gọi constructor khác cùng lớp trước. `name = name;` trong constructor không gán vào trường; phải `this.name = name;`.
- virtual/override chọn theo đối tượng thật lúc chạy; che bằng `new` chọn theo kiểu biến. Overloading chọn lúc biên dịch.
- `(Cat)a` khi a là Dog → InvalidCastException; `a as Cat` → null; `a is Dog d`.
- Đối tượng hết tham chiếu sẽ được bộ gom rác thu hồi "lúc nào đó" (không nói bị xóa ngay).

## File I/O
- StreamWriter ghi vào bộ đệm; chương trình kết thúc mà không Flush/Close/Dispose thì dữ liệu trong bộ đệm bị mất. `new StreamWriter(path)` ghi đè (làm rỗng tệp ngay khi mở); `append: true` ghi nối. Mặc định UTF-8 không BOM.
- `ReadLine()` trả "" cho dòng trống và null khi hết tệp; `Read()` trả int, −1 khi hết. Xuống dòng: `\r\n` (Windows), `\n` (macOS/Linux).
- `File.ReadAllText` tệp không có → FileNotFoundException ("Could not find file '...'."); thư mục không có → DirectoryNotFoundException; `File.Delete` tệp không có → không lỗi (thư mục không có → DirectoryNotFoundException); `File.Copy` đích đã có → IOException (trừ khi overwrite: true); `Directory.Delete` thư mục không rỗng → IOException (cần recursive: true); `Directory.CreateDirectory` tạo cả các cấp và không lỗi khi đã có.
- `Path.Combine("Data", @"C:\Temp")` → `C:\Temp` (phần trước bị bỏ, trên Windows). Ví dụ đường dẫn kiểu Windows cần ghi chú cho macOS/Linux. Tệp bị khóa khi đang mở: thấy rõ trên Windows.
- Ký tự có dấu UTF-8: 'Đ' = C4 90, 'ú' = C3 BA.

## CSV
- RFC 4180: trường chứa dấu phẩy, nháy kép hoặc xuống dòng được bọc trong nháy kép; nháy bên trong viết thành "". `Split(',')` sai với trường có dấu phẩy.
- Ghi số thập phân dùng CultureInfo.InvariantCulture để máy cài tiếng Việt không ra "12,5". Excel ở một số vùng xuất CSV với dấu ';'.

## Serialization
- BinaryFormatter (và ISerializable, [Serializable] đi kèm nó) đã lỗi thời từ .NET 5 và bị loại bỏ trong .NET 9 vì rủi ro bảo mật: không dạy như cách nên dùng; minh họa nhị phân bằng BinaryWriter/BinaryReader.
- BinaryWriter: little-endian; int 4 byte byte-thấp-trước; string = độ dài (mã hóa 7-bit) + các byte UTF-8.
- XmlSerializer cần lớp public + constructor không tham số (thiếu → InvalidOperationException "... cannot be serialized because it does not have a parameterless constructor."); chỉ ghi thành viên public đọc/ghi được (property chỉ có get không được ghi).
- System.Text.Json: mặc định phân biệt chữ hoa thường khi đọc (thuộc tính không khớp → giá trị mặc định, không lỗi), bỏ qua thuộc tính lạ (từ .NET 8 có JsonUnmappedMemberHandling.Disallow), mặc định mã hóa ký tự có dấu thành \uXXXX (UnsafeRelaxedJsonEscaping để giữ chữ); [JsonIgnore] bỏ thuộc tính, [JsonPropertyName] giữ tên cũ khi đổi tên. ASP.NET Core mặc định không phân biệt hoa thường; ứng dụng console thì có.
