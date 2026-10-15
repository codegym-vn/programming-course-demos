// META {"module":3,"lesson":"Kế thừa nâng cao: virtual, override, base","activity":"Sử dụng từ khóa `base`","title":"Từ khóa base","lead":"base.GetInfo() gọi phiên bản của lớp cha rồi bổ sung thêm. Bấm <b>Bước tiếp</b> để theo dõi dòng chạy.","tabs":[["x","Manager gọi base.GetInfo()"]]}
var EX = {x:{inputs:[],
 intro:'Manager.GetInfo() không viết lại từ đầu mà dùng kết quả của Employee.GetInfo(). Bấm "Bước tiếp".',
 lines:function(){return [
  'class Employee','{','  public string Name = "An";','  public virtual string GetInfo()','  {','    return "Tên: " + Name;','  }','}',
  'class Manager : Employee','{','  public override string GetInfo()','  {','    string info = base.GetInfo();','    return info + ", Phòng: IT";','  }','}','',
  'var m = new Manager();','Console.WriteLine(m.GetInfo());'];},
 run:function(c){
  var name='An',part2=', Phòng: IT';
  var base_=function(){return 'Tên: '+name;}();
  var full=base_+part2;
  function OB(tag){return [O('Manager#1',[['Name',S(name)]],{hi:1,tag:tag})];}
  c.snap({ln:17,title:'Tạo Manager',body:'Đối tượng Manager#1 có Name = "An" (trường kế thừa từ Employee).',vars:[['m','→ Manager#1',1]],objs:OB('')});
  c.snap({ln:18,title:'Gọi m.GetInfo()',body:'Manager có override GetInfo(), nên chạy phiên bản của Manager.',vars:[['m','→ Manager#1']],objs:OB('đang chạy Manager.GetInfo()')});
  c.snap({ln:12,title:'base.GetInfo() nhảy lên cha',body:'base nghĩa là "lớp cha". Dòng chạy nhảy sang GetInfo() của Employee.',vars:[['m','→ Manager#1']],objs:OB('gọi Employee.GetInfo()')});
  c.snap({ln:5,title:'Employee.GetInfo()',body:'Phiên bản của Employee trả về "'+base_+'".',vars:[['trả về',S(base_),1]],objs:OB('đang chạy Employee.GetInfo()')});
  c.snap({ln:12,title:'Quay về Manager',body:'Kết quả của cha được lưu vào biến info.',vars:[['info',S(base_),1]],objs:OB('đang chạy Manager.GetInfo()')});
  c.snap({ln:13,title:'Ghép thêm phần của Manager',body:'info + ", Phòng: IT" cho chuỗi "'+full+'", rồi trả về.',vars:[['info',S(base_)],['trả về',S(full),1]],objs:OB('đang chạy Manager.GetInfo()')});
  c.out(full);
  c.snap({ln:18,title:'Xong',body:'Console in "'+full+'".',
   note:'base.Method() gọi phiên bản của lớp cha, rồi lớp con bổ sung thêm phần của mình.',vars:[['m','→ Manager#1']],objs:OB('')});
 }}};
