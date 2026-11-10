#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    string ten;
    void keu() {
        cout << ten << " keu mot am thanh chung chung." << endl;
    }
};

class Cho : public DongVat {
public:
    void keu() {
        cout << ten << " sua: Gau gau!" << endl;
    }
};

int main() {
    DongVat dv;
    dv.ten = "Dong vat";
    dv.keu();

    Cho c;
    c.ten = "Mi Lu";
    c.keu();
    return 0;
}
