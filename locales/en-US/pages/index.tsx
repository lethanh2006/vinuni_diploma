// @ts-nocheck
module.exports = {
  question: "What qualification would you like to verify?",
  prompt: "Please enter the information to search",
  form: {
    fullname: "Full Name",
    enter_fullname: "Enter full name",
    dob: "Date of Birth",
    select_dob: "Select date of birth",
    cccd: "National ID Number",
    enter_cccd: "Enter national ID number",
    student_id: "Student ID",
    enter_student_id: "Enter student ID",
    diploma_no: "Serial Number",
    enter_diploma_no: "Enter serial number",
    book_no: "Reference Number",
    example_book_no: "Example: TS25/{soVaoSo}",
    search_button: "Search",
  },
  table: {
    book_no: "Reference Number",
    diploma_no: "Serial Number",
    fullname: "Full Name",
    dob: "Date of Birth",
    student_id: "Student ID",
    action: "Action",
    no_info: "No diploma information available",
    detail: "Detail",
    no_result_msg: "Diploma information does not exist!",
    search_result_header: "Search Results",
    fill_info_prompt: "Please provide all required information to search",
    empty: "Empty",
  },
  messages: {
    warning: "Notification",
    warning_2_fields: "Please enter at least 2 fields to search",
    turnstile_required: "Please complete the security check before searching.",
    turnstile_invalid: "Security verification expired or invalid. Please try again.",
    no_info_found:
      "The information entered is incorrect or the diploma/certificate does not exist",
    under_development:
      "This feature is currently under development. Thank you for your patience",
    no_query_info: "No lookup information entered",
    search_one_way: "Please search using only one of the two methods",
    fill_all_info: "Must fill in all fields",
    no_exam_info: "Incorrect information or exam results do not exist",
    search_by_name_or_no:
      "Only search by full name and date of birth, or by diploma number",
    enter_name_and_dob: "Must enter both full name and date of birth",
    no_diploma_found: "Incorrect information or diploma does not exist",
    search_name_dob_or_cccd_sbd:
      "You can only search by name and date of birth, or by ID card or candidate number",
    search_name_dob_or_cccd:
      "You can only search by name and date of birth, or by ID card",
    enter_name_and_dob_prompt:
      "Please enter both full name and date of birth to search",
    no_lookup_info_found: "Search results not found",
    search_name_dob_or_cccd_cmt:
      "You can only search by name and date of birth, or by ID card",
    no_admission_found: "Admission results not found",
  },
};
