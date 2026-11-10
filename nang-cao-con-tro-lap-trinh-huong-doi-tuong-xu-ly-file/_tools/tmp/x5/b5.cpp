#include <iostream>
using namespace std;

int main() {
    int arrInt[3] = {1, 2, 3};
    double arrDouble[3] = {1.5, 2.5, 3.5};
    int *pInt = arrInt;
    double *pDouble = arrDouble;

    cout << "Dia chi pInt: " << pInt << endl;
    pInt++;
    cout << "Dia chi pInt sau ++: " << pInt << endl;

    cout << "Dia chi pDouble: " << pDouble << endl;
    pDouble++;
    cout << "Dia chi pDouble sau ++: " << pDouble << endl;
    return 0;
}
