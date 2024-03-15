package site.dealim.jobconsulting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.TestDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.CompanyService;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @PostMapping("/cover-letter-save")
    public ResponseEntity<?> comCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<ComCoverLetter> values) {
        Member user = customMember.getMember();
        //System.out.println("values = " + values.get(0));
        companyService.comCoverLetterSave(values, user.getComIdx());
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/cover-letter-info")
    public List<ComCoverLetter> comCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        Member user = customMember.getMember();
        //List<ComCoverLetter> comCoverLetters = companyService.comCoverLetterInfo(user.getComIdx());
        //System.out.println("user = " + comCoverLetters);
        //return null;
        return companyService.comCoverLetterInfo(user.getComIdx());
    }
}