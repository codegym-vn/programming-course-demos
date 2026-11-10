#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    cout << "Gia tri tai p: " << *p << endl;
    p++;
    cout << "Sau p++, gia tri tai p: " << *p << endl;
    p++;
    cout << "Sau p++ lan nua, gia tri tai p: " << *p << endl;
    return 0;
}
