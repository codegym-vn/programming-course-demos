#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    DongVat() { cout << "dung DongVat\n"; }
    ~DongVat() { cout << "go DongVat\n"; }
};

class Cho : public DongVat {
public:
    Cho() { cout << "dung Cho\n"; }
    ~Cho() { cout << "go Cho\n"; }
};

class ChoNghiepVu : public Cho {
public:
    ChoNghiepVu() { cout << "dung CNV\n"; }
    ~ChoNghiepVu() { cout << "go CNV\n"; }
};

int main() {
    ChoNghiepVu c;
    return 0;
}   // toi day, c bi go
