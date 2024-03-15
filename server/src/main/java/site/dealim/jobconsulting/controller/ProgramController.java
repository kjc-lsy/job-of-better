package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramInsertDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ProgramService;

import java.util.List;

@RestController
@RequestMapping("/api/program")
@Slf4j
public class ProgramController {
    @Autowired
    private ProgramService programService;
    @PostMapping("/insert-program")
    public ResponseEntity<?> insertProgram(@AuthenticationPrincipal CustomMember customMember, @RequestBody ProgramInsertDto programDto) {
        log.info("프로그램 등록...");

        Program program = Program.builder()
                .pgComIdx(customMember.getMember().getComIdx())
                .pgContent(programDto.getContent())
                .pgTitle(programDto.getTitle())
                .build();

        try {
            int result = programService.insertProgram(program);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("프로그램을 추가 하였습니다", HttpStatus.OK);
    }

    @PostMapping("/get-programs")
    public ResponseEntity<?> getPrograms(@AuthenticationPrincipal CustomMember customMember) {
        log.info("프로그램 목록 조회...");

        List<Program> programs = programService.getProgramsByComIdx(customMember.getMember().getComIdx());

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }
}
