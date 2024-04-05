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

import java.util.List;

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

    @Secured({"ROLE_COMPANY", "ROLE_USER"})
    @PostMapping("/get-programs")
    public ResponseEntity<?> getPrograms() {
        log.info("프로그램 목록 조회...");

        List<Program> programs = userProgramService.getAllPrograms();

        return new ResponseEntity<>(programs, HttpStatus.OK);
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
            return new ResponseEntity<>("프로그램 수정 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/get-all-programs")
    public ResponseEntity<?> getAllPrograms() {
        log.info("프로그램 전체 목록 조회...");

        return new ResponseEntity<>(comProgramService.getAllPrograms(), HttpStatus.OK);
    }

}