#include <iostream>
#include <string>
using namespace std;

class DongVat {
protected:
    string ten;   // PROTECTED thay vi private
public:
    void setTen(string t) { ten = t; }
};

class Cho : public DongVat {
public:
    void inTen() {
        cout << "Ten: " << ten << endl;   // OK! Lop con truy cap duoc
    }
};

int main() {
    Cho c;
    c.setTen("Mi Lu");
    c.inTen();
    return 0;
}
