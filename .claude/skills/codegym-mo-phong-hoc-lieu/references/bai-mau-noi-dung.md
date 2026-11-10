# Bắt nhiều loại Exception trong một khối try

## Mục tiêu học tập

Sau bài học này, bạn có thể:

- Giải thích vì sao một khối `try` có thể cần nhiều khối `catch`.
- Viết nhiều khối `catch`, mỗi khối bắt một loại exception cụ thể.
- Mô tả cách C# xét các `catch` từ trên xuống và chỉ chạy `catch` khớp đầu tiên.
- Nhận ra rằng chuỗi số quá lớn ném `OverflowException`, không phải `FormatException`.
- Quan sát từng exception đi qua các "cửa" `catch` bằng hoạt động mô phỏng.

## Vì sao cần nhiều khối catch?

Một đoạn mã trong `try` thường có thể gặp nhiều loại lỗi khác nhau. Ví dụ, chương trình đổi một chuỗi thành số rồi lấy 100 chia cho số đó:

```csharp
string input = "abc";
int n = int.Parse(input);   // có thể ném FormatException hoặc OverflowException
int r = 100 / n;            // có thể ném DivideByZeroException
```

- Nếu `input` là `"abc"`, việc đổi sang số thất bại.
- Nếu `input` là `"0"`, phép chia cho 0 thất bại.
- Nếu `input` là `"99999999999"`, số này quá lớn so với kiểu `int`.

Mỗi lỗi có nguyên nhân khác nhau, nên cách xử lý cũng nên khác nhau. Nếu chỉ có một `catch` cho một loại lỗi, các lỗi còn lại vẫn làm chương trình dừng đột ngột (crash).

## Cú pháp nhiều khối catch

Bạn có thể đặt nhiều `catch` sau một `try`. Mỗi `catch` khai báo một loại exception:

```csharp
using System;

public class Program
{
    public static void Main()
    {
        string input = "abc";
        try
        {
            int n = int.Parse(input);
            int r = 100 / n;
            Console.WriteLine(r);
        }
        catch (FormatException)
        {
            Console.WriteLine("Không phải số");
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Chia cho 0");
        }
        catch (OverflowException)
        {
            Console.WriteLine("Quá lớn");
        }
    }
}
// Với input = "abc": Không phải số
```

Khi lỗi xảy ra, C# làm theo các bước sau:

1. Dòng gây lỗi ném ra một exception. Các dòng còn lại trong `try` bị bỏ qua.
2. C# xét các `catch` **từ trên xuống dưới**.
3. Gặp `catch` có kiểu **khớp** với exception thì chạy khối đó và **dừng xét**.
4. Các `catch` còn lại bị bỏ qua. Chương trình đi tiếp sau cả khối `try-catch`.

Nếu không có lỗi, không `catch` nào chạy.

## Kết quả với từng dữ liệu nhập

Với đoạn mã trên, đổi giá trị của `input` sẽ cho các kết quả sau:

| `input` | Chuyện xảy ra | Exception | In ra |
|---|---|---|---|
| `"abc"` | `int.Parse` không đổi được thành số | `FormatException` | Không phải số |
| `"0"` | `n = 0`, rồi `100 / n` | `DivideByZeroException` | Chia cho 0 |
| `"99999999999"` | Số vượt phạm vi của `int` | `OverflowException` | Quá lớn |
| `"5"` | `100 / 5 = 20` | không có | 20 |

Thông điệp (`Message`) của các exception này trong .NET hiện đại:

- `FormatException`: `The input string 'abc' was not in a correct format.`
- `DivideByZeroException`: `Attempted to divide by zero.`
- `OverflowException`: `Value was either too large or too small for an Int32.`

**Lưu ý:** chuỗi `"99999999999"` toàn chữ số nên đúng định dạng, nhưng giá trị lớn hơn `int.MaxValue` (2.147.483.647). Vì vậy nó ném `OverflowException`, không phải `FormatException`.

## Hoạt động: Exception đi qua các cửa catch

Mô phỏng dưới đây coi mỗi `catch` là một "cửa lọc". Exception đi qua từng cửa từ trên xuống. Hãy thao tác theo thứ tự sau, bấm **Bước tiếp** để chạy từng dòng:

- Mở tab **"abc"**. `int.Parse` không đổi được `"abc"` thành số nên ném `FormatException` (thẻ lỗi đỏ). Dòng `100 / n` không chạy. Cửa đầu `catch (FormatException)` khớp (cửa sáng xanh), in "Không phải số". Hai cửa còn lại không được xét.
- Mở tab **"0"**. `int.Parse` thành công, `n = 0`. Phép `100 / n` ném `DivideByZeroException`. Cửa thứ nhất không khớp (cửa mờ), exception rơi xuống cửa thứ hai `catch (DivideByZeroException)`, khớp và in "Chia cho 0".
- Mở tab **"99999999999"**. `int.Parse` ném `OverflowException` vì số vượt phạm vi `int`. Exception đi qua hai cửa đầu (không khớp) rồi dừng ở cửa thứ ba `catch (OverflowException)`, in "Quá lớn".
- Mở tab **"5"**. `n = 5`, `100 / 5 = 20`, in 20. Không có exception nên không cửa nào được xét.

```
<iframe src="https://codegym-vn.github.io/programming-course-demos/c-sharp-ung-dung/xu-ly-loi-va-ngoai-le-exception-handling-co-ban/bat-va-xu-ly-nhieu-loai-exception/bat-nhieu-loai-exception-trong-mot-khoi-try/" title="Bắt nhiều loại Exception" style="border:0;" allowfullscreen></iframe>
```

Điều rút ra: mỗi `catch` xử lý một loại lỗi, và C# dừng ở `catch` khớp đầu tiên. Nhờ vậy mỗi tình huống lỗi nhận được cách xử lý riêng, còn khi không có lỗi thì không `catch` nào chạy.

## Lợi ích của việc bắt exception cụ thể

- **Thông báo đúng việc:** người dùng biết mình nhập sai định dạng hay chia cho 0.
- **Xử lý riêng cho từng lỗi:** ví dụ nhập lại với lỗi định dạng, dùng giá trị mặc định với lỗi chia cho 0.
- **Dễ gỡ lỗi:** nhìn tên `catch` là biết đoạn mã dự tính những lỗi nào.

## Tóm tắt

- Một khối `try` có thể đi kèm nhiều khối `catch`, mỗi khối bắt một loại exception.
- C# xét các `catch` từ trên xuống và chỉ chạy `catch` khớp đầu tiên.
- `"abc"` ném `FormatException`, `"0"` làm `100 / n` ném `DivideByZeroException`.
- Số vượt phạm vi `int` ném `OverflowException`, không phải `FormatException`.
- Không có exception thì không `catch` nào chạy.
- Thứ tự các `catch` rất quan trọng, bài sau sẽ nói kỹ hơn.
