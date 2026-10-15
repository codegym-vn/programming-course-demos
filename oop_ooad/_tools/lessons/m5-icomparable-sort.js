// META {"module":5,"lesson":"Áp dụng Trừu tượng trong Thiết kế Hệ thống","activity":"Ví dụ thực tế: Cách các framework C# lớn sử dụng Abstract Class và Interface","title":"List.Sort() và IComparable","lead":"List.Sort() của .NET sắp xếp được Student nhờ Student thực thi IComparable. Bấm <b>Bước tiếp</b> để xem từng lần Sort gọi CompareTo.","tabs":[["x","Sắp xếp sinh viên theo điểm"]]}
var SL = ['class Student','  : IComparable<Student>','{','  public string Name;','  public int Score;','  public int CompareTo(Student o)','  {','    return Score - o.Score;','  }','}','','var list = new List<Student>();','// thêm An 7, Bình 9, Chi 5, Dũng 8','list.Sort();'];
var EX = {x:{inputs:[],
 intro:'Student ký hợp đồng IComparable và quy định so sánh theo điểm. Bấm "Bước tiếp" để xem Sort dùng nó.',
 lines:function(){return SL;},
 run:function(c){
  var st=[['An',7],['Bình',9],['Chi',5],['Dũng',8]];
  var lab=function(s){return s[0]+' '+s[1];};
  var show=function(a,hi,done){return [AR('list',a.map(lab),hi||[],done||[],[])];};
  c.snap({ln:13,title:'Gọi list.Sort()',body:'List<T> không biết Student là gì. Nó chỉ biết Student có CompareTo (nhờ IComparable) để hỏi "ai đứng trước". Mô phỏng dùng Insertion Sort cho dễ xem.',arrs:show(st)});
  var a=st.slice();
  for(var i=1;i<a.length;i++){
   var key=a[i], j=i-1;
   while(j>=0){
    var r=a[j][1]-key[1];
    var kind=r<0?'âm':(r==0?'bằng 0':'dương');
    var act=r>0?'Dương nghĩa là '+a[j][0]+' đứng sau '+key[0]+', nên '+a[j][0]+' dịch sang phải.':'Không dương, '+key[0]+' không phải đi tiếp về trước, giữ nguyên chỗ.';
    c.snap({ln:7,title:'CompareTo('+a[j][0]+', '+key[0]+')',body:a[j][0]+'.CompareTo('+key[0]+') = '+a[j][1]+' - '+key[1]+' = '+r+' ('+kind+'). '+act,
     vars:[['a',a[j][0]+' ('+a[j][1]+')'],['b',key[0]+' ('+key[1]+')'],['kết quả',r,1]],arrs:show(a,[j,i],[])});
    if(r>0){ j--; } else break;
   }
   var pos=j+1;
   if(pos!=i){
    a.splice(i,1); a.splice(pos,0,key);
    c.snap({ln:13,title:'Chèn '+key[0]+' vào vị trí '+pos,body:key[0]+' ('+key[1]+') được chèn vào đúng chỗ, các bạn điểm cao hơn dịch sang phải.',arrs:show(a,[pos],[])});
   }
  }
  c.snap({ln:13,title:'Xong',body:'Danh sách đã xếp tăng dần theo điểm: '+a.map(lab).join(', ')+'.',
   note:'Thư viện .NET không biết Student, chỉ biết IComparable nên gọi được CompareTo của bạn. (.NET thật dùng thuật toán khác nên thứ tự các lần gọi sẽ khác, kết quả vẫn vậy.)',arrs:show(a,[],[0,1,2,3])});
 }}};
