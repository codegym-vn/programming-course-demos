#include <iostream>
#include <string>
using namespace std;

class DongVat {
protected:
    string ten;
public:
    void setTen(string t) { ten = t; }
};

int main() {
    DongVat dv;
    dv.setTen("Mi Lu");
    dv.ten = "Thu";   // Co truy cap truc tiep tu ben ngoai
    return 0;
}
