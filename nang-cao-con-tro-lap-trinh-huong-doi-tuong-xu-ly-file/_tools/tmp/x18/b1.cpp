#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    DongVat() { cout << "1. DongVat chay" << endl; }
};

class Cho : public DongVat {
public:
    Cho() { cout << "2. Cho chay" << endl; }
};

class ChoConGiong : public Cho {
public:
    ChoConGiong() {
        cout << "3. ChoConGiong chay"
             << endl;
    }
};

int main() {
    ChoConGiong c;
    return 0;
}
