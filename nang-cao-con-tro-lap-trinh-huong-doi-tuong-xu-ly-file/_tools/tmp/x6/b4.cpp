#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int a = 10;
int b = 20;
int &r = a;   // r là bí danh của a
cout << "Ban dau: a = " << a << ", b = " << b << ", r = " << r << endl;

r = b;   // KHÔNG PHẢI đổi r sang tham chiếu đến b!
         // Thực chất: gán giá trị của b (20) vào nơi r đang tham chiếu (tức là a)
cout << "Sau khi 'r = b': a = " << a << ", b = " << b << ", r = " << r << endl;

b = 999;   // Thử đổi b xem r có đổi theo không
cout << "Sau khi doi b = 999: a = " << a << ", b = " << b << ", r = " << r << endl;

return 0;}
