#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int arr[3] = {10, 20, 30};   // Mảng chỉ có 3 phần tử, chỉ số hợp lệ 0-2
int *p = arr;

p = p + 5;   // Nhảy VƯỢT QUÁ phạm vi mảng
cout << "Gia tri tai vi tri vuot pham vi: " << *p << endl;

return 0;}
