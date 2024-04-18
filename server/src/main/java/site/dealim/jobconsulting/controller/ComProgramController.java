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
import site.dealim.jobconsulting.service.ComProgramService;
import site.dealim.jobconsulting.service.UserProgramService;

@RestController
@RequestMapping("/api/com/program")
@Slf4j
public class ComProgramController {
    @Autowired
    private ComProgramService comProgramService;
    @Autowired
    private UserProgramService userProgramService;
    @Secured("ROLE_COMPANY")
    @PostMapping("/insert-program")
    public ResponseEntity<?> insertProgram(@AuthenticationPrincipal CustomMember customMember, @RequestBody Program program) {
        log.info("프로그램 추가... : " + program.toString());
        program.setPgComIdx(customMember.getMember().getComIdx());

        try {
            comProgramService.insertProgram(program);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("프로그램을 추가 하였습니다", HttpStatus.OK);
    }

    @Secured("ROLE_COMPANY")
    @DeleteMapping("/delete-program/{pgIdx}")
    public ResponseEntity<?> deleteProgram(@PathVariable("pgIdx") Long pgIdx) {
        log.info("프로그램 삭제... : pgIdx = " +  pgIdx);

        try {
            comProgramService.deleteByPgIdx(pgIdx);
            return new ResponseEntity<>("프로그램 삭제 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured({"ROLE_COMPANY", "ROLE_USER"})
    @GetMapping("/get-program")
    public ResponseEntity<?> getProgram(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 조회... : " + pgIdx);
        try {
            return new ResponseEntity<>(comProgramService.getProgramByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_COMPANY")
    @PutMapping("/update-program")
    public ResponseEntity<?> updateProgram(@RequestBody Program program) {
        log.info("프로그램 내용 수정... : " + program.toString());

        try {
            comProgramService.updateProgram(program);
            return new ResponseEntity<>("프로그램이 수정 완료되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_COMPANY")
    @PostMapping("/get-all-programs")
    public ResponseEntity<?> getAllPrograms(@AuthenticationPrincipal CustomMember customMember) throws InterruptedException {
        // TODO: 지울것
        log.info("회사기준 프로그램 전체 목록 조회...");
        Thread.sleep(1000);
        return new ResponseEntity<>(comProgramService.getAllPrograms(customMember.getMember().getComIdx()), HttpStatus.OK);
    }

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-content-summary")
    public ResponseEntity<?> getContentSummary(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 내용 SUMMARY 가져오기...");
        return new ResponseEntity<>(comProgramService.getContSummary(pgIdx), HttpStatus.OK);
    }

    @GetMapping("/get-all-mem-num")
    public ResponseEntity<?> getAllMemNum(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 전체 회원 수 가져오기...");
        try {
            return new ResponseEntity<>(comProgramService.getTotalCntByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 전체 회원 수 가져오기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-approved-mem-num")
    public ResponseEntity<?> getApprovedMemNum(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 승인된 회원 수 가져오기...");
        try {
            return new ResponseEntity<>(comProgramService.getApprovedCntByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 승인된 회원 수 가져오기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-registered-mem-num")
    public ResponseEntity<?> getRegisteredMemNum(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 대기 회원 수 가져오기...");
        try {
            return new ResponseEntity<>(comProgramService.getRegisteredCntByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 대기 회원 수 가져오기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-rejected-mem-num")
    public ResponseEntity<?> getRejectedMemNum(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 불합격자 회원 수 가져오기...");
        try {
            return new ResponseEntity<>(comProgramService.getRejectedCntByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 불합격자 수 가져오기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}