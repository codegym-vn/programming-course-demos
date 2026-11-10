#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

cout << "p (phan tu 0): " << *p << endl;
cout << "p + 2 (phan tu 2): " << *(p + 2) << endl;
cout << "p + 4 (phan tu 4): " << *(p + 4) << endl;
cout << "p van con o phan tu 0: " << *p << endl;

return 0;}
