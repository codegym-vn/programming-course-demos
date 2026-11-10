#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int tuoi = 20;
int &thamChieu = tuoi;
cout << "Ban dau: tuoi = " << tuoi << ", thamChieu = " << thamChieu << endl;

thamChieu = 99;   // Sửa qua tham chiếu
cout << "Sau khi sua thamChieu = 99: tuoi = " << tuoi << ", thamChieu = " << thamChieu << endl;

tuoi = 50;   // Sửa trực tiếp qua biến gốc
cout << "Sau khi sua tuoi = 50 truc tiep: tuoi = " << tuoi << ", thamChieu = " << thamChieu << endl;

return 0;}
