package site.dealim.jobconsulting.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // SQL 쿼리 Contraint 위반 오류 처리
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException e) {

        // DB UNIQUE 제약 조건 오류
        if (e.getMessage().contains("user_id_UNIQUE")) {
            log.error("이미 사용중인 아이디가 있습니다.");
            return new ResponseEntity<>("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // phone UNIQUE 제약 조건 오류
        if (e.getMessage().contains("phone_UNIQUE")) {
            log.error("이미 사용중인 휴대폰 번호입니다.");
            return new ResponseEntity<>("이미 사용중인 휴대폰 번호입니다. 다른 번호를 사용해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 다른 DuplicateKeyException 처리
        return new ResponseEntity<>("데이터 입력 오류" , HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
