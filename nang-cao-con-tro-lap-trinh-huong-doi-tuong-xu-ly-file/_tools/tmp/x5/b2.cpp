#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

cout << *(p + 2);   // Giá trị của phần tử cách p đúng 2 vị trí: 30

return 0;}
