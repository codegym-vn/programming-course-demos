#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int tuoi = 20;
int &thamChieu = tuoi;

cout << "Dia chi cua tuoi: " << &tuoi << endl;
cout << "Dia chi cua thamChieu: " << &thamChieu << endl;

return 0;}
