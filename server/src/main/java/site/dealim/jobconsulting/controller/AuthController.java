package site.dealim.jobconsulting.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.MemberCompanyDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ComCoverLetterService;
import site.dealim.jobconsulting.service.AuthServiceImpl;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authServiceImpl;

    @Autowired
    private ComCoverLetterService companyService;

    /**
     * 사용자 정보 조회
     *
     * @param customMember
     * @return
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("로그인 유저 조회...");

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

        authServiceImpl.insert(member);

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

        authServiceImpl.update(member);

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

        authServiceImpl.delete(username);

        log.info("회원삭제 성공! - SUCCESS");

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/check-duplicate-username")
    public ResponseEntity<?> checkDuplicateUsername(@RequestParam(value = "username") String username) {
        log.info("로그인 중복 유저 확인..."+username);
        return new ResponseEntity<>(authServiceImpl.checkDuplicateUsername(username), HttpStatus.OK);
    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/company-join")
    public ResponseEntity<?> companyJoin(@RequestBody MemberCompanyDto memberCompanyDto , HttpServletResponse res) throws Exception {
        try {
            log.info("멤버 회원가입 시작...");
            authServiceImpl.MemberInsert(memberCompanyDto.getMember());
            Long joinMember = memberCompanyDto.getMember().getIdx();
            log.info("멤버 회원가입 성공! - SUCCESS / idx : "+memberCompanyDto.getMember().getIdx());
            log.info("기업 회원가입 시작...");
            authServiceImpl.companyJoin(joinMember, memberCompanyDto.getCompany());
            log.info("기업 회원가입 성공! - SUCCESS");
            log.info("멤버 기업 idx값 추가");
            authServiceImpl.addCompanyIdx(memberCompanyDto.getCompany().getComIdx(), memberCompanyDto.getMember().getIdx());
        } catch(Exception e) {
            log.error("회원가입 실패 - ERROR", e);
            res.sendError(404, "Error : "+e.getMessage());
            throw e; // 예외를 다시 던져서 롤백을 유도합니다.
        }
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/check-duplicate-bno")
    public ResponseEntity<?> checkDuplicateBno(@RequestParam(value = "comLicenseNum") String comLicenseNum) {
        log.info("사업자등록번호 중복 확인...");
        return new ResponseEntity<>(authServiceImpl.checkDuplicateBno(comLicenseNum), HttpStatus.OK);
    }
}