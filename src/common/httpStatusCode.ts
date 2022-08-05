//enum 열거형 사용
enum HttpStatusCode {
    OK = 200, // 요청이 성공적으로 수행되었다.
    CREATED = 201, //요청이 성공했으며 그 결과로 새로운 리소스가 생성되었음. 일반적으로 Post나 Put요청 이후에 따라온다.
    NO_CONTENT = 204, //요청은 성공 했지만 전송할 데이터가 없다.
    BAD_REQUEST = 400, //잘못된 요청을 처리할 수 없다.
    UNAUTHORIZED = 401, //인증 정보가 없이 인증이 필요한 페이지를 요청했다.
    FORBIDDEN = 403, //요청한 내용에 접근할 권리가 없다.
    NOT_FOUND = 404, //요청한 내용을 찾을 수 없다.
    INTERNAL_SERVER_ERROR = 500, //내부 서버 오류
    NOT_IMPLEMENTED = 501 //요청 방법은 서버에서 지원되지 않아서 처리할 수 없다.
}

export default HttpStatusCode;
