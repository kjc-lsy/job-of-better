package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.UserProgramService;

@RestController
@RequestMapping("/api/user/program")
@Slf4j
public class UserProgramController {
    @Autowired
    private UserProgramService userProgramService;
    @Secured("ROLE_USER")
    @PutMapping("/set-pg-idx")
    public ResponseEntity<?> updatePgIdx(@AuthenticationPrincipal CustomMember customMember, @RequestParam("pgIdx") Long pgIdx) {
        log.info("프로그램 신청 시작 : " + pgIdx);
        int result = userProgramService.updatePgIdx(pgIdx, customMember.getMember().getIdx());

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

}