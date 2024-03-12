package site.dealim.jobconsulting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.CompanyService;

import java.util.List;

@RestController
public class CompanyController {
    private CompanyService companyService;
    @PostMapping("/coverLetterSave")
    public ResponseEntity<?> comCoverLetterSave(@RequestBody List<String> comCoverLetter, @AuthenticationPrincipal CustomMember customMember) {
        Member user = customMember.getMember();
        System.out.println("comCoverLetter = " + comCoverLetter.toString());
        //companyService.comCoverLetterSave(comCoverLetter);

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}