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
    Cho c;
    c.ten = "Mi Lu";

    cout << "-- Goi truc tiep qua doi tuong Cho --" << endl;
    c.keu();

    cout << "-- Goi qua CON TRO kieu DongVat, tro toi doi tuong Cho --" << endl;
    DongVat *p = &c;   // Con tro KIEU DongVat, nhung tro toi doi tuong Cho
    p->keu();
    return 0;
}
