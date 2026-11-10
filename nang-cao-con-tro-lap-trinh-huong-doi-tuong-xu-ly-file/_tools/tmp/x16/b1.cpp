#include <iostream>
#include <string>
using namespace std;

class DongVat {
private:
    string ten;   // PRIVATE
public:
    void setTen(string t) { ten = t; }
};

class Cho : public DongVat {
public:
    void inTen() {
        cout << "Ten: " << ten << endl;   // Co truy cap
    }
};

int main() {
    Cho c;
    c.setTen("Mi Lu");
    c.inTen();
    return 0;
}
