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
        DongVat::keu();   // Goi phien ban CU cua lop cha truoc
        cout << ten << " (them) sua: Gau gau!" << endl;
    }
};

int main() {
    Cho c;
    c.ten = "Mi Lu";
    c.keu();
    return 0;
}
