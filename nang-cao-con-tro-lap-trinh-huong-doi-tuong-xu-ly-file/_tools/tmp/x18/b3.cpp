#include <iostream>
#include <string>
using namespace std;

class DongVat {
protected:
    string ten;
public:
    DongVat(string t) {
        ten = t;
        cout << "[DongVat] ten = "
             << ten << endl;
    }
};

class Cho : public DongVat {
protected:
    string giong;
public:
    Cho(string t, string g) : DongVat(t) {   // Goi tuong minh (bai truoc)
        giong = g;
        cout << "[Cho] giong = "
             << giong << endl;
    }
};

class ChoNghiepVu : public Cho {
public:
    ChoNghiepVu(string t, string g)
        : Cho(t, g) {
        cout << "[ChoNghiepVu] " << ten
             << " " << giong << endl;
    }
};

int main() {
    ChoNghiepVu c("Rex", "Berger");
    return 0;
}
