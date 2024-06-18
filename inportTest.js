// Import module mysql
const mysql = require('mysql');

// Tạo kết nối tới MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // Thay 'localhost' bằng địa chỉ IP hoặc tên miền của MySQL server nếu cần thiết
  user: 'root',  // Thay 'your_username' bằng tên người dùng MySQL của bạn
  password: 'Thai123h.',  // Thay 'your_password' bằng mật khẩu MySQL của bạn
  database: 'quanlydaotao'  // Thay 'your_database' bằng tên cơ sở dữ liệu MySQL bạn đang sử dụng
});

// Kết nối tới MySQL
connection.connect(function(err) {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công với id ' + connection.threadId);
});

// Hàm để thêm sinh viên vào bảng students
function addStudent(student) {
  const { mssv, name, gender, email, password, className, course } = student;
  const sql = 'INSERT INTO students (mssv, name, gender, email, password, className, course) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [mssv, name, gender, email, password, className, course];

  connection.query(sql, values, function(err, result) {
    if (err) throw err;
    console.log(`Thêm sinh viên ${name} thành công!`);
  });
}

// Sử dụng hàm addStudent để thêm sinh viên
const newStudent = {
  mssv: '123456789',
  name: 'Nguyen Van A',
  gender: 'Male',
  email: 'nguyenvana@example.com',
  password: 'securepassword',
  className: 'Class A',
  course: 'Computer Science'
};

addStudent(newStudent);

// Đóng kết nối sau khi thực hiện xong các thao tác
connection.end();
