package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.UserProgramService;

import java.util.List;

@RestController
@RequestMapping("/api/user/program")
@Slf4j
public class UserProgramController {
    @Autowired
    private UserProgramService userProgramService;

    @Secured("ROLE_USER")
    @PutMapping("/register-program")
    public ResponseEntity<?> registerProgram(@AuthenticationPrincipal CustomMember customMember, @RequestParam("pgIdx") Long pgIdx, @RequestParam("pgComIdx") Long comIdx) {
        log.info("프로그램 신청 시작 : " + pgIdx);
        int result = userProgramService.registerProgram(pgIdx, customMember.getMember().getIdx(), comIdx);

        if (result == 1) {
            log.info("프로그램 신청 성공");
            return new ResponseEntity<>("프로그램 신청 성공", HttpStatus.OK);
        }

        return new ResponseEntity<>("프로그램 신청 실패", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Secured("ROLE_USER")
    @GetMapping("/get-com-name")
    public ResponseEntity<?> getComNameByComIdx(@RequestParam("comIdx") Long comIdx) {
        return new ResponseEntity<>(userProgramService.getComNameByComIdx(comIdx), HttpStatus.OK);
    }

    @Secured({"ROLE_USER"})
    @PostMapping("/get-valid-programs")
    public ResponseEntity<?> getPrograms() {
        log.info("사용 가능한 프로그램 목록 조회...");

        List<Program> programs = userProgramService.getAllPrograms();

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @PostMapping("/cancel-register")
    public ResponseEntity<?> cancelRegister(@AuthenticationPrincipal CustomMember customMember) {
        log.info("프로그램 신청 취소...");

        Long memIdx = customMember.getMember().getIdx();
        int result = userProgramService.calncelRegister(memIdx);

        if(result == 1) {
            return new ResponseEntity<>("프로그램 신청을 취소하였습니다.", HttpStatus.OK);
        }
        return new ResponseEntity<>("프로그램 신청을 취소할 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Secured("ROLE_USER")
    @GetMapping("/get-waiting-reg")
    public ResponseEntity<?> getWaitingReg(@AuthenticationPrincipal CustomMember customMember) {
        return new ResponseEntity<>(userProgramService.getWaitingRegDto(customMember.getMember().getPgIdx()), HttpStatus.OK);
    }


}