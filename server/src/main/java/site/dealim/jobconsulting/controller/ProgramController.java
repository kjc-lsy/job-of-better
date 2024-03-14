package site.dealim.jobconsulting.controller;

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

@RestController
@RequestMapping("/api/program")
public class ProgramController {
    @Autowired
    private ProgramService programService;
    @PostMapping("/insert-program")
    public ResponseEntity<?> insertProgram(@AuthenticationPrincipal CustomMember customMember, @RequestBody ProgramInsertDto programDto) {
        Program program = Program.builder()
                .pg_com_idx(customMember.getMember().getComIdx())
                .pg_content(programDto.getContent())
                .pg_title(programDto.getTitle())
                .build();

        try {
            int result = programService.insertProgram(program);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("프로그램 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("프로그램 추가 성공", HttpStatus.OK);
    }
}
