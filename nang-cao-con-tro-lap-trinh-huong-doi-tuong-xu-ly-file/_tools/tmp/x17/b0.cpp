#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
class DongVat {
public:
    string ten;
    void keu() {
        cout << ten << " keu mot am thanh chung chung." << endl;
    }
};

class Cho : public DongVat {
public:
    void keu() {   // GHI DE: cung ten, cung tham so (khong co), noi dung khac
        cout << ten << " sua: Gau gau!" << endl;
    }
};

return 0;}
