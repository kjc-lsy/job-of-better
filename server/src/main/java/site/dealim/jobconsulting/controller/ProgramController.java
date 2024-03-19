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
import site.dealim.jobconsulting.service.ProgramService;

import java.util.List;

@RestController
@RequestMapping("/api/program")
@Slf4j
public class ProgramController {
    @Autowired
    private ProgramService programService;
    @Secured("ROLE_COMPANY")
    @PostMapping("/insert-program")
    public ResponseEntity<?> insertProgram(@AuthenticationPrincipal CustomMember customMember, @RequestBody Program program) {
        log.info("프로그램 추가... : " + program.toString());
        program.setPgComIdx(customMember.getMember().getComIdx());

        try {
            programService.insertProgram(program);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("프로그램을 추가 하였습니다", HttpStatus.OK);
    }

    @Secured("ROLE_COMPANY")
    @PostMapping("/get-programs")
    public ResponseEntity<?> getPrograms(@AuthenticationPrincipal CustomMember customMember) {
        log.info("프로그램 목록 조회...");

        List<Program> programs = programService.getProgramsByComIdx(customMember.getMember().getComIdx());

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @Secured("ROLE_COMPANY")
    @DeleteMapping("/delete-program/{pgIdx}")
    public ResponseEntity<?> deleteProgram(@PathVariable("pgIdx") Long pgIdx) {
        log.info("프로그램 삭제... : pgIdx = " +  pgIdx);

        try {
            programService.deleteByPgIdx(pgIdx);
            return new ResponseEntity<>("프로그램 삭제 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-program")
    public ResponseEntity<?> getProgram(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("프로그램 조회... : " + pgIdx);
        try {
            return new ResponseEntity<>(programService.getProgramByPgIdx(pgIdx), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_COMPANY")
    @PutMapping("/update-program-cont")
    public ResponseEntity<?> updateProgram(@RequestBody Program program) {
        log.info("프로그램 내용 수정... : " + program.toString());

        try {
            programService.updateContByPgIdx(program);
            return new ResponseEntity<>("프로그램 수정 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_COMPANY")
    @PutMapping("/update-program-overview")
    public ResponseEntity<?> updateProgramOverview(@RequestBody Program program) {
        log.info("프로그램 정보 수정... : " + program.toString());

        try {
            programService.updateContByPgIdx(program);
            return new ResponseEntity<>("프로그램 수정 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
