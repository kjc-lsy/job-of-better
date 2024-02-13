package site.dealim.jobconsulting.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // SQL 쿼리 Contraint 위반 오류 처리
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(SQLIntegrityConstraintViolationException e) {
        if (e.getMessage().contains("user_id_UNIQUE")) {
            return new ResponseEntity<>("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // 다른 DataIntegrityViolationException 처리
        return new ResponseEntity<>("데이터 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
