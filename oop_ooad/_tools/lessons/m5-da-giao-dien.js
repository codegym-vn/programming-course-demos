// META {"module":5,"lesson":"Thực hành với Interface","activity":"Kế thừa đa giao diện (Multiple Inheritance) qua Interface","title":"Một lớp, nhiều interface","lead":"Một lớp có thể thực thi nhiều interface, mỗi interface là một góc nhìn khác nhau lên cùng một đối tượng. Bấm <b>Bước tiếp</b>.","tabs":[["x","Duck thực thi hai interface"]]}
var DL = ['interface IFlyable','{ void Fly(); }','interface ISwimmable','{ void Swim(); }','','class Duck : IFlyable, ISwimmable','{','  public void Fly()','    => Console.WriteLine("Bay");','  public void Swim()','    => Console.WriteLine("Bơi");','}','','var duck = new Duck();','IFlyable f = duck;','ISwimmable s = duck;','f.Fly();','s.Swim();','f.Swim();'];
var EX = {x:{inputs:[],
 intro:'Con vịt vừa bay vừa bơi được. Ta nhìn nó qua hai "góc nhìn" khác nhau. Bấm "Bước tiếp".',
 lines:function(){return DL;},
 run:function(c){
  var D=function(h,t){return [O('Duck#1',[],{hi:h,tag:t})];};
  c.snap({ln:0,title:'Hai hợp đồng',body:'IFlyable đòi Fly(). ISwimmable đòi Swim(). Hai interface độc lập với nhau.'});
  c.snap({ln:5,title:'Duck ký cả hai',body:'class Duck : IFlyable, ISwimmable. Interface thì ký nhiều cái được, nên Duck phải viết cả Fly() lẫn Swim().'});
  c.snap({ln:13,title:'Tạo một con vịt',body:'new Duck() tạo đúng một đối tượng Duck#1.',vars:[['duck','→ Duck#1',1]],objs:D(1)});
  c.snap({ln:14,title:'Góc nhìn IFlyable',body:'f trỏ tới cùng Duck#1, không tạo vịt mới. Qua f chỉ thấy những gì IFlyable cho phép: Fly().',vars:[['duck','→ Duck#1'],['f','→ Duck#1',1]],objs:D(1)});
  c.snap({ln:15,title:'Góc nhìn ISwimmable',body:'s cũng trỏ tới Duck#1. Qua s chỉ thấy Swim(). Giờ 3 biến cùng trỏ một hộp.',vars:[['duck','→ Duck#1'],['f','→ Duck#1'],['s','→ Duck#1',1]],objs:D(1)});
  c.out('Bay');
  c.snap({ln:16,title:'f.Fly()',body:'Gọi được vì IFlyable có Fly(). Chạy Fly() của Duck#1.',vars:[['duck','→ Duck#1'],['f','→ Duck#1',1],['s','→ Duck#1']],objs:D(1,'đang chạy Fly()')});
  c.out('Bơi');
  c.snap({ln:17,title:'s.Swim()',body:'Gọi được vì ISwimmable có Swim(). Vẫn là con vịt Duck#1 đó.',vars:[['duck','→ Duck#1'],['f','→ Duck#1'],['s','→ Duck#1',1]],objs:D(1,'đang chạy Swim()')});
  c.err('error CS1061: \'IFlyable\' does not contain a definition for \'Swim\' and no accessible extension method \'Swim\' accepting a first argument of type \'IFlyable\' could be found (are you missing a using directive or an assembly reference?)');
  c.snap({ln:18,title:'f.Swim() bị lỗi',body:'Qua góc nhìn IFlyable không có Swim(), dù đối tượng thật biết bơi. Đây là lỗi biên dịch, nên thật ra trình biên dịch chặn cả chương trình trước khi chạy dòng nào.',vars:[['f','→ Duck#1',1]],objs:D(0)});
  c.snap({ln:18,title:'Xong',body:'Xóa dòng f.Swim() thì mọi thứ chạy bình thường.',note:'Một lớp thực thi nhiều interface. Mỗi biến kiểu interface chỉ thấy phần của interface đó, dù đối tượng thật là một.',vars:[['duck','→ Duck#1'],['f','→ Duck#1'],['s','→ Duck#1']],objs:D(0)});
 }}};
