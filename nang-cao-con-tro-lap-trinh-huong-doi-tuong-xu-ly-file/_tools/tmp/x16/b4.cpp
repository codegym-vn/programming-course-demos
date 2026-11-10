#include <iostream>
#include <string>
using namespace std;

class DongVat {
public:
    string loai;         // PUBLIC
protected:
    string ten;          // PROTECTED
private:
    int maSoBiMat;       // PRIVATE

public:
    void thietLap(string t, int ma) {
        ten = t;
        maSoBiMat = ma;
    }
};

class Cho : public DongVat {
public:
    void inThongTin() {
        cout << "Loai (public): " << loai << endl;
        cout << "Ten (protected): " << ten << endl;
        // maSoBiMat khong the truy cap o day, se loi neu bo comment
    }
};

int main() {
    Cho c;
    c.loai = "Cho";
    c.thietLap("Mi Lu", 123);
    c.inThongTin();
    return 0;
}
