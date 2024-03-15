package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
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
    public ResponseEntity<?> comCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<ComCoverLetter> values) {
        Member user = customMember.getMember();
        companyService.comCoverLetterSave(values, user.getComIdx());
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }


    @GetMapping("/cover-letter-info")
    public List<ComCoverLetter> comCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        Member user = customMember.getMember();
        return companyService.comCoverLetterInfo(user.getComIdx());
    }

    @PostMapping("/cover-letter-delete")
    public ResponseEntity<?> comCoverLetterDelete(@AuthenticationPrincipal CustomMember customMember, @RequestBody Long cclIdx) {
        Member user = customMember.getMember();
        System.out.println("cclIdx = " + cclIdx);
       // companyService.comCoverLetterDelete(cclIdx,user);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}