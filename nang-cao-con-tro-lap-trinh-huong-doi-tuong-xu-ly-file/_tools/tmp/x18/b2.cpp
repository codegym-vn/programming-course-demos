#include <iostream>
#include <string>
using namespace std;

class DongVat {
protected:
    string ten;
public:
    DongVat(string t) {
        ten = t;
        cout << "Constructor DongVat: da gan ten = " << ten << endl;
    }
};

class Cho : public DongVat {
public:
    Cho(string t) : DongVat(t) {
        // Constructor DongVat da chay TRUOC, nen 'ten' o day CHAC CHAN da co gia tri
        cout << "Constructor Cho: co the dung ngay ten = " << ten << endl;
    }
};

int main() {
    Cho c("Mi Lu");
    return 0;
}
