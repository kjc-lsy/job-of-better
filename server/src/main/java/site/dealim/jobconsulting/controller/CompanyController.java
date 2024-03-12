package site.dealim.jobconsulting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.service.CompanyService;

@RestController
public class CompanyController {
    private CompanyService companyService;
    @PostMapping("/com-cl-save")
    public ResponseEntity<?> comCoverLetterSave(@RequestBody ComCoverLetter comCoverLetter) {
        companyService.comCoverLetterSave(comCoverLetter);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}