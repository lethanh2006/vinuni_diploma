// @ts-nocheck
module.exports = {
  question: "Bạn muốn tra cứu văn bằng chứng chỉ gì?",
  // prompt: "Vui lòng nhập thông tin để tra cứu",
  prompt: "Vui lòng cung cấp ít nhất 2 trong 6 trường để xác minh văn bằng.",
  form: {
    fullname: "Họ tên",
    enter_fullname: "Nhập họ tên",
    dob: "Ngày sinh",
    select_dob: "Chọn ngày sinh",
    cccd: "CCCD",
    enter_cccd: "Nhập CCCD",
    student_id: "Mã sinh viên",
    enter_student_id: "Nhập mã sinh viên",
    diploma_no: "Số hiệu văn bằng",
    enter_diploma_no: "Nhập số hiệu văn bằng",
    book_no: "Số vào sổ",
    example_book_no: "Ví dụ: TS25/{soVaoSo}",
    search_button: "Tra cứu thông tin",
  },
  table: {
    book_no: "Số vào sổ",
    diploma_no: "Số hiệu văn bằng",
    fullname: "Họ tên",
    dob: "Ngày sinh",
    student_id: "Mã sinh viên",
    action: "Thao tác",
    no_info: "Chưa có thông tin văn bằng",
    detail: "Chi tiết",
    no_result_msg: "Không tồn tại thông tin văn bằng!",
    search_result_header: "Kết quả tra cứu",
    result: "Kết quả",
    results: "Kết quả",
    fill_info_prompt: "Vui lòng điền đầy đủ thông tin để tra cứu",
    empty: "Trống",
  },
  messages: {
    warning: "Thông báo",
    warning_2_fields: "Vui lòng nhập ít nhất 2 thông tin để tra cứu",
    lookup_success:
      "Đã tìm thấy thông tin văn bằng/chứng chỉ phù hợp. Vui lòng xem kết quả bên dưới.",
    lookup_not_found:
      "Không tìm thấy thông tin văn bằng/chứng chỉ phù hợp. Vui lòng kiểm tra lại thông tin và thử lại.",
    lookup_failed: "Không thể tra cứu lúc này. Vui lòng thử lại sau.",
    turnstile_required: "Vui lòng hoàn thành xác thực bảo mật trước khi tra cứu.",
    turnstile_invalid: "Xác thực bảo mật hết hạn hoặc không hợp lệ. Vui lòng thử lại.",
    no_info_found:
      "Thông tin nhập sai hoặc không tồn tại thông tin văn bằng chứng chỉ",
    under_development:
      "Chức năng này hiện tại đang được chúng tôi phát triển. Xin bạn hãy từ tốn",
    no_query_info: "Chưa nhập thông tin tra cứu",
    search_one_way: "Chỉ tìm kiếm 1 trong 2 cách",
    fill_all_info: "Phải nhập đầy đủ thông tin",
    no_exam_info: "Thông tin nhập sai hoặc không tồn tại thông tin kết quả thi",
    search_by_name_or_no:
      "Chỉ tìm kiếm theo họ tên, ngày sinh hoặc theo số hiệu văn bằng",
    enter_name_and_dob: "Phải nhập cả họ tên và ngày sinh",
    no_diploma_found: "Thông tin nhập sai hoặc không tồn tại văn bằng",
    search_name_dob_or_cccd_sbd:
      "Bạn chỉ có thể tra cứu theo tên và ngày sinh hoặc tra cứu theo CCCD hoặc số báo danh",
    search_name_dob_or_cccd:
      "Bạn chỉ có thể tra cứu theo tên và ngày sinh hoặc tra cứu theo CCCD",
    enter_name_and_dob_prompt: "Vui lòng nhập họ tên và ngày sinh để tra cứu",
    no_lookup_info_found: "Không tìm thấy thông tin tra cứu",
    search_name_dob_or_cccd_cmt:
      "Bạn chỉ có thể tra cứu theo tên và ngày sinh hoặc tra cứu theo cccd/cmt",
    no_admission_found: "Không tìm thấy kết quả tuyển sinh",
  },
};
