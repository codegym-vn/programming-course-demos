#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

for (int i = 0; i < 5; i++) {
    cout << "Phan tu " << i << ": " << *p << endl;
    p++;
}

return 0;}
