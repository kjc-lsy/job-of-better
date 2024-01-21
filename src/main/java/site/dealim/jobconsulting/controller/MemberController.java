package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.MemberServiceImpl;

@Slf4j
@RestController
@RequestMapping("")
public class MemberController {

    @Autowired
    private MemberServiceImpl memberServiceImpl;

    /**
     * 사용자 정보 조회
     *
     * @param customMember
     * @return
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomMember customMember) {

        log.info("::::: customMember :::::");
        log.info("customMember : " + customMember);

        Member user = customMember.getMember();
        log.info("user : " + user);

        // 인증된 사용자 정보
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }


    /**
     * 회원가입
     *
     * @param member
     * @return
     * @throws Exception
     */
    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody Member member) throws Exception {
        int result = memberServiceImpl.insert(member);

        if (result > 0) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 회원 정보 수정
     *
     * @param member
     * @return
     * @throws Exception
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody Member member) throws Exception {
        log.info("[PUT] - /users");
        int result = memberServiceImpl.update(member);

        if (result > 0) {
            log.info("회원수정 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            log.info("회원수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 회원 탈퇴
     *
     * @param userId
     * @return
     * @throws Exception
     */
    @Secured("ROLE_ADMIN")          //  USER 권한 설정
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
        log.info("[DELETE] - /users/{userId}");

        memberServiceImpl.delete(userId);

        log.info("회원삭제 성공! - SUCCESS");

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}
