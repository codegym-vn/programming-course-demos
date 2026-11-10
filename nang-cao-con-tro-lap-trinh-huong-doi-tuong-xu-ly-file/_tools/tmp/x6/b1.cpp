#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
int tuoi = 20;
int &thamChieu = tuoi;

cout << "tuoi = " << tuoi << endl;
cout << "thamChieu = " << thamChieu << endl;

return 0;}
