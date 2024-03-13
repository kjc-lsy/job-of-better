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
@RequestMapping("/api/user")
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
        Member user = customMember.getMember();

        // 인증된 사용자가 있으면
        if (user != null) {
            log.info("로그인 유저 조회 성공...");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        // 인증 되지 않음
        return new ResponseEntity<>("인증된 사용자 정보가 없습니다...", HttpStatus.UNAUTHORIZED);
    }

    /**
     * 회원가입
     *
     * @param member
     * @return
     * @throws Exception
     */
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody Member member) throws Exception {
        log.info("회원가입 시작...");

        memberServiceImpl.insert(member);

        log.info("회원가입 성공! - SUCCESS");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    /**
     * 회원 정보 수정
     *
     * @param member
     * @return
     * @throws Exception
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Member member) throws Exception {
        log.info("회원 정보 수정 시작...");

        memberServiceImpl.update(member);

        log.info("회원수정 성공! - SUCCESS");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    /**
     * 회원 탈퇴
     *
     * @param username
     * @return
     * @throws Exception
     */
    @Secured("ROLE_COMPANY")          //  USER 권한 설정
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> destroy(@PathVariable("username") String username) throws Exception {
        log.info("회원 삭제 시작...");

        memberServiceImpl.delete(username);

        log.info("회원삭제 성공! - SUCCESS");

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}