#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    DongVat() { cout << "1. Constructor DongVat chay" << endl; }
};

class Cho : public DongVat {
public:
    Cho() { cout << "2. Constructor Cho chay" << endl; }
};

int main() {
    cout << "Bat dau tao doi tuong Cho:" << endl;
    Cho c;
    return 0;
}
