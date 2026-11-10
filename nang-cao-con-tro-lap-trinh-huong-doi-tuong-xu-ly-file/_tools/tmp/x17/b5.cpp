#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    string ten;
    virtual void keu() {   // Them tu khoa virtual
        cout << ten << " keu mot am thanh chung chung." << endl;
    }
};

class Cho : public DongVat {
public:
    void keu() override {   // override: nho trinh bien dich kiem tra chu ky
        cout << ten << " sua: Gau gau!" << endl;
    }
};

int main() {
    Cho c;
    c.ten = "Mi Lu";
    DongVat *p = &c;
    p->keu();
    return 0;
}
