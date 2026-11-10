# Sự thật C++ cần giữ đúng (g++/clang++, chuẩn C++17)

Dùng cho mô phỏng và bài đọc khóa C++. Khác C# ở nhiều chỗ: KHÔNG có exception cho tràn số hay chia 0.

## Chương trình và nhập/xuất
- Chương trình bắt đầu chạy từ `main()`. `#include` là chỉ thị tiền xử lý, xử lý TRƯỚC khi biên dịch (không "chạy" từng dòng).
- `return 0;` trong main báo thành công; thiếu `return` trong `main` thì mặc định trả 0 (chỉ riêng main).
- `cout <<` in ra màn hình; `cin >>` đọc từ bàn phím, bỏ qua khoảng trắng/xuống dòng ở đầu (gõ `10 25` một dòng vẫn đọc được 2 số). `endl` = xuống dòng + đẩy bộ đệm; `"\n"` chỉ xuống dòng.
- `cin >> n` (n kiểu int) mà người dùng gõ chữ: cin vào trạng thái lỗi, n được gán 0 (từ C++11), các lệnh cin sau bị bỏ qua cho tới khi `cin.clear()`.
- `cout` in số thực mặc định 6 chữ số có nghĩa: `cout << 10.0/3` → `3.33333`; `cout << 0.1 + 0.2` → `0.3` (muốn thấy `0.30000000000000004` phải `setprecision(17)` từ `<iomanip>`).
- Lỗi biên dịch g++ thường gặp: `expected ';' before ...`, `'cout' was not declared in this scope` (thiếu `#include <iostream>` hoặc `using namespace std;`), `'x' was not declared in this scope`.

## Biến và kiểu
- Biến cục bộ chưa khởi tạo có giá trị KHÔNG XÁC ĐỊNH (rác), đọc nó là hành vi không xác định. Mô phỏng hiện `?`, không bịa một số cụ thể. (Biến toàn cục/static thì mặc định 0.)
- Kích thước thường gặp (máy 64-bit phổ biến; chuẩn chỉ quy định mức tối thiểu): `char` 1 byte, `bool` 1, `short` 2, `int` 4, `long` 4 trên Windows / 8 trên Linux-macOS, `long long` 8, `float` 4 (~6-7 chữ số có nghĩa), `double` 8 (~15-16 chữ số). Dùng `sizeof` để biết chính xác.
- `int` 32-bit: −2147483648 … 2147483647. Tràn số nguyên CÓ DẤU là hành vi không xác định: thực tế thường thấy quay vòng sang số âm, nhưng chuẩn C++ không đảm bảo — mô phỏng phải ghi rõ ý này. Kiểu `unsigned` thì tràn quay vòng được đảm bảo.
- `char` lưu mã số: `'A'` = 65; `char c = 'A' + 1;` → `'B'`.
- `bool`: `true`/`false`; in bằng cout ra `1`/`0` (trừ khi dùng `boolalpha`).

## Hằng số
- `const int MAX = 100;` gán lại → lỗi biên dịch (g++: `assignment of read-only variable 'MAX'`). const phải khởi tạo ngay khi khai báo.
- `#define PI 3.14` là thay thế văn bản trước khi biên dịch, không có kiểu, không có `;`. Bẫy kinh điển: `#define BINH_PHUONG(x) x*x` → `BINH_PHUONG(1+2)` thành `1+2*1+2 = 5` (không phải 9); sửa bằng ngoặc `((x)*(x))`.

## Toán tử
- `int / int` chia nguyên, cắt về phía 0: `7/2 = 3`, `-7/2 = -3`; `%` cùng dấu với số bị chia: `7%2 = 1`, `-7%2 = -1`. `7/2.0 = 3.5`; `(double)7/2 = 3.5`; `double d = 7/2;` vẫn ra 3 (chia nguyên trước).
- Chia nguyên cho 0 hoặc `% 0`: hành vi không xác định, thường chương trình bị dừng đột ngột (Linux: "Floating point exception"). Số thực chia 0 ra `inf`.
- `i++` dùng giá trị cũ rồi mới tăng; `++i` tăng rồi dùng. `x += 3` ⇔ `x = x + 3`.
- Thứ tự ưu tiên: `* / %` trước `+ -`; so sánh trước `&&`, `&&` trước `||`. `&&`/`||` đánh giá tắt (vế phải không chạy nếu đã biết kết quả).
- Toán tử ba ngôi `điều_kiện ? a : b`.

## Điều kiện
- `if` không có `{ }` chỉ "ăn" đúng một lệnh ngay sau nó; các lệnh sau luôn chạy.
- `if (x = 5)` là PHÉP GÁN (luôn đúng vì 5 ≠ 0), g++ chỉ cảnh báo (-Wparentheses); đúng phải là `==`.
- Dấu `;` ngay sau `if (...)` làm thân if rỗng; khối `{ }` phía sau luôn chạy.
- if bậc thang: kiểm tra từ trên xuống, gặp điều kiện đúng đầu tiên thì chạy nhánh đó rồi bỏ qua phần còn lại.
- `switch` chỉ dùng với kiểu nguyên/`char`/`enum` (không dùng `string`, không dùng khoảng như `case > 5`). Thiếu `break` → chạy tràn xuống case dưới (fall-through). `default` chạy khi không case nào khớp. Hai case trùng giá trị → lỗi biên dịch `duplicate case value`.

## Vòng lặp
- `for (khởi tạo; điều kiện; cập nhật)`: khởi tạo chạy 1 lần; điều kiện kiểm tra TRƯỚC mỗi lượt; cập nhật chạy SAU thân. Biến khai báo trong `for` chỉ dùng được trong vòng lặp. `for (int i = 1; i <= 5; i++)` chạy 5 lượt, kết thúc với i = 6.
- `while` kiểm tra trước (có thể chạy 0 lần); `do { } while (...);` chạy ít nhất 1 lần, bắt buộc có `;` sau `while (...)`.
- `while (...);` có dấu `;` thừa → thân rỗng, dễ thành vòng lặp vô hạn. Quên cập nhật biến điều khiển → vô hạn. Off-by-one: `<` và `<=`.
- `break` thoát vòng lặp gần nhất; `continue` bỏ phần còn lại của lượt hiện tại (trong `for` vẫn chạy phần cập nhật; trong `while` cẩn thận continue trước lệnh tăng biến → vô hạn).
- Vòng lặp vô hạn trong terminal dừng bằng Ctrl + C. Mô phỏng không chạy vô hạn thật: đếm tới ngưỡng rồi dừng, ghi rõ.

## Môi trường
- `g++ hello.cpp -o hello` tạo `hello.exe` trên Windows (chạy `.\hello` trong PowerShell, `hello` trong CMD), tạo `hello` trên macOS/Linux (chạy `./hello`). VS Code chỉ là trình soạn thảo; g++ (MinGW-w64 trên Windows) mới biên dịch. Lỗi "g++ is not recognized..." do thư mục bin của MinGW chưa có trong PATH.
- C++ là ngôn ngữ biên dịch (dịch cả chương trình ra mã máy một lần); Python thông dịch (thực tế dịch sang bytecode rồi máy ảo chạy) — không nêu con số tốc độ cụ thể.
