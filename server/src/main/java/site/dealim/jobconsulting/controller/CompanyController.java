package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramInsertDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.CompanyService;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@Slf4j
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @PostMapping("/cover-letter-save")
    public ResponseEntity<?> comCoverLetterSave(@AuthenticationPrincipal CustomMember customMember) {
        Member user = customMember.getMember();
        //companyService.comCoverLetterSave(comCoverLetter);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/insert-program")
    public ResponseEntity<?> insertProgram(@AuthenticationPrincipal CustomMember customMember, @RequestBody ProgramInsertDto programDto) {
        Member user = customMember.getMember();

        Program program = Program.builder()
                                .pg_com_idx(customMember.getMember().getComIdx())
                                .pg_content(programDto.getContent())
                                .pg_title(programDto.getTitle())
                                .build();

        int result = companyService.insertProgram(program);

        if(result > 0) {
            return new ResponseEntity<>("프로그램 추가 성공", HttpStatus.OK);
        }
        return new ResponseEntity<>("프로그램 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}